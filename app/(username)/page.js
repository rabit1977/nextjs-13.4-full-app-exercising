import PostFeed from '@/components/PostFeed';
import UserProfile from '@/components/UserProfile';
import React from 'react';

export default function UserProfilePage({ user, posts }) {
  return (
    <div>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </div>
  );
}
