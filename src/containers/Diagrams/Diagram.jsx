import React, { Component } from 'react'
const Diagram = React.createContext();

class DiagramCache extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentID: null,
      currentX: this.props.startX,
      currentY: this.props.startY,
      currentZoom: this.props.zoom,
      isZoomed: false,
      setCurrent: (state) => {
        this.setState({state});
      },
      nodes: {},
    };
  }
  render() {
    return (
      <Diagram.Provider value={this.state}>
        {this.props.children}
      </Diagram.Provider>
    );
  }
}
export default {Diagram, DiagramCache};
