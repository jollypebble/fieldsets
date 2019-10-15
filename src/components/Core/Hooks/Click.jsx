import React from 'react';
import {usePromiseQueue} from './Promises';
import {PromiseHandler} from 'components/Core/Handlers/Promise';

export const useClickEvents = (onClick, onDoubleClick) => {
  const queue = usePromiseQueue();

  const delay = n => new Promise(resolve => setTimeout(resolve, n));

  const handleClick = () => {
    queue.clearPendingPromises();
    const waitForClick = PromiseHandler(delay(300));
    queue.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        queue.removePendingPromise(waitForClick);
        onClick();
      })
      .catch(errorInfo => {
        queue.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = () => {
    queue.clearPendingPromises();
    onDoubleClick();
  };

  return [ handleClick, handleDoubleClick ];
};
