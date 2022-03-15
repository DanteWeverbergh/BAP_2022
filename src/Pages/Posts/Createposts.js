import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import userEvent from '@testing-library/user-event';
import { useAuthContext } from '../../Context/AuthContext';

function Createposts() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();
  let navigate = useNavigate();

  //states
  const [error, setError] = useState('');
  const [post, setpost] = useState('');
  const [uid, setUid] = useState('');

  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

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

    try {
      await db.collection('posts').add({
        text: 'hkhkkhkmhkm',
        likes: [],
        uid: user.uid,
      });

      alert('uploaded');

      navigate('/home');
    } catch (error) {
      setError(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <Header />
      <div>Create post</div>

      <form onSubmit={handleSubmit} className="mx-12">
        <div className="mb-6">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            type={'text'}
            placeholder="Message"
            value={message}
            onChange={(target) => setMessage(target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
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
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6`}
        >
          Post
        </button>
      </form>

      <Footer />
    </>
  );
}

export default Createposts;
