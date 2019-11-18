/**
 * A label Sheet only displays fields that are always visible.
 */
 import React from 'react';
 import { Field } from 'lib/fieldsets';

const List = ({id, active, visible, view, type = 'list', fields}) => {
  const listtype = (view) ? view : 'list';
  return(
    <ul
      id={`${id}-${type}`}
    >
      {
        fields.map((field) => {
          return(
            <li
              key={ `${field.id}-item` }
              className={`${type}-item`}
            >
              <Field
                id={ field.id }
                key={ field.id }
                view={(view) ? view : field.type}
                data={ field }
              />
            </li>
          );
        })
      }
    </ul>
  );
}

export default List
