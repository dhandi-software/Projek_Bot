import React from "react";
import { User, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { NewsArticle } from "../HomeDesktop/LatestNewsSection";

const LATEST_NEWS_MOBILE: NewsArticle[] = [
  {
    id: "news-1-mob",
    title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    excerpt:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus.",
    author: "Kristin",
    date: "19Dec, 2013",
    commentsCount: 453,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "news-2-mob",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    excerpt:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae.",
    author: "Robert",
    date: "28 Nov, 2015",
    commentsCount: 738,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "news-3-mob",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    excerpt:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis.",
    author: "Arlene",
    date: "9 May, 2014",
    commentsCount: 826,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
];

export function LatestNewsSectionMobile() {
  return (
    <section className="w-full my-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 text-center">
        Latest News
      </h2>

      <div className="space-y-4">
        {LATEST_NEWS_MOBILE.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-full h-44 rounded-lg overflow-hidden mb-3 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium mb-2">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-[#FA8232]" />
                  <span>{article.author}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#FA8232]" />
                  <span>{article.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-[#FA8232]" />
                  <span>{article.commentsCount}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <Link
              to="/blog"
              className="mt-4 border border-[#FA8232]/40 text-[#FA8232] hover:bg-[#FA8232] hover:text-white font-bold text-[11px] uppercase px-4 py-2 rounded transition-colors inline-flex items-center gap-1.5 self-start"
            >
              <span>READ MORE</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
