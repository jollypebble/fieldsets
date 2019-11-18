import React, {createContext, useState, useEffect} from 'react';

export const StatusContext = createContext([]);
/**
 * Our status handler component tracks the runtime lifecycle of an application and allows us to run side effects. There are are series of stages within the fieldsets application lifecycle.
 * Status can be reused between stages, but make sure you are checking both status and stage when firing off any custom effects.
 */

export const Status = (props) => {
  const [lifecycle, updateLifecycle] = useState({[props.stage]: {stage: props.stage, complete: false}});
  const [status, updateStatus] = useState({stage: props.stage, status: props.status, message: props.message});

  const setStatus = (newStatus, newMessage = '', newStage = false) => {
    if ( ! newStage ) {
      newStage = status.stage;
    }

    // Check if lifecyle is complete.
    if (newStage !== status.stage) {
      updateLifecycle({
        ...lifecycle,
        [status.stage]: {stage: status.stage, complete: true},
        [newStage]: {stage: newStage, complete: false}
      });
    }

    const current = {stage: newStage, status: newStatus, message: newMessage};
    updateStatus(current);
    return current;
  }

  /**
   * For debugging, uncomment this hook which fires on every render.
   * This is a good way to tell what the status and stage is of the current application and can help with debugging.
   */
  /*
  useEffect(
    () => {
      console.log(lifecycle);
      console.log(status);
    },
    [status]
  );
  */

  return (
    <StatusContext.Provider value={[status, setStatus, lifecycle]}>
      {props.children}
    </StatusContext.Provider>
  );
}
