import React from 'react';

export default function Loader({ show }) {
  return show ? <div className='loader grid place-items-center '></div> : null;
}
