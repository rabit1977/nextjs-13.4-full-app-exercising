'use client';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Auth from './Auth/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  const userData = useUserData();
  return (
    <html lang='en'>
      <body className={`${inter.className} h-screen`}>
        <UserContext.Provider value={{ userData }}>
          <Navbar />
          <Auth />
          <Loader />
          {children}
          <Toaster />
        </UserContext.Provider>
      </body>
    </html>
  );
}
