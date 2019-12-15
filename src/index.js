import React from 'react';
import ReactDOM from 'react-dom';

// Data cache wrapper around our app.
import App from 'App';

import './static/styles/index.css';

const rootNode = document.getElementById('root');
// Concurrent Mode Experimental
ReactDOM.createRoot(rootNode).render(<App />);
//ReactDOM.render(<App />,rootNode);
