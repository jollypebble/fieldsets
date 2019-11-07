import React from 'react';
import { render } from 'react-dom';

// Data cache wrapper around our app.
import App from 'App';

import './static/styles/index.css';

render(
  <App />,
  document.getElementById('root'),
);
