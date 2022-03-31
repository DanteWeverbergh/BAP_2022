import React, { useEffect } from 'react';

function ProgressBar({ page }) {
  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div className=" mx-auto w-3/4 bg-blue-500 h-10 rounded-md">
        <div className={`w-${page}/4 bg-blue-400 h-10 rounded-md`}></div>
      </div>
    </>
  );
}

export default ProgressBar;
