import { db } from './Firebase';

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
