import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import {
  fetchField,
  fetchFieldSet,
  fetchMeta,
  fetchAccount,
  fetchRole,
  fetchMember
} from 'graphql/queries';

/**
 * Our Cache Fetch wrapper function. We use this to read fragments directly from the cache. Standard grapqhl queries should be handled in their corresponding resolvers.
 */
export const Fetch = ( call ) => {
  const client = getDataCacheService();
  const id = call.id;
  const key = (call.key) ? call.key : call.id;
  const filter = (call.filter) ? call.filter : '';

  let result = null;
  // These are our fetchAll queries
  if ( ! id  ) {
    switch (call.target) {
      case 'field':
        break;
      case 'fieldset':
        break;
      default:
        throw new Error(`No id was specified and the fetchAll target "${call.target}" does not exist.`);
        break;
    }
  } else {
    // Key is set to id if not specified.
    if (key) {
      let fragmentID = '';
      let fragmentQuery = '';
      let fragmentName = call.target;
      if ( 'diagram' === fragmentName || 'interface' === fragmentName ) {
        fragmentName = 'fieldset';
      }
      // Our fetch single calls
      switch (call.target) {
        case 'field':
          fragmentID = `Field:${key}`;
          fragmentQuery = fetchField;
          break;
        case 'diagram':
        case 'interface':
        case 'fieldset':
          fragmentID = `FieldSet:${key}`;
          fragmentQuery = fetchFieldSet;
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
        default:
          throw new Error(`The fetch target "${call.target}" does not exist.`);
          break;
      }
      // Get our Result!
      result = client.readFragment({
        id: fragmentID,
        fragment: fragmentQuery,
        fragmentName: fragmentName
      });

      if ( result ) {
        // Handle filters.
        switch( filter ) {
          case '':
          case 'all':
            break;
          case 'subsets':
          case 'children':
          case 'sets':
          case 'accounts':
          case 'subaccounts':
            result = result.children;
            break;
          case 'fieldsets':
            // Fields have a fieldsets list of ids. Return those fieldsets if this call targets a field instead of a set.
            // Both of these result lists are not lists of fieldsets. So we iterate through them to generate our list.
            let resultList = [];
            if ('field' === call.target && result.sets) {
              for ( let fieldsetID of result.sets ) {
                const fieldset = client.readFragment({
                  id: `FieldSet:${fieldsetID}`,
                  fragment: fetchFieldSet,
                  fragmentName: 'fieldset'
                });
                resultList.push(fieldset);
              }
              result = resultList;
            } else {
              for ( let subset of result.children ) {
                const fieldset = client.readFragment({
                  id: `FieldSet:${subset.id}`,
                  fragment: fetchFieldSet,
                  fragmentName: 'fieldset'
                });
                resultList.push(fieldset);
              }
            }
            result = resultList;
            break;
          default:
            // The filter should exist as a property of our result, otherwise just return the entire result as the filter may be on meta data that is not a proper JSON object.
            result = (result[filter]) ? result[filter] : result;
            break;
        }
      }
    } else {
      throw new Error('You must specify an id or key to fetch.');
    }
  }
  return result;
}
