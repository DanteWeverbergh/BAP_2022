import React from 'react';

function CommentsDetail({ comments }) {
  return (
    <>
      <div className="mt-6 flex items-center">
        <img
          alt="profPic"
          src="https://picsum.photos/200"
          className="h-10 w-10 rounded-full"
        />
        <div className="ml-4">
          <p>{comments.userName}</p>

          <p className="text-white">{comments.comment}</p>
        </div>
      </div>
    </>
  );
}

export default CommentsDetail;
