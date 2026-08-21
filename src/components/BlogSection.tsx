import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, BookOpen, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/treks';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <section id="blog-section" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Expert Insights & Advice
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight mt-1">
              Latest Trekking Guides
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Essential advice for trekking K2 Base Camp, obtaining visas, and mountain safety in Pakistan.
            </p>
          </div>

          <div className="hidden sm:block">
            <span className="text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1.5 border border-sky-200">
              Updated for 2026 Season
            </span>
          </div>
        </div>

        {/* 3-Column Blog Grid (Matching screenshot layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white  flex flex-col justify-between group hover:border-sky-500 transition-colors"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
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

                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base font-bold text-slate-900 line-clamp-2 hover:text-sky-600 cursor-pointer transition-colors"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full bg-slate-50 hover:bg-sky-500 hover:text-white text-sky-700 font-bold text-xs py-2 px-3  hover:border-sky-500 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-sky-500 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              aria-label="Close article modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-0.5 border border-sky-200">
                {selectedPost.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {selectedPost.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 pb-3 border-b border-slate-200">
                <span>By <strong>{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
                <span>• {selectedPost.date}</span>
                <span>• {selectedPost.readTime}</span>
              </div>
            </div>

            <div className="relative h-60 mb-6 bg-slate-100  overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              {selectedPost.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="bg-sky-50 border border-sky-200 p-4 mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 mb-1">
                  Need Personalized Advice?
                </h4>
                <p className="text-xs text-slate-700">
                  Our licensed mountain expedition leaders can review your training routine and gear checklist over a free WhatsApp video consultation.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="bg-slate-900 text-white font-bold text-xs px-4 py-2 hover:bg-slate-800 transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
