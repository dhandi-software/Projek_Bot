import React from "react";
import { User, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  commentsCount: number;
  image: string;
}

const LATEST_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    excerpt:
      "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
    author: "Kristin",
    date: "19Dec, 2013",
    commentsCount: 453,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "news-2",
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    excerpt:
      "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
    author: "Robert",
    date: "28 Nov, 2015",
    commentsCount: 738,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "news-3",
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    excerpt:
      "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
    author: "Arlene",
    date: "9 May, 2014",
    commentsCount: 826,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  },
];

export function LatestNewsSection() {
  return (
    <section className="w-full my-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">
        Latest News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LATEST_NEWS.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl border border-gray-200/80 p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
          >
            <div>
              {/* Cover Image */}
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Meta info row */}
              <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-3">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#FA8232]" />
                  <span>{article.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FA8232]" />
                  <span>{article.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#FA8232]" />
                  <span>{article.commentsCount}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base lg:text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#FA8232] transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-gray-500 line-clamp-3 mt-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Read More Button */}
            <Link
              to="/blog"
              className="mt-6 border border-[#FA8232]/40 text-[#FA8232] hover:bg-[#FA8232] hover:text-white font-bold text-xs uppercase px-5 py-2.5 rounded transition-all duration-200 inline-flex items-center gap-2 self-start group/btn"
            >
              <span>READ MORE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
