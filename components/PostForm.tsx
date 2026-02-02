"use client";

import { useState, useEffect } from 'react';
import { Wand2, SpellCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Market');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem('post_draft');
      if (draft) {
        const { title, category, content, imageUrl } = JSON.parse(draft);
        if (title) setTitle(title);
        if (category) setCategory(category);
        if (content) setContent(content);
        if (imageUrl) setImageUrl(imageUrl);
      }
    } catch (e) {
      console.error('Failed to load draft', e);
    }
  }, []);

  // Save draft to localStorage whenever fields change
  useEffect(() => {
    try {
      const draft = { title, category, content, imageUrl };
      localStorage.setItem('post_draft', JSON.stringify(draft));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  }, [title, category, content, imageUrl]);

  const handleGrammarCheck = async () => {
    if (!content) return;
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/grammar', {
        method: 'POST',
        body: JSON.stringify({ text: content }),
      });
      const data = await res.json();
      if (data.corrected) {
        setContent(data.corrected);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!title) return;
    setLoadingImg(true);
    try {
      const res = await fetch('/api/ai/image', {
        method: 'POST',
        body: JSON.stringify({ prompt: title + ' ' + category }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingImg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, imageUrl }),
      });
      if (res.ok) {
        // Clear draft on successful submission
        localStorage.removeItem('post_draft');
        router.push('/');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Market</option>
            <option>Economy</option>
            <option>Corporate</option>
            <option>CareBiz</option>
            <option>General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
            <button
              type="button"
              onClick={handleGrammarCheck}
              disabled={loadingAi}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              {loadingAi ? <Loader2 className="animate-spin w-3 h-3" /> : <SpellCheck className="w-3 h-3" />}
              AI Grammar Check
            </button>
          </label>
          <textarea
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
            <button
              type="button"
              onClick={handleGenerateImage}
              disabled={loadingImg}
              className="ml-2 text-xs text-purple-600 hover:text-purple-800 inline-flex items-center gap-1"
            >
              {loadingImg ? <Loader2 className="animate-spin w-3 h-3" /> : <Wand2 className="w-3 h-3" />}
              AI Generate Image
            </button>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          {imageUrl && (
            <div className="mt-2 h-40 w-full bg-gray-100 rounded overflow-hidden">
              <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-700 text-white py-2 px-4 rounded font-bold hover:bg-blue-800 disabled:opacity-50"
        >
          {submitting ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}
