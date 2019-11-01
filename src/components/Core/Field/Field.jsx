import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import FieldView from './FieldView';
import { callCache } from 'components/Core/DataCache/reducers/datacache';
import { isPrimitive } from 'components/Core/utils';

/**
 * A field is a single data value in a set.
 */
const Field = ({ id, view = null, data, children }) => {
  const propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.string,
    data: PropTypes.array.isRequired,
    children: PropTypes.node
  };

  const [field, updateField] = useState(data);
  const [dependencies, fetchDependencies] = useState({});

  // Data will initially come in with defaults, so this implies that this field will always need to be handled in the same manner, so it can be memoized.
  const hasDependencies = useMemo( () => { return ( data.children && data.children.length ) }, [data.children] );
  const isDependency = useMemo( () => { return ( data.parent && data.parent.length ) }, [data.parent] );

  const calculateValue = (value) => {
    // Ensure our value is a primitive data type, otherwise, we will need to calculate the value on dependencies.
    if ( hasDependencies ) {
      // TODO: Calculate value base on dependencies.
    }

    // Dependcies and depenets are not mutually exclusive, so put them in separate if statements for instances where a field has both.
    if ( isDependency ) {

    }
    let updatedField = { ...field, value: value };
    if ( isPrimitive(value) ) {
      updatedField = { ...field, value: value };
    } else {
      // Loop through array of objects.
      //const calculatedValue = data.callback(data.children)
      //value.map(
      //  (dependent) => {
      //    return dependent;
      //  }
      //);
    }
    return updatedField;

  };

  const updateCache = (newvalue, event) => {
    // TODO: Validate field.
    // TODO: Calculate value base on dependencies.
    if (hasDependencies) {
      newvalue = calculateValue(newvalue);
    }

    const updatedField = {...field, value: newvalue};
    updateField(updatedField);
    // All queries are set to watch only cache data. So changes to the cache directly will prompt a refetch of the fieldset fields.
    callCache({id: id, target: 'field', action: 'update'}, updatedField);
    return updatedField;
  };

  const getFieldValue = useCallback( calculateValue(field.value), [dependencies] );

  /**
   * We don't want input field clicks to shift focus, so we stop propagation.
   */
  const handleClick = (event) => {
    const element = event.target;
    if (element && /INPUT|TEXTAREA/i.test(element.tagName)) {
      if ('selectionStart' in element) {
        element.selectionEnd = element.selectionStart;
      }
      element.blur();
    }
    //event.stopPropagation();
    return;
  }

  /**
   * We don't want input field clicks to shift focus, so we stop propagation.
   */
  const handleDoubleClick = (event) => {
    const element = event.target;
    if (/INPUT|TEXTAREA/i.test(element.tagName)) {
     element.focus();
      if (element.setSelectionRange) {
        element.setSelectionRange(0, element.value.length);
      } else {
        element.select();
      }
    }
    event.stopPropagation();
    return;
  }

  // Visually render our field
  return (
    <FieldView
      id={id}
      key={id}
      view={(view) ? view : data.type}
      field={data}
      onChange={updateCache}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </FieldView>
  );
}

export default Field;
