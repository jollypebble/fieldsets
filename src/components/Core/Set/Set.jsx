import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import {useFocus, useStatus, useClickEvents } from 'components/Core/Hooks';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import SetView from './SetView';
import SetGroup from './SetGroup';

/**
 * Sets are state data components that represent groupings of field data and a users interactions with that data.
 * Each set will check its own field set data and will iteratively call itself if there are children.
 */

const DBCLICK_DISABLED = ['offense_parent', 'defense_parent']

const Set = ({ id, data, onClick, onDoubleClick, children }) => {
  const [handleClick, handleDoubleClick] = useClickEvents(onClick, onDoubleClick);

  const [isMouseInside, updateMouseStatus] = useState(false);
  const [isVisible, updateVisibility] = useState(true);
  const [containFocus, updateCotainmentStatus] = useState(true);
  const [initialFocus, updateInitialFocus] = useState(undefined);

  const [{status, message}, updateStatus] = useStatus();
  const [focus, updateFocus] = useFocus();
  const [rendered, updateRendered] = useState(false);

  const updateElement = React.createRef();
  const updateGroupElement = React.createRef();
  const updateTextElement = React.createRef();

  let _delayedClick = undefined;
  let clickedOnce = false;

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

  useEffect( () => {
    if (updateElement && updateElement.current) {
      updateElement.current.removeEventListener('transitionend', handleTransitionEnd)
      updateElement.current.addEventListener('transitionend', handleTransitionEnd)
    }},
    [updateElement]
  );

  const isHidden = () => {
    return updateGroupElement && updateGroupElement.current && updateGroupElement.current.classList.contains('hidden');
  }

  const hasParent = () => {
    return fieldset.parent && (fieldset.parent !== '' && fieldset.parent !== 0);
  }

  // Called when the css transition ends
  const handleTransitionEnd = (e) => {
    // checks whether the transition was on a position property
    if (updateGroupElement && updateGroupElement.current && e && (e.propertyName === 'cx' || e.propertyName === 'cy')) {
      // Show/hide circles after the circle appearing animation
      if (updateGroupElement.current.classList.contains('hidden')) {
        updateGroupElement.current.classList.add('afterHidden');
      } else if (updateGroupElement.current.classList.contains('afterHidden')) {
        updateGroupElement.current.remove('afterHidden');
      }

      // Show/hide text labels after the circle appearing animation
      if (updateTextElement && updateGroupElement.current.classList.contains('shown')) {
        if (!updateTextElement.current.classList.contains('shown')) updateTextElement.current.classList.add('shown');
      } else {
        if (updateTextElement.current.classList.contains('shown')) updateTextElement.current.classList.remove('shown');
      }
    }
  }

  /**
   * Classes for handling visibility and heiarchy styles.
   */
  const getClassName = () => {
    /** "Immersion class" defines whether a set is a main (root set) or sub-set (has a parent) */
    const immersionClass = hasParent() ? 'child-set' : 'parent-set';

    /** "Shown class" exists only for those sets that are able to show up and hide (child/sub sets)  */
    const shownClass = hasParent() ? (fieldset.meta.visible ? 'shown' : 'hidden') : '';

    /** We want to hide children at the start of the app */
    const afterHiddenClass = hasParent() && shownClass === '' ? 'afterHidden' : '';

    return [`${fieldset.meta.data.setview}-group`, immersionClass, shownClass, afterHiddenClass, fieldset.meta.data.classname].join(' ');
  };

  if (rendered) {
    /**
     * If a child, grab parent data so we can pass render info to setview.
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

    const classname = getClassName();
    const setview = fieldset.meta.data.setview;

    // Don't render a group for children if empty
    const subsets = ( children && children.length ) ?
      <SetGroup
        id={`${id}-children`}
        key={`${id}-children`}
        setview={fieldset.meta.data.setview}
        className={`setview-${setview} set-children`}
      >
        {children}
      </SetGroup>
    : null;

    // Render the setview.
    return (
      <React.Fragment>
        <SetGroup
          id={`${id}-parent`}
          key={`${id}-parent`}
          setview={setview}
          className={`setview-${setview} set-parent`}
        >
          <SetView
            id={id}
            setview={setview}
            active={isMouseInside}
            variables={{
              ...fieldset.meta.data,
              name: fieldset.name,
              depth: setDepth,
              parent: parent,
              visible: isVisible,
              setview: setview
            }}
          />
        </SetGroup>
        {subsets}
      </React.Fragment>
    );
  }
  return null;
}

Set.propTypes = {
  id: PropTypes.string.isRequired
};

export default Set;
