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
import Modal from '../../Components/Card/Modal';

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

  const [modal, setModal] = useState(false);

  const [postId, setPostId] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchMore = () => {
    //
    let unmounted;

    setIsLoading(true);

    db.collection('posts')
      .orderBy('created', 'desc')
      .startAfter(lastPost)
      .limit(5)
      .onSnapshot((snapshot) => {
        // check if there are other posts
        if (snapshot.size === 0) {
          if (!unmounted) {
            setIsEmpty(true);
          }
        } else {
          if (!unmounted) {
            setLastPost(snapshot.docs[snapshot.docs.length - 1]);

            setPosts((posts) => [
              ...posts,
              ...snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
              })),
            ]);
          }
        }
      });

    setIsLoading(false);

    return () => {
      unmounted = true;
    };
  };

  /*
  const handleScrol = (e) => {
    //

    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      fetchMore();
    }
  };
  */

  useEffect(() => {
    document.title = 'Home - Gains';

    /*
    window.addEventListener('scroll', handleScrol);
    */

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

  return (
    <>
      {modal && (
        <Modal
          setModal={setModal}
          modal={modal}
          postId={postId}
          setIsDeleted={setIsDeleted}
        />
      )}

      <Header />

      {/**
       * Test syling
       */}

      <div className="ml-10 mr-10">
        <div className="bg-grey-950 w-full rounded-lg py-5 px-5">
          <div className="flex gap-5  ">
            <div className="h-10 w-10 bg-blue-950 rounded-full "></div>
            <div>
              <div>Dante Weverbergh</div>
              <div>24/07/2000</div>
            </div>
          </div>

          <div className=" mt-10 bg-red-400"></div>
        </div>
      </div>

      <div>
        {isLoaded ? (
          posts.map(({ id, post }) => (
            <SocialCard
              key={id}
              post={post}
              postId={id}
              setModal={setModal}
              setPostId={setPostId}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>

      {isLoading && <p>Laden ...</p>}

      {!isEmpty && (
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-slate-960 mx-12 py-2 mt-4 rounded-md px-2 text-white-950 "
            onClick={() => fetchMore()}
          >
            Load more
          </button>
        </div>
      )}

      {isEmpty && (
        <p className="text-xl text-center text-white-950 mt-4">
          You have reached the end
        </p>
      )}

      <div className="mt-24"></div>

      <Footer />
    </>
  );
}

export default Home;
