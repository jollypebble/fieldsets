import React from 'react';
import { TabsContainer, Tabs, Tab } from 'react-md';

const TabBar = ({ mobile }) => (
  <TabsContainer panelClassName="md-grid" colored>
    <Tabs tabId="simple-tab" mobile={mobile}>
      <Tab label="Econ Circles">
        <h3>Hello, World!</h3>
      </Tab>
      <Tab label="Tab two">
        <h3>Now look at me!</h3>
      </Tab>
    </Tabs>
  </TabsContainer>
);

export default TabBar;
