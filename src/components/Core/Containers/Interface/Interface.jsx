import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InterfaceType from './InterfaceType';
import { defaults } from 'graphql/defaults';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * This is the generic Interface component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Interface = ({id, name, type, attributes, children}) => {
  const [status, updateStatus] = useState('initializing');
  const [data, updateData] = useState({
    id: id,
    fields: {},
    sets: {},
    meta: {}
  });

  /**
   * Certain applications will have data that varies per account.
   * Accounts are a unique fieldset in that their children members may be assigned as owners of other fieldset snapshots.
   * This interface component allows for loading of an owner account and it members here.
   */

  useEffect( () => {
      if ( 'initializing' === status ) {
        const initData = callCache({key: id, id: type, target: 'interface', action: 'initialize'});
        updateInterfaceData(initData);
      }
      updateStatus('ready');
    },
    [status]
  );

  /**
   * Merge the updated data with current diagram data.
   */
  const updateInterfaceData = (newData) => {
    updateStatus('update');
    updateData( prevData => {
      return {
          ...prevData,
          ...newData
      }
    });
  }

  /**
   * Wait for our initial data load, otherwise we won't be blocked on re-renders as the diagram renders are managed by data states and asyncrhonous updates to the data cache.
   */
  if ( 'ready' !== status ) {
    // TODO: Add in nicer animation for initializating.
    return <div>Loading....</div>;
  }

  return (
    <div id={id}>
      <InterfaceType
        id={id}
        name={name}
        type={type}
        attributes={attributes}
        status={status}
        data={data}
        updateData={updateInterfaceData}
      >
        {children}
      </InterfaceType>
    </div>
  );
}

Interface.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Interface;
