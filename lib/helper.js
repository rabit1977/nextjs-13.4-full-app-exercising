import { collection, getDoc, query, where, limit } from 'firebase/firestore';
import { db } from './firebase';

export async function getUserWithUsername(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const userDoc = (await getDoc(q)).docs[0];
  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
