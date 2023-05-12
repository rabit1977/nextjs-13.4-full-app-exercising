'use client';

import { toast } from 'react-hot-toast';

export default function Button() {
  return (
    <button
      onClick={() => toast.success('hello toast!')}
      className='py-3 px-8 bg-blue-700 text-xl text-white rounded-md mt-12 mx-4'
    >
      Toast me
    </button>
  );
}
