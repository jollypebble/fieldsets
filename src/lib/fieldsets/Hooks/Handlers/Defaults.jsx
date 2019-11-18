import React, { createContext, useMemo, useState, useEffect } from 'react';
import { rootQueryDefaults, fragmentDefaults, SetTypes, MetaTypes, FieldTypes } from 'lib/fieldsets/graphql/defaults';
import {useStatus} from 'lib/fieldsets/Hooks';

// Our context.
export const DefaultsContext = createContext([]);

export const Defaults = (props) => {
  const [{status, message, stage}, updateStatus] = useStatus();

  /**
   * Our default values used throughout our code base.
   * If you'd like to add custom defaults or alter the current values, use the `useDefaults()` hook.
   */
  const defaultValues = useMemo(
    () => {
      return(
        {
          rootQuery: {...rootQueryDefaults},
          fragments: {...fragmentDefaults},
          setTypes: [...SetTypes],
          metaTypes: [...MetaTypes],
          fieldTypes: [...FieldTypes]
        }
      );
    },
    []
  );

  const [defaults, updateDefaults] = useState({...defaultValues});

  /**
   * Set a stage and status after render that allows to to initialize application specific defaults.
   */
  useEffect(
    () => {
      if ( 'defaults' === stage && 'initializing' === status ) {
        updateStatus('initialized', 'Default values initialized', 'defaults');
      } else if ( 'application' === stage && 'default' === status ) {
        updateStatus('initializing', 'Initializing default values', 'defaults');
      }
    },
    [stage, status]
  );

  /**
   * Once we are inside out context provider, we can utilize this Handler's state.
   * For this context, we allow mergeing of default state by default, with the option to overwrite.
   */
  const setDefaultValues = (newDefaults, overwrite = false) => {
    let newValues;
    if (overwrite) {
      newValues = {...newDefaults};
    } else {
      newValues = {...defaults, ...newDefaults}
    }
    updateDefaults({...newValues});
    return {...newValues};
  }

  return (
    <DefaultsContext.Provider value={[ defaults, setDefaultValues ]}>
      {props.children}
    </DefaultsContext.Provider>
  );
}
