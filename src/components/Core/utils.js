/**
 * Check if a field value is a primitive value.
 */
export const isPrimitive = (fieldvalue) => {
  if (typeof fieldvalue === 'string' || typeof fieldvalue === 'number' || typeof fieldvalue === 'boolean') {
    return true;
  }
  return false;
};
