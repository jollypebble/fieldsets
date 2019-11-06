import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Set, SetGroup } from 'components/Core';
import {useStatus} from 'components/Core/Hooks';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * Root Sets are state data components that represent top level grouping of set data and a users interactions with that data.
 * Each root set will check its own children set data and will iteratively call itself on it's children children.
 */
const SetRoot = ({ id, children }) => {
  const propTypes = {
    id: PropTypes.string.isRequired
  };

  const [isActive, updateActive] = useState(false);
  const [{status, message}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  /**
   * Stateful latest data for this set from our cache
   */
  const [fieldset, updateFieldSet] = useState({});
  const [subsets, updateSubSets] = useState([]);

  /**
   * Fetch the latest values of this set from the cache fragments.
   */
  const fetchSetData = (setID) => {
    const fetchset = callCache({ id: setID, target: 'fieldset', action: 'fetch' });
    const fetchmeta = callCache({ id: setID, target: 'meta', action: 'fetch' });
    return {
      ...fetchset,
      meta: {
        ...fetchmeta
      }
    };
  }

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: id, status: newStatus, message: newMessage, action: 'update'});
  }

  useLayoutEffect(
    () => {
      if ( ! loaded ) {
        switch (status) {
          case 'rendering':
            const current = fetchSetData(id);
            updateFieldSet(current);
            const subset = renderNestedSets(current);
            updateSubSets(subset);
            break;
          case 'focused':
            updateLoaded(true);
            break;
          default:
            break;
        }
      }
    },
    [status]
  );

  // Iteratively build our set heirarchy beore render.
  const renderNestedSets = (set) => {
    const settype = (set.type) ? set.type : 'fieldset';
    const view = set.meta.data.view;
    return (
      <SetGroup
        id={`${set.id}`}
        key={`${set.id}-group`}
        type={settype}
        group={'group'}
        view={set.meta.data.view}
        className={`set-group ${set.id}-group${(isActive)? ' active' : ''}`}
        onEnter={() => {updateActive(true)}}
        onExit={() => {updateActive(false)}}
      >
        <Set
          key={ set.id }
          id={ set.id }
          data={ set }
        >
          {
            set.children.map((setID) => {
              const nestedSet = fetchSetData(setID);
              const nestedChildren = renderNestedSets(nestedSet);
              return(nestedChildren);
            })
          }
        </Set>
      </SetGroup>
    );
  };

  if ( loaded ) {
    // Build a nested Set Component render tree.
    return ( subsets );
  }
  return null;
}

export default SetRoot;
