import * as FieldTypes from './FieldTypes';
import * as CustomFieldTypes from 'components/Fields';

const FieldType = (props) => {
  if (props.fieldtype) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const fieldtypeClassName = props.fieldtype.charAt(0).toUpperCase() + props.fieldtype.slice(1);
    if ( fieldtypeClassName in CustomFieldTypes ) {
      return CustomFieldTypes[fieldtypeClassName](props);
    } else if (fieldtypeClassName in FieldTypes ) {
      return FieldTypes[fieldtypeClassName](props);
    }
  }

  return FieldTypes['Default'](props);
}

export default FieldType;
