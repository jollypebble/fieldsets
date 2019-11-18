import React, { useEffect, useMemo, useCallback, useState, useRef, forwardRef } from 'react';
import * as Groups from './Groups';
import * as CustomGroups from 'components/Sets/Groups';
import { useInputEvents, useClickEvents } from 'lib/fieldsets/Hooks';
import { callCache } from 'lib/fieldsets/DataCache/reducers/datacache';

const SetGroup = (props, ref) => {
  const {id, view, type, group = 'group'} = {...props}
  const cacheKey = {
    id: id,
    target: 'meta',
    type: type,
    filter: 'attributes'
  };

  const [attributes, updateAttributes] = useState( () => {
    return callCache({...cacheKey, action: 'fetch'});
  });
  const [handleOnChange] = useInputEvents(props.onChange);
  const [handleClick, handleDoubleClick] = useClickEvents(props.onClick, props.onDoubleClick);
  const setRef = useRef(ref);

  let events = {};
  if ( props.onClick || props.onDoubleClick ) {
    events.onClick = handleClick;
    events.onDoubleClick = handleDoubleClick;
  }

  if (props.onEnter && props.onExit) {
    events.onPointerEnter = props.onEnter;
    events.onPointerLeave = props.onExit;
  }

  // Set the viewbox after the render for next load.
  useEffect(
    () => {
      if (setRef.current) {
        if ('parent' === group) {
          const vb = getGroupViewBox();
          if (vb.width > 0 && vb.height > 0) {
            const newAttributes = callCache({...cacheKey, action: 'update'}, { width: vb.width, height: vb.height, viewbox: {...vb} });
            updateAttributes({...newAttributes});
          }
        } else if ('children' === group) {
          const groupCenter = getGroupCenter();
          const newAttributes = callCache({...cacheKey, action: 'update'}, { group: { ...groupCenter } });
          updateAttributes({...newAttributes});
        }
      }
    },
    [setRef.current]
  );

  const getBoundingBox = useCallback(
    () => {
      if ('group' !== group ) {
        const bbox = setRef.current.getBBox();
        return { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height, __typename: 'JSONObject' };
      }
    },
    [setRef.current]
  );

  const getGroupViewBox = useCallback(
    () => {
      if (attributes && attributes.viewbox) {
        return attributes.viewbox;
      }

      const bbox = getBoundingBox();

      if (bbox && bbox.width && bbox.height) {
        const vb = { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height, __typename: 'JSONObject' };
        return {...vb};
      }
    }, [setRef.current]
  );

  const getGroupCenter = useCallback(
    () => {
      if (attributes && attributes.group && attributes.group.center) {
        return attributes.group.center;
      }

      const bbox = getBoundingBox();

      if (bbox && bbox.width && bbox.height) {
        const rx = bbox.width / 2;
        const ry = bbox.height / 2;
        const cx = bbox.x + rx;
        const cy = bbox.y + ry;
        const center = {
          x: cx,
          y: cy,
          __typename: 'Center'
        };
        return { width: bbox.width, height: bbox.height, radiusX: rx, radiusY: ry, center: {...center}, __typename: 'JSONObject' };
      }
    }, [setRef.current]
  );

  if (props.view) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const setgroupClassName = props.view.charAt(0).toUpperCase() + props.view.slice(1);
    if ( setgroupClassName in CustomGroups ) {
      return CustomGroups[setgroupClassName]({...props, events}, setRef);
    } else if ( setgroupClassName in Groups ) {
      return Groups[setgroupClassName]({...props, events}, setRef);
    }
  }

  return Groups['Default']({...props, events},setRef);
}

export default forwardRef(SetGroup);
