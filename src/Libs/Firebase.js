import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

console.log(process.env);

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
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

export async function createPost(file, setIsLoaded, text, uid, uPhoto) {
  if (file) {
    const fileName = Date.now() + 'jpg';
    const fileRef = ref(storage, fileName);

    //upload file
    await uploadBytes(fileRef, file);

    const photoUrl = await getDownloadURL(fileRef);

    await db.collection('posts').add({
      photoUrl,
      uid,
      text,
      uPhoto,
      likes: [],
      created: FieldValue.serverTimestamp(),
    });
  } else {
    await db.collection('posts').add({
      uid,
      text,
      uPhoto,
      likes: [],
      created: FieldValue.serverTimestamp(),
    });
  }

  alert('post uploaded');
  setIsLoaded(true);
}

//add data to a collection
export async function addToCollection(col, data) {
  await db.collection(col).add(data);

  alert('Uploaded');
}

//add data to certain doc within collection
export async function addToDoc(col, doc, data) {
  await db.collection(col).doc(doc).update(data);
}
