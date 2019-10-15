import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  DataTable,
  DialogContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  Toolbar
} from 'react-md';

import MemberSheet from 'components/Sheets/MemberSheet';

import TableActions from 'components/Sheets/Tables/TableActions';
import MemberRow from 'components/Sheets/Tables/Rows/MemberRow';

const AccountSheet = ({id, name, data, options, onChange, onSave}) => {
  const [account, setAccount] = useState(id);
  const [members, setMembers] = useState((data && data.members) ? data.members: []);

  const [dialogVisible, toggleDialog] = useState(false);

  const headers = [
    'Name',
    'DOB',
    'Role(s)'
  ];

  const saveMember = () => {
    toggleDialog(false)
    return members;
  }

  return (
    <Card tableCard={true} visible={true}>
      <TableActions
        name={'Account Members'}
        onAddClick={() => toggleDialog(true)}
      />
      <DataTable baseId="account-members">
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => <TableColumn key={header} numeric={false}>{header}</TableColumn>)}
            <TableColumn />
            <TableColumn />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map(({ id, isNew, ...member }) => (
            <MemberRow key={id} isNew={isNew} member={member} />
          ))}
        </TableBody>
      </DataTable>
      <DialogContainer
        id="add-desserts-dialog"
        aria-labelledby="add-desserts-dialog-title"
        visible={dialogVisible}
        onHide={() => toggleDialog(false)}
        fullPage
      >
        <Toolbar
          nav={<Button icon onClick={() => toggleDialog(false)}>close</Button>}
          title="Account Members"
          titleId="account-member-dialog-title"
          fixed
          colored
          actions={<Button onClick={saveMember} flat>Save</Button>}
        />
        {members.map(({ id, isNew, ...member },i) => <MemberSheet key={i} index={i} />)}
      </DialogContainer>
    </Card>
  );
}

export default AccountSheet;
