/**
 * A store is a react context that gives access to the results of a datacache call.
 * This data store represents a simplified key value local data structure of our root query of apollo.
 * We use container ids as top level keys for data store access.
 */
import React, {createContext, useContext, useReducer} from 'react';

// Our context for reading the data cache values
const DataCacheContext = createContext({});
export const DataStore = ( {reducer, initialState, children} ) => (
  <DataCacheContext.Provider value={useReducer( reducer, initialState )}>
    {children}
  </DataCacheContext.Provider>
);
export const useDataCache = () => useContext(DataCacheContext);
