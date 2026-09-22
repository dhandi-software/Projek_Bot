import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "~/lib/utils";

const TOP_CATEGORIES = [
  { label: "Computer & Laptop", path: "/category/computer" },
  { label: "SmartPhone", path: "/category/phone" },
  { label: "Headphone", path: "/category/headphone" },
  { label: "Accessories", path: "/category/accessories", active: true },
  { label: "Camera & Photo", path: "/category/camera" },
  { label: "TV & Homes", path: "/category/tv" },
];

const QUICK_LINKS = [
  { label: "Shop Product", path: "/products" },
  { label: "Shopping Cart", path: "/cart" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "Compare", path: "/compare" },
  { label: "Track Order", path: "/track-order" },
  { label: "Customer Help", path: "/help" },
  { label: "About Us", path: "/about" },
];

const POPULAR_TAGS = [
  { label: "Game" },
  { label: "iPhone" },
  { label: "TV" },
  { label: "Asus Laptops" },
  { label: "Macbook" },
  { label: "SSD" },
  { label: "Graphics Card", active: true },
  { label: "Power Bank" },
  { label: "Smart TV" },
  { label: "Speaker" },
  { label: "Tablet" },
  { label: "Microwave" },
  { label: "Samsung" },
];

export function EcommerceFooter() {
  return (
    <footer className="w-full bg-[#191C1E] text-[#929FA5] pt-14 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Column 1: Branding & Contact */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <img
                src="/images/Logo_Bot.png"
                alt="Logo Bot"
                className="w-9 h-9 object-contain"
              />
              <span className="text-xl font-bold text-white tracking-wide">
                Dhandi Ecommerce
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-xs text-gray-400 font-medium block">
                Customer Supports:
              </span>
              <a
                href="tel:6295550129"
                className="text-white font-bold text-lg hover:text-[#FA8232] transition-colors block"
              >
                (629) 555-0129
              </a>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-[220px]">
              4517 Washington Ave. Manchester, Kentucky 39495
            </p>

            <a
              href="mailto:info@dhandi.com"
              className="text-xs text-white font-semibold block hover:text-[#FA8232] transition-colors pt-1"
            >
              info@dhandi.com
            </a>
          </div>

          {/* Column 2: TOP CATEGORY */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase">
              TOP CATEGORY
            </h3>
            <ul className="space-y-2.5 text-xs">
              {TOP_CATEGORIES.map((cat, idx) => (
                <li key={idx}>
                  {cat.active ? (
                    <Link
                      to={cat.path}
                      className="text-white font-semibold flex items-center gap-1.5 hover:text-[#EFD33D] transition-colors"
                    >
                      <span className="w-4 h-0.5 bg-[#EFD33D]" />
                      <span>{cat.label}</span>
                    </Link>
                  ) : (
                    <Link
                      to={cat.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {cat.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/products"
              className="text-[#EFD33D] font-semibold text-xs flex items-center gap-1 pt-1 hover:underline inline-flex"
            >
              <span>Browse All Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5 text-xs">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: DOWNLOAD APP */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase">
              DOWNLOAD APP
            </h3>
            <div className="space-y-3 pt-1">
              {/* Google Play Store Button */}
              <a
                href="#playstore"
                className="bg-[#303639] hover:bg-[#3d4448] text-white p-3 rounded-md flex items-center gap-3 w-[180px] shadow transition-colors cursor-pointer border border-gray-700/50 group"
              >
                <svg className="w-6 h-6 fill-current text-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M3.6 2.25c-.25.26-.4.65-.4 1.15v17.2c0 .5.15.89.4 1.15l.06.06L13.19 12.3v-.6L3.66 2.19l-.06.06zm11.77 11.23l-2.48-2.48v-.6l2.48-2.48 2.82 1.6c.8.46.8 1.21 0 1.67l-2.82 1.69zm-1.89-1.89L3.92 21.05l9.56-9.46zm0-1.18L13.48 2.95 3.92 12.41l9.56-1.99z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-gray-400 font-medium uppercase leading-tight">
                    Get it now
                  </span>
                  <span className="text-sm font-bold text-white leading-tight">
                    Google Play
                  </span>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href="#appstore"
                className="bg-[#303639] hover:bg-[#3d4448] text-white p-3 rounded-md flex items-center gap-3 w-[180px] shadow transition-colors cursor-pointer border border-gray-700/50 group"
              >
                <svg className="w-6 h-6 fill-current text-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3 .08 0 .17.01.25.01 1.09 0 2.2-.62 2.6-1.37z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-gray-400 font-medium uppercase leading-tight">
                    Get it now
                  </span>
                  <span className="text-sm font-bold text-white leading-tight">
                    App Store
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 5: POPULAR TAG */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-xs tracking-wider uppercase">
              POPULAR TAG
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {POPULAR_TAGS.map((tag, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "px-3 py-1.5 rounded-sm border text-xs cursor-pointer transition-all duration-200",
                    tag.active
                      ? "border-white text-white font-semibold bg-white/5"
                      : "border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white"
                  )}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-800/80 pt-6 text-center text-xs text-gray-500">
          <p>Kinbo - eCommerce Template © 2026. Design by Templatecookie</p>
        </div>
      </div>
    </footer>
  );
}
