import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/root/App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from './redux/store';

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
