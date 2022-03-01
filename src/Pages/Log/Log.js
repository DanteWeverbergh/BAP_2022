import React, { useEffect } from 'react';

function Log() {
  useEffect(() => {
    document.title = 'Log - Gains';
  }, []);

  return (
    <>
      <h1>Log your workout</h1>

      <button className="btn-primary">Add exercise</button>
    </>
  );
}
export default Log;
