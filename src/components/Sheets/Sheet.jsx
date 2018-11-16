import React, { Component } from 'react';
import { connectToSpreadsheet } from 'react-google-sheet-connector';

class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <div className="sheet">
        Sheet Data Placeholder
      </div>
    );
  }
}

export default connectToSpreadsheet(Sheet);

/**
{
  this.props.getSheet('Sheet1').map((row, i) => {
    return (
      <p key={ i }>
        { JSON.stringify(row) }
      </p>
    );
  })
}
*/
