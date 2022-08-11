import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = Firebase.initializeApp(config);
const storage = getStorage();
const { FieldValue } = Firebase.firestore;

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, FieldValue, db, auth, storage };

//storage tijdelijk

export async function upload(file, currentUser, setLoading, setIsLoaded) {
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

    const imageKit = `${photoUrl.replace(
      'https://firebasestorage.googleapis.com/v0/b/gains-dd329.appspot.com',
      'https://ik.imagekit.io/w2g1ssyqs/'
    )}&tr=w-844`;

    await db.collection('posts').add({
      photoUrl,
      imageKit,
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

  Swal.fire({
    icon: 'success',
    title: 'Post uploaded',
    color: '#F0F6FC',
    background: '#0D1017',
    iconColor: '#2EA043',
    confirmButtonColor: '#206FEB',
  }).then((result) => {
    if (result.isConfirmed) {
      setIsLoaded(true);
    }
  });
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
