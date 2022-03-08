import React, { useEffect } from 'react';
import Timer from '../../Components/Timer';

function Log() {
  useEffect(() => {
    document.title = 'Log - Gains';
  }, []);

  return (
    <>
      <h1>Log your workout</h1>

      <Timer />
    </>
  );
}
export default Log;
