import React, { useEffect } from 'react';
import Timer from '../../Components/Timer';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';

function Log() {
  useEffect(() => {
    document.title = 'Log - Gains';
  }, []);

  return (
    <>
      <Header />

      <h1>Log your workout</h1>

      <Timer />

      <Footer />
    </>
  );
}
export default Log;
