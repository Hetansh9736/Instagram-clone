import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Helper/Firebase';
import { setPosts, setLoading } from '../Slices/postSlice';

export const fetchAllPosts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const postsRef = collection(db, 'posts');
    const snapshot = await getDocs(postsRef);

    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis?.() || null, 
      };
    });

    dispatch(setPosts(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
