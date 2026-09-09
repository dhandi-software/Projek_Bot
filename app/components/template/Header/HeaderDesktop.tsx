import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ArrowLeftRight,
  Headphones,
  HelpCircle,
  PhoneCall,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useCart } from "~/context/CartContext";

// Custom SVG components for Pinterest & Reddit icons
const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.065-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.4 2.967 7.4 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const RedditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.192-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.305.06.615.06.93 0 3.51-4.01 6.357-8.983 6.357-4.974 0-8.984-2.847-8.984-6.357 0-.315.02-.625.06-.93A1.751 1.751 0 0 1 1.06 12.04c0-.968.786-1.754 1.754-1.754.463 0 .884.182 1.193.491 1.194-.856 2.85-1.418 4.674-1.488l.942-4.41c.045-.21.23-.357.443-.357l3.036.638a1.245 1.245 0 0 1 1.061-.416zM8.07 14.524c-.732 0-1.326.594-1.326 1.326 0 .732.594 1.326 1.326 1.326.732 0 1.326-.594 1.326-1.326 0-.732-.594-1.326-1.326-1.326zm7.86 0c-.732 0-1.326.594-1.326 1.326 0 .732.594 1.326 1.326 1.326.732 0 1.326-.594 1.326-1.326 0-.732-.594-1.326-1.326-1.326zm-6.726 3.655c-.092 0-.173.04-.236.103a.333.333 0 0 0 .007.466c.866.866 2.502 1.042 3.025 1.042.523 0 2.159-.176 3.025-1.042a.333.333 0 0 0 .007-.466.333.333 0 0 0-.466-.007c-.642.642-1.928.847-2.566.847-.638 0-1.924-.205-2.566-.847a.326.326 0 0 0-.236-.096z"/>
  </svg>
);

export default function HeaderDesktop() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalCount, totalPrice, lastAddedItem } = useCart();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Eng");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string; category: string; price: string; image?: string; brand?: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const CATEGORIES = [
    { id: "computer-laptop", name: "Computer & Laptop" },
    { id: "computer-acc", name: "Computer Accessories" },
    { id: "smartphone", name: "Smartphone" },
    { id: "headphone", name: "Headphone" },
    { id: "mobile-acc", name: "Mobile Accessories" },
    { id: "gaming-console", name: "Gaming Console" },
    { id: "camera-photo", name: "Camera & Photo" },
    { id: "tv-appliances", name: "TV & Homes Appliances" },
    { id: "watches-acc", name: "Watchs & Accessories" },
    { id: "gps-navigation", name: "GPS & Navigation" },
    { id: "wearable-tech", name: "Warable Technology" },
  ];

  // Debounce search query input (300ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch search results from Backend API when debouncedQuery changes
  React.useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      setIsSearchDropdownOpen(false);
      return;
    }

    setIsSearching(true);
    fetch(`/api/products/search?q=${encodeURIComponent(debouncedQuery.trim())}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
        setIsSearchDropdownOpen(true);
      })
      .catch((err) => {
        console.error("Search API error:", err);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [debouncedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchDropdownOpen(false);
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    
    const queryString = params.toString();
    navigate(`/category-demo${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <header className="w-full font-sans shadow-xs">
      {/* 1. TOP BAR */}
      <div className="bg-[#1B6392] border-b border-white/10 text-xs py-2.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Welcome Text */}
          <p className="text-white/90 font-normal tracking-wide flex items-center gap-2">
            Welcome to Dhandi Eccomerce store.
            {lastAddedItem && (
              <span className="bg-amber-400 text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px] animate-bounce">
                + Item ditambahkan!
              </span>
            )}
          </p>

          {/* Right Socials & Selectors */}
          <div className="flex items-center gap-5">
            {/* Follow Us & Icons */}
            <div className="flex items-center gap-3">
              <span className="text-white/80">Follow us:</span>
              <div className="flex items-center gap-2.5 text-white/90">
                <a href="#twitter" className="hover:text-white transition-colors" title="Twitter">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href="#facebook" className="hover:text-white transition-colors" title="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href="#pinterest" className="hover:text-white transition-colors" title="Pinterest">
                  <PinterestIcon className="w-3.5 h-3.5" />
                </a>
                <a href="#reddit" className="hover:text-white transition-colors" title="Reddit">
                  <RedditIcon className="w-3.5 h-3.5" />
                </a>
                <a href="#youtube" className="hover:text-white transition-colors" title="YouTube">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a href="#instagram" className="hover:text-white transition-colors" title="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Vertical Separator Line */}
            <div className="h-3.5 w-[1px] bg-white/25" />

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-24 bg-white text-zinc-800 rounded-xs shadow-lg py-1 z-50 text-xs">
                  <button
                    onClick={() => { setSelectedLang("Eng"); setIsLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-100 font-medium"
                  >
                    Eng
                  </button>
                  <button
                    onClick={() => { setSelectedLang("ID"); setIsLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-100 font-medium"
                  >
                    Indo
                  </button>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors font-medium cursor-pointer"
              >
                <span>{selectedCurrency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isCurrencyOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-24 bg-white text-zinc-800 rounded-xs shadow-lg py-1 z-50 text-xs">
                  <button
                    onClick={() => { setSelectedCurrency("USD"); setIsCurrencyOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-100 font-medium"
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => { setSelectedCurrency("IDR"); setIsCurrencyOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-zinc-100 font-medium"
                  >
                    IDR (Rp)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="bg-[#1B6392] py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-full border-[3px] border-white flex items-center justify-center bg-white/10 transition-transform group-hover:scale-105">
              <div className="w-4 h-4 rounded-full bg-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                Dhandi
              </span>
              <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase leading-tight mt-0.5">
                Eccomerce
              </span>
            </div>
          </Link>

          {/* Full Search Bar with Debounce & Live Backend Results Overlay */}
          <div className="flex-1 min-w-[340px] max-w-2xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full bg-white rounded-md p-1 shadow-sm border border-white/20">
              {/* Full Width Search Input Field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setIsSearchDropdownOpen(true);
                }}
                placeholder="Search for anything..."
                className="w-full bg-transparent text-zinc-800 placeholder-zinc-400 text-sm px-4 py-2 focus:outline-none min-w-0"
              />

              {/* Search Button Component */}
              <Button 
                type="submit" 
                size="sm"
                className="bg-[#1B6392] hover:bg-[#134b70] text-white gap-2 px-5 rounded-sm shrink-0 cursor-pointer font-semibold"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Search</span>
              </Button>
            </form>

            {/* Debounced Search Results Dropdown Overlay */}
            {isSearchDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white text-zinc-800 rounded-md shadow-2xl border border-zinc-200 py-2 z-50 animate-in fade-in max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="px-4 py-3 text-xs text-zinc-500 flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-[#1B6392] border-t-transparent rounded-full animate-spin" />
                    <span>Mencari produk backend...</span>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-zinc-500">
                    Tidak ada produk ditemukan untuk "{debouncedQuery}"
                  </div>
                ) : (
                  <div>
                    <div className="px-4 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 flex items-center justify-between">
                      <span>Hasil Pencarian ({searchResults.length})</span>
                      <span className="text-[10px] text-zinc-400 font-normal">Live Debounce</span>
                    </div>
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setIsSearchDropdownOpen(false);
                          navigate(`/category-demo?search=${encodeURIComponent(item.title)}`);
                        }}
                        className="px-4 py-2.5 hover:bg-zinc-50 flex items-center gap-3 cursor-pointer transition-colors border-b border-zinc-50 last:border-0 group"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded border border-zinc-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-400 font-bold text-xs">
                            {item.brand ? item.brand[0] : "P"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-800 group-hover:text-[#1B6392] truncate transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                            <span className="bg-zinc-100 px-1.5 py-0.5 rounded text-[10px] text-zinc-600">
                              {item.category}
                            </span>
                            {item.brand && <span>• {item.brand}</span>}
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-[#1B6392] shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Cart Icon & Interactive Cart Header Preview */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative text-white hover:opacity-85 transition-opacity p-2 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer"
                title="Keranjang Belanja"
              >
                <ShoppingCart className="w-6 h-6 stroke-[1.75]" />
                <span className="absolute top-0 right-0 bg-amber-400 text-zinc-950 font-extrabold text-[10px] min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              </button>

              {/* Cart Dropdown Modal */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-3 w-84 bg-white text-zinc-800 rounded-lg shadow-2xl border border-zinc-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3">
                    <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[#1B6392]" />
                      Keranjang Belanja ({totalCount})
                    </h4>
                    <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-zinc-700 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {cartItems.length === 0 ? (
                      <p className="text-center py-6 text-xs text-zinc-400">Keranjang Anda masih kosong</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-md transition-colors group">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-11 h-11 rounded object-cover border border-zinc-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-zinc-800 truncate">{item.title}</p>
                            <p className="text-xs text-zinc-500">
                              {item.quantity} x {item.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                            title="Hapus barang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-zinc-100 pt-3 mt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm font-bold text-zinc-900">
                        <span>Subtotal:</span>
                        <span className="text-[#1B6392]">Rp {totalPrice.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button asChild variant="outline" size="sm" className="w-full text-xs border-zinc-300 hover:bg-zinc-100 text-zinc-800">
                          <Link to="/keranjang" onClick={() => setIsCartOpen(false)}>
                            Lihat Keranjang
                          </Link>
                        </Button>
                        <Button asChild variant="default" size="sm" className="w-full text-xs bg-[#1B6392] hover:bg-[#134b70] text-white">
                          <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                            Checkout
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Heart Icon */}
            <Link to="#" className="text-white hover:opacity-85 transition-opacity p-2 rounded-full hover:bg-white/10">
              <Heart className="w-6 h-6 stroke-[1.75]" />
            </Link>

            {/* Profile User Icon */}
            <Link to="/login" className="text-white hover:opacity-85 transition-opacity p-2 rounded-full hover:bg-white/10">
              <User className="w-6 h-6 stroke-[1.75]" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SUB-HEADER / CATEGORY BAR */}
      <div className="bg-white text-zinc-800 border-b border-zinc-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Side: All Category & Links */}
          <div className="flex items-center gap-6">
            {/* All Category Dropdown using Button Component */}
            <div className="relative">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 gap-2 font-medium px-4 rounded-xs border-0 shadow-none cursor-pointer"
              >
                <span>All Category</span>
                <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-zinc-200 rounded-md shadow-xl py-2 z-50 animate-in fade-in">
                  <p className="px-4 py-1.5 text-xs font-bold text-zinc-400 uppercase tracking-wider">Kategori Produk</p>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoryOpen(false);
                        navigate(`/category-demo?category=${encodeURIComponent(cat.name)}`);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown className="w-3 h-3 text-zinc-400 -rotate-90" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links with Lucide Icons */}
            <div className="flex items-center gap-6">
              <Link to="#" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Track Order</span>
              </Link>
              <Link to="#" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <ArrowLeftRight className="w-4 h-4 text-zinc-500" />
                <span>Compare</span>
              </Link>
              <Link to="#" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <Headphones className="w-4 h-4 text-zinc-500" />
                <span>Customer Support</span>
              </Link>
              <Link to="#" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <HelpCircle className="w-4 h-4 text-zinc-500" />
                <span>Need Help</span>
              </Link>
            </div>
          </div>

          {/* Right Side: Phone Contact Number */}
          <div className="flex items-center gap-2 text-zinc-800 text-sm font-medium">
            <PhoneCall className="w-4 h-4 text-zinc-700" />
            <span>+1-202-555-0104</span>
          </div>
        </div>
      </div>
    </header>
  );
}


