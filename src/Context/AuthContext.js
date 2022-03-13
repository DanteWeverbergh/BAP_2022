import { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import FirebaseContext from './Firebase';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const { firebase } = useContext(FirebaseContext);
  const auth = firebase.auth();

  //states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      res ? setUser(res) : setUser(null);
      setError('');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = (email, username, password, fullName, role) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password, fullName)
      .then((res) => {
        console.log(res.user.uid);

        firebase.firestore().collection('users').doc(res.user.uid).set({
          uid: res.user.uid,
          displayName: username,
          username: username.toLocaleLowerCase(),
          email,
          fullName,
          authProvider: 'email',
          following: [],
          personalTrainers: [],
          dateCreated: Date.now(),
          userType: role,
        });
      })
      .then(() => {
        const u = firebase.auth().currentUser;

        u.updateProfile({
          displayName: username,
        });
      })
      .then((res) => {})
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signin = (email, password) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {})
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateProfile = (email, displayName) => {
    // update profile
  };

  const getUserById = (uid) => {
    //get the user by uid
    const db = firebase.firestore();

    db.collection('users')
      .doc(uid)
      .get((res) => {
        console.log('woepwoep');
      });
  };

  const contextValue = {
    user,
    loading,
    error,
    register,
    signin,
    logout,
    forgotPassword,
    updateProfile,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
