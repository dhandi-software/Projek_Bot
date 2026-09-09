import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ArrowLeftRight,
  Headphones,
  HelpCircle,
  PhoneCall
} from "lucide-react";
import { Button } from "~/components/ui/button";

export default function HeaderMobile() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string; category: string; price: string; image?: string; brand?: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
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
      })
      .catch((err) => {
        console.error("Mobile search API error:", err);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [debouncedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate(`/category-demo?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="w-full bg-[#1B6392] text-white shadow-xs">
      {/* Top Mobile Bar */}
      <div className="px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border-[2.5px] border-white flex items-center justify-center bg-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white leading-none">
              Dhandi
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-white/80 uppercase leading-none mt-0.5">
              Eccomerce
            </span>
          </div>
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white hover:opacity-80 p-1 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative text-white hover:opacity-80 p-1 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 font-extrabold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <Link to="/login" className="text-white hover:opacity-80 p-1">
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:opacity-80 p-1 cursor-pointer"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar with Button Component & Live Debounce Results */}
      {isSearchOpen && (
        <div className="px-4 pb-3 relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-white rounded-md p-1 shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anything..."
              className="w-full bg-transparent text-zinc-800 placeholder-zinc-400 text-xs px-3 py-1.5 focus:outline-none min-w-0"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-[#1B6392] hover:bg-[#134b70] text-white px-3 h-7 text-xs rounded-sm shrink-0 font-medium"
            >
              <Search className="w-3.5 h-3.5" />
            </Button>
          </form>

          {/* Live Mobile Search Results Dropdown */}
          {debouncedQuery.trim() !== "" && (
            <div className="mt-1.5 bg-white text-zinc-800 rounded-md shadow-2xl border border-zinc-200 py-2 z-50 animate-in fade-in max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="px-3 py-2 text-xs text-zinc-500 flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#1B6392] border-t-transparent rounded-full animate-spin" />
                  <span>Mencari...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="px-3 py-2 text-xs text-zinc-500">
                  Tidak ada hasil untuk "{debouncedQuery}"
                </div>
              ) : (
                <div>
                  <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
                    Hasil Pencarian ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/category-demo?search=${encodeURIComponent(item.title)}`);
                      }}
                      className="px-3 py-2 hover:bg-zinc-50 flex items-center justify-between text-xs cursor-pointer border-b border-zinc-50 last:border-0"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="font-semibold text-zinc-800 truncate">{item.title}</p>
                        <p className="text-[10px] text-zinc-500">{item.category}</p>
                      </div>
                      <span className="font-bold text-[#1B6392] shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Cart Modal Drawer */}
      {isCartOpen && (
        <div className="bg-white text-zinc-800 border-t border-zinc-200 px-4 py-3 space-y-3 shadow-xl z-50 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h4 className="font-bold text-xs text-zinc-900 flex items-center gap-2">
              <ShoppingCart className="w-3.5 h-3.5 text-[#1B6392]" />
              Keranjang Belanja (2)
            </h4>
            <button onClick={() => setIsCartOpen(false)} className="text-zinc-400 hover:text-zinc-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-zinc-700">
              <span>⌚ Smart Watch Series 7 (x1)</span>
              <span className="ml-auto font-semibold">Rp 450.000</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-700">
              <span>🎧 Headphone Noise Cancelling (x1)</span>
              <span className="ml-auto font-semibold">Rp 850.000</span>
            </div>
          </div>
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold">
            <span>Subtotal:</span>
            <span className="text-[#1B6392]">Rp 1.300.000</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button asChild variant="outline" size="sm" className="w-full text-xs">
              <Link to="/keranjang" onClick={() => setIsCartOpen(false)}>
                Lihat Keranjang
              </Link>
            </Button>
            <Button asChild variant="default" size="sm" className="w-full text-xs bg-[#1B6392] hover:bg-[#134b70]">
              <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                Checkout
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="bg-white text-zinc-800 border-t border-zinc-200 px-4 py-4 space-y-4 shadow-xl z-50">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Quick Navigation</p>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-medium text-zinc-800 hover:text-[#1B6392]">Home</Link>
            <Link to="/guide" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-medium text-zinc-800 hover:text-[#1B6392]">Panduan</Link>
            <Link to="/requirements" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-medium text-zinc-800 hover:text-[#1B6392]">Persyaratan</Link>
            <Link to="/format" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-medium text-zinc-800 hover:text-[#1B6392]">Format</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block py-1.5 text-sm font-medium text-zinc-800 hover:text-[#1B6392]">FAQ</Link>
          </div>

          <div className="border-t border-zinc-100 pt-3 space-y-3">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Services</p>
            <Link to="#" className="flex items-center gap-2.5 text-sm text-zinc-600">
              <MapPin className="w-4 h-4 text-zinc-500" />
              <span>Track Order</span>
            </Link>
            <Link to="#" className="flex items-center gap-2.5 text-sm text-zinc-600">
              <ArrowLeftRight className="w-4 h-4 text-zinc-500" />
              <span>Compare</span>
            </Link>
            <Link to="#" className="flex items-center gap-2.5 text-sm text-zinc-600">
              <Headphones className="w-4 h-4 text-zinc-500" />
              <span>Customer Support</span>
            </Link>
            <Link to="#" className="flex items-center gap-2.5 text-sm text-zinc-600">
              <HelpCircle className="w-4 h-4 text-zinc-500" />
              <span>Need Help</span>
            </Link>
          </div>

          <div className="border-t border-zinc-100 pt-3 flex items-center gap-2 text-zinc-800 text-sm font-medium">
            <PhoneCall className="w-4 h-4 text-zinc-700" />
            <span>+1-202-555-0104</span>
          </div>
        </div>
      )}
    </header>
  );
}


