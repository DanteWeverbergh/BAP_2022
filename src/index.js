import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import FirebaseContext from './Context/Firebase';
import { AuthContextProvider } from './Context/AuthContext';
import { FireStoreContextProvider } from './Context/Firestore';
import { firebase, FieldValue } from './Libs/Firebase';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <AuthContextProvider>
          <FireStoreContextProvider>
            <App />
          </FireStoreContextProvider>
        </AuthContextProvider>
      </FirebaseContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
