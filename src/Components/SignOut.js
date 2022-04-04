import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../Context/Firebase';
import 'firebase/auth';

function SignOut() {
  const { firebase } = useContext(FirebaseContext);
  const signOut = () => {
    firebase.auth().signOut();

    localStorage.removeItem('loggedIn');
  };

  return (
    <button
      className="bg-blue-950 hover:bg-blue-960 text-white-950 font-bold py-2 px-4 rounded-full"
      onClick={() => signOut()}
    >
      Uitloggen
    </button>
  );
}

export default SignOut;
