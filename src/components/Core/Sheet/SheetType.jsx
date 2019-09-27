import * as SheetTypes from './SheetTypes';
import * as CustomSheetTypes from 'containers/Sheets';

const SheetType = (props) => {
  if (props.type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const typeClassName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    if ( typeClassName in CustomSheetTypes ) {
      return CustomSheetTypes[typeClassName](props);
    } else if (typeClassName in SheetTypes ) {
      return SheetTypes[typeClassName](props);
    }
  }

  return SheetTypes['Default'](props);
}

export default SheetType;
