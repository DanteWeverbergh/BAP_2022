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
import { benchGifs, deadliftGifs, squatGifs } from '../../Libs/Gifs';
import { MdCollections } from 'react-icons/md';

function Home() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();
  //const { getCollection } = useFirestoreContext();

  const [test, setTest] = useState([]);
  const [userType, setUserType] = useState('');
  const [isLoaded, setIsloaded] = useState(false);

  //infinite scroll
  const [limit, setLimit] = useState(2);

  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    document.title = 'Home - Gains';

    //const db = firebase.firestore();
    setIsloaded(true);

    db.collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .onSnapshot((snapshot) => {
        setLastPost(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );

        setIsloaded(true);
        setIsLoading(false);
      });

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((res) => {
        const data = res.data();

        setUserType(data.userType);
      });
  }, []);

  const fetchMore = () => {
    //

    setIsLoading(true);

    db.collection('posts')
      .orderBy('created', 'desc')
      .startAfter(lastPost)
      .limit(5)
      .onSnapshot((snapshot) => {
        // check if there are other posts
        if (snapshot.size === 0) {
          setIsEmpty(true);
        } else {
          setLastPost(snapshot.docs[snapshot.docs.length - 1]);
          setPosts((posts) => [
            ...posts,
            ...snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            })),
          ]);
        }
      });

    setIsLoading(false);
  };

  const handleScrol = () => {
    const { scrollTop, clientHeight, scrollHeight } = window.currentTarget;

    console.log('scrollllll');
  };

  return (
    <>
      <Header />

      <div>
        {isLoaded ? (
          posts.map(({ id, post }) => (
            <SocialCard key={id} post={post} postId={id} />
          ))
        ) : (
          <div></div>
        )}
      </div>

      {isLoading && <p>Laden ...</p>}

      <div className="w-full flex items-center justify-center">
        <button
          className="bg-slate-960 mx-12 py-2 mt-4 rounded-md px-2 text-white-950 "
          onClick={() => fetchMore()}
        >
          Load more
        </button>
      </div>

      {isEmpty && (
        <p className="text-xl text-center text-white-950">
          You have reached the end
        </p>
      )}

      <div className="mt-24"></div>

      <Footer />
    </>
  );
}

export default Home;
