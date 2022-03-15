import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBpbQWDbR-GdEeVOGcW8Ux6mnS6xfe-rAI',
  authDomain: 'gains-dd329.firebaseapp.com',
  projectId: 'gains-dd329',
  storageBucket: 'gains-dd329.appspot.com',
  messagingSenderId: '719404966875',
  appId: '1:719404966875:web:46d98729e34e11176c7dfe',
};

const firebase = Firebase.initializeApp(config);
const storage = getStorage();
const { FieldValue } = Firebase.firestore;

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, FieldValue, db, auth, storage };

//storage tijdelijk

export async function upload(file, currentUser, setLoading) {
  //
  const fileRef = ref(storage, currentUser.uid + '.png');

  //upload file
  await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {
    photoURL,
  });

  setLoading(false);

  alert('file uploaded!');
}
