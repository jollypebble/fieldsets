import React, { useState, useEffect } from 'react';
import { Snackbar } from 'react-md';

export const StatusBar = ({id, status, message}) => {
  let toasts = [{text: message}];
  useEffect(
    () => {
      if ('ready' === status) {
        dismiss();
      }
    }
  );
  const dismiss = () => {
    toasts = [];
  }
  if ( 'ready' !== status && message !== '') {
    return (
      <Snackbar
        id={id}
        toasts={toasts}
        autohide={false}
        onDismiss={dismiss}
      />
    );
  }
  return null;
};
