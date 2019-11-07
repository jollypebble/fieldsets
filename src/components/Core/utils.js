import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * Check if a field value is a primitive value.
 */
export const isPrimitive = (fieldvalue) => {
  if (typeof fieldvalue === 'string' || typeof fieldvalue === 'number' || typeof fieldvalue === 'boolean') {
    return true;
  }
  return false;
};


/**
 * DATACACHE UTILS
 */

/**
 * Get the cached value of a field.
 */
export const fetchFieldValue = (id) => {
  return callCache({id: id, target: 'field', filter: 'value', action: 'fetch'});
}

/**
 * Fetch a field fragment from the data cache.
 */
export const fetchField = (id) => {
  return callCache({id: id, target: 'field', action: 'fetch'});
}

/**
 * Update a field fragment in the data cache.
 */
export const updateField = (id, data) => {
  return callCache({id: id, target: 'field', action: 'update'}, {...data} );
}


/**
 * END DATACACHE UTILS
 */
