import * as DefaultData from 'data/defaults';

const DataCacheDefault = ({id, type}) => {
  if (id && type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    // This doesn't fix camel case.
    const idKey = id.charAt(0).toUpperCase() + id.slice(1);
    const typeKey = type.charAt(0).toUpperCase() + type.slice(1) + 'Data';
    // Check for data in Diagrams & Interfaces.
    if ( idKey in DefaultData && typeKey in DefaultData[idKey] ) {
      return DefaultData[idKey][typeKey];
    }
  }

  return {};
}

export default DataCacheDefault;
