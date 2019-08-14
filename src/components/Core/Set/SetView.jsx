import * as Views from './Views';

const SetView = ({id, setview, active, visibility, attributes, scaleFactor, gradient, onClick}) => {
  if (setview) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const setviewClassName = setview.charAt(0).toUpperCase() + setview.slice(1);
    return Views[setviewClassName]({id, active, visibility, attributes, scaleFactor, gradient, onClick});
  }
  return;
}

export default SetView;
