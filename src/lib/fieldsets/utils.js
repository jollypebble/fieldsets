import { Fetch, Update } from 'lib/fieldsets/DataCache/calls';

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
 * DATA UTILS
 */

/**
 * Get the cached value of a field.
 */
export const fetchFieldValue = (id) => {
  return Fetch({id: id, target: 'field', filter: 'value'});
}

/**
 * Fetch a field fragment from the data cache.
 */
export const fetchField = (id) => {
  return Fetch({id: id, target: 'field'});
}

/**
 * Update a field fragment in the data cache.
 */
export const updateField = (id, data) => {
  return Update({id: id, target: 'field'}, {...data} );
}


/**
 * END DATACACHE UTILS
 */
