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
 * Find numeric value of an input.
 * Will allow field id's and look up corresponding values
 * Will cast null values as 0.
 */
export const castNumeric = (value) => {
  let number = Number(value);
  if ( Number.isNaN(number) ) {
    // If we don't have a number, test to see if it is a cached field id
    const fieldvalue = fetchFieldValue(value);
    // Means we have a cache hit.
    if (fieldvalue !== null) {
      number = Number(fieldvalue);
      if ( Number.isNaN(number) ) {
        return Error(`Field ${value} has a value of ${fieldvalue} which cannot be cast to a number.`);
      }
    } else {
      return Error(`${value} cannot be cast to a number and is not a valid field id.`);
    }
  }
  return number;
}

/**
 * Check our type of field return corresponding numeric value.
 */
export const getNumericValue = (field, calledby = '') => {
  if (calledby.length > 0) {
    calledby = `function ${calledby}(): `;
  }
  switch ( typeof field ) {
    case 'numeric':
    case 'bigint':
    case 'string':
      try {
        return castNumeric(field);
      } catch (e) {
        console.error(`${calledby}Primitive value passed cannot be cast. ${e.message}`);
        return;
      }
      break;
    case 'function':
      const fieldvalue = field();
      try {
        return castNumeric(fieldvalue);
      } catch (e) {
        console.error(`${calledby}Function called returns an invalid value. ${e.message}`);
        return;
      }
      break;
    case 'object':
      if ( 'field' === field.__typename.toLowerCase() ) {
        if (field.hasOwnProperty('value')) {
          try {
            return castNumeric(field.value);
          } catch (e) {
            console.error(`${calledby}Field Object passed cotains an invalid value. ${e.message}`);
            return;
          }
        } else {
          try {
            throw new Error(`${calledby}Field Object passed does not have the value property.`);
          } catch (e) {
            console.error( e.message );
            return;
          }
        }
      } else {
        try {
          throw new Error(`${calledby}Object passed does not have the property __typename === 'field'.`);
        } catch (e) {
          console.error( e.message );
          return;
        }
      }
      break;
    default:
      try {
        throw new Error(`${calledby}Field of ${field} is not a valid data type and returns ${typeof field}`);
      } catch (e) {
        console.error( e.message );
        return;
      }
      break;
  }
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
