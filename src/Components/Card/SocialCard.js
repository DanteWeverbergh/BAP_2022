import React, { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import { FieldValue } from '../../Libs/Firebase';
import Comments from './Comments';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FaComments, FaRegComments } from 'react-icons/fa';

import { db } from '../../Libs/Firebase';
import SocialProfile from './SocialProfile';

function SocialCard({ post, postId, setModal, setPostId }) {
  const { firebase } = useContext(FirebaseContext);
  const [likes, setLikes] = useState(0);
  const { user } = useAuthContext();

  //states
  const [postUser, setPostUser] = useState({});
  const [areComments, setAreComments] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsAmount, setCommentsAmount] = useState(0);

  useEffect(() => {
    let unsubscribe;
    setisLoading(true);

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

        setLikes(post.likes.length);
      });

    //comments
    unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((snapshot) => {
        //
        setComments(snapshot.docs.map((doc) => doc.data()));
      });

    setisLoading(false);

    return () => unsubscribe();
  }, [postId]);

  const like = () => {
    setisLoading(true);
    //const db = firebase.firestore();
    const postsRef = db.collection('posts').doc(postId);

    if (isLiked) {
      // remove the like
      postsRef
        .update('likes', FieldValue.arrayRemove(user.uid))
        .then(() => {
          setIsLiked(false);
          setisLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      //like the post
      postsRef
        .update('likes', FieldValue.arrayUnion(user.uid))
        .then(() => {
          setIsLiked(true);
          setisLoading(false);
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

      <div className="px-4 mx-4 py-4 mt-5 mb-12 rounded-lg  text-white-950">
        <SocialProfile
          post={post}
          postUser={postUser}
          setModal={setModal}
          setPostId={setPostId}
          postId={postId}
        />

        {/* content card */}
        <div className="mt-4">
          {post.imageKit && post.photoUrl && (
            <img
              className="rounded-lg border-solid max-h-96 object-cover"
              alt="pic"
              //src="https://picsum.photos/400"
              src={post.imageKit}
            />
          )}
          {post.photoUrl && !post.imageKit && (
            <img
              className="rounded-lg border-solid max-h-96 object-cover"
              alt="pic"
              //src="https://picsum.photos/400"
              src={post.photoUrl}
            />
          )}

          <div className=" overflow-auto">
            <p className="mt-4 text-white-950 ">{post.text}</p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex">
              <div className="mr-4">
                <button onClick={() => like()}>
                  {isLiked && !isLoading ? (
                    <IoIosHeart className="text-2xl text-red-950" />
                  ) : (
                    <IoIosHeartEmpty className="text-2xl text-white-950" />
                  )}
                </button>
              </div>
              <div>
                <button onClick={() => openComments()}>
                  {areComments ? (
                    <FaComments className="text-white-950 text-2xl" />
                  ) : (
                    <FaRegComments className="text-white-950 text-2xl" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex">
              <div className="mr-4">
                {!isLoading ? post.likes.length : ''} Likes
              </div>
              <div>{!isLoading ? comments.length : '0'} comments</div>
            </div>
          </div>
        </div>

        {areComments ? (
          <div className="h-56 overflow-auto">
            <Comments comments={comments} postId={postId} key={postId} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default SocialCard;
