import React, { Component } from 'react'
import { DiagramData, FieldData } from 'config';
const Diagram = React.createContext();

// Non function but this should probably be in place for abstraction purposes.
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
    // Prime our apollo cache with our data.
    return (
      <Query>
        <Diagram.Provider value={this.state}>
          {this.props.children}
        </Diagram.Provider>
      </Query>
    );
  }
}
export default {Diagram, DiagramCache};
