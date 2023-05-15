import { getUserWithUsername } from '@/lib/helper';
import {
  collection,
  getDoc,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

export const GET = async (request) => {
  try {
    const { username } = query;
    const userDoc = await getUserWithUsername(username);
    let user = null;
    let posts = null;

    if (userDoc) {
      user = userDoc.data();
      const postsQuery = userDoc(
        collection(ref, posts),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      posts = await getDoc(postsQuery, docs.map(postToJSON));
    }

    return new Response(JSON.stringify(user, posts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all posts', { status: 500 });
  }
};
