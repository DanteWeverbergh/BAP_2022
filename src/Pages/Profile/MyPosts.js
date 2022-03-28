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

    unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
      //

      snapshot.docs.map((doc) => {
        if (doc.data().uid === user.uid) {
          setposts({
            id: doc.id,
            post: doc.data(),
          });
        }
      });
    });

    setIsLoaded(true);

    return unsubscribe;
  }, []);

  return (
    <>
      <div className="mt-4 text-white">My posts</div>

      <button onClick={() => console.log(posts)}>Test</button>

      {/*
      
      isLoaded && (
        <SocialCard key={posts.id} post={posts.post} postId={posts.id} />
      )
    
      */}
    </>
  );
}

export default MyPosts;
