"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Recent Posts</h2>
        <div className="grid grid-cols-1 gap-6">
          {posts.length === 0 ? (
            <p className="text-gray-800">No posts available</p>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
                <div
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
