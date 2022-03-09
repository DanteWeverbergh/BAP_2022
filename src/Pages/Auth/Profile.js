import React, { useEffect, useState, useContext } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import { upload } from '../../Libs/Firebase';

function Profile() {
  const { firebase } = useContext(FirebaseContext);

  const { user } = useAuthContext();

  //states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  //tijdelijke state
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Profile - Gains';

    /*
    const user = firebase.auth().currentUser;

    setEmail(user.email);
    setUsername(user.displayName);

    const db = firebase.firestore();

    db.collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        setFullName(data.fullName);
      });
      */

    if (user) {
      setEmail(user.email);
      setUsername(user.displayName);
      //

      if (user?.photoUrl) {
        setPhotoUrl(user.photoUrl);
      }
    }
  }, [user]);

  const photoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const picture = () => {
    upload(photo, user.uid, setLoading);
  };

  const updateProfile = () => {
    console.log('update');
  };

  const test = () => {
    const user = firebase.auth().currentUser;
  };

  return (
    <>
      <div>Welcome {fullName}</div>
      <form className="ml-12 mr-12" onSubmit={updateProfile} method="POST">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type={'email'}
            name={'email'}
            value={email}
            placeholder="johndoe@email.com"
            id="email"
            onChange={({ target }) => setEmail(target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            UserName
          </label>
          <input
            type={'text'}
            name={'userName'}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Update
        </button>
      </form>

      <div className="mt-24">
        <label>Update profile picture</label>
        <input onChange={photoChange} type={'file'}></input>
        <button
          disabled={loading || !photo}
          type="submit"
          onClick={() => picture()}
        >
          Foto
        </button>

        <img className="rounded-full h-12 w-12" alt="avatar" src={photoUrl} />
      </div>

      <button className="text-4xl" onClick={() => test()}>
        Test
      </button>
    </>
  );
}

export default Profile;
