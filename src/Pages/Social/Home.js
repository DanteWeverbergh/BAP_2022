import React, { useEffect, useContext, useState } from 'react';
import SocialCard from '../../Components/Card/SocialCard';
import FirebaseContext from '../../Context/Firebase';
import 'firebase/auth';
import SignOut from '../../Components/SignOut';
import { Link } from 'react-router-dom';
import { useFirestoreContext } from '../../Context/Firestore';
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

function Home() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();
  //const { getCollection } = useFirestoreContext();

  const [test, setTest] = useState([]);
  const [userType, setUserType] = useState('');
  const [isLoaded, setIsloaded] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = 'Home - Gains';

    //const db = firebase.firestore();

    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );

      setIsloaded(true);
    });

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((res) => {
        const data = res.data();

        setUserType(data.userType);
      });
  }, []);

  return (
    <>
      <Header />

      {isLoaded ? (
        posts.map(({ id, post }) => (
          <SocialCard key={id} post={post} postId={id} />
        ))
      ) : (
        <div></div>
      )}

      <div className="mt-24"></div>

      <Footer />
    </>
  );
}

export default Home;
