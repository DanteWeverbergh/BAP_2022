import React, { useContext, useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import { db } from '../../Libs/Firebase';
import CommentsDetail from './CommentsDetail';

function Comments({ comments, postId }) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();

  const [comment, setComment] = useState('');

  useEffect(() => {
    //
    console.log(postId);
  });

  const sendComment = (e) => {
    e.preventDefault();

    const data = {
      comment: comment,
      userName: user.displayName,
    };

    db.collection('posts').doc(postId).collection('comments').add(data);

    setComment('');
  };

  return (
    <>
      <div>
        {comments ? (
          comments.map((comments) => <CommentsDetail comments={comments} />)
        ) : (
          <div>No comments yet.</div>
        )}
        {/*form/*/}
        <div>
          <form className="w-full" onSubmit={sendComment} method="POST">
            <input
              className="w-11/12 rounded-full bg-slate-600 border-2 mt-6"
              type={'text'}
              placeholder={'Start typing here ...'}
              name={'comment'}
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button>
              <MdSend className="text-white ml-2" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Comments;
