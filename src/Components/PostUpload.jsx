import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../Redux/Actions/postActions';

export default function NewPostModal({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

  const handleSubmit = () => {
    if (!file) return alert('Please select an image.');
    if (!caption.trim()) return alert('Please enter a caption.');

    dispatch(createPost(file, caption.trim(), user.uid, user.name));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-white text-xl mb-4 text-center">Share a New Post</h2>

        {file && (
          <div className="mb-4 rounded border border-gray-700 overflow-hidden">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full object-contain max-h-64"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="mb-4 w-full text-white file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
        />

        <input
          type="text"
          placeholder="Write a caption..."
          className="w-full p-2 rounded bg-[#222] text-white mb-4"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-gray-300 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
