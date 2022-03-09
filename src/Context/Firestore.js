import { createContext, useState, useContext, useEffect } from 'react';
import FirebaseContext from './Firebase';

export const fireStoreContext = createContext({});

export const useFirestoreContext = () => {
  useContext(fireStoreContext);
};

export const FireStoreContextProvider = ({ children }) => {
  const { firebase } = useContext(FirebaseContext);
  const db = firebase.firestore();

  //states
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const getCollection = (col) => {
    db.collection(col)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          const e = element.data();

          const state = data;

          data.push(e);
        });
      });
  };

  const contextValue = {
    data,
    getCollection,
  };

  return (
    <fireStoreContext.Provider value={contextValue}>
      {children}
    </fireStoreContext.Provider>
  );
};
