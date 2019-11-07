import React from 'react';
import { Button } from 'react-md';

const TableButton = ({ children, ...props }) => (
  <Button
    icon={true}
    tooltipLabel={(children && children.length) ? children : null}
    {...props}
  >
    {(children && children.length) ? children : null}
  </Button>
);

export default TableButton;
