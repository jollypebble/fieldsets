import * as SheetTypes from './SheetTypes';

const SheetType = ({sheet, name, data, options, onChange, onSave}) => {
  if (sheet) {
    // Allow lower case shape names to be passed and convert the first character to a more friendly class name.
    const sheetClassName = sheet.charAt(0).toUpperCase() + sheet.slice(1);
    return SheetTypes[sheetClassName]({sheet, name, data, options, onChange, onSave});
  }
  return;
}

export default SheetType;
