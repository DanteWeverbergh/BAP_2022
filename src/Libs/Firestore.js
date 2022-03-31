import { useState } from 'react';
import { db } from './Firebase';

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

    alert('updated');
  } catch (error) {
    console.log(error.message);
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
