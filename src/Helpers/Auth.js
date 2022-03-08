import { Navigate, Outlet } from 'react-router-dom';
import FirebaseContext from '../Context/Firebase';
import React, { useContext } from 'react';
import 'firebase/auth';
import Login from '../Pages/Auth/Login';

const useAuth = () => {
  /*
  const { firebase } = useContext(FirebaseContext);

  firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
      const user = { loggedIn: false };
      return user && user.loggedIn;
    } else {
      const user = { loggedIn: true };
      return user && user.loggedIn;
    }
  });

  */
  const user = { loggedIn: true };
  return user && user.loggedIn;
};

const Auth = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default Auth;
