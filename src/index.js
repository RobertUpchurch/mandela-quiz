import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import App from './App';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
