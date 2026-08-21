import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BLOG_POSTS, TREK_PACKAGES } from '../data/treks';
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  PhoneCall,
  MessageSquare
} from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };

  const post = BLOG_POSTS.find((p) => p.id === slug) || BLOG_POSTS[0];
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/blog" className="hover:text-sky-600">Trekking Guides</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">{post.title}</span>
        </div>

        {/* Article Container */}
        <article className="bg-white p-6 sm:p-10 mb-10">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2.5 py-1">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-3 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 mt-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span>By <strong>{post.author}</strong> ({post.authorRole})</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                {post.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xs text-slate-700 hover:text-sky-600 bg-slate-100 px-3 py-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="my-6 h-72 sm:h-96 overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Text */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Expert Callout Box */}
          <div className="mt-8 p-5 bg-sky-50 border-2 border-sky-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-1">
              Have Questions About This Route?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Our high-altitude guides and logistics managers in Skardu can provide up-to-the-minute weather, snow depth on passes, and customized gear reviews over WhatsApp.
            </p>
            <a
              href="https://wa.me/923009876543?text=Hi%20Karakoram%20Expeditions%2C%20I%20read%20your%20blog%20guide%20and%20have%20questions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with Expedition Leader</span>
            </a>
          </div>
        </article>

        {/* Other Guides */}
        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Other Helpful Expedition Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  router.push(`/blog/${p.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white hover:border-sky-500 cursor-pointer transition-colors"
              >
                <span className="text-[10px] font-bold text-sky-600 uppercase">{p.category}</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1 line-clamp-2">{p.title}</h4>
                <div className="text-[11px] text-slate-500 mt-2">{p.readTime} • {p.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default BlogPostPage;

