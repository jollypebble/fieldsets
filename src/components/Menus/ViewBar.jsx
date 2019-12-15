import React, { useLayoutEffect, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, FontIcon, List, ListItem, SVGIcon } from 'react-md';

/**
 * The view bar is used to switch between different views of the application and acts as the view for the FieldSets controller, which means it will be present on all views.
 */
const ViewBar = ({ id, title }) => {
  const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
  };

  const [visible, updateVisible] = useState(false) ;
  const [classname, updateClassname] = useState('ViewBarInner')


  const toggleVisible = () => {
    if ( visible ) {
      updateVisible(false);
    } else {
      updateVisible(true);
    }
  };


  useEffect(
    () => {
      if (visible) {
        updateClassname('ViewBarInner visible');
      } else {
        updateClassname('ViewBarInner hidden');
      }
    },
    [visible]
  );

  return (
    <div
      id={`${id}-wrapper`}
      onMouseOver={toggleVisible}
      onMouseOut={toggleVisible}
    >
      <div
        className={classname}
      >
        <Button
          flat
          onClick={() => {}}
        >
          Econ System
        </Button>
        <Button flat
          onClick={() => {}}
        >
          Ret Toolbox
        </Button>
        <Button flat
          onClick={() => {}}
        >
          S.A.W.
        </Button>
        <Button flat
          onClick={() => {}}
        >
          Principle Protected
        </Button>
        <Button flat
          onClick={() => {}}
        >
          Investment Grid
        </Button>
        <Button flat
          onClick={() => {}}
        >
          Spreadsheet
        </Button>
        <Button flat
          onClick={() => {}}
        >
          Investment Team
        </Button>
      </div>
    </div>
  );
}

export default ViewBar;
