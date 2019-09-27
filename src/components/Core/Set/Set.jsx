import React, { useEffect, useState, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {useFocus} from 'components/Core/Hooks';
import SetView from './SetView';
import Label from './Label';

/**
 * Sets are state data components that represent groupings of field data and a users interactions with that data.
 * Each set will check its own field set data and will iteratively call itself if there are children.
 */

const DBCLICK_DISABLED = ['offense_parent', 'defense_parent']

const Set = ({ setID, setData, name, center, type, visible, parent = '', setview, fields, sets, meta, onDoubleClick, resetFocus, parentCenter, scaleFactor, radius, updateSetState }) => {

  const [isMouseInside, updateMouseStatus] = useState(false);
  const [isVisible, updateVisibility] = useState(visible);
  const [containFocus, updateCotainmentStatus] = useState(true);
  const [initialFocus, updateInitialFocus] = useState(undefined);
  const [focus, updateFocus] = useFocus();

  const updateElement = React.createRef();
  const updateGroupElement = React.createRef();
  const updateTextElement = React.createRef();

  let _delayedClick = undefined;
  let clickedOnce = false;

  const refocus = ({ id, center }) => {
      focus = {
        ...focus,
        target: id,
        type: type,
        center: center
      }
      updateFocus({action: 'refocus', data: focus});
  };


  useEffect( () => {
    updateSetData();
    if (updateElement && updateElement.current) {
      updateElement.current.removeEventListener('transitionend', handleTransitionEnd)
      updateElement.current.addEventListener('transitionend', handleTransitionEnd)
    }},
    [updateElement]
  );

  useEffect( () => {
      if (!visible && isVisible) updateVisibility(false);
    },
    [updateElement]
  );

  const isHidden = () => {
    return updateGroupElement && updateGroupElement.current && updateGroupElement.current.classList.contains('hidden');
  }

  const hasParent = () => {
    return parent && parent !== '';
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

  /** Is called when the cursor acrosses borders of the radial set getting inside of it */
  const handleMouseEnter = () => {
    updateMouseStatus(true);
  }

  /** Is called when the cursor acrosses borders of the radial set getting out of it */
  const handleMouseLeave = () => {
    updateMouseStatus(false);
  }

  const handleClick = (e) => {
    if (!_delayedClick) {
      _delayedClick = _.debounce(handleSingleClick, 250);
    }
    if (clickedOnce) {
      _delayedClick.cancel();
      clickedOnce = false;
      doAction();
    } else {
      _delayedClick(e);
      clickedOnce = true;
    }
  }

  const handleSingleClick = () => {
    clickedOnce = undefined;
    updateFocus(setID, center.x, center.y);
  }

  const doAction = () => {
    if (DBCLICK_DISABLED.includes(setID)) return;
    onDoubleClick(setID);
  }

  const handleTargetChange = (value) => {
    updateInitialFocus( (value) ? `#${value}` : undefined );
  };

  const handleFocusChange = (checked) => {
    updateCotainmentStatus(checked);
  };

  const updateSetData = () => {
    // TODO GET BOUNDING BOX HERE:

    // Emulate Circle Appollo Data Type in `graphql/typeDefs.js`
    const setdata = {
      id: setID,
      name: name,
      fields: fields,
      parent: parent,
      center: center,
      setview: setview
    };

    let updatedSubSet = sets;
    updatedSubSet[setID] = setdata;

    updateSetState(updatedSubSet); // Sets the top level Diagram set array.
    return sets;
  }


  const id = setID;
  let parentSet = '';

  if (typeof(setData) !== undefined && setData.length > 0) {
    parentSet =
    <g id={ setID ? `${setID}-children` : '' }>
      { setData.map(data => {

        return (
          <Set
            key={ data.id }
            setData={ typeof(data.children) === undefined ? [] : data.children }
            setID={ data.id }
            {...data}

            parentInstance={ this }
            parentCenter={ center }

            updateFocus={ updateFocus }
            resetFocus={ resetFocus }
            onDoubleClick={ onDoubleClick }
            updateSetState={ updateSetState }
            sets={ sets }
            radius={ radius }
            scaleFactor={ scaleFactor * 0.6 }
            visible={true}
          />
        );
      }) }
    </g>;
  }

  /** "Immersion class" defines whether a set is a main (root set) or sub-set (has a parent) */
  const immersionClass = hasParent() ? 'child-set' : 'parent-set';

  /** "Shown class" exists only for those sets that are able to show up and hide (child/sub sets)  */
  const shownClass = hasParent() ? (visible ? 'shown' : 'hidden') : '';

  /** We want to hide children at the start of the app */
  const afterHiddenClass = hasParent() && shownClass === '' ? 'afterHidden' : '';

  // Child Set
  return (
    <g
      id={ setID ? `${setID}-group` : '' }
      className='radial-group'
      ref={updateGroupElement}
    >
      <g
        id={`${setID}-circle`}
        className={'circle-group ' + immersionClass + ' ' + shownClass + ' ' + afterHiddenClass}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SetView
          id={id}
          setview={meta.data.setview}
          active={isMouseInside}
          visibility={shownClass}
          onClick={updateFocus}
          onDoubleClick={doAction}
          meta={{
            ...meta.data,
            parentCenter: parentCenter,
            center: center,
            attributes: { ...meta.data.attributes }
          }}
          scaleFactor={ scaleFactor * 0.6 }
        />
        <React.Fragment>
          <Label
            name={name}
            center={center}
            onClick={updateFocus}
            hasParent={ hasParent }
            updateTextElement={ updateTextElement }
          />
        </React.Fragment>

      </g>
      {parentSet}
    </g>
  );
}

Set.propTypes = {
  setID: PropTypes.string.isRequired,
  setData: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default Set;
