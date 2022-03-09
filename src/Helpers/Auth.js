import { Navigate, Outlet } from 'react-router-dom';
import FirebaseContext from '../Context/Firebase';
import React, { useContext, useEffect, useState } from 'react';
import 'firebase/auth';
import Login from '../Pages/Auth/Login';

const useAuth = () => {
  const { firebase } = useContext(FirebaseContext);

  const u = firebase.auth().currentUser;

  if (u) {
    const user = { loggedIn: true };
    return user && user.loggedIn;
  } else {
    const user = { loggedIn: false };
    return user && user.loggedIn;
  }
};

const Auth = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default Auth;
