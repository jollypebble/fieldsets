import React, {useRef} from 'react';
import {
  TextField
} from 'react-md';

const Text = ({id, view, field, events}, ref) => {
  const fieldRef = useRef(ref);
  return (
    <React.Fragment>
      <TextField
        id={id}
        placeholder={(field && field.value) ? field.value.toString() : null }
        value={field.value}
        className="field fieldtype-default"
        {...events}
        ref={fieldRef}
      />
    </React.Fragment>
  );
}

export default Text;
