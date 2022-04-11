import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Back from '../../../Components/Back';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';
import { deleteContact } from '../../../Libs/Firestore';

function ChatHeader({ chatId }) {
  let { uid } = useParams();
  const { user } = useAuthContext();
  let Navigate = useNavigate();

  const [chatUser, setChatUser] = useState({});
  const [chatUid, setChatUid] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    //

    let mounted = false;
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (!mounted) {
          setChatUser(doc.data());
        }
      });

    setIsLoaded(true);

    return () => {
      mounted = true;
    };
  }, []);

  const deleteChat = () => {
    console.log(chatId);

    const answer = window.confirm('del');

    if (answer) {
      deleteContact(user, uid, chatId, setIsDeleted);
    } else {
      console.log('toch niet');
    }
  };

  useEffect(() => {
    if (isDeleted) {
      Navigate('/chat');
    }
  }, [isDeleted]);

  return (
    <>
      <div className="fixed inset-x-0 z-50 top-0 flex h-16 bg-slate-960 items-center justify-between rounded-b-md text-white-950 ">
        <Back link={'/chat'} />
        <div
          className="bg-red-950 h-12 w-12 rounded-full flex items-center justify-center text-slate-950 -ml-28"
          onClick={() => deleteChat()}
        >
          {' '}
          X
        </div>
        <div className="mr-6 flex items-center">
          <div className="text-white text-2xl ml-4">
            <h1>{isLoaded && chatUser.username}</h1>
          </div>

          {isLoaded && chatUser.photoURL ? (
            <Link to={`/profile/${uid}`}>
              <img
                className="h-12 w-12 rounded-full ml-4 object-cover "
                src={isLoaded && chatUser.photoURL}
                alt="profile"
              />
            </Link>
          ) : (
            <Link to={`/profile/${uid}`}>
              <img
                className="h-12 w-12 rounded-full ml-4"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt="profile"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
