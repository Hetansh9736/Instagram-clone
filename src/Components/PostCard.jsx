import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../Helper/Firebase';
import CommentBox from './CommentBox';

const PostCard = ({ post }) => {
  const user = useSelector((state) => state.auth.user);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const postRef = doc(db, 'posts', post.id);
  const isLiked = likes.some((like) => like.userId === user?.uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(postRef, 'likes'), (snap) => {
      setLikes(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [post.id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(postRef, 'comments'), (snap) => {
      setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [post.id]);

  const toggleLike = async () => {
    const likesRef = collection(postRef, 'likes');
    const q = query(likesRef, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      snapshot.forEach((docLike) => deleteDoc(docLike.ref));
    } else {
      await addDoc(likesRef, {
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-sm">
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="text-gray-400 text-xs">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
          </span>

          <span>{likes.length} {likes.length === 1 ? 'like' : 'likes'}</span>
        </div>

        <p className="text-white text-sm">{post.caption}</p>

        <div className="flex gap-6 items-center text-gray-300 mt-2">
          <button onClick={toggleLike} className="flex items-center gap-1 hover:text-red-500">
            <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} /> Like
          </button>
          <button onClick={() => setShowComments((prev) => !prev)} className="flex items-center gap-1 hover:text-blue-400">
            <MessageCircle size={18} /> Comment
          </button>
        </div>

        {showComments && (
          <CommentBox postId={post.id} comments={comments} />
        )}
      </div>
    </div>
  );
};

export default PostCard;
