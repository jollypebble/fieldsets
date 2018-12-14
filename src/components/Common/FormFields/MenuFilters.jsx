import React from 'react';
import { MDCSwitch } from '@material/switch';

const Switch = new MDCSwitch(document.querySelector('.mdc-switch'));

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
    <Switch
      label="Offense"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Switch
      label="Defense"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Switch
      label="Short Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Switch
      label="Mid Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
    <Switch
      label="Long Term Money"
      labelPosition="right"
      defaultToggled="true"
      thumbSwitchedStyle={ styles.thumbSwitched }
      trackSwitchedStyle={ styles.trackSwitched }
    />
  </div>
);

export default MenuFilters;
