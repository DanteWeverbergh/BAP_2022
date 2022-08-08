import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import userEvent from '@testing-library/user-event';
import { useAuthContext } from '../../Context/AuthContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { createPost } from '../../Libs/Firebase';
import Label from '../../Components/Label';

function Createposts() {
  const { firebase, storage } = useContext(FirebaseContext);
  const { user } = useAuthContext();
  let navigate = useNavigate();

  //states
  const [error, setError] = useState('');
  const [post, setpost] = useState('');
  const [uid, setUid] = useState('');

  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState('false');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.title = 'Create - Gains';
  }, []);

  const photoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = firebase.firestore();

    const data = {
      text: message,
      likes: [],
      uid: user.uid,
      uPhoto: user.photoURL ? user.photoURL : '',
    };

    try {
      //await db.collection('posts').add(data);

      createPost(
        photo,
        setIsLoaded,
        message,
        user.uid,
        user.photoURL ? user.photoURL : null
      );

      //sLoaded && navigate('/home');
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      navigate('/home');
    }
  }, [isLoaded]);

  return (
    <>
      <Header />
      <div className="text-white-950 font-bold text-2xl text-center">
        Create post
      </div>

      <form onSubmit={handleSubmit} className="mx-12">
        <div className="mb-6">
          <Label label="message" htmlFor="message" />
          <textarea
            name="message"
            id="message"
            type={'text'}
            placeholder="message"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-950 bg-white-950 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <Label label={'Select a photo'} htmlFor="pic" />
          <input
            id="pic"
            onChange={photoChange}
            type={'file'}
            className="bg-white-950 w-full rounded-md"
            placeholder="hjlhhjlh"
          ></input>
        </div>

        <button
          type="submit"
          className={`bg-blue-950 hover:bg-blue-960 text-white-950 w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6`}
        >
          Post
        </button>
      </form>

      <Footer />
    </>
  );
}

export default Createposts;
