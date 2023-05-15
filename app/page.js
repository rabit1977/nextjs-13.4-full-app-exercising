import UserNameForm from './(username)/[slug]/page';
import UserProfilePage from './(username)/page';

export default function Page({}) {
  return (
    <main className='relative w-full h-screen mx-4 mt-6'>
      <UserNameForm />
      <UserProfilePage />
    </main>
  );
}
