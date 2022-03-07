import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../Context/Firebase';
import 'firebase/auth';

function SignOut() {
  const { firebase } = useContext(FirebaseContext);
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={() => signOut()}
    >
      Uitloggen
    </button>
  );
}

export default SignOut;
