import React, {createContext, useReducer, useState, useLayoutEffect, useDebugValue} from 'react';
import { Snackbar } from 'react-md';
import { useStatus } from 'components/Core/Hooks';

export const StatusBar = () => {
  const [status, updateStatus] = useStatus();

  let messages = [{text:''}];
  let visible = false;
  let style = (visible) ? {display:'flex'} : {display:'none'};

  const dismiss = () => {
    style = {display: 'none'};
  }

  return (
    <Snackbar
      id="app-status-bar"
      toasts={messages}
      onDismiss={dismiss}
      style={style}
    />
  );
}
