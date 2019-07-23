import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCardHeader } from 'react-md';

import { TableButton } from '../Buttons';

const TableActions = ({ name, onAddClick }) => {
  return(
    <TableCardHeader
      title={name}
    >
      <TableButton onClick={onAddClick} iconChildren="add">Add</TableButton>
    </TableCardHeader>
  );
};
export default TableActions;
