import React from 'react';

function ProgressBar({ width }) {
  return (
    <>
      <div className=" mx-auto w-3/4 bg-blue-500 h-10 rounded-md">
        {width === '1/4' && (
          <div className="w-1/4 bg-blue-400 h-10 rounded-md"></div>
        )}

        {width === '2/4' && (
          <div className="w-2/4 bg-blue-400 h-10 rounded-md"></div>
        )}
      </div>
    </>
  );
}

export default ProgressBar;
