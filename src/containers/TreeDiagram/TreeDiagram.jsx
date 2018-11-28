import React, { Component } from 'react';
// import Tree from 'react-d3-tree';
// import { Row, Col } from 'react-flexbox-grid';
import { treeData } from 'config';
// import d3 from 'd3';

// partials
import TreeNode from './Partials/TreeNode';

class TreeDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      nodeData: treeData,
      showChildren: true,
      width: '100%',
      height: '100vh'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getToCenter();
    }, 10);
  }

  getToCenter = () => {
    document.documentElement.scrollLeft = (document.body.scrollWidth - document.body.clientWidth) / 2;
  }

  showChildren = (e) => {
    this.setState(state => ({
      isVisible: !state.isVisible
    }));
    e.preventDefault();
  }

  handleCollapse = () => {
    this.setState({
      showChildren: !this.state.showChildren
    }, () => {
      this.getToCenter();
    });
  }

  render() {
    const {
      nodeData,
      showChildren,
      width,
      height
    } = this.state;

    return (
      <div style={ { height: height, width: width } }>
        <div className="tree">
          <svg
            id="treesvg"
            height={ height }
            width={ width }
            viewBox="0 0 508.00001 285.74999"
          >
            { nodeData.map(data => (
              <TreeNode
                key={ data.id }
                nodeData={ data.children !== 'undefined' ? data.children : [] }
                nodeID={ data.id }
                showChildren={ showChildren }
                position={ data.positionPath }
              />
            )) }
          </svg>
        </div>
      </div>
    );
  }
}

export default TreeDiagram;

/*
<path
  d="m 233.7684,75.226549 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.351896 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438622 z"
  id="defense"
  className="defense parent"
>
  <title
    id="defense-title"
  >
    Defense
  </title>
</path>
<path
  d="m 153.67509,45.215257 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438623 z"
  id="path4526-79"
  className="defense child"
/>
<path
  d="m 203.41685,22.99024 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.963535 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438622 z"
  id="path4526-20"
  className="defense child"
/>
<path
  d="m 263.96864,23.746198 a 19.938244,20.977678 0 0 1 10.21298,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.397707 l -7.49609,19.438623 z"
  id="path4526-23"
  className="defense child"
/>
<path
  d="m 314.54181,44.912866 a 19.938244,20.977678 0 0 1 10.21297,27.525931 19.938244,20.977678 0 0 1 -26.08015,10.963534 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.397707 l -7.4961,19.438623 z"
  id="path4526-75"
  className="defense child"
/>
<path
  onClick={ this.showChildren }
  d="m 234.12746,123.41832 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="offense"
  className="offense parent"
>
  <title
    id="title4742"
  >
    Offense
  </title>
</path>
<path
  d="m 90.742187,171.98821 a 19.938244,20.977678 0 0 1 10.212973,27.52593 19.938244,20.977678 0 0 1 -26.080149,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.911463,-11.39771 l -7.496092,19.43863 z"
  id="path4526-3"
  className="offense short-term child"
/>
<path
  d="m 83.825241,125.87511 a 19.938244,20.977678 0 0 1 10.212975,27.52593 19.938244,20.977678 0 0 1 -26.080151,10.96353 19.938244,20.977678 0 0 1 -10.626961,-27.3519 19.938244,20.977678 0 0 1 25.911463,-11.3977 l -7.496092,19.43862 z"
  id="path4526-6"
  className="offense short-term child"
/>
<path
  d="m 130.31625,201.14536 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43863 z"
  id="path4526-7"
  className="offense short-term child"
/>
<path
  d="m 188.60019,197.31325 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.3977 l -7.4961,19.43862 z"
  id="path4526-35"
  className="offense mid-term child"
/>
<path
  d="m 233.05023,223.39331 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="path4526-62"
  className="offense mid-term child"
/>
<path
  d="m 280.14603,200.56386 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.3977 l -7.49609,19.43862 z"
  id="path4526-9"
  className="offense mid-term child"
/>
<path
  d="m 332.15555,188.46848 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43863 z"
  id="path4526-1"
  className="offense long-term child"
/>
<path
  d="m 379.40265,194.66676 a 19.938244,20.977678 0 0 1 10.21297,27.52594 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.39771 l -7.4961,19.43863 z"
  id="path4526-2"
  className="offense long-term child"
/>
<path
  d="m 410.54767,152.87326 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="path4526-70"
  className="offense long-term child"
/>
<path
  d="m 390.59036,102.44058 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43863 z"
  id="path4526-93"
  className="offense long-term child"
/>
<path
  d="m 400.41806,239.26817 a 19.938244,20.977678 0 0 1 10.21298,27.52594 19.938244,20.977678 0 0 1 -26.08016,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.39771 l -7.4961,19.43863 z"
  id="path4526-60"
  className="offense long-term child"
/>
<path
  d="m 431.41214,200.71439 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.3977 l -7.4961,19.43862 z"
  id="path4526-626"
  className="offense long-term child"
/>
<path
  d="m 460.89429,159.13701 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="path4526-18"
  className="offense long-term child"
/>
<path
  onClick={ this.showChildren }
  d="m 129.25797,147.19333 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="short-term"
  className="offense short-term parent child"
>
  <title
    id="title4744"
  >
    Short Term Money
  </title>
</path>
<path
  onClick={ this.showChildren }
  d="m 234.10855,172.66892 a 19.938244,20.977678 0 0 1 10.21298,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96353 19.938244,20.977678 0 0 1 -10.62697,-27.3519 19.938244,20.977678 0 0 1 25.91147,-11.39771 l -7.49609,19.43863 z"
  id="mid-term"
  className="offense mid-term parent child"
>
  <title
    id="title4746"
  >
      Mid Term Money
  </title>
</path>
<path
  onClick={ this.showChildren }
  d="m 358.00928,145.53006 a 19.938244,20.977678 0 0 1 10.21297,27.52593 19.938244,20.977678 0 0 1 -26.08015,10.96354 19.938244,20.977678 0 0 1 -10.62696,-27.3519 19.938244,20.977678 0 0 1 25.91146,-11.39771 l -7.49609,19.43862 z"
  id="long-term"
  className="offense long-term parent child"
>
  <title
    id="long-term-title"
  >
      Long Term Money
  </title>
</path>
<ul>
  { nodeData.map(data => (
    <li key={ data.id }>
      <NodeLabel
        nodeData={ data }
        handleUpdate={ this.handleUpdate }
        handleCollapse={ this.handleCollapse }
        isParent
      />
      <ReactTransitionGroup>
        { (data.hasChildren && showChildren) && <ChildNode childrenData={ data.children } /> }
      </ReactTransitionGroup>
    </li>
  )) }
</ul>
*/
