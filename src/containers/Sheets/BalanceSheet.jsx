import React from 'react';

import BalanceTab from './BalanceTab';
import { TabsContainer, Tabs, Tab } from 'react-md';

export class BalanceSheet extends React.Component {
  render() {
    return (
      <div className="drawer-sheet balanceSheetContainer">
        <TabsContainer panelClassName="md-grid" colored>
          <Tabs tabId="BalanceTab" id="balance-tab">
            <Tab label="Short Term">
              <BalanceTab tabId="SHORT_TERM" />
            </Tab>
            <Tab label="Mid Term">
              <BalanceTab tabId="MID_TERM" />
            </Tab>
            <Tab label="Long Term">
              <BalanceTab tabId="LONG_TERM" />
            </Tab>
          </Tabs>
        </TabsContainer>
      </div>
    );
  }
}

export default BalanceSheet;
