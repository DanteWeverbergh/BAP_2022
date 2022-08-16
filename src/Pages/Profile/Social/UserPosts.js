import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SocialCard from '../../../Components/Card/SocialCard';
import { db } from '../../../Libs/Firebase';

function UserPosts() {
  let { uid } = useParams();

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //

    let unsubscribe;
    unsubscribe = db
      .collection('posts')
      .orderBy('created', 'desc')
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        //
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
        Last posts
      </div>

      {isLoaded &&
        posts.map(({ id, post }) => (
          <SocialCard key={id} post={post} postid={post} />
        ))}

      <div className="mt-32"></div>
    </>
  );
}

export default UserPosts;
