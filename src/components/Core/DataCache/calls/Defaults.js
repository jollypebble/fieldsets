import { callCache } from 'components/Core/DataCache/reducers/datacache';
import { fragmentDefaults } from 'graphql/fragments/defaults';

/**
 * Back fill data with defaults and a shallow merge with the spread operator.
 * Instantiate the fragment in the local cache.
 */
export const Defaults = ( call, data ) => {
  if ( data ) {
    const id = call.id;
    const key = (call.key) ? call.key : call.id;
    const type = (data.type) ? data.type : call.target;
    // Key is set to id if not specified.

    if (key && type) {
      let fragment;
      const metatype = ( 'meta' === type ) ? call.parent : type;
      let metadata = fragmentDefaults.meta[metatype];
      const metafields = fragmentDefaults.meta[metatype];

      for (let metafield in metafields) {
        let newMeta = {};
        // Allow meta data to be passed with or  without nesting the data property.
        if ( 'meta' === call.target ) {
          if ( data.data && data.data[metafield] ) {
            newMeta = data.data[metafield];
          } else if ( data[metafield] ){
            newMeta = data[metafield];
          }
        } else if ( data.meta ) {
          if ( data.meta.data && data.meta.data[metafield] ) {
            newMeta = data.meta.data[metafield];
          } else if ( data.meta[metafield] ) {
            newMeta = data.meta[metafield];
          }
        }

        if ( newMeta.constructor === Object ) {
          if ( Object.keys(newMeta).length > 0 ) {
            metadata[metafield] = { ...metadata[metafield], ...newMeta , __typename: 'JSONObject' };
          }
        } else if ( newMeta.constructor !== Object ) {
          metadata[metafield] = newMeta;
        }
      }

      let previous = callCache({id: id, target: call.target, action: 'fetch'});
      previous = (previous) ? previous : {};
      if ( 'meta' === call.target ) {
        fragment = {
          ...previous,
          ...data,
          id: key,
          type: type,
          data: {
            ...previous.data,
            ...metadata,
            __typename: 'JSONObject'
          },
          __typename: 'Meta'
        };
      } else {
        fragment = {
          ...fragmentDefaults[type],
          ...previous,
          ...data,
          id: key,
          meta: {
            id: key,
            type: type,
            data: {
              ...metadata,
              __typename: 'JSONObject'
            },
            __typename: 'Meta'
          }
        };
      }

      callCache({id: key, target: call.target, action: 'update'}, fragment);
      return fragment;
    }
  }
  return;
}
