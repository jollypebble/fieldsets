/**
 * Focus is a react context that allows components to know what the current user focus is and wheter or not the should be visible..
 */
import React, {createContext, useReducer, useState, useEffect} from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {useFocus} from 'components/Core/Hooks';


// Our focus context.
export const PointerContext = createContext({});

const PointerHandler = ( {children} ) => {
  const client = getDataCacheService();
  const [focus, updateFocus] = useFocus();
  const [pointer, updateFocus] = useState('idle');

  const handlePointer = (current, call) => {
    switch (call.action) {
      // change entire container focus
      case 'click':
        break;
      case 'doubleClick':
        break;
      case 'enter':
        break;
      case 'exit':
        break;
      default:
    }
    return current;
  }


  return (
    <FocusContext.Provider value={useReducer( handlePointer, 'idle' )}>
      {children}
    </FocusContext.Provider>
  );
}

export default Focus;
