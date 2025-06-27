import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostUploadModal from '../Components/PostUpload';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Helper/Firebase';
import { Trash2 } from 'lucide-react';

const getInitial = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    if (!user?.uid) return;
    const q = query(collection(db, 'posts'), where('userId', '==', user.uid));
    const snap = await getDocs(q);
    const posts = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserPosts(posts.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
  };

  useEffect(() => {
    fetchUserPosts();
  }, [user?.uid]);

  const handleDeletePost = async (postId) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'posts', postId));
      setUserPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start items-center gap-10">
          <div className="w-36 h-36 rounded-full bg-[#333] flex items-center justify-center text-4xl font-bold border border-gray-600">
            {getInitial(user?.name || user?.email)}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <h2 className="text-2xl font-medium">{user?.name || 'User'}</h2>
            </div>
            <div className="flex gap-6 text-sm text-gray-300">
              <p><strong>{userPosts.length}</strong> posts</p>
            </div>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-[#262626]" />

        {/* Posts Grid */}
        {userPosts.length === 0 ? (
          <div className="text-center mt-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Share photos</h3>
            <p className="text-sm text-gray-400">When you share photos, they will appear on your profile.</p>
            <button
              className="mt-4 text-blue-500 text-sm font-medium hover:underline cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Share your first photo
            </button>
          </div>
        ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full">
  {userPosts.map((post) => (
    <div
      key={post.id}
      className="relative group border border-[#2c2c2c] rounded-lg overflow-hidden bg-[#111] flex flex-col"
    >
      <div className="w-full bg-black flex items-center justify-center max-h-96">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full max-h-96 object-contain"
        />
      </div>

      <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleDeletePost(post.id)}
          className="p-1 bg-black/60 hover:bg-black/80 rounded-full"
          title="Delete Post"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      <div className="p-2 text-sm text-gray-300 break-words">{post.caption}</div>
    </div>
  ))}
</div>

        )}
      </div>

      {isModalOpen && <PostUploadModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Profile;
