import React, { useContext, useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import FirebaseContext from '../../Context/Firebase';

function Comments() {
  const { firebase } = useContext(FirebaseContext);
  const sendComment = (e) => {
    e.preventDefault();
    console.log('send comment');
  };

  useEffect(() => {
    //
  });

  return (
    <>
      <div>
        <div className="mt-6 flex items-center">
          <img
            alt="profPic"
            src="https://picsum.photos/200"
            className="h-10 w-10 rounded-full"
          />
          <p className="ml-4 ">Waaw, Goed bezig!</p>
        </div>
        {/*form/*/}
        <div>
          <form className="w-full" onSubmit={sendComment} method="POST">
            <input
              className="w-11/12 rounded-full bg-slate-600 border-2 mt-6"
              type={'text'}
              placeholder={'Start typing here ...'}
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
