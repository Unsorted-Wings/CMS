// pages/admin/new.js
"use client";
import { useState } from 'react';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      const newPost = { title, content };
      const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = [...savedPosts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setTitle('');
      setContent('');
      setMessage('Post saved successfully!');
    } else {
      setMessage('Please fill in both fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Create a New Post</h2>
        {message && <div className="mb-4 text-green-500">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-200 bg-gray-700 text-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-600 rounded-lg p-3 focus:ring focus:ring-blue-200 bg-gray-700 text-gray-100"
              rows="10"
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">Save Post</button>
        </form>
      </div>
    </div>
  );
}
