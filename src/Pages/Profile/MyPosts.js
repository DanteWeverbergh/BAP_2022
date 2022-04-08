import React, { useEffect, useState } from 'react';
import SocialCard from '../../Components/Card/SocialCard';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

function MyPosts() {
  const { user } = useAuthContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const fetchMore = () => {
    //
    let unmounted;

    setIsLoading(true);

    db.collection('posts')
      .orderBy('created', 'desc')
      .where('uid', '==', user.uid)
      .startAfter(lastPost)
      .limit(3)
      .onSnapshot((snapshot) => {
        // check if there are other posts
        if (snapshot.size === 0) {
          if (!unmounted) {
            setIsEmpty(true);
          }
        } else {
          if (!unmounted) {
            setLastPost([snapshot.docs.length - 1]);

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

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db
      .collection('posts')
      .where('uid', '==', user.uid)
      .limit(3)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
      <div className=" text-center text-2xl mt-8 text-white-950">
        My last posts
      </div>

      {isLoaded &&
        posts.map(({ id, post }) => (
          <SocialCard key={id} post={post} postid={post} />
        ))}

      {/** 

      {!isEmpty && (
        <div className="w-full flex items-center justify-center">
          <button
            className="bg-slate-960 mx-12 py-2 mt-4 rounded-md px-2 text-white-950 "
            onClick={fetchMore}
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
      */}

      <div className="mt-32"></div>
    </>
  );
}

export default MyPosts;
