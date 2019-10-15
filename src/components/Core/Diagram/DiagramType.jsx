import * as DiagramTypes from 'containers/Diagrams';

const DiagramType = (props) => {
  if (props.type) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const typeClassName = props.type.charAt(0).toUpperCase() + props.type.slice(1);
    if (typeClassName in DiagramTypes ) {
      return DiagramTypes[typeClassName](props);
    }
  }

  return null;
}

export default DiagramType;
