import React, { useLayoutEffect, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { SetRoot } from 'lib/fieldsets';
import {useFocus, useStatus, useViewerDimensions, useClickEvents} from 'lib/fieldsets/Hooks';
import { Fetch } from 'lib/fieldsets/DataCache/calls';

/**
 * A Handsontable Spreadsheet for our balance sheet.
 */
const BalanceSheet =  ({ id, name, type, meta: metaInit, data = [] }) => {
  const [{stage, status, message}, updateStatus] = useStatus();
  const [loaded, updateLoaded] = useState(false);
  const [focus, updateFocus] = useFocus();
  const { height, width } = useViewerDimensions();

  const [dialog, updateDialog] = useState({
    id: focus.focusID
  });

  const [meta, updateMeta] = useState(metaInit);
  let Viewer = null;

  /**
   * A helper function to set the dialog and the focus concurrently..
   */
  const changeFocus = (newfocus) => {
    const focusmeta = Fetch({id: newfocus.focusID, target: 'meta', filter: 'data'});
    newfocus.center = focusmeta.center;
    newfocus.zoom = focusmeta.zoom;
    updateFocus({action: 'focus', data: newfocus});
  }

  const setSheetMeta = (metadata) => {
    // Update our diagram meta to include some calculated units and use the most recent viewport dimenions.
    let attributes = metadata.attributes;

    // Set our height based on the current veiwport.
    attributes.width = width;
    attributes.height = height;

    metadata.attributes = attributes;
    updateMeta(metadata);
  }

  /**
   * Use our status to determine our render state.
   */
  useLayoutEffect(
    () => {
      if ( ! loaded ) {
        switch (status) {
          case 'rendering':
            //let sheetmeta = Fetch({id: id, target: 'meta'});
            //setSheetMeta(sheetmeta.data);
            updateLoaded(true);
            break;
          default:
            break;
        }
      }
    },
    [status]
  );

  const onClick = () => {

  }

  const onDoubleClick = () => {

  }

  // Our hook for registering clicks and double clicks separately.
  const [handleClick, handleDoubleClick] = useClickEvents(onClick, onDoubleClick);

  if ( loaded ) {
    const tempdata = [
      ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ];

    return (
      <div className="viewer">
        <HotTable licenseKey="non-commercial-and-evaluation" data={tempdata} colHeaders={true} rowHeaders={true} width="600" height="300" />
      </div>
    )
  }
  return null;
}
export default BalanceSheet;
