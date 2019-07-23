import * as FieldTypes from './FieldTypes';

const FieldType = ({id, name, value, fieldtype, account, member, options, onChange}) => {
  if (fieldtype) {
    // Allow lower case shape names to be passed and convert the first character to a more friendly class name.
    const fieldtypeClassName = fieldtype.charAt(0).toUpperCase() + fieldtype.slice(1);
    return FieldTypes[fieldtypeClassName]({id, name, value, options, onChange});
  }

  return FieldTypes["Default"]({id, name, value, account, member, options, onChange});
}

export default FieldType;
