import { Navigate, Outlet } from 'react-router-dom';
import FirebaseContext from '../Context/Firebase';
import React, { useContext } from 'react';
import 'firebase/auth';
import Login from '../Pages/Auth/Login';

const useAuth = () => {
  /*
  const { firebase } = useContext(FirebaseContext);
 

  firebase.auht().onAuthStateChanged(function (user) {
    if (user) {
      console.log('logged in');
    } else {
      const user = { loggedIn: false };
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
