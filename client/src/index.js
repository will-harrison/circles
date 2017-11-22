import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  body {
    background-color: rgba(0, 0, 0, .7);
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
