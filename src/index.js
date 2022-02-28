import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import FirebaseContext from './Context/Firebase';
import { firebase, FieldValue } from './Libs/Firebase';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
