import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import _ from 'lodash';
import { updateCurrentFocus } from '../../graphql';
import Shape from './Shape';
import Label from './Label';

/**
 * Sets are state data components that represent groupings of field data and a users interactions with that data.
 * Each set will check its own field set data and will iteratively call itself if there are children.
 */

const DBCLICK_DISABLED = ['offense_parent', 'defense_parent']

class Set extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseInside: false,
      visible: this.props.visible,
      containFocus: true,
      initialFocus: undefined
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSingleClick = this.handleSingleClick.bind(this);
    this.doAction = this.doAction.bind(this);

    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);

    this.updateElement = React.createRef();
    this.updateGroupElement = React.createRef();
    this.updateTextElement = React.createRef();
  }

  componentDidMount() {
    this.updateSetData();
    if (this.updateElement && this.updateElement.current) {
      this.updateElement.current.removeEventListener('transitionend', this.handleTransitionEnd)
      this.updateElement.current.addEventListener('transitionend', this.handleTransitionEnd)
    }
  }

  componentDidUpdate(prevProps) {
    // here we want to hide all sets down the tree if their parent is hidden
    if (!this.props.visible && this.state.visible) this.setState({ visible: false });
  }

  isHidden() {
    return this.updateGroupElement && this.updateGroupElement.current && this.updateGroupElement.current.classList.contains('hidden');
  }

  hasParent = () => {
    return this.props && this.props.parent !== '';
  }

  // Called when the css transition ends
  handleTransitionEnd(e) {
    // checks whether the transition was on a position property
    if (this.updateGroupElement && this.updateGroupElement.current && e && (e.propertyName === 'cx' || e.propertyName === 'cy')) {
      // Show/hide circles after the circle appearing animation
      if (this.updateGroupElement.current.classList.contains('hidden')) {
        this.updateGroupElement.current.classList.add('afterHidden');
      } else if (this.updateGroupElement.current.classList.contains('afterHidden')) {
        this.updateGroupElement.current.remove('afterHidden');
      }

      // Show/hide text labels after the circle appearing animation
      if (this.updateTextElement && this.updateGroupElement.current.classList.contains('shown')) {
        if (!this.updateTextElement.current.classList.contains('shown')) this.updateTextElement.current.classList.add('shown');
      } else {
        if (this.updateTextElement.current.classList.contains('shown')) this.updateTextElement.current.classList.remove('shown');
      }
    }
  }

  /** Is called when the cursor acrosses borders of the radial set getting inside of it */
  handleMouseEnter() {
    this.setState({ isMouseInside: true });
  }

  /** Is called when the cursor acrosses borders of the radial set getting out of it */
  handleMouseLeave() {
    this.setState({ isMouseInside: false });
  }

  handleClick(e) {
    if (!this._delayedClick) {
      this._delayedClick = _.debounce(this.handleSingleClick, 250);
    }
    if (this.clickedOnce) {
      this._delayedClick.cancel();
      this.clickedOnce = false;
      this.doAction();
    } else {
      this._delayedClick(e);
      this.clickedOnce = true;
    }
  }

  handleSingleClick() {
    const { setID, centerX, centerY } = this.props;

    this.clickedOnce = undefined;
    this.props.updateFocus(setID, centerX, centerY);
  }

  doAction = () => {
    const { setID } = this.props;
    if (DBCLICK_DISABLED.includes(setID)) return;
    this.props.onDoubleClick(setID);
  }

  handleTargetChange = (value) => {
    this.setState({ initialFocus: value ? `#${value}` : undefined });
  };

  handleFocusChange = (checked) => {
    this.setState({ containFocus: checked });
  };

  updateSetData() {
    // TODO GET BOUNDING BOX HERE:

    // Emulate Circle Appollo Data Type in `graphql/typeDefs.js`
    const setdata = {
      id: this.props.setID,
      name: this.props.name,
      fields: this.props.fields,
      parent: this.props.parent,
      centerX: this.props.centerX,
      centerY: this.props.centerY,
      shape: this.props.shape
    };

    let updatedSetList = this.props.sets;
    updatedSetList[this.props.setID] = setdata;

    this.props.updateSetState(updatedSetList); // Sets the top level Diagram set array.
    return this.state.sets;
  }

  render() {
    const id = this.props.setID;

    let { name, centerX, centerY, setData, parentCenterX, parentCenterY, display } = this.props;

    let parentSet = '';

    if (typeof(this.props.setData) !== undefined && this.props.setData.length > 0) {
      parentSet =
      <g id={ this.props.setID ? `${this.props.setID}-children` : '' }>
        { setData.map(data => {

          return (
            <Set
              key={ data.id }
              setData={ typeof(data.children) === undefined ? [] : data.children }
              setID={ data.id }
              {...data}

              parentInstance={ this }
              parentCenterX={ centerX }
              parentCenterY={ centerY }

              updateFocus={ this.props.updateFocus }
              resetFocus={ this.props.resetFocus }
              onDoubleClick={ this.props.onDoubleClick }
              updateSetState={ this.props.updateSetState }
              sets={ this.props.sets }
              radius={ this.props.radius }
              scaleFactor={ this.props.scaleFactor * 0.6 }
              visible={true}
            />
          );
        }) }
      </g>;
    }

    /** "Immersion class" defines whether a set is a main (root set) or sub-set (has a parent) */
    const immersionClass = this.hasParent() ? 'child-set' : 'parent-set';

    /** "Shown class" exists only for those sets that are able to show up and hide (child/sub sets)  */
    const shownClass = this.hasParent() ? (this.props.visible ? 'shown' : 'hidden') : '';

    /** We want to hide children at the start of the app */
    const afterHiddenClass = this.hasParent() && shownClass === '' ? 'afterHidden' : '';

    // Child Set
    return (
      <Mutation mutation={updateCurrentFocus} variables={{ id, centerX, centerY }} onCompleted={this.handleClick} awaitRefetchQueries={true}>
        {setFocus => {
          return (
            <g
              id={ this.props.setID ? `${this.props.setID}-group` : '' }
              className='radial-group'
              ref={this.updateGroupElement}
            >
              <g
                id={`${this.props.setID}-circle`}
                className={'circle-group ' + immersionClass + ' ' + shownClass + ' ' + afterHiddenClass}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <Shape
                  id={id}
                  shape={display.shape}
                  active={this.state.isMouseInside}
                  visibility={shownClass}
                  onClick={setFocus}
                  onDoubleClick={this.doAction}
                  attributes={{
                    centerX,
                    centerY,
                    parentCenterX,
                    parentCenterY,
                    ...display.attributes
                  }}
                  scaleFactor={ this.props.scaleFactor * 0.6 }
                />
                <React.Fragment>
                  <Label
                    {...this.props}
                    name={name}
                    centerX={centerX}
                    centerY={centerY}
                    onClick={setFocus}
                    hasParent={ this.hasParent() }
                    updateTextElement={ this.updateTextElement }
                  />
                </React.Fragment>

              </g>
              {parentSet}
            </g>
          );
        }}
      </Mutation>
    );
  }
}

Set.propTypes = {
  setID: PropTypes.string.isRequired,
  setData: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  centerX: PropTypes.node.isRequired,
  centerY: PropTypes.node.isRequired
};

export default Set;
