import React from 'react';
import { reduxForm } from 'redux-form';

const reduxFormConfig = {
  enableReinitialize: true,
};

class SideBarModalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="modalwindow">
        <div className="totalContributionContainer">
          <div
            className="totalContribution"
          >
            <div className="titleTotalContribution">
              <p>Net Worth</p>
            </div>
            <div className="valueTotalContribution">
              <p>$500,000</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm(reduxFormConfig)(SideBarModalData);
