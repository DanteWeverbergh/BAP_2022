import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

function MyPosts() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setposts] = useState([]);

  useEffect(() => {
    //
    setIsLoading(true);

    let unsubscribe;

    unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
      //
      console.log();

      snapshot.docs.map((doc) => {
        console.log(doc.data().uid);
      });
    });
  }, []);

  return (
    <>
      <div className="mt-4 text-white">My posts</div>
    </>
  );
}

export default MyPosts;
