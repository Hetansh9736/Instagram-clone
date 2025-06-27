import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Helper/Firebase';

const CommentBox = ({ postId, comments }) => {
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth.user);

  const handleComment = async () => {
    if (!comment.trim()) return;

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      text: comment,
      userId: user.uid,
      createdAt: serverTimestamp(),
      userName: user.name
    });

    setComment('');
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-[#2a2a2a] px-3 py-2 text-sm rounded text-white"
          placeholder="Write a comment..."
        />
        <button onClick={handleComment} className="text-sm bg-blue-600 px-4 py-2 rounded">
          Post
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        {comments.map((c) => (
          <p key={c.id}>
            <span className="text-white font-medium">{c.userName}</span>: {c.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
