import * as Groups from 'components/Sets/Groups';

const SetGroup = (props) => {
  if (props.setview) {
    // Allow lower case names to be passed and convert the first character to a more friendly class name.
    const setgroupClassName = props.setview.charAt(0).toUpperCase() + props.setview.slice(1);
    return Groups[setgroupClassName](props);
  }
  return null;
}

export default SetGroup;
