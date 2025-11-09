import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPosts } from '../api/posts';
import { categories } from '../data/meta';
import PostCard from '../components/PostCard';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HomePage: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const allPosts = getAllPosts();

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search/${query.trim()}`);
      }
    };
  
    const newPosts = [...allPosts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 6);
    const topDownloaded = [...allPosts].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
    const featuredCategories = categories.filter(c => c.isFeatured);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          NEW ERA ORIENTATION
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-8">
          Tìm kiếm tài liệu, bài giảng, và đề thi cho Lập trình, Thuật toán, và Tin học văn phòng.
        </p>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bạn muốn học gì hôm nay?"
            className="w-full px-6 py-4 text-lg rounded-l-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button type="submit" className="px-6 py-4 bg-cyan-600 text-white rounded-r-full hover:bg-cyan-700 transition-colors flex items-center">
            <SearchIcon />
            <span className="ml-2 hidden md:inline"></span>
          </button>
        </form>
      </section>
      
      {/* New Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Bài viết mới nhất</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Chuyên đề nổi bật</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map(cat => (
            <div key={cat.id} className="p-6 bg-cyan-500 dark:bg-cyan-700 rounded-lg text-white hover:bg-cyan-600 dark:hover:bg-cyan-800 transition-all cursor-pointer" onClick={() => navigate(`/category/${cat.slug}`)}>
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="mt-2 opacity-80">Khám phá các bài viết trong chuyên đề này.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Downloaded */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Tài liệu tải nhiều</h2>
        <div className="space-y-4">
            {topDownloaded.map(post => (
                <div key={post.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-lg">
                           <Link to={`/article/${post.slug}`} className="hover:text-cyan-500">{post.title}</Link>
                        </h4>
                        <p className="text-sm text-slate-500">{post.downloads.toLocaleString()} lượt tải</p>
                    </div>
                     <Link to={`/article/${post.slug}`} className="px-4 py-2 bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 rounded-md font-semibold hover:bg-cyan-200 transition-colors">Xem & Tải</Link>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;