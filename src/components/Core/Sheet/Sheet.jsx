import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SheetType from './SheetType';
import { callCache } from 'components/Core/DataCache/reducers/datacache';

export const Sheet = ({id, type, name, options, children}) => {
  const [status, updateStatus] = useState('initializing');
  const [data, updateData] = useState({
    id: id,
    fields: {},
    sets: {},
    meta: {}
  });

  const onChange = () => {

  }

  const onSave = () => {

  }

  return (
    <SheetType
      id={id}
      type={type}
      data={data}
      onChange={onChange}
      onSave={onSave}
      options={options}
    >
      {children}
    </SheetType>
  );
}

Sheet.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  data: PropTypes.array
};

export default Sheet;
