import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';

function Createposts() {
  const { firebase } = useContext(FirebaseContext);
  let navigate = useNavigate();

  //states
  const [error, setError] = useState('');
  const [test, setTest] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    document.title = 'Create - Gains';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = firebase.firestore();

    try {
      await db.collection('posts').add({
        test: test,
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
      <div>
        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col mb-12">
            <label>Test</label>
            <input
              type={'text'}
              id="test"
              placeholder="test"
              value={test}
              name="test"
              onChange={({ target }) => setTest(target.value)}
            />
          </div>
          <button className="bg-red-400 px-6 py-2 rounded-full" type="supbmit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Createposts;
