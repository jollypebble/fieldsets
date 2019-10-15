import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import DiagramType from './DiagramType';
import { defaults } from 'graphql/defaults';
import { getDataCacheService } from 'components/Core/DataCache/DataCacheService';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import {
  fetchFieldSets
} from 'graphql/queries';
import {useFocus, useStatus, useViewerDimensions} from 'components/Core/Hooks';

/**
 * This is the generic Diagram component which is used to build diagram containers.
 * This component initializes the data cache with diagram data, as well as setting up the underlying coordinate system for tracking diagram interactions.
 */
const Diagram = ({id, name, type, meta, defaultFocus = false, children}) => {
  const [{status, message}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [active, updateActive] = useState(defaultFocus);
  const [focus, updateFocus] = useFocus();
  const [fieldsets, updateFieldSets] = useState([]);
  const { height, width } = useViewerDimensions();

  const [fetchDiagramData, { called, loading, error, data }] = useLazyQuery(fetchFieldSets, {
    client: getDataCacheService(),
    variables: {data: {parent: ''}},
    awaitRefetchQueries: true
  });

  const isActive = () => {
    return id === focus.data.focus.container;
  }

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: id, status: newStatus, message: newMessage, action: 'update'});
  }

  /**
   * Query the last save of the current container and use it to initialize. Otherwise fallback on defaults defined in 'data/defaults/Diagram'
   */
  const initDiagram = async () => {
    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    try {
      await callCache({key: id, id: type, name: name, meta: meta, target: 'diagram', action: 'initialize'});
      setStatus('primed');
    } catch (error) {
      setStatus('error', `Diagram Data Priming Error: ${error}`);
    }
    return getDataCacheService();
  };

  // Wait For cache connection, and then for data to be primed to fetch results.
  useEffect(
    () => {
      if ( ! loaded ) {
        switch (status) {
          case 'connected':
            setStatus('priming', `Priming ${name} Diagram Data Cache`);
            initDiagram();
            break;
          case 'primed':
            // If this diagram is flagged as the default, focus, add it to the root query.
            if (active || isActive()) {
              const diagramMeta = callCache({id: id, target: 'meta', action: 'fetch'});
              // Set the data for this diagram;
              const center = (diagramMeta.data.center) ? diagramMeta.data.center : { x: width/2, y: height/2 };
              const zoom = (diagramMeta.data.zoom) ? diagramMeta.data.zoom : { scale: 1.0, x: 1, y: 1 };
              const container = { containerID: id, type: diagramMeta.type };
              updateFocus({ action: 'refocus', data: { id: 'current', focusID: id, type: diagramMeta.type, container: container, center: center, zoom: zoom, depth: 0 }});
            }
            break;
          default:
            break;
        }
      }
    },
    [status]
  );

  /**
   * Fieldsets contain default information and relationships about the current container.
   * The only time the fieldset data changes is on changing containers.
   */
  useEffect(
    () => {
      if ('loaded' === status) {
        if ( ! loaded && fieldsets && fieldsets.length ) {
          updateLoaded(true);
        } else {
          updateLoaded(false);
        }
      }
    },
    [fieldsets]
  );

  /**
   * Watch for container changes.
   */
  useEffect(
    () => {
      if ( ! loaded ) {
        if ( focus.container.containerID === id && 'diagram' === focus.container.type) {
          if ( ! called && 0 === fieldsets.length ) {
            fetchDiagramData();
          }
        }
      }
    },
    [focus.container.containerID]
  );

  /**
   * Waiting for data to return
   */
   useEffect(
     () => {
       if (data && data.fetchFieldSets.length) {
         setStatus('loaded');
         updateFieldSets(data.fetchFieldSets);
       }
     },
     [data]
   );

  if (loaded) {
    return (
      // TODO: Add in an underlying canvas based X,Y coordinate system which should be more performant for tracking set centers.
      <div id={id}>
        <DiagramType
          id={id}
          name={name}
          type={type}
          data={fieldsets}
          meta={callCache({id: id, target: 'meta', action: 'fetch'})}
        >
          {children}
        </DiagramType>
      </div>
    );
  }
  return null;
}

Diagram.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired
};

export default Diagram;
