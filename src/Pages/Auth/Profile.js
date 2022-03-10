import { getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import { upload } from '../../Libs/Firebase';

function Profile() {
  const { firebase } = useContext(FirebaseContext);

  const { user } = useAuthContext();
  let navigate = useNavigate();

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

    if (user) {
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
      //

      if (user?.photoURL) {
        setPhotoUrl(user.photoURL);
      }
    }
  }, [user]);

  const photoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const picture = () => {
    const uid = user.uid;

    upload(photo, user, setLoading);
  };

  const updateProfile = () => {
    console.log('update');
  };

  const test = () => {
    console.log(fullName);
  };

  return (
    <>
      <div>
        <Link
          className="rounded-full bg-red-400 h-8 w-8 text-center "
          to={'/home'}
        >
          B
        </Link>

        <div className="flex-col text-center grid place-items-center">
          <div className=" relative w-36 h-36 grid place-items-center  bg-red-500 rounded-full  mr-5 mt-5  ">
            <img
              className="h-32 w-32 rounded-full object-cover"
              alt="profilePic"
              src={photoUrl}
            />
            {/**
        <div className="h-6 w-6  rounded-full absolute bottom-3 right-3 bg-red-400 text-center">
          P
        </div>
         */}
          </div>
          <div className="text-2xl mt-4 mb-8">Welcome {fullName}</div>
        </div>
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pic"
          >
            Update profile picture
          </label>
          <input
            id="pic"
            onChange={photoChange}
            type={'file'}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <button
            disabled={loading || !photo}
            type="submit"
            onClick={() => picture()}
          >
            Foto
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
