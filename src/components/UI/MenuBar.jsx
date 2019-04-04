import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button } from 'react-md';
import { MenuDrawer } from '../../components/UI/Drawers';

const toolbarTexts = [
  { name: 'contributions', label: 'Monthly Contribution: ' },
  { name: 'lumps', label: 'Lump Sums: ' }
];

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributions: 280000,
      lumps: 280000,
      isMouseOvered: false
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
          /*toolbarTexts.map((item, index) => (
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
          ))*/
          <div className='logo-title'>
            <label>Econ Circles</label>
          </div>
        }
      </div>
    );
  };

  componentDidMount() {
    window.addEventListener('mousemove', e => {
      if (e.clientY <= 64 && this.state.isMouseOvered !== true) {
        const target = e.target;
        if (!target || target.classList.contains('block-header-over') === false) this.setState({ isMouseOvered: true });
        return;
      }
      if (e.clientY > 64 && this.state.isMouseOvered === true) return this.setState({ isMouseOvered: false });
    })
  };

  render() {
    const {
      leftIconCallback,
      rightIconCallback,
    } = this.props;

    const isClassHidden = this.state.isMouseOvered ? 'visible' : 'hidden'

    return (
      <React.Fragment>
        <Toolbar
          colored
          className={"AppBarInner " + isClassHidden}
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
