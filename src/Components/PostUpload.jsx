import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../Redux/Actions/postActions';
import imageCompression from 'browser-image-compression';

export default function NewPostModal({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

 const handleFileChange = async (e) => {
  const selected = e.target.files[0];
  if (!selected) return;

  try {
    console.log('Selected file type:', selected.type); // Debug line for Android issues

    let compressedFile = selected;

    // Try compression only for supported image types
    if (
      selected.type === 'image/jpeg' ||
      selected.type === 'image/jpg' ||
      selected.type === 'image/png'
    ) {
      try {
        compressedFile = await imageCompression(selected, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
      } catch (compressionError) {
        console.warn('Image compression failed. Using original file.');
      }
    }

    setFile(compressedFile);
  } catch (err) {
    console.error('File selection failed:', err);
    alert('Selected image format might not be supported.');
  }
};



  const handleSubmit = () => {
    if (!file) return alert('Select an image or video');
    dispatch(createPost(file, caption, user.uid, user.name));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-[#111] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-white text-xl mb-4">Share to</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 text-white"
        />
        <input
          type="text"
          placeholder="Write a caption..."
          className="w-full p-2 rounded bg-[#222] text-white mb-4"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 text-gray-300" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
