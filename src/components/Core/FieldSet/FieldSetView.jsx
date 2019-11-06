import * as FieldSetViews from './Views';
import * as CustomFieldSetViews from 'components/FieldSets';

const FieldSetView = (props) => {
  if (props.type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const typeClassName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    if ( typeClassName in CustomFieldSetViews ) {
      return CustomFieldSetViews[typeClassName](props);
    } else if (typeClassName in FieldSetViews ) {
      return FieldSetViews[typeClassName](props);
    }
  }

  return FieldSetViews['Default'](props);
}

export default FieldSetView;
