import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import DiagramType from './DiagramType';
import { StatusBar } from 'components/Dialogs/StatusBar';
import { defaults } from 'graphql/defaults';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {
  fetchFieldSets
} from 'graphql/queries';
import {useFocus} from 'components/Core/Hooks';

/**
 * This is the generic Diagram component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Diagram = ({id, name, type, meta, isFocused = false, children}) => {
  const client = getDataCacheService();
  const [status, updateStatus] = useState('initializing');
  const [message, updateMessage] = useState(`Initializng ${name} data....`);
  const [focus, updateFocus] = useFocus();

  const [fetchDiagramData, { called, loading, error, data, refetch, networkStatus, updateQuery }] = useLazyQuery(fetchFieldSets, {
    notifyOnNetworkStatusChange: true,
    client: client,
    partialRefetch: true,
    onCompleted: () => {
      setStatus('ready');
    }
  });

  const setStatus = (newStatus = 'ready', newMessage = '') => {
    updateStatus(newStatus);
    updateMessage(newMessage);
  }

  useLayoutEffect( () => {
      if ( 'initializing' === status ) {
        const diagramData = callCache({key: id, id: type, name: name, meta: meta, target: 'diagram', action: 'initialize'});
        // If this diagram is flagged as the default, focus, add it to the root query.
        if (isFocused) {
          const center = (diagramData.meta.data.center) ? diagramData.meta.data.center : { x: 0, y: 0 };
          const zoom = (diagramData.meta.data.zoom) ? diagramData.meta.data.zoom : { scale: 1.0, x: 0, y: 0 };
          const container = { containerID: id, type: 'diagram' };
          updateFocus({ action: 'change', data: { id: 'current', focusID: id, type: 'diagram', container: container, center: center, zoom: zoom, depth: 0 }});
          getDiagramData();
        }
      }
    },
    [status]
  );

  useEffect( () => {
      //console.log(status);
      //console.log(focus);
      //console.log(called);
      //console.log(loading);
      //console.log(networkStatus);
    },
    [status]
  );

  /**
   * Merge the updated data with current diagram data.
   */
  const getDiagramData = () => {
    setStatus('updating','Updating diagram data....');
    fetchDiagramData();
  }

  /**
   * Wait for our initial data load, otherwise we won't be blocked on re-renders as the diagram renders are managed by data states and asyncrhonous updates to the data cache.
   */
  if ( 'ready' !== status ) {
    return (
      <StatusBar
        id="diagram-status-bar"
        status={status}
        message={message}
      />
    );
  }

  return (
    // TODO: Add in an underlying canvas based X,Y coordinate system which should be more performant for tracking set centers.
    <div id={id}>
      <DiagramType
        id={id}
        name={name}
        type={type}
        meta={meta}
        status={status}
        data={data}
      >
        {children}
      </DiagramType>
    </div>
  );
}

Diagram.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Diagram;
