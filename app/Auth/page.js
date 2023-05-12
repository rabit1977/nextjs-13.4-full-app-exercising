'use client';
import { auth, provider } from '@/lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

export default function Auth() {
  const user = null;
  const username = null;

  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SigninButton />
      )}
    </main>
  );
}

/* Sign in with Google button */

function SigninButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <button
      className=' mt-8 mx-4 py-3 px-8 space-x-2 flex items-center bg-slate-50 text-xl text-slate-700 font-semibold shadow rounded-md'
      onClick={signInWithGoogle}
    >
      <FcGoogle size={50} />
      <h1>Sign in with Google</h1>
    </button>
  );
}
/* Signout from Google account */
function SignOutButton() {
  return (
    <button
      className='py-3 px-8 bg-blue-700 text-xl text-white rounded-md'
      onClick={() => signOut(auth)}
    >
      Sign out
    </button>
  );
}
function UserNameForm() {}
