import React, {createContext, useReducer, useState, useDebugValue} from 'react';

// Our context.
export const StatusContext = createContext({});

export const Status = ({children}) => {
  const [status, updateStatus] = useState('default');
  const [message, updateMessage] = useState('');
  const [visible, updateVisible] = useState(false)
  const [messages, updateMessages] = useState([{text: message}]);

  useDebugValue(`Status:${status}`);
  useDebugValue(`Message:${message}`);

  // Our list of status where we don't show the status bar regardless of the message.
  // The Debug value above tells you the order of the staus fires to give you an idea of the order that the components were loaded.
  const statustypes = {
    hidden: ['connected', 'ready', 'idle', 'loaded', 'default', 'done', 'complete'],
    visible: ['initializing', 'priming', 'saving'],
    nochange: ['updating', 'fetching', 'connecting']
  }

  const setStatus = (current, call) => {
    if ( call ) {
      if (call.message ) {
        updateMessage(call.message);
        updateMessages([{text:call.message}]);
      }
      if (call.status) {
        updateStatus(call.status);
      }
      if (statustypes.hidden.includes(status) || '' === message ){
        updateVisible(false);
      } else {
        updateVisible(true);
      }
    }
    return {status, message, messages, visible};
  }

  const dismiss = () => {
    updateMessages([]);
    updateVisible(false);
    updateMessage('');
    updateStatus('done');
  }

  return (
    <StatusContext.Provider value={useReducer( setStatus, {status, message, messages, visible} )}>
      {children}
    </StatusContext.Provider>
  );
}
