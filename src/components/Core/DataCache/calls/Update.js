import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { Fetch } from './Fetch';
import { fragmentDefaults } from 'graphql/fragments/defaults';
import {
  fetchField,
  fetchFieldSet,
  fetchMeta,
  fetchAccount,
  fetchRole,
  fetchMember
} from 'graphql/queries';

/**
 * Our Cache Write Wrapper
 */
export const Update = ( call, data ) => {
  if ( data ) {
    const client = getDataCacheService();
    const id = call.id;
    const key = (call.key) ? call.key : call.id;
    const filter = (call.filter) ? call.filter : '';
    let type = (call.type) ? call.type : call.target;

    // To get our previous result, remove the filter so we can apply the filter update later on the full fragment.
    let noFilterCall = call;
    noFilterCall.filter = '';

    // Key is set to id if not specified.
    if (key) {
      let previous = Fetch(noFilterCall);
      let fragmentID = '';
      let fragmentQuery = '';
      let fragmentName = call.target;

      let defaults;
      if ( 'meta' === type ) {
        type = ( data.type ) ? data.type : '';
      }

      defaults = fragmentDefaults[type];

      defaults.meta.data = fragmentDefaults.meta[type];
      previous = (previous) ? previous : defaults;

      // Ensure our IDs are correct since may have grabbed defaults.
      // Ensure if we used defaults, we ov
      previous = {
        ...previous,
        id: key,
        type: type,
        meta: {
          ...previous.meta,
          id: key,
          type: type,
          __typename: 'Meta'
        }
      };

      // Our fetch single calls
      switch (call.target) {
        case 'field':
          fragmentID = `Field:${key}`;
          fragmentQuery = fetchField;
          break;
        case 'meta':
          fragmentID = `Meta:${key}`;
          fragmentQuery = fetchMeta;
          break;
        case 'account':
          fragmentID = `Account:${key}`;
          fragmentQuery = fetchAccount;
          break;
        case 'member':
          fragmentID = `Member:${key}`;
          fragmentQuery = fetchMember;
          break;
        case 'role':
          fragmentID = `Role:${key}`;
          fragmentQuery = fetchRole;
          break;
        case 'diagram':
        case 'interface':
        case 'fieldset':
        default:
          fragmentID = `FieldSet:${key}`;
          fragmentQuery = fetchFieldSet;
          fragmentName = 'fieldset';
          break;
      }

      // Handle filters, if we are updating a specific property of a fragment.
      switch( filter ) {
        case '':
        case 'all':
          // Merge the previous and current data set.
          // If the current data set is metadata
          if ( 'meta' === call.target) {
            const metadata = { ...previous.meta.data, ...data.data };
            previous = {
              ...previous.meta,
              ...data,
              data: metadata
            };
          } else {
            const metadata = { ...previous.meta.data, ...data.meta.data };
            previous = {
              ...previous,
              ...data,
              meta: {
                ...previous.meta,
                ...data.meta,
                data: metadata
              }
            };
          }
          break;
        case 'subsets':
        case 'children':
        case 'sets':
        case 'accounts':
        case 'subaccounts':
          previous.children.push(data);
          break;
        case 'fieldsets':
          // Fields have a fieldsets list of ids. Push the id accordingly.
          if ('field' === call.target) {
            previous.fieldsets.push(data);
          } else if ( 'fieldset' === call.target ) {
            // Order only matters on fieldsets that aren't containers.
            const order = (data.order) ? data.order : 0;
            if ( order > 0 && !(previous.children[order]) ) {
              previous.children[order] = data;
            } else {
              previous.children.push(data);
            }
          } else {
            previous.children.push(data);
          }
          break;
        default:
          // The filter should exist as a property of our result, otherwise just return the entire result as the filter may be on meta data that is not a proper JSON object.
          if ( previous[filter] ) {
            previous[filter].push(data);
          }
          break;
      }

      // We've merged our data with our previous data. Let's write!
      client.writeFragment({
        id: fragmentID,
        fragment: fragmentQuery,
        fragmentName: fragmentName,
        data: previous
      });
    } else {
      throw new Error('You must specify an id or key to write to.');
    }

    const result = Fetch(noFilterCall);
    return result;
  } else {
    throw new Error('Cache write called with empty data.');
  }
}
