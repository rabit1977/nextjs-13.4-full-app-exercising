('use client');
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserProfilePage from './(username)/page';
import { UserContext } from '@/lib/context';
import { db } from '@/lib/firebase';
import {
  collectionGroup,
  doc,
  getDoc,
  limit,
  orderBy,
  startAfter,
  where,
} from 'firebase/firestore';
import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import PostFeed from '@/components/PostFeed';
import Loader from '@/components/Loader';

export function UserNameForm() {
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

const LIMIT = 1;

async function getData() {
  const postsQuery = collectionGroup(
    (db, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );
  const posts = await getDoc(postsQuery, docs.map(postJSON));
  return res.json(posts);
}

export default async function Home({ porps }) {
  const data = await getData();
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const pathname = usePathname();

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === 'number'
        ? from.Millis(last.createdAt)
        : last.createdAt;

    const query = collectionGroup(
      db,
      'posts',
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );
    const newPosts = await getDoc(
      query,
      docs.map((doc) => doc.data())
    );
    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main className='relative w-full h-screen mx-4 mt-6'>
      <Link href={{ pathname: '/[username]', query: { username: 'ebibi' } }}>
        <h1>Ebibi's Profile</h1>
      </Link>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}> Load more</button>
      )}
      <Loader show={loading} />
      {postEnd && 'You have reached the end!'}

      <UserNameForm />
      <UserProfilePage />
    </main>
  );
}
