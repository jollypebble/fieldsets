import React from 'react';

import SheetTab from './SheetTab';
import { TabsContainer, Tabs, Tab } from 'react-md';

export class EconSheet extends React.Component {
  render() {
    return (
      <div className="drawer-sheet balanceSheetContainer">
        <TabsContainer panelClassName="md-grid" colored>
          <Tabs tabId="BalanceTab" id="balance-tab">
            <Tab label="Short Term">
              <SheetTab tabId="SHORT_TERM" />
            </Tab>
            <Tab label="Mid Term">
              <SheetTab tabId="MID_TERM" />
            </Tab>
            <Tab label="Long Term">
              <SheetTab tabId="LONG_TERM" />
            </Tab>
          </Tabs>
        </TabsContainer>
      </div>
    );
  }
}

export default EconSheet;
