import React, {createContext, useReducer, useState, useRef} from 'react';
import { useClickEvents } from 'components/Core/Hooks/Click';

// Our context.
export const EventContext = createContext({});

export const EventHandler = (props) => {
  const [handleClick, handleDoubleClick] = useClickEvents(props.onClick, props.onDoubleClick);
  // TODO: Add hover, press, touch, pinch

  return (
    <EventContext.Provider onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {props.children}
    </EventContext.Provider>
  );
};
