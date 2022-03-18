import React, { useEffect, useState } from 'react';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';

function FindTrainer() {
  const [personalTrainers, setPersonalTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //search database for personal trainers
    setIsLoading(true);

    db.collection('users').onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.data().userType === 'Personal trainer') {
          setPersonalTrainers(doc.data());
        }

        setIsLoading(false);
      });
    });
  }, []);

  return (
    <>
      <Header />

      <div className="text-white">Find a personal trainer</div>
      <Footer />
    </>
  );
}

export default FindTrainer;
