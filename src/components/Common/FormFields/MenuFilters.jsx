import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
    color: '#FFF',
  },
  toggle: {
    marginBottom: 25,
  },
  thumbSwitched: {
    backgroundColor: '#8BC34A',
  },
  trackSwitched: {
    backgroundColor: '#7CB342',
  },
};

const MenuFilters = () => (
  <div className="menufilters" style={ styles.block }>
    <Toggle
      label="Offense"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Toggle
      label="Defense"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Toggle
      label="Short Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Toggle
      label="Mid Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Toggle
      label="Long Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
  </div>
);

export default MenuFilters;
