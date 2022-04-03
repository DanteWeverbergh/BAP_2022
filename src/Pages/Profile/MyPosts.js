import React, { useEffect, useState } from 'react';
import SocialCard from '../../Components/Card/SocialCard';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

function MyPosts() {
  const { user } = useAuthContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    //

    let unsubscribe;

    unsubscribe = db
      .collection('posts')
      .where('uid', '==', user.uid)
      .onSnapshot((snapshot) => {
        setposts(
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
      <div className=" text-center text-2xl mt-8 text-white">My posts</div>

      {isLoaded &&
        posts.map(({ id, post }) => (
          <SocialCard key={id} post={post} postid={post} />
        ))}

      <div className="mt-32"></div>
    </>
  );
}

export default MyPosts;
