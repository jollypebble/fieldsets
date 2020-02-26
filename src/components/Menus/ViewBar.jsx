import React, { useEffect, useState, useCallback, useTransition } from 'react';
import PropTypes from 'prop-types';
import {useFocus, useController} from 'lib/fieldsets/Hooks';
import {Button} from 'react-md';

/**
 * The view bar is used to switch between different views of the application and acts as the view for the FieldSets controller, which means it will be present on all views.
 */
const ViewBar = ({ id, title }) => {
  const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
  };

  const [visible, updateVisible] = useState(false) ;
  const [classname, updateClassname] = useState('ViewBarInner');
  const [{containers}, controller] = useController();

  const [applyChange, pending] = useTransition({timeoutMs: 5000});

  const showBar = useCallback(
    () => {
      applyChange(() => {
        updateVisible(true);
      });
    },
    [visible]
  );

  const hideBar = useCallback(
    () => {
      applyChange(() => {
        updateVisible(false);
      });
    },
    [visible]
  );


  useEffect(
    () => {
      applyChange(() => {
        if (visible) {
          updateClassname('ViewBarInner visible');
        } else {
          updateClassname('ViewBarInner hidden');
        }
      });
    },
    [visible]
  );

  return (
    <div
      id={`${id}-wrapper`}
      onMouseOver={showBar}
      onMouseOut={hideBar}
      className={'interface-container'}
    >
      <div
        className={classname}
      >
        <Button flat
          onClick={() => {
            applyChange( () => {
              controller.updateContainerVisibility('econcircle-dashboard', true);
              controller.updateContainerVisibility('econcircle-app', true);
              controller.updateContainerVisibility('econcircle-balancesheet', false);
            });
            console.log(containers);
          }}
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
          onClick={() => {
            applyChange( () => {
              controller.updateContainerVisibility('econcircle-dashboard', false);
              controller.updateContainerVisibility('econcircle-app', false);
              controller.updateContainerVisibility('econcircle-balancesheet', true);
            });
          }}
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
