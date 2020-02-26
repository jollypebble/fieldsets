import React, { useLayoutEffect, useEffect, useState, useCallback, useTransition } from 'react';
import Spreadsheet from 'react-spreadsheet';
import { Set } from 'lib/fieldsets';
import {useFocus, useStatus, useViewerDimensions, useClickEvents} from 'lib/fieldsets/Hooks';
import { Fetch } from 'lib/fieldsets/DataCache/calls';

/**
 * A Handsontable Spreadsheet for our balance sheet.
 */
const BalanceSheet =  ({ id, name, view, visible = false, meta: metaInit, data = [] }) => {
  const [{stage, status, message, complete}, updateStatus, lifecycle] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const { height, width } = useViewerDimensions();
  const [applyChange, pending] = useTransition({timeoutMs: 5000});

  const [meta, updateMeta] = useState(metaInit);

  /**
   * A helper function to set the dialog and the focus concurrently..
   */
  const changeFocus = (newfocus) => {
    const focusmeta = Fetch({id: newfocus.focusID, target: 'meta', filter: 'data'});
    newfocus.center = focusmeta.center;
    newfocus.zoom = focusmeta.zoom;
    updateFocus({action: 'focus', data: newfocus});
  }

  /**
   * Use our status to determine our render state.
   */
  useEffect(
    () => {
      applyChange( () => {
        if ( ! loaded && 'render' === stage ) {
          switch (status) {
            case 'rendering':
            case 'initializing':
              let sheetMeta = Fetch({id: id, target: 'meta'});
              // Alters the meta data based on current viewport width and sets diagram units based on that.
              if (sheetMeta.data.attributes) {
                sheetMeta.data.attributes.width = width;
                sheetMeta.data.attributes.height = height;
              }
              updateMeta({...sheetMeta.data});
              updateLoaded(true);
              break;
            default:
              break;
          }
        }
      });
    },
    [status, stage]
  );

  /**
   * Once loaded, swap our focus.
   */
  useLayoutEffect(
    () => {
      switch (status) {
        case 'rendering':
          // Set our default focus.
          if (meta.focus) {
            changeFocus(meta.focus);
          }
          break;
        default:
          break;
      }
    },
    [loaded]
  );

  const onClick = () => {

  }

  const onDoubleClick = () => {

  }

  // Our hook for registering clicks and double clicks separately.
  const [handleClick, handleDoubleClick] = useClickEvents(onClick, onDoubleClick);

  if ( loaded && visible ) {
    const data = [
      [ { value: 'First' }, { value: 'Second' } ],
      [ ( { value: 'Third' }, { value: 'Fourth' } ) ],
      [ { value: 'Fifth' }, { value: 'Sixth' } ],
    ];
    return (
      <div className="viewer">
        <Spreadsheet data={data} />
      </div>
    );
  }
  return null;
}
export default BalanceSheet;
