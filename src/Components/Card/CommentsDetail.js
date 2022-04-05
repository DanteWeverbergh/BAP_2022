import React from 'react';
import { Link } from 'react-router-dom';

function CommentsDetail({ comments }) {
  return (
    <>
      <div className="mt-6 flex items-center">
        <Link to={`/profile/${comments.uid}`}>
          <img
            alt="profPic"
            //src="https://picsum.photos/200"
            src={
              comments.uPhoto
                ? comments.uPhoto
                : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <div className="ml-4">
          <p>{comments.userName}</p>

          <p className="text-white-950">{comments.comment}</p>
        </div>
      </div>
    </>
  );
}

export default CommentsDetail;
