import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Timer from '../../Components/Timer';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import { getDocById } from '../../Libs/Firestore';

function Log() {
  const { user } = useAuthContext();

  const [userType, setUserType] = useState('');
  const [u, setU] = useState({});

  useEffect(() => {
    document.title = 'Log - Gains';

    //const doc = getDocById('users', user.uid);
    //console.log(doc);

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => setU(doc.data()));
  }, []);

  return (
    <>
      <Header />

      {/**<h1>Log your workout</h1>

      <Timer />
       */}

      {u.userType === 'regular' ? (
        <Link className="mx-12 text-white" to={'/findtrainer'}>
          Find a personal trainer
        </Link>
      ) : (
        <div>personal trainer</div>
      )}

      <Footer />
    </>
  );
}
export default Log;
