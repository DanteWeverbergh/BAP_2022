import React, { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import { FieldValue } from '../../Libs/Firebase';
import Comments from './Comments';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FaComments, FaRegComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../../Libs/Firebase';

function SocialCard({ post }) {
  const { firebase } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(0);
  const { user } = useAuthContext();

  //states
  const [postUser, setPostUser] = useState({});
  const [areComments, setAreComments] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    //setlikes probleempje

    //const db = firebase.firestore();

    db.collection('users')
      .doc(post.uid)
      .get()
      .then((res) => {
        const data = res.data();

        setPostUser(data);
      })
      .then(() => {
        post.likes.map((e) => {
          if (e === user.uid) {
            setIsLiked(true);
          }
        });

        const postUid = postUser.uid;

        // console.log(user.postUid);

        setLikes(post.likes.length);
      });
  });

  const like = () => {
    setisLoading(true);
    const db = firebase.firestore();
    const postsRef = db.collection('posts').doc(post.docId);

    if (isLiked) {
      // remove the like
      postsRef
        .update('likes', FieldValue.arrayRemove(user.uid))
        .then(() => {
          setisLoading(false);
          setIsLiked(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      //like the post
      postsRef
        .update('likes', FieldValue.arrayUnion(user.uid))
        .then(() => {
          setisLoading(false);
          setIsLiked(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const openComments = () => {
    setAreComments(!areComments);
  };

  return (
    <>
      {/*Card */}

      <div className="px-4 mx-4 py-4 mt-5 rounded-md bg-slate-600">
        {/* topbar */}

        <div className="flex justify-between">
          <div className="flex">
            <Link to={`/profile/${postUser.uid}`}>
              <img
                alt="profilePic"
                className="h-12 w-12 rounded-full object-cover mr-4"
                //src="https://picsum.photos/200"
                src={user.photoURL}
              />
            </Link>
            <div>
              <h1>{postUser.fullName}</h1>
              <p>{post.timeStamp}</p>
            </div>
          </div>

          <div>...</div>
        </div>
        {/* content card */}
        <div className="mt-4">
          <img
            className="rounded-md"
            alt="pic"
            src="https://picsum.photos/400"
          />
          <div>
            <p className="mt-4">{post.text}</p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <div className="mr-4">
                <button onClick={() => like()}>
                  {isLiked ? (
                    <IoIosHeart className="text-2xl text-red-400" />
                  ) : (
                    <IoIosHeartEmpty className="text-2xl text-white" />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => openComments()}>
                  {areComments ? (
                    <FaComments className="text-white text-2xl" />
                  ) : (
                    <FaRegComments className="text-white text-2xl" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">{likes} Likes</div>
              <div>4 comments</div>
            </div>
          </div>
        </div>
        {areComments ? <Comments /> : <div></div>}
      </div>
    </>
  );
}

export default SocialCard;
