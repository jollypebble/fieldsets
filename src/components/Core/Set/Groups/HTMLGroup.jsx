import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

const HTMLGroup = ({id, view, type = 'fieldset', group, active = false, className, events = {}, children}, ref) => {
  // This reference is use to grab information about the parent group render dimensions.
  const setRef = useRef(ref);

  useEffect(
    () => {
      if ('parent' === group) {
        const bbox = setRef.current.getBoundingClientRect();
        if ( bbox.width && bbox.height ) {
          // callCache({id: id, target: 'meta', type: type, action: 'update', filter: 'attributes'}, {width: bbox.width, height: bbox.height, viewbox: bbox});
        }
      }
    },
    []
  );

  return(
    <div
      id={`${id}`}
      className={`${className}`}
      {...events}
      ref={('parent' === group) ? setRef : null}
    >
      {children}
    </div>
  );
}
export default HTMLGroup;
