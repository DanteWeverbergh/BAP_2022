import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function ChatProfile({ chat }) {
  const { user } = useAuthContext();
  const [isOnline, setIsOnline] = useState(true);
  const [cardUser, setCardUser] = useState({});
  const [uid, setUid] = useState('');
  const [date, setDate] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );

  useEffect(() => {
    console.log('chat', chat);

    //get chat
    db.collection('chats')
      .doc(chat.chatId)
      .get()
      .then((doc) => {
        setLastMessage(doc.data().lastMessage);
      });

    //user
    db.collection('users')
      .doc(chat.uid)
      .get()
      .then((doc) => {
        setCardUser(doc.data());
      });

    setIsLoaded(true);

    //date
    // const month = new Intl.DateTimeFormat('de-De', {
    //   month: 'short',
    // }).format(data.lastUpdated.toDate());
    // const day = new Intl.DateTimeFormat('de-De', {
    //   day: '2-digit',
    // }).format(data.lastUpdated.toDate());
    // const time = new Intl.DateTimeFormat('de-De', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    // }).format(data.lastUpdated.toDate());
    // setDate(`${day} ${month} - ${time}`);
    // data.users.map((uid) => {
    //   if (uid !== user.uid) {
    //     setUid(uid);
    //   }
    // });
  }, []);

  useEffect(() => {
    // let unsubscribe;
    // if (uid) {
    //   unsubscribe = db
    //     .collection('users')
    //     .doc(uid)
    //     .onSnapshot((doc) => setCardUser(doc.data()));
    //   setIsLoaded(true);
    //   return unsubscribe;
    // }
  }, [uid]);

  return (
    <>
      {isLoaded && (
        <div className="mx-12 text-white-950">
          <Link to={`/chat/${chat.chatId}`}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex">
                <div className="bg-blue-950 w-12 h-12 rounded-full flex justify-center items-center">
                  <img
                    className="rounded-full h-11 w-11 object-cover "
                    alt="UserPic"
                    src={
                      cardUser.photoURL
                        ? `${cardUser.photoURL.replace(
                            'https://firebasestorage.googleapis.com/v0/b/gains-dd329.appspot.com',
                            'https://ik.imagekit.io/w2g1ssyqs/'
                          )}&tr=w-150`
                        : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    }
                  />
                </div>
                <div className="ml-4">
                  <h1 className="font-bold text-xl routine__name">
                    {cardUser.fullName}
                  </h1>
                  <p className="routine__description">{lastMessage}</p>
                </div>
              </div>
              <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
                <MdKeyboardArrowRight className="text-4xl" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* <Link
        to={`/chat/${uid}`}
        className="bg-slate-960 w-full py-2 rounded-md mt-4 text-white-950 flex relative"
      >
        {cardUser.photoURL ? (
          <img
            className="h-12 w-12 rounded-full ml-4 object-cover"
            src={cardUser.photoURL}
            alt="profile"
          />
        ) : (
          <img
            className="h-12 w-12 rounded-full ml-4"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="profile"
          />
        )}

        <div className="ml-4">
          <h1>{cardUser && cardUser.username}</h1>
          <p>{data.lastMessage && data.lastMessage}</p>
        </div>

        <p className="absolute right-12 top-0">{date && date}</p>

        {cardUser && cardUser.online ? (
          <div className="absolute right-4 top-0-4 bg-green-950 h-2 w-2 rounded-full"></div>
        ) : (
          <div className="absolute right-4 top-0-4 bg-red-950 h-2 w-2 rounded-full"></div>
        )}
      </Link> */}
    </>
  );
}

export default ChatProfile;
