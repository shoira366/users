import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from '../src/Context/Context'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
