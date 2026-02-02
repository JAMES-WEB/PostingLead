"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

export default function LeadForm() {
  const [isOpen, setIsOpen] = useState(true); // Open by default for demo
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-50 font-bold"
    >
      Subscribe for Updates
    </button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:right-8 bg-white p-6 rounded-lg shadow-2xl border border-blue-100 z-50 w-80">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>

      {!submitted ? (
        <>
          <h3 className="font-bold text-lg mb-2 text-blue-900">Get Market Insights</h3>
          <p className="text-sm text-gray-600 mb-4">Subscribe to get daily business news and opportunities directly to your inbox/whatsapp.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="WhatsApp Number (Optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
            >
              Subscribe Now
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="text-green-500 font-bold text-xl mb-2">Thank You!</div>
          <p className="text-sm text-gray-600">You have successfully subscribed.</p>
        </div>
      )}
    </div>
  );
}
