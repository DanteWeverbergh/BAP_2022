import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import FirebaseContext from './Context/Firebase';
import { firebase, FieldValue } from './Libs/Firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
