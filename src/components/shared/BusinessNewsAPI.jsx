// This file will fetch and display one random business news headline.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BusinessNews() {
  const [headline, setHeadline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'c8302a32cd3047588f78d1c3e68c3277';
        const category = 'business';

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
        );

        const articles = response.data.articles.filter(article => article.title && article.description);
        
        if (articles.length > 0) {
          const randomIndex = Math.floor(Math.random() * articles.length);
          setHeadline(articles[randomIndex]);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading business news...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching news. Please try again later.</div>;
  }
  
  if (!headline) {
    return <div className="text-center text-gray-500">No headlines available.</div>;
  }

  return (
    <div className="mt-0 p-2 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-[#334155] mb-4">Latest Business Headline</h3>
      <a href={headline.url} target="_blank" rel="noopener noreferrer" className="block">
        <h4 className="text-md font-semibold text-[#2563EB] hover:underline">{headline.title}</h4>
        {/* <p className="text-gray-600 text-sm mt-1">{headline.description}</p> */}
      </a>
    </div>
  );
}