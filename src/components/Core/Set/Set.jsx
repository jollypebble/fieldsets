import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { SetView, SetGroup } from 'components/Core';
import {useFocus, useStatus } from 'components/Core/Hooks';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

/**
 * Sets are state data components that represent groupings of field data and a users interactions with that data.
 * Each set will check its own field set data and will iteratively call itself if there are children.
 */

const Set = ({ id, data, children }) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    children: PropTypes.node
  };
  const [isActive, updateActive] = useState(false);
  const [isVisible, updateVisibility] = useState(true);

  const [{status, message}, updateStatus] = useStatus();
  const [focus, updateFocus] = useFocus();
  const [rendered, updateRendered] = useState(false);

  const setRef = useRef({});

  /**
   * Stateful latest data for this set from our cache
   */
  const [fieldset, updateFieldSet] = useState(data);

  const setStatus = (newStatus, newMessage = '') => {
    updateStatus({id: id, status: newStatus, message: newMessage, action: 'update'});
  }

  /**
   * On focus changes grab latests set cache before render.
   */
  useEffect(
    () => {
      switch (status) {
        case 'focused':
          const visible = (fieldset.meta.data.visible) ? true : false;
          updateVisibility(visible);
          updateRendered(true);
          setStatus('rendered');
          break;
        default:
          break;
      }
    },
    [status]
  );

  /**
   * After initial render, handle re-renders
   */
  useLayoutEffect(
    () => {
      switch (status) {
        case 'rendered':
          // Ensure we are always rendering if status is set.
          updateRendered(true);
          break;
        default:
          break;
      }
    },
    [status]
  );

  const hasParent = () => {
    return fieldset.parent && (fieldset.parent !== '' && fieldset.parent !== 0);
  }


  if (rendered) {
    /**
     * If a child, grab parent data so we can pass render info to view.
     */
    let setDepth = 0;
    let parent = {};
    if ( fieldset.parent.length ) {
      const parentMeta = callCache({ id: fieldset.parent, target: 'meta', action: 'fetch' });
      parent.id = fieldset.parent
      parent.depth = parentMeta.data.depth;
      parent.center = parentMeta.data.center;
      setDepth = parentMeta.data.depth + 1;
      // TODO Fix the depth updating.
      // callCache({ id: id, target: 'meta', action: 'update', filter: 'depth' }, setDepth );
    }

    const view = fieldset.meta.data.view;

    // Don't render a group for children if empty
    const subsets = ( children && children.length ) ?
      <SetGroup
        id={`${id}`}
        key={`${id}-children`}
        type={fieldset.type}
        group={'children'}
        view={fieldset.meta.data.view}
        className={`view-${view} set-children ${id}-group`}
      >
        {children}
      </SetGroup>
    : null;

    return (
      <React.Fragment>
        <SetGroup
          id={id}
          key={id}
          type={fieldset.type}
          group={'parent'}
          view={view}
          active={isActive}
          className={`view-${view} set-parent ${id}-group${(isActive)? ' active' : ''}`}
          onClick={() => {
            if ( id !== focus.focusID ) {
              updateFocus({ action: 'focus', data: { id: 'current', focusID: id, focusGroup: fieldset.parent, type: fieldset.type, center: fieldset.meta.data.center, zoom: fieldset.meta.data.zoom, depth: fieldset.meta.data.depth, expanded: false }});
            }
          }}
          onDoubleClick={() => {
            updateFocus({ action: 'expand', data: { id: 'current', focusID: id, focusGroup: fieldset.parent, type: fieldset.type, center: fieldset.meta.data.center, zoom: fieldset.meta.data.zoom, depth: fieldset.meta.data.depth, expanded: true }});
          }}
          onEnter={() => {updateActive(true)}}
          onExit={() => {updateActive(false)}}
          ref={setRef}
        >
          <SetView
            id={id}
            view={view}
            active={isActive}
            variables={{
              ...fieldset.meta.data,
              name: fieldset.name,
              depth: setDepth,
              parent: parent,
              visible: isVisible,
              view: view,
              fields: fieldset.fields
            }}
          />
        </SetGroup>
        {subsets}
      </React.Fragment>
    );
  }
  return null;
}

export default Set;
