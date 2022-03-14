import React, { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import FirebaseContext from '../Context/Firebase';
import { FieldValue } from '../Libs/Firebase';
import Comments from './Comments';

function SocialCard({ post }) {
  const { firebase } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(0);
  const { user } = useAuthContext();

  //states
  const [postUser, setPostUser] = useState([]);
  const [comments, setComments] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    //setlikes probleempje
    setLikes(post.likes.length);

    const db = firebase.firestore();

    db.collection('users')
      .doc(post.uid)
      .get()
      .then((res) => {
        const data = res.data();

        const state = postUser;

        state.push(data);
      });

    post.likes.map((e) => {
      if (e === user.uid) {
        setIsLiked(true);
      }
    });

    console.log(post.likes);
  });

  const like = () => {
    setisLoading(true);
    const db = firebase.firestore();
    const postsRef = db.collection('posts').doc(post.docId);

    postsRef
      .update('likes', FieldValue.arrayUnion('fghjkljglj'))
      .then(() => {
        setisLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const openComments = () => {
    setComments(!comments);
  };

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
                <button
                  className={isLiked ? 'bg-red-400' : ''}
                  onClick={() => like()}
                >
                  Like
                </button>
              </div>
              <div>
                <button onClick={() => openComments()}>Comments</button>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">{likes} Likes</div>
              <div>4 comments</div>
            </div>
          </div>
        </div>
        {comments ? <Comments /> : <div></div>}
      </div>
    </>
  );
}

export default SocialCard;
