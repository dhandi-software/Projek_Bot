import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  MapPin,
  ArrowLeftRight,
  Heart,
  Headphones,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { getAvatarInitials } from "~/lib/avatar";

export default function HeaderMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const updatePhoto = () => {
      const savedPhoto = localStorage.getItem("userPhoto");
      setUserPhoto(savedPhoto || user?.photo || null);
    };
    updatePhoto();
    window.addEventListener("user-profile-updated", updatePhoto);
    return () => window.removeEventListener("user-profile-updated", updatePhoto);
  }, [user]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("smartphone");
  const [selectedBrand, setSelectedBrand] = useState("iPhone");

  const CATEGORIES = [
    { id: "computer-laptop", name: "Computer & Laptop", hasSubmenu: true },
    { id: "computer-acc", name: "Computer Accessories", hasSubmenu: true },
    { id: "smartphone", name: "SmartPhone", hasSubmenu: true },
    { id: "headphone", name: "Headphone", hasSubmenu: true },
    { id: "mobile-acc", name: "Mobile Accessories", hasSubmenu: true },
    { id: "gaming-console", name: "Gaming Console", hasSubmenu: true },
    { id: "camera-photo", name: "Camera & Photo", hasSubmenu: true },
    { id: "tv-appliances", name: "TV & Homes Appliances", hasSubmenu: true },
    { id: "watches-acc", name: "Watchs & Accessories", hasSubmenu: true },
    { id: "gps-navigation", name: "GPS & Navigation", hasSubmenu: true },
    { id: "wearable-tech", name: "Warable Technology", hasSubmenu: true },
  ];

  type FlyoutData = {
    brands: string[];
    featuredTitle: string;
    products: Array<{ title: string; price: string; oldPrice?: string; image: string }>;
    promo: { discount: string; description: string; startingPrice: string; image: string };
  };

  const CATEGORY_FLYOUT_DATA: Record<string, FlyoutData> = {
    "computer-laptop": {
      brands: ["All", "MacBook", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"],
      featuredTitle: "FEATURED COMPUTERS",
      products: [
        { title: "Apple MacBook Pro 16-inch M3 Max 36GB", price: "$3,499", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" },
        { title: "Dell XPS 15 OLED Touch Intel i9 32GB", price: "$1,899", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80" },
        { title: "ASUS ROG Zephyrus G14 Gaming Laptop", oldPrice: "$1800", price: "$1,499", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "20% Discount", description: "Supercharge your productivity with M-series & OLED Laptops.", startingPrice: "$899 USD", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" },
    },
    "computer-acc": {
      brands: ["All", "Logitech", "Razer", "Corsair", "Keychron", "SteelSeries", "Samsung"],
      featuredTitle: "FEATURED ACCESSORIES",
      products: [
        { title: "Logitech MX Master 3S Wireless Performance Mouse", price: "$99", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80" },
        { title: "Keychron K2 Wireless Mechanical Keyboard RGB", price: "$89", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80" },
        { title: "Samsung 980 PRO NVMe M.2 SSD 2TB", oldPrice: "$220", price: "$169", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "15% Discount", description: "Upgrade your desk setup with ultra ergonomic peripherals.", startingPrice: "$49 USD", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80" },
    },
    "smartphone": {
      brands: ["All", "iPhone", "Sansung", "Realme", "Xiaomi", "Oppo", "Vivo", "OnePlus"],
      featuredTitle: "FEATURED PHONES",
      products: [
        { title: "Samsung Electronics Samsung Galexy S21 5G", price: "$160", image: "/images/PS.png" },
        { title: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone", price: "$1,500", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80" },
        { title: "Sony DSCHX8 High Zoom Point & Shoot Camera", oldPrice: "$3200", price: "$2,300", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "21% Discount", description: "Escape the noise, It's time to hear the magic with Xiaomi Earbuds.", startingPrice: "$99 USD", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80" },
    },
    "headphone": {
      brands: ["All", "Sony", "Bose", "Sennheiser", "AirPods", "JBL", "Audio-Technica"],
      featuredTitle: "FEATURED AUDIO",
      products: [
        { title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: "$399", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" },
        { title: "Bose QuietComfort Ultra Headphones", price: "$379", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80" },
        { title: "Apple AirPods Pro 2nd Generation MagSafe", oldPrice: "$299", price: "$249", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "30% Discount", description: "Immerse in pure acoustic sound with active noise cancellation.", startingPrice: "$129 USD", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" },
    },
    "mobile-acc": {
      brands: ["All", "Anker", "Belkin", "Spigen", "Ugreen", "Baseus"],
      featuredTitle: "MOBILE ESSENTIALS",
      products: [
        { title: "Anker 737 Power Bank 24,000mAh 140W Fast Charging", price: "$129", image: "https://images.unsplash.com/photo-1609592424074-2790757754d9?auto=format&fit=crop&w=200&q=80" },
        { title: "Spigen MagSafe AirVent Car Mount Phone Holder", price: "$29", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=200&q=80" },
        { title: "Ugreen Nexode 65W GaN Fast Wall Charger 3-Port", oldPrice: "$50", price: "$39", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "25% Discount", description: "Keep your mobile devices powered up and protected anywhere.", startingPrice: "$19 USD", image: "https://images.unsplash.com/photo-1609592424074-2790757754d9?auto=format&fit=crop&w=200&q=80" },
    },
    "gaming-console": {
      brands: ["All", "PlayStation", "Xbox", "Nintendo", "Steam Deck", "ASUS ROG"],
      featuredTitle: "FEATURED GAMING",
      products: [
        { title: "Sony PlayStation 5 Slim Digital Edition Console", price: "$449", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=200&q=80" },
        { title: "Xbox Series X 1TB High-Performance Gaming Console", price: "$489", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=200&q=80" },
        { title: "Nintendo Switch OLED Model White Set", oldPrice: "$399", price: "$349", image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "18% Discount", description: "Level up your gaming experience with next-gen 4K consoles.", startingPrice: "$299 USD", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=200&q=80" },
    },
    "camera-photo": {
      brands: ["All", "Canon", "Sony", "Nikon", "Fujifilm", "DJI", "GoPro"],
      featuredTitle: "FEATURED CAMERAS",
      products: [
        { title: "Sony Alpha A7 IV Full-Frame Mirrorless Camera", price: "$2,498", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80" },
        { title: "Canon EOS R6 Mark II Mirrorless Body", price: "$2,299", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80" },
        { title: "DJI Mini 4 Pro Drone Fly More Combo", oldPrice: "$1099", price: "$959", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "15% Discount", description: "Capture breathtaking 4K video and pro photographs.", startingPrice: "$499 USD", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80" },
    },
    "tv-appliances": {
      brands: ["All", "Samsung", "LG", "Sony", "TCL", "Philips", "Dyson"],
      featuredTitle: "SMART HOME & TV",
      products: [
        { title: "LG C3 65-inch OLED 4K Smart TV Cinema HDR", price: "$1,599", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80" },
        { title: "Samsung Neo QLED 4K 55-inch Quantum HDR", price: "$1,299", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=200&q=80" },
        { title: "Dyson V15 Detect Cordless Vacuum Cleaner", oldPrice: "$749", price: "$649", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "22% Discount", description: "Transform your living room into a cinema smart home.", startingPrice: "$399 USD", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80" },
    },
    "watches-acc": {
      brands: ["All", "Apple Watch", "Garmin", "Samsung Watch", "Casio", "Fossil"],
      featuredTitle: "SMARTWATCHES",
      products: [
        { title: "Apple Watch Ultra 2 GPS + Cellular Titanium 49mm", price: "$799", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=200&q=80" },
        { title: "Garmin Fenix 7X Pro Sapphire Solar Multisport", price: "$899", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80" },
        { title: "Samsung Galaxy Watch 6 Classic 47mm LTE", oldPrice: "$420", price: "$349", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "20% Discount", description: "Track health metrics & stay connected right on your wrist.", startingPrice: "$199 USD", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=200&q=80" },
    },
    "gps-navigation": {
      brands: ["All", "Garmin", "TomTom", "Rand McNally", "Magellan", "Apple"],
      featuredTitle: "GPS & NAVIGATION",
      products: [
        { title: "Garmin DriveSmart 76 7-inch GPS Navigator", price: "$249", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80" },
        { title: "Garmin Zumo XT Motorcycle All-Terrain GPS", price: "$499", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=200&q=80" },
        { title: "Apple AirTag 4-Pack Bluetooth Item Tracker", oldPrice: "$119", price: "$99", image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "15% Discount", description: "High-precision satellite navigation for road trips & tracking.", startingPrice: "$149 USD", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80" },
    },
    "wearable-tech": {
      brands: ["All", "Meta Quest", "Oura", "Ray-Ban Meta", "XREAL", "Whoop"],
      featuredTitle: "WEARABLE TECH",
      products: [
        { title: "Meta Quest 3 128GB VR Mixed Reality Headset", price: "$499", image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=200&q=80" },
        { title: "Oura Ring Gen3 Horizon Smart Fitness Tracker", price: "$299", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80" },
        { title: "Ray-Ban Meta Smart Sunglasses Wayfarer Black", oldPrice: "$349", price: "$299", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80" },
      ],
      promo: { discount: "25% Discount", description: "Step into virtual reality & smart wearable optics.", startingPrice: "$249 USD", image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=200&q=80" },
    },
  };

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
          <img
            src="/images/Logo_Bot.png"
            alt="Logo Bot"
            className="w-10 h-10 object-contain"
          />
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

          <Link to={isAuthenticated ? "/profile" : "/login"} className="text-white hover:opacity-80 p-0.5 flex items-center justify-center">
            {userPhoto && userPhoto !== "/images/avatar.svg" ? (
              <img
                src={userPhoto}
                alt={user?.name || "User"}
                className="w-6 h-6 rounded-full object-cover border border-white/60 shadow-xs"
              />
            ) : user ? (
              <div className="w-6 h-6 rounded-full bg-emerald-400 text-zinc-950 font-black text-[10px] flex items-center justify-center uppercase">
                {getAvatarInitials(user.name)}
              </div>
            ) : (
              <User className="w-5 h-5" />
            )}
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
        <div className="bg-white text-zinc-800 border-t border-zinc-200 px-4 py-4 space-y-4 shadow-xl z-50 max-h-[85vh] overflow-y-auto">
          {/* All Category Section for Mobile */}
          <div className="border-b border-zinc-100 pb-3">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white px-4 py-2.5 rounded-md flex items-center justify-between text-sm font-semibold cursor-pointer shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4" />
                <span>All Category</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {isCategoryOpen && (
              <div className="mt-2.5 bg-zinc-50 rounded-lg p-2 border border-zinc-200 space-y-1.5 animate-in fade-in">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div key={cat.id} className="rounded-md overflow-hidden bg-white border border-zinc-100">
                      <button
                        onClick={() => {
                          if (cat.hasSubmenu) {
                            setSelectedCategory(isSelected ? null : cat.id);
                          } else {
                            setIsMenuOpen(false);
                            navigate(`/category-demo?category=${encodeURIComponent(cat.name)}`);
                          }
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                          isSelected
                            ? "bg-zinc-100 text-zinc-950 font-bold"
                            : "text-zinc-700 hover:bg-zinc-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.hasSubmenu && (
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isSelected ? "rotate-90 text-zinc-900" : "text-zinc-400"}`} />
                        )}
                      </button>

                      {/* Mobile Mega Submenu for Selected Category */}
                      {isSelected && (() => {
                        const flyoutData = CATEGORY_FLYOUT_DATA[cat.id] || CATEGORY_FLYOUT_DATA["smartphone"];
                        return (
                          <div className="p-3 bg-white border-t border-zinc-100 space-y-4 animate-in fade-in">
                            {/* Brand Pills */}
                            <div>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Brands</p>
                              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                                {flyoutData.brands.map((brand) => (
                                  <button
                                    key={brand}
                                    onClick={() => setSelectedBrand(brand)}
                                    className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0 ${
                                      selectedBrand === brand
                                        ? "bg-[#2DA5F3] text-white shadow-xs"
                                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                    }`}
                                  >
                                    {brand}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Featured Products Cards (450 x 450 images) */}
                            <div>
                              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">{flyoutData.featuredTitle}</p>
                              <div className="space-y-2.5">
                                {flyoutData.products.map((item, idx) => (
                                  <div
                                    key={idx}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      navigate(`/category-demo?search=${encodeURIComponent(item.title)}`);
                                    }}
                                    className="flex items-center gap-3.5 p-2.5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-white transition-colors cursor-pointer"
                                  >
                                    <div className="w-16 h-16 aspect-square rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-zinc-100">
                                      <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-semibold text-zinc-900 truncate">{item.title}</p>
                                      <div className="flex items-center gap-1.5 mt-1">
                                        {item.oldPrice && (
                                          <span className="text-[11px] text-zinc-400 line-through">{item.oldPrice}</span>
                                        )}
                                        <span className="text-xs font-bold text-[#2DA5F3]">{item.price}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Yellow Promo Banner Card (537 x 716 banner image) */}
                            <div className="bg-[#FAF0AF] rounded-2xl p-5 flex flex-col items-center text-center border border-amber-200/60 shadow-xs">
                              <div className="w-32 h-44 aspect-[3/4] my-2 flex items-center justify-center">
                                <img
                                  src={flyoutData.promo.image}
                                  alt="Promo"
                                  className="max-h-full max-w-full object-contain drop-shadow-lg rounded-xl"
                                />
                              </div>
                              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mt-1">{flyoutData.promo.discount}</h3>
                              <p className="text-xs text-zinc-700 leading-relaxed font-medium my-2 max-w-[220px]">
                                {flyoutData.promo.description}
                              </p>
                              <div className="text-xs text-zinc-700 font-medium my-2">
                                Starting price: <span className="bg-white text-zinc-900 font-bold px-3 py-1 rounded-md shadow-xs ml-1 border border-zinc-200/50">{flyoutData.promo.startingPrice}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  navigate("/category-demo");
                                }}
                                className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                              >
                                <span>SHOP NOW</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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
            <Link
              to="/track-order"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 text-sm p-2 rounded-lg transition-colors ${
                location.pathname === "/track-order"
                  ? "text-[#2DA5F3] font-bold bg-sky-50 border border-sky-200"
                  : "text-zinc-600 hover:text-[#1B6392]"
              }`}
            >
              <MapPin className={`w-4 h-4 ${location.pathname === "/track-order" ? "text-[#2DA5F3]" : "text-zinc-500"}`} />
              <span>Track Order</span>
            </Link>
            <Link
              to="/compare"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 text-sm p-2 rounded-lg transition-colors ${
                location.pathname === "/compare"
                  ? "text-[#2DA5F3] font-bold bg-sky-50 border border-sky-200"
                  : "text-zinc-600 hover:text-[#1B6392]"
              }`}
            >
              <ArrowLeftRight className={`w-4 h-4 ${location.pathname === "/compare" ? "text-[#2DA5F3]" : "text-zinc-500"}`} />
              <span>Compare</span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 text-sm p-2 rounded-lg transition-colors ${
                location.pathname === "/wishlist"
                  ? "text-[#2DA5F3] font-bold bg-sky-50 border border-sky-200"
                  : "text-zinc-600 hover:text-[#1B6392]"
              }`}
            >
              <Heart className={`w-4 h-4 ${location.pathname === "/wishlist" ? "text-[#2DA5F3]" : "text-zinc-500"}`} />
              <span>Wishlist</span>
            </Link>
            <Link
              to="/customer-support"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 text-sm p-2 rounded-lg transition-colors ${
                location.pathname === "/customer-support" || location.pathname === "/customer-services"
                  ? "text-[#2DA5F3] font-bold bg-sky-50 border border-sky-200"
                  : "text-zinc-600 hover:text-[#1B6392]"
              }`}
            >
              <Headphones className={`w-4 h-4 ${location.pathname === "/customer-support" || location.pathname === "/customer-services" ? "text-[#2DA5F3]" : "text-zinc-500"}`} />
              <span>Customer Support</span>
            </Link>
            <Link
              to="/need-help"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2.5 text-sm p-2 rounded-lg transition-colors ${
                location.pathname === "/need-help" || location.pathname === "/bantuan"
                  ? "text-[#2DA5F3] font-bold bg-sky-50 border border-sky-200"
                  : "text-zinc-600 hover:text-[#1B6392]"
              }`}
            >
              <HelpCircle className={`w-4 h-4 ${location.pathname === "/need-help" || location.pathname === "/bantuan" ? "text-[#2DA5F3]" : "text-zinc-500"}`} />
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


