/**
 * A label Sheet only displays fields that are always visible.
 */
 import React from 'react';
 import { Field } from 'components/Core';

const LabelSheet = ({id, active, visible, fields}) => {
  const visiblefields = fields.filter( ( field ) => {
    return field.meta.data.alwaysDisplay === true;
  });
  return(
    <ul
      id={`${id}-labelsheet`}
    >
      {
        visiblefields.map((labelfield) => {
          return(
            <li
              key={ `${labelfield.id}-item` }
              className='labelsheet-item'
            >
              <Field
                id={ labelfield.id }
                key={ labelfield.id }
                view={'LabelField'}
                data={ labelfield }
              />
            </li>
          );
        })
      }
    </ul>
  );
}

export default LabelSheet
