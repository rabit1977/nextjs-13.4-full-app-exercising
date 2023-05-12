import Link from 'next/link';
import UserNameForm from './(username)/[slug]/page';
import Auth from './Auth/page';

export default function Page({}) {
  return (
    <main className='relative w-full h-screen mx-4 mt-6'>
      <UserNameForm />
    </main>
  );
}
