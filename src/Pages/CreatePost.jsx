import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../Redux/Actions/postActions';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.post.loading);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(selected.type)) {
      alert('Only JPG and PNG images are allowed.');
      return;
    }

    setFile(selected);
  };

  const handlePost = () => {
    if (!file) {
      alert('Please select an image.');
      return;
    }

    if (!caption.trim()) {
      alert('Please write a caption.');
      return;
    }

    dispatch(createPost(file, caption.trim(), user.uid, user.name));
    navigate('/dashboard/profile');
  };

  const isPostDisabled = loading || !file || !caption.trim();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center">Create New Post</h2>

        {file && (
          <div className="w-full aspect-square overflow-hidden rounded-lg border border-[#2a2a2a]">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-contain bg-black"
            />
          </div>
        )}

        <div className="space-y-1 text-sm">
          <label className="block text-gray-300">Select Image</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block text-gray-300">Caption</label>
          <textarea
            rows={3}
            maxLength={2200}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
            placeholder="Write a caption..."
            className="w-full bg-[#1f1f1f] text-white px-3 py-2 rounded resize-none border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-right text-xs text-gray-500">{caption.length}/2200</p>
        </div>

        <button
          onClick={handlePost}
          disabled={isPostDisabled}
          className={`w-full py-2 rounded font-medium transition ${
            isPostDisabled
              ? 'bg-gray-700 cursor-not-allowed text-gray-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Posting...' : 'Share Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
