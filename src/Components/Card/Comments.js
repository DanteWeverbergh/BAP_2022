import React, { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useAuthContext } from '../../Context/AuthContext';

import { db } from '../../Libs/Firebase';
import CommentsDetail from './CommentsDetail';

function Comments({ comments, postId }) {
  const { user } = useAuthContext();

  const [comment, setComment] = useState('');

  useEffect(() => {
    //
  });

  const sendComment = (e) => {
    e.preventDefault();

    const data = {
      comment: comment,
      userName: user.displayName,
      uid: user.uid,
      uPhoto: user.photoURL,
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
          <form
            className="w-full flex items-center mt-6"
            onSubmit={sendComment}
            method="POST"
          >
            <input
              className="w-11/12 rounded-md bg-white-950 h-8   "
              type={'text'}
              placeholder={'Start typing here ...'}
              name={'comment'}
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button className="bg-blue-950 h-8 w-8 rounded-full ml-4">
              <MdSend className="text-white-950 text-xl ml-2" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Comments;
