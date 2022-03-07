import React, { useEffect, useContext } from 'react';
import SocialCard from '../Components/SocialCard';
import FirebaseContext from '../Context/Firebase';
import 'firebase/auth';
import SignOut from '../Components/SignOut';

function Home() {
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    document.title = 'Home - Gains';
  }, []);

  const loggedIn = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('logged in');
      } else {
        console.log('not logged in');
      }
    });
  };

  return (
    <>
      <button className="bg-blue-500 px-6 py-3" onClick={() => loggedIn()}>
        Test
      </button>

      <SignOut />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
      <SocialCard />
    </>
  );
}

export default Home;
