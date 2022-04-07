import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

function Followers({ followersList, setFollowersList }) {
  return (
    <>
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative flex flex-col justify-center">
        <div className="">
          <IoCloseOutline
            onClick={() => setFollowersList(false)}
            className="text-3xl absolute top-12 right-12 text-white-950"
          />
        </div>
        <div>List of followers</div>
        <ul>
          <li>Volger 1</li>
          <li>Volger 2</li>
        </ul>
      </div>
    </>
  );
}

export default Followers;
