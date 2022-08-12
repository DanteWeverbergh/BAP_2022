import { db, FieldValue } from './Firebase';

//get collection from firestore

export async function getCol(col) {
  const collection = [];

  db.collection(col).onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => {
      collection.push(doc.data());
    });
  });

  return collection;
}

//get collection inside collection
export async function getColInCol(col, docId, coll) {
  const collection = [];

  db.collection(col)
    .doc(docId)
    .collection(coll)
    .onSnapshot((snapshot) => {
      snapshot.map((doc) => {
        collection.push(doc.data());
      });
    });

  return collection;
}

//get a document within a collection by id
export async function getDocById(col, doc) {
  let document = {};

  const result = db
    .collection(col)
    .doc(doc)
    .get()
    .then((doc) => {
      document = doc.data();
    });

  await result;

  return document;
}

//get a doc inside a collection in a doc

export async function getDocInDoc(col, id, coll, docId) {
  let document = {};

  db.collection(col)
    .doc(id)
    .collection(coll)
    .doc(docId)
    .get()
    .then((doc) => {
      document = doc.data();
    });

  return document;
}

//update doc

export async function updateDoc(col, doc, data) {
  try {
    await db.collection(col).doc(doc).update(data);

    // alert('updated');
  } catch (error) {
    console.log(error.message);
  }
}

// delete doc
export async function deleteDoc(col, doc, setIsDeleted, setModal) {
  try {
    await db
      .collection(col)
      .doc(doc)
      .delete()
      .then(() => {
        console.log('post deleted succesfully!');
      });

    setIsDeleted(true);
    setModal(false);
  } catch (error) {
    console.log(error.message);
  }
}

//delete routine
export async function deleteDocument(col, doc, setIsDeleted) {
  try {
    await db
      .collection(col)
      .doc(doc)
      .delete()
      .then(() => {
        alert('Routine deleted succesfully!');
        setIsDeleted(true);
      });
  } catch (error) {
    console.log(error.message);
    alert('Something went wrong!');
  }
}

//add doc to collection
export async function addDoc(col, data) {
  try {
    await db.collection(col).add(data);

    alert('exercise updated');
  } catch (error) {
    console.log(error.message);
  }
}

//add routine
export async function addRoutine(data, dataa, setDocRef) {
  //

  try {
    await db
      .collection('Routines')
      .add(data)
      .then((docRef) => {
        db.collection('Routines')
          .doc(docRef.id)
          .collection('Exercises')
          .add(dataa);

        setDocRef(docRef.id);
      });

    alert('routine created');

    // go back to dashboard
  } catch (error) {
    console.log(error.message);
  }
}

//add extra day to routine
export async function addDayToRoutine(
  data,
  docRef,
  days,
  setDay,
  setRoutineDone,
  setExerciseList
) {
  try {
    await db
      .collection('Routines')
      .doc(docRef)
      .collection('Exercises')
      .add(data)
      .then(() => alert(`Succesfullt add day ${data.day}/${days}`));

    setExerciseList([
      {
        exName: '',
        sets: '',
        repRange: '',
      },
    ]);

    if (Number(data.day) === Number(days)) {
      setRoutineDone(true);
    }
  } catch (error) {
    console.log(error.message);
  }
}

//records updat
export async function recordsUpdate(user, lift, rm) {
  //

  try {
    await db.collection('posts').add({
      uid: user.uid,
      created: FieldValue.serverTimestamp(),
      uPhoto: user.photoURL,
      likes: [],
      text: `${user.displayName} updated his 1rm with ${rm} kg on the ${lift}`,
      photoUrl: 'https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif',
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function follow(followerUid, profileUid, follow, setIsFollowing) {
  if (follow) {
    //follow
    try {
      //
      await db
        .collection('users')
        .doc(followerUid)
        .update('following', FieldValue.arrayUnion(profileUid));

      await db
        .collection('users')
        .doc(profileUid)
        .update('followers', FieldValue.arrayUnion(followerUid));

      setIsFollowing(true);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    //unfollow

    await db
      .collection('users')
      .doc(followerUid)
      .update('following', FieldValue.arrayRemove(profileUid));

    await db
      .collection('users')
      .doc(profileUid)
      .update('followers', FieldValue.arrayRemove(followerUid));

    setIsFollowing(false);
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
}

/**
 *chat
 */

// send message

export async function sendMessage(message, uid, chatId) {
  try {
    await db.collection('chat').doc(chatId).collection('messages').add({
      created: FieldValue.serverTimestamp(),
      message,
      uid,
    });

    await db.collection('chat').doc(chatId).update({
      lastUpdated: FieldValue.serverTimestamp(),
      lastMessage: message,
    });

    console.log('message send');
  } catch (error) {
    console.log(error.message);
  }
}

// add Contact
export async function addContact(user, uid, setIsLoaded) {
  //

  try {
    // add contact to your own connection
    await db
      .collection('users')
      .doc(user.uid)
      .update('chat', FieldValue.arrayUnion(uid));

    //add contact to other connection
    await db
      .collection('users')
      .doc(uid)
      .update('chat', FieldValue.arrayUnion(user.uid));

    //create chatroom for users
    await db.collection('chat').add({
      users: [user.uid, uid],
      created: FieldValue.serverTimestamp(),
      lastUpdated: FieldValue.serverTimestamp(),
      lastMessage: '',
    });

    setIsLoaded(true);
  } catch (error) {
    console.log(error.message);
  }
}

// delete contact
export async function deleteContact(user, uid, chatId, setIsDeleted) {
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update('chat', FieldValue.arrayRemove(uid));

    //add contact to other connection
    await db
      .collection('users')
      .doc(uid)
      .update('chat', FieldValue.arrayRemove(user.uid));

    await db
      .collection('chat')
      .doc(chatId)
      .delete()
      .then(() => {
        alert('user deleted succesfully');
      });

    setIsDeleted(true);
  } catch (error) {
    console.log(error.message);
  }
}

// CHECK duplicats
export async function checkDuplicates(col, check, setExists, setIsLoaded) {
  //check for duplicates in exercises
  await db
    .collection(col)
    .where('name', '==', check)
    .onSnapshot((snapshot) => {
      console.log(snapshot.empty);
    });

  setIsLoaded(true);
}

/**
 * Workouts
 */

//log a workout
export async function logWorkout(user, day, data, time) {
  //get name of exercise
  data.map((t) => console.log('naam:', t[0].exName));

  try {
    // add to workouts
    await db
      .collection('workouts')
      .doc(user.uid)
      .collection('workouts')
      .add({
        created: FieldValue.serverTimestamp(),
        dayName: day,
        time,
        log: data.map((arr) => ({ exercise: arr })),
      });

    // add posts
    await db.collection('posts').add({
      created: FieldValue.serverTimestamp(),
      uid: user.uid,
      uPhoto: user.photoURL,
      likes: [],
      text: `${user.displayName} has completed ${day} in ${time}`,
    });

    alert('succes!');
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Modify routine
 */

//modify routine
export async function modifyRoutine(data, id) {
  try {
    await db.collection('Routines').doc(id).update(data);

    alert('updated succesfully!');
  } catch (error) {
    console.log(error.message);
    alert('Oops, something went wrond!');
  }
}

//add extra day to routine
export async function modifyDayRoutine(
  data,
  id,
  setRoutineDone,
  day,
  days,
  dayId
) {
  try {
    await db
      .collection('Routines')
      .doc(id)
      .collection('Exercises')
      .doc(dayId)
      .update(data);

    alert(`Succesfully edited day ${day}/${days}`);
  } catch (error) {
    console.log(error.message);
    alert('Something went wrong!');
  }
}
