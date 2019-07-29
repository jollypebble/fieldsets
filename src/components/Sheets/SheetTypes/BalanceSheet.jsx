import React, { useState } from 'react';
import {
  TextField,
  FontIcon,
  Divider,
  Button,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Card
} from 'react-md';

const BalanceSheet = ({id, name, data, options, onChange, onSave}) => {
  const [account, setAccount] = useState({});
  const [clients, setClients] = useState((data && data.clients) ? data.clients: []);
  const [dependents, setDependents] = useState((data && data.dependents) ? data.dependents: []);
  const [custodians, setCustodians] = useState((data && data.custodians) ? data.custodians: []);

  const renderAccountInfo = (accountdata) => {
    return accountdata.map((item, index) => (
      <div key={ index } className="account-sheet account-sheet-members">
        <TextField
          id={ item }
          label={`Full Name`}
          value={ item }
        />
        <FontIcon onClick={{}}>remove</FontIcon>
      </div>
    ));
  };

  return (
    <div className="drawer-sheet clientSheetContainer">
      <div className="form-group">
        <div className="dependency-panel">
          <h5 className="dependency-title">
            Primary Members
            <FontIcon>add</FontIcon>
          </h5>
          { renderAccountInfo(clients) }
        </div>
        <Divider />
        <div className="dependency-panel">
          <h5 className="dependency-title">
            Dependents
            <FontIcon>add</FontIcon>
          </h5>
          { renderAccountInfo(dependents) }
        </div>
        <Divider />

        <div className="add-btn">
          <Button raised>Save</Button>
        </div>
      </div>
      <Card className="client-table">
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Account Name</TableColumn>
              <TableColumn>Client Name</TableColumn>
              <TableColumn>CPA Name</TableColumn>
              <TableColumn>ATTY Name</TableColumn>
              <TableColumn>IP</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </DataTable>
        <p>No data</p>
      </Card>
    </div>
  );
};

export default BalanceSheet;
