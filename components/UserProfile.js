import React from 'react';

export default function UserProfile({ user }) {
  return (
    <div>
      <img src={user?.photoURL} alt={user?.username} />
      <p>
        <i>{user?.username}</i>
      </p>
      <h1>{user?.displayName}</h1>
    </div>
  );
}
