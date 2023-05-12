import { UserContext } from '@/lib/context';
import Link from 'next/link';
import { useContext } from 'react';

// Navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className='bg-slate-50 shadow'>
      <ul className='p-4 flex justify-between w-full'>
        <li>
          <Link href='/'>
            <button className='py-3 px-8 bg-black text-xl text-white rounded-md'>
              Feed
            </button>
          </Link>
        </li>
        {/* user is signed in and has username */}
        {username && (
          <>
            <li>
              <Link href='/admin'>
                <button className='py-3 px-8 bg-blue-700 text-xl text-white rounded-md'>
                  Write Post
                </button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoUrl} alt={username} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed or has not created username */}
        {!username && (
          <li>
            <Link href='/'>
              <button className='py-3 px-8 bg-blue-700 text-xl text-white rounded-md'>
                {' '}
                Log in
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
