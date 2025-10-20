"use client";

import { useState } from "react";
import axios from "axios";

interface ApiResponse {
  originalUrl: string;
  shortUrl: string;
}

export default function UrlForm() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const res = await axios.post<ApiResponse>("http://localhost:5000/shorten", {
        originalUrl: url,
      });
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to shorten URL");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-24 p-6 bg-white shadow-lg rounded-2xl text-center">
      <h1 className="text-3xl font-bold mb-4">🔗 Simple URL Shortener</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6">
          <p className="text-gray-600 mb-1">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
