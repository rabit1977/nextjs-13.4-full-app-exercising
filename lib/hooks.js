import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUserName] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot((db, ref), (doc) => {
        setUserName(doc.data()?.username);
      });
    } else {
      setUserName(null);
    }
    return unsubscribe;
  }, [user]);
  return { user, username };
}
