import * as Shapes from './Shapes';

const Shape = ({id, shape, active, visibility, attributes}) => {
  // Allow lower case shape names to be passed and convert the first character to a more friendly class name.
  const shapeClassName = shape.charAt(0).toUpperCase() + shape.slice(1);
  return Shapes[shapeClassName]({id, active, visibility, attributes});
}

export default Shape;
