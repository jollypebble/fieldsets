import React, {createContext, useReducer, useState, useLayoutEffect} from 'react';
import { Snackbar } from 'react-md';

// Our focus context.
export const StatusContext = createContext({});

const StatusBar = ({status: initStatus, message: initMessage, visible: initVisible}) => {
  const [status, updateStatus] = useState(initStatus);
  const [message, updateMessage] = useState(initMessage);
  const [visible, updateVisible] = useState(initVisible)
  const [messages, updateMessages] = useState([{text: message}]);

  // Our list of status where we don't show the status bar regardless of the message.
  const hiddenStatus = ['ready', 'idle', 'default', 'done'];

  useLayoutEffect(
    () => {
      if (hiddenStatus.includes(status) || '' === message ){
        updateVisible(false);
      } else {
        updateVisible(true);
      }
    },
    [status]
  );

  const setStatus = (current, call) => {
    if ( call ) {
      switch (call.action) {
        case 'dismiss':
          dismiss();
          break;
        case 'update':
        default:
          if (call.message ) {
            updateMessage(call.message);
            updateMessages([{text:call.message}]);
          }
          if (call.status) {
            updateStatus(call.status);
          }
          break;
      }
    }
    return {status, message, visible};
  }

  let style = (visible) ? {display:'flex'} : {display:'none'};

  const dismiss = () => {
    style = {display: 'none'};
    updateMessages([]);
    updateVisible(false);
    updateMessage('');
    updateStatus('done');
  }

  return (
    <StatusContext.Provider value={useReducer( setStatus, {status, message, visible} )}>
      <Snackbar
        id="app-status-bar"
        toasts={messages}
        onDismiss={dismiss}
        style={style}
      />
    </StatusContext.Provider>
  );
}
export default StatusBar
