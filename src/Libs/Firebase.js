import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyBpbQWDbR-GdEeVOGcW8Ux6mnS6xfe-rAI',
  authDomain: 'gains-dd329.firebaseapp.com',
  projectId: 'gains-dd329',
  storageBucket: 'gains-dd329.appspot.com',
  messagingSenderId: '719404966875',
  appId: '1:719404966875:web:46d98729e34e11176c7dfe',
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
