import React, { useContext, useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import CommentsDetail from './CommentsDetail';

function Comments({ comments }) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();

  const [comment, setComment] = useState('');

  useEffect(() => {
    //
  });

  const sendComment = (e) => {
    e.preventDefault();
    console.log('send comment');
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
