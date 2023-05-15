'use client';

import { UserContext } from '@/lib/context';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useEffect, useState } from 'react';

export default function UserNameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUserName(formValue);
  }, [formValue]);

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, `users/${user.uid}`);
    const usernameDoc = doc(db, `usernames/${formValue}`);
    const batch = batch(db);
    setDoc((batch, userDoc), {
      username: formValue,
      photoUrl: user.photoUrl,
      displayName: user.displayName,
    });
    setDoc((db, usernameDoc), { uid: user.uid });
    await batch.commit();
  };

  const checkUserName = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, `usernames/${username}`);
        const { exists } = await getDoc(ref);
        console.log('Firestore executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section className='mx-4'>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name='username'
            type='text'
            placeholder='username'
            value={formValue}
            onChange={onChange}
            className='px-3 py-1 mr-2 my-1 rounded-md'
          />
          <UserNameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button
            type='submit'
            className='bg-green-500 text-whhite px-3 py-1 rounded-md'
            disabled={!isValid}
          >
            Choose
          </button>
          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UserNameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    <p classname='text-green-600'>{username} is available!</p>;
  } else if (username && !isValid) {
    <p classname='text-red-600'>That username is taken!</p>;
  } else {
    <p></p>;
  }
}
