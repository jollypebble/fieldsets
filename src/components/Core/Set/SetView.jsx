import * as Views from 'components/Sets';

const SetView = (props) => {
  if (props.setview) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const setviewClassName = props.setview.charAt(0).toUpperCase() + props.setview.slice(1);
    return Views[setviewClassName](props);
  }
  return null;
}

export default SetView;
