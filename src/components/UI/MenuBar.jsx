import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button } from 'react-md';
import { MenuDrawer } from 'components/UI/Drawers';

const toolbarTexts = [
  { name: 'contributions', label: 'Monthly Contribution: ' },
  { name: 'lumps', label: 'Lump Sums: ' }
];

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: 280000,
      lumps: 280000
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  renderToolbarText = () => {
    return (
      <div className="toolbarText">
        {
          toolbarTexts.map((item, index) => (
            <div key={ index } className={ item.name }>
              <label>{ item.label }</label>
              <label>
                $
                <input
                  type="text"
                  name={ item.name }
                  className="textField"
                  value={ this.state[item.name] }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  };

  render() {
    const {
      leftIconCallback,
      rightIconCallback,
    } = this.props;

    return (
      <React.Fragment>
        <Toolbar
          colored
          className="AppBarInner"
          nav={ <Button icon onClick={ leftIconCallback }>menu</Button> }
          actions={ <Button className="sync-icon" icon onClick={ rightIconCallback }>sync</Button> }
        >
          {this.renderToolbarText()}
        </Toolbar>
        <MenuDrawer
          id="contributions-menu"
          position="left"
        />
      </React.Fragment>
    );
  }
}

MenuBar.propTypes = {
  leftIconCallback: PropTypes.func,
  rightIconCallback: PropTypes.func,
};
