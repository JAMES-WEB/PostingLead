"use client";

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

export default function NewsGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading news...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.length === 0 ? (
        <div className="col-span-3 text-center text-gray-500 py-10">No news posts yet. Be the first to post!</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              {post.imageUrl ? (
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
              <span className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 uppercase font-bold">
                {post.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.content}</p>
              <div className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
