// src/pages/admin/new.js
"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save post to database
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = [...savedPosts, { title, content }];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setTitle('');
    setContent('');
    console.log({ title, content });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">New Post</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="bg-gray-700 text-white"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
