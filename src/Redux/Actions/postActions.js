import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Helper/Firebase';
import { uploadToCloudinary } from '../../Utils/cloudinary';
import { addPost, setLoading } from '../Slices/postSlice';

export const createPost = (file, caption, userId, userName) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await uploadToCloudinary(file);
        const imageUrl = res.secure_url;

        const newPost = {
            imageUrl,
            caption,
            userId,
            userName,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'posts'), newPost);

        dispatch(addPost({ id: docRef.id, ...newPost }));
    } catch (err) {
        console.error('Error uploading post:', err);
    } finally {
        dispatch(setLoading(false));
    }
};
