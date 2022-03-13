import React, { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import FirebaseContext from '../Context/Firebase';

function SocialCard({ post }) {
  const { firebase } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(0);
  const { user } = useAuthContext();

  const [postUser, setPostUser] = useState([]);

  useEffect(() => {
    //setlikes probleempje
    //setLikes(post.likes.length);

    const db = firebase.firestore();

    db.collection('users')
      .doc(post.uid)
      .get()
      .then((res) => {
        const data = res.data();
        console.log(data);

        const state = postUser;

        state.push(data);
      });
  });

  return (
    <>
      {/*Card */}
      <div className="px-4 mx-4 py-4 mt-5 rounded-md bg-slate-600">
        {/* topbar */}
        <div className="flex justify-between">
          <div className="flex">
            <img
              alt="profilePic"
              className="h-12 w-12 rounded-full image-cover mr-4"
              src="https://picsum.photos/200"
            />
            <div>
              <h1>{postUser.fullName}</h1>
              <p>{post.timeStamp}</p>
            </div>
          </div>
          <div>...</div>
        </div>
        {/* content card */}
        <div className="mt-4">
          <img alt="pic" src="https://picsum.photos/400" />
          <div>
            <p className="mt-4">{post.text}</p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <div className="mr-4">
                <button onClick={() => console.log('like')}>Like</button>
              </div>
              <div>Comment</div>
            </div>
            <div className="flex">
              <div className="mr-4">{likes} Likes</div>
              <div>4 comments</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialCard;
