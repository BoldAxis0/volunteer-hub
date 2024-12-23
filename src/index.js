import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Auth0Provider
      domain="dev-7o1fdt8cfpqw1gxj.us.auth0.com"
      clientId="T2h4xIJb6Bn0NEdZHkAwHVYmEZZm3VKT"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
