import React, { useEffect, useContext, useState } from 'react';
import SocialCard from '../Components/SocialCard';
import FirebaseContext from '../Context/Firebase';
import 'firebase/auth';
import SignOut from '../Components/SignOut';
import { Link } from 'react-router-dom';
import { useFirestoreContext } from '../Context/Firestore';
import Header from '../Layouts/Header/Header';
import Footer from '../Layouts/Footer/Footer';
import { useAuthContext } from '../Context/AuthContext';

function Home() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();
  //const { getCollection } = useFirestoreContext();

  const [test, setTest] = useState([]);
  const [userType, setUserType] = useState('');
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    document.title = 'Home - Gains';

    const db = firebase.firestore();

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((res) => {
        const data = res.data();

        setUserType(data.userType);
      });

    db.collection('posts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const data = element.data();

          const state = test;

          state.push(data);
        });
      })
      .then(() => {
        setIsloaded(true);
      });
  }, []);

  const t = () => {
    console.log(test[0].docId);
  };

  return (
    <>
      <Header />

      <p>{userType}</p>

      <button className="bg-blue-500 px-6 py-3" onClick={() => t()}>
        Test
      </button>

      <Link to={'/create'} className="bg-red-400 rounded-full  px-6 py-6">
        +
      </Link>

      <SignOut />

      {isLoaded ? (
        test.map((post) => <SocialCard key={post.docId} post={post} />)
      ) : (
        <div></div>
      )}

      <Footer />
    </>
  );
}

export default Home;
