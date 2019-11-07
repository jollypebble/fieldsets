import * as InterfaceTypes from 'containers/Interfaces';

// {id, name, type, attributes, status, fieldsets, updatefocus}
const InterfaceType = (props) => {
  if (props.type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const typeClassName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    if (typeClassName in InterfaceTypes ) {
      return InterfaceTypes[typeClassName](props);
    }
  }

  return null;
}

export default InterfaceType;
