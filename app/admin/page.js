"use client";
import { useState, useEffect } from 'react';

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({ title: '', content: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleEdit = (index) => {
    setCurrentPost(posts[index]);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleNewPost = () => {
    setCurrentPost({ title: '', content: '' });
    setEditIndex(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedPosts = [...posts];
    if (editIndex !== null) {
      updatedPosts[editIndex] = currentPost;
    } else {
      updatedPosts.push(currentPost);
    }
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">Manage Posts</h2>
        <button
          onClick={handleNewPost}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-6"
        >
          New Post
        </button>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-gray-100">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.content}</p>
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {isEditing && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-gray-100">{editIndex !== null ? 'Edit Post' : 'New Post'}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="mb-4">
                  <label className="block text-gray-100 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentPost.title}
                    onChange={handleChange}
                    className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-100 mb-2">Content</label>
                  <textarea
                    name="content"
                    value={currentPost.content}
                    onChange={handleChange}
                    className="w-full border border-gray-600 rounded-lg p-2 bg-gray-700 text-white"
                    rows="10"
                  ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Save</button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
