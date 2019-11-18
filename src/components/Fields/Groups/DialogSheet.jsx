/* Other peoples code */
import React, {createContext, useReducer, useState, useEffect, useLayoutEffect} from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { getDataCacheService } from 'lib/fieldsets/DataCache/DataCacheService';
import { DialogContainer } from 'react-md';
import PropTypes from 'prop-types';

/* Our code */
import { fetchFieldSet, fetchFields, updateField } from 'lib/fieldsets/graphql/queries';
import { Field } from 'lib/fieldsets';

/**
 * Dialog Sheets are fields sets in a popup modal
 */
const DialogSheet = ({id, children}) => {
  const [visible, updateVisibility] = useState(false);
  const [sheet, updateSheet] = useState({
    id: id,
    name: '',
    containFocus: true,
    focusOnMount: true,
    initialFocus: undefined,
    activeDialog: [],
    fields: []
  });
  const [fetchDialogData, { called, loading, error, data, refetch, networkStatus, updateQuery }] = useLazyQuery(fetchFieldSet, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-only',
    client: getDataCacheService(),
    onCompleted: () => {
    }
  });

  const [fetchFieldsData, fields] = useLazyQuery(fetchFields, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-only',
    client: getDataCacheService(),
    onCompleted: () => {
    }
  });

  let {name, containFocus, focusOnMount, initialFocus, activeDialog} = sheet;

  useEffect( (previous) => {
      show();
    },
    [id]
  );

  const renderFields = () => {
    let fieldset = [];
    let order = 0;
    for (let i = 0; i < data.fetchFields.length; i++) {
      order = data.fetchFields[i].order
      fieldset[order] =
        <Field
          key={data.fetchFields[i].id}
          id={data.fetchFields[i].id}
          name={data.fetchFields[i].name}
          fieldtype={data.fetchFields[i].type}
          value={data.fetchFields[i].value}
          options={[]}
          onChange={this.handleChange}
        />
    }
    return (fieldset);
  };

  const show = () => {
    updateSheet({ ...sheet, visible: true });
  };

  const hide = () => {
    updateSheet({ ...sheet, visible: false });
  };

  const handleChange = (value, id) => {
    let { activeDialog } = sheet;
    let matchIndex = activeDialog.findIndex(item => item.id === id);

    if (matchIndex !== -1) {
      activeDialog[matchIndex].value = value;
    } else {
      activeDialog.push({
        id,
        value
      });
    }

    this.setState({ activeDialog });
  }


  const divID = `${id}-dialog`;
  const dialogID = `${id}-control-dialog`;
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div id={divID}>
      <DialogContainer
        id={dialogID}
        className="radialDialog"
        title={sheet.name}
        visible={visible}
        onHide={hide}
        actions={[{
          id: 'dialog-cancel',
          secondary: true,
          children: 'Cancel',
          onClick: () => {
            hide()
          },
        }, {
          id: 'dialog-ok',
          primary: true,
          children: 'Ok',
          onClick: () => {
            hide();
          },
        }]}
        contentClassName="md-grid"
      >
        { sheet.fields }
      </DialogContainer>
    </div >
  );
}
DialogSheet.propTypes = {
  id: PropTypes.string.isRequired
};

export default DialogSheet;
