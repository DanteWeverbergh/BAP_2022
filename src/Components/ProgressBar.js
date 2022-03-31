import React, { useEffect } from 'react';

function ProgressBar({ page }) {
  useEffect(() => {
    //

    console.log(page);
  }, []);

  return (
    <>
      {page === 1 && (
        <div className=" mx-auto w-3/4 bg-blue-500 h-10 rounded-md">
          <div className={`w-1/4 bg-blue-400 h-10 rounded-md`}></div>
        </div>
      )}

      {page === 2 && (
        <div className=" mx-auto w-3/4 bg-blue-500 h-10 rounded-md">
          <div className={`w-2/4 bg-blue-400 h-10 rounded-md`}></div>
        </div>
      )}

      {page === 3 && (
        <div className=" mx-auto w-3/4 bg-blue-500 h-10 rounded-md">
          <div className={`w-3/4 bg-blue-400 h-10 rounded-md`}></div>
        </div>
      )}
    </>
  );
}

export default ProgressBar;
