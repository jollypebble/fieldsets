/**
 * A label Sheet only displays fields that are always visible.
 */
 import React from 'react';
 import { Field } from 'lib/fieldsets';
 import { List } from 'lib/fieldsets/Field/Groups';

const LabelSheet = ({id, active, visible, fields}) => {
  const visiblefields = fields.filter( ( field ) => {
    return field.meta.data.alwaysDisplay === true;
  });
  return(
    <List
      id={id}
      active={active}
      visible={visible}
      view={'LabelField'}
      type={'labelsheet'}
      fields={visiblefields}
    />
  );
}

export default LabelSheet
