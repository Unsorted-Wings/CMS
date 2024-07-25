"use client";
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    setEditIndex(index);
    setTitle(posts[index].title);
    setContent(posts[index].content);
  };

  const handleNewPost = () => {
    setEditIndex(null);
    setTitle('');
    setContent('');
  };

  const handleSave = () => {
    const newPost = { title, content };
    if (editIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = newPost;
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    } else {
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
    handleNewPost();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Posts</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-red-600 transition ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">{editIndex !== null ? 'Edit Post' : 'New Post'}</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 mb-4 bg-white text-gray-900 rounded-lg border border-gray-300"
          />
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            config={{
              toolbar: [
                'heading', '|',
                'bold', 'italic', 'link', '|',
                'bulletedList', 'numberedList', '|',
                'blockQuote','imageUpload', 'mediaEmbed', '|',
                'undo', 'redo', '|',
                'fontColor', 'fontBackgroundColor' // Add font color and background color
              ],
              contentStyle: {
                'color': 'black'
              }
            }}
            className="bg-white text-gray-900 rounded-lg border border-gray-300"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
