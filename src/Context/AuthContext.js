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

  const register = (email, username, password, fullName) => {
    ///
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
        });
      })
      .then(() => {
        return (
          updateProfile(auth.currentUser),
          {
            displayName: username,
          }
        );
      })
      .then((res) => {
        alert('login succes');
      })
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
      .then((res) => {
        console.log(res);
      })
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

  const contextValue = {
    user,
    loading,
    error,
    register,
    signin,
    logout,
    forgotPassword,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
