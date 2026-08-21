'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BLOG_POSTS } from '@/data/treks';
import { Calendar, Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react';

export const BlogPageClient: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Expedition Guides', 'Visa & Logistics', 'Health & Safety'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900">Pakistan Trekking Guides & Expedition Blog</span>
        </div>

        {/* Page Banner */}
        <div className="bg-sky-950 text-white p-6 sm:p-8  mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-sky-400">
            High Altitude Knowledge Base
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Pakistan Mountain Guides & Journal
          </h1>
          <p className="text-[13px] sm:text-[16px] text-slate-300 mt-2 max-w-2xl leading-relaxed">
            In-depth guides, visa procedures, training schedules, and gear packing lists curated by certified Karakoram mountain leaders.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white  p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 text-[13px] font-bold transition-colors cursor-pointer border ${
                  selectedCategory === c
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 pl-9 pr-3 py-1.5 text-[13px] text-slate-900 focus:bg-white focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white  flex flex-col justify-between hover:border-sky-500 transition-colors"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3 bg-sky-600 text-white text-[11px] font-bold px-2 py-0.5">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-600" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className="text-[16px] font-bold text-slate-900 hover:text-sky-600 cursor-pointer transition-colors"
                  >
                    {post.title}
                  </h2>

                  <p className="text-[13px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => router.push(`/blog/${post.id}`)}
                  className="w-full bg-slate-50 hover:bg-sky-500 hover:text-white text-sky-700 font-bold text-[13px] py-2 px-3  hover:border-sky-500 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Read Complete Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
