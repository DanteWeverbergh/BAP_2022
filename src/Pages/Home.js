import React, { useEffect, useContext, useState } from 'react';
import SocialCard from '../Components/SocialCard';
import FirebaseContext from '../Context/Firebase';
import 'firebase/auth';
import SignOut from '../Components/SignOut';
import { Link } from 'react-router-dom';

function Home() {
  const { firebase } = useContext(FirebaseContext);

  const [test, setTest] = useState([]);

  useEffect(() => {
    document.title = 'Home - Gains';

    const db = firebase.firestore();

    db.collection('posts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const t = element.data().test;

          const state = test;

          state.push(t);
        });
      });
  }, []);

  const loggedIn = () => {
    console.log(test);
  };

  return (
    <>
      <button className="bg-blue-500 px-6 py-3" onClick={() => loggedIn()}>
        Test
      </button>

      <Link to={'/create'} className="bg-red-400 rounded-full  px-6 py-6">
        +
      </Link>

      <SignOut />

      <SocialCard />
    </>
  );
}

export default Home;
