import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronRight,
  ArrowRight,
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
import { useAuth } from "~/hooks/useAuth";
import { getAvatarInitials } from "~/lib/avatar";

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
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, removeFromCart, totalCount, totalPrice, lastAddedItem } = useCart();
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

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Eng");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string; category: string; price: string; image?: string; brand?: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("smartphone");
  const [activeBrand, setActiveBrand] = useState<string>("iPhone");

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
        {
          title: "Apple MacBook Pro 16-inch M3 Max 36GB",
          price: "$3,499",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Dell XPS 15 OLED Touch Intel i9 32GB",
          price: "$1,899",
          image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "ASUS ROG Zephyrus G14 Gaming Laptop",
          oldPrice: "$1800",
          price: "$1,499",
          image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "20% Discount",
        description: "Supercharge your productivity with M-series & OLED Laptops.",
        startingPrice: "$899 USD",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80",
      },
    },
    "computer-acc": {
      brands: ["All", "Logitech", "Razer", "Corsair", "Keychron", "SteelSeries", "Samsung"],
      featuredTitle: "FEATURED ACCESSORIES",
      products: [
        {
          title: "Logitech MX Master 3S Wireless Performance Mouse",
          price: "$99",
          image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Keychron K2 Wireless Mechanical Keyboard RGB",
          price: "$89",
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Samsung 980 PRO NVMe M.2 SSD 2TB",
          oldPrice: "$220",
          price: "$169",
          image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "15% Discount",
        description: "Upgrade your desk setup with ultra ergonomic peripherals.",
        startingPrice: "$49 USD",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80",
      },
    },
    "smartphone": {
      brands: ["All", "iPhone", "Sansung", "Realme", "Xiaomi", "Oppo", "Vivo", "OnePlus", "Huawei", "Infinix", "Tecno"],
      featuredTitle: "FEATURED PHONES",
      products: [
        {
          title: "Samsung Electronics Samsung Galexy S21 5G",
          price: "$160",
          image: "/images/PS.png",
        },
        {
          title: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
          price: "$1,500",
          image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80",
        },
        {
          title: "Sony DSCHX8 High Zoom Point & Shoot Camera",
          oldPrice: "$3200",
          price: "$2,300",
          image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80",
        },
      ],
      promo: {
        discount: "21% Discount",
        description: "Escape the noise, It's time to hear the magic with Xiaomi Earbuds.",
        startingPrice: "$99 USD",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
      },
    },
    "headphone": {
      brands: ["All", "Sony", "Bose", "Sennheiser", "AirPods", "JBL", "Audio-Technica"],
      featuredTitle: "FEATURED AUDIO",
      products: [
        {
          title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
          price: "$399",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Bose QuietComfort Ultra Headphones",
          price: "$379",
          image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Apple AirPods Pro 2nd Generation MagSafe",
          oldPrice: "$299",
          price: "$249",
          image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "30% Discount",
        description: "Immerse in pure acoustic sound with active noise cancellation.",
        startingPrice: "$129 USD",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
      },
    },
    "mobile-acc": {
      brands: ["All", "Anker", "Belkin", "Spigen", "Ugreen", "Baseus"],
      featuredTitle: "MOBILE ESSENTIALS",
      products: [
        {
          title: "Anker 737 Power Bank 24,000mAh 140W Fast Charging",
          price: "$129",
          image: "https://images.unsplash.com/photo-1609592424074-2790757754d9?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Spigen MagSafe AirVent Car Mount Phone Holder",
          price: "$29",
          image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Ugreen Nexode 65W GaN Fast Wall Charger 3-Port",
          oldPrice: "$50",
          price: "$39",
          image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "25% Discount",
        description: "Keep your mobile devices powered up and protected anywhere.",
        startingPrice: "$19 USD",
        image: "https://images.unsplash.com/photo-1609592424074-2790757754d9?auto=format&fit=crop&w=200&q=80",
      },
    },
    "gaming-console": {
      brands: ["All", "PlayStation", "Xbox", "Nintendo", "Steam Deck", "ASUS ROG"],
      featuredTitle: "FEATURED GAMING",
      products: [
        {
          title: "Sony PlayStation 5 Slim Digital Edition Console",
          price: "$449",
          image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Xbox Series X 1TB High-Performance Gaming Console",
          price: "$489",
          image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Nintendo Switch OLED Model White Set",
          oldPrice: "$399",
          price: "$349",
          image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "18% Discount",
        description: "Level up your gaming experience with next-gen 4K consoles.",
        startingPrice: "$299 USD",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=200&q=80",
      },
    },
    "camera-photo": {
      brands: ["All", "Canon", "Sony", "Nikon", "Fujifilm", "DJI", "GoPro"],
      featuredTitle: "FEATURED CAMERAS",
      products: [
        {
          title: "Sony Alpha A7 IV Full-Frame Mirrorless Camera",
          price: "$2,498",
          image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Canon EOS R6 Mark II Mirrorless Body",
          price: "$2,299",
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "DJI Mini 4 Pro Drone Fly More Combo",
          oldPrice: "$1099",
          price: "$959",
          image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "15% Discount",
        description: "Capture breathtaking 4K video and pro photographs.",
        startingPrice: "$499 USD",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80",
      },
    },
    "tv-appliances": {
      brands: ["All", "Samsung", "LG", "Sony", "TCL", "Philips", "Dyson"],
      featuredTitle: "SMART HOME & TV",
      products: [
        {
          title: "LG C3 65-inch OLED 4K Smart TV Cinema HDR",
          price: "$1,599",
          image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Samsung Neo QLED 4K 55-inch Quantum HDR",
          price: "$1,299",
          image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Dyson V15 Detect Cordless Vacuum Cleaner",
          oldPrice: "$749",
          price: "$649",
          image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "22% Discount",
        description: "Transform your living room into a cinema smart home.",
        startingPrice: "$399 USD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80",
      },
    },
    "watches-acc": {
      brands: ["All", "Apple Watch", "Garmin", "Samsung Watch", "Casio", "Fossil"],
      featuredTitle: "SMARTWATCHES",
      products: [
        {
          title: "Apple Watch Ultra 2 GPS + Cellular Titanium 49mm",
          price: "$799",
          image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Garmin Fenix 7X Pro Sapphire Solar Multisport",
          price: "$899",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Samsung Galaxy Watch 6 Classic 47mm LTE",
          oldPrice: "$420",
          price: "$349",
          image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "20% Discount",
        description: "Track health metrics & stay connected right on your wrist.",
        startingPrice: "$199 USD",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=200&q=80",
      },
    },
    "gps-navigation": {
      brands: ["All", "Garmin", "TomTom", "Rand McNally", "Magellan", "Apple"],
      featuredTitle: "GPS & NAVIGATION",
      products: [
        {
          title: "Garmin DriveSmart 76 7-inch GPS Navigator",
          price: "$249",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Garmin Zumo XT Motorcycle All-Terrain GPS",
          price: "$499",
          image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Apple AirTag 4-Pack Bluetooth Item Tracker",
          oldPrice: "$119",
          price: "$99",
          image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "15% Discount",
        description: "High-precision satellite navigation for road trips & tracking.",
        startingPrice: "$149 USD",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80",
      },
    },
    "wearable-tech": {
      brands: ["All", "Meta Quest", "Oura", "Ray-Ban Meta", "XREAL", "Whoop"],
      featuredTitle: "WEARABLE TECH",
      products: [
        {
          title: "Meta Quest 3 128GB VR Mixed Reality Headset",
          price: "$499",
          image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Oura Ring Gen3 Horizon Smart Fitness Tracker",
          price: "$299",
          image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80",
        },
        {
          title: "Ray-Ban Meta Smart Sunglasses Wayfarer Black",
          oldPrice: "$349",
          price: "$299",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80",
        },
      ],
      promo: {
        discount: "25% Discount",
        description: "Step into virtual reality & smart wearable optics.",
        startingPrice: "$249 USD",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=200&q=80",
      },
    },
  };

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
            <img
              src="/images/Logo_Bot.png"
              alt="Logo Bot"
              className="w-12 h-12 object-contain transition-transform group-hover:scale-105"
            />
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

            {/* Profile User Icon & Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-white hover:opacity-85 transition-opacity p-1.5 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer ring-2 ring-white/20"
                title="Akun Pengguna"
              >
                {userPhoto && userPhoto !== "/images/avatar.svg" ? (
                  <img
                    src={userPhoto}
                    alt={user?.name || "User"}
                    className="w-7 h-7 rounded-full object-cover border border-white/40"
                  />
                ) : user ? (
                  <div className="w-7 h-7 rounded-full bg-emerald-400 text-zinc-950 font-black text-xs flex items-center justify-center uppercase shadow-xs">
                    {getAvatarInitials(user.name)}
                  </div>
                ) : (
                  <User className="w-6 h-6 stroke-[1.75]" />
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-60 bg-white text-zinc-800 rounded-xl shadow-2xl border border-zinc-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="p-2 border-b border-zinc-100 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#00a884] text-white font-black text-sm flex items-center justify-center shrink-0 overflow-hidden">
                          {userPhoto && userPhoto !== "/images/avatar.svg" ? (
                            <img src={userPhoto} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            getAvatarInitials(user.name)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm text-zinc-900 truncate">{user.name}</p>
                          <p className="text-xs text-zinc-500 capitalize truncate">Role: {user.role || 'customer'}</p>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 text-xs font-semibold text-zinc-700"
                      >
                        👤 Edit Profil Saya
                      </Link>

                      <Link
                        to="/track-order"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 text-xs font-semibold text-zinc-700"
                      >
                        🚚 Lacak Pesanan
                      </Link>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-100 text-xs font-semibold text-zinc-700"
                        >
                          ⚡ Dashboard Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-xs font-semibold text-red-600 cursor-pointer"
                      >
                        🚪 Keluar (Sign Out)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 p-1">
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center bg-[#00a884] hover:bg-[#0d7c82] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm"
                      >
                        Masuk (Login)
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full text-center border border-zinc-200 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold py-2 px-3 rounded-lg"
                      >
                        Daftar Customer
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                className="bg-[#FA8232] hover:bg-[#de6c20] text-white gap-2.5 font-medium px-4 py-2.5 rounded-sm border-0 shadow-sm cursor-pointer transition-colors"
              >
                <span>All Category</span>
                <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </Button>

              {isCategoryOpen && (
                <>
                  {/* Backdrop overlay to close menu when clicking outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCategoryOpen(false)}
                  />

                  {/* Mega Menu Dropdown Container */}
                  <div className="absolute top-full left-0 mt-2 z-50 flex bg-white border border-zinc-200 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Left Column: Category List */}
                    <div className="w-48 py-2 bg-white flex flex-col shrink-0 border-r border-zinc-100">
                      {CATEGORIES.map((cat) => {
                        const isSelected = activeCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            onMouseEnter={() => {
                              setActiveCategory(cat.id);
                              const flyData = CATEGORY_FLYOUT_DATA[cat.id];
                              if (flyData && flyData.brands.length > 0) {
                                setActiveBrand(flyData.brands[0]);
                              }
                            }}
                            onClick={() => {
                              setIsCategoryOpen(false);
                              navigate(`/category-demo?category=${encodeURIComponent(cat.name)}`);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-zinc-100 text-zinc-950 font-semibold"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            }`}
                          >
                            <span>{cat.name}</span>
                            {cat.hasSubmenu && (
                              <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-zinc-900" : "text-zinc-400"}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column: Mega Menu Subcontent (Dynamic for active category) */}
                    {(() => {
                      const flyoutData = CATEGORY_FLYOUT_DATA[activeCategory] || CATEGORY_FLYOUT_DATA["smartphone"];
                      return (
                        <div className="p-6 flex gap-6 bg-white shrink-0">
                          {/* Sub-column 1: Brand list */}
                          <div className="w-36 flex flex-col gap-1.5 pr-4 border-r border-zinc-100 shrink-0">
                            {flyoutData.brands.map((brand) => {
                              const isBrandActive = activeBrand === brand;
                              return (
                                <button
                                  key={brand}
                                  onClick={() => setActiveBrand(brand)}
                                  className={`text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer truncate ${
                                    isBrandActive
                                      ? "bg-zinc-100 text-zinc-900 font-bold shadow-xs"
                                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium"
                                  }`}
                                >
                                  {brand}
                                </button>
                              );
                            })}
                          </div>

                          {/* Sub-column 2: FEATURED PRODUCTS (450 x 450 images) */}
                          <div className="w-72 sm:w-80 flex flex-col gap-3.5 shrink-0">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                              {flyoutData.featuredTitle}
                            </h4>
                            <div className="flex flex-col gap-3">
                              {flyoutData.products.map((item, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    setIsCategoryOpen(false);
                                    navigate(`/category-demo?search=${encodeURIComponent(item.title)}`);
                                  }}
                                  className="flex items-center gap-3.5 p-3 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all cursor-pointer bg-white group"
                                >
                                  {/* 450x450 Product Thumbnail Container */}
                                  <div className="w-20 h-20 aspect-square rounded-lg bg-zinc-50 p-1.5 flex items-center justify-center shrink-0 border border-zinc-100">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                                    <h5 className="text-xs font-semibold text-zinc-900 line-clamp-2 leading-snug group-hover:text-[#FA8232] transition-colors">
                                      {item.title}
                                    </h5>
                                    <div className="flex items-center gap-2">
                                      {item.oldPrice && (
                                        <span className="text-xs text-zinc-400 line-through font-normal">
                                          {item.oldPrice}
                                        </span>
                                      )}
                                      <span className="text-sm font-bold text-[#2DA5F3]">
                                        {item.price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Sub-column 3: Yellow Promo Card (537 x 716 banner image) */}
                          <div className="w-72 sm:w-80 bg-[#FAF0AF] rounded-2xl p-6 flex flex-col justify-between items-center text-center border border-amber-200/60 shadow-xs shrink-0 relative">
                            {/* 537x716 Aspect Ratio Banner Image */}
                            <div className="w-44 h-56 aspect-[3/4] my-2 flex items-center justify-center">
                              <img
                                src={flyoutData.promo.image}
                                alt="Category Promo"
                                className="max-h-full max-w-full object-contain drop-shadow-xl rounded-xl"
                              />
                            </div>

                            <div className="flex flex-col items-center gap-2 my-2">
                              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                                {flyoutData.promo.discount}
                              </h3>
                              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium max-w-[220px]">
                                {flyoutData.promo.description}
                              </p>
                            </div>

                            <div className="w-full flex flex-col items-center gap-3.5 mt-2">
                              <div className="text-xs sm:text-sm text-zinc-800 font-medium flex items-center gap-1.5">
                                Starting price:
                                <span className="bg-white text-zinc-900 font-bold px-3 py-1 rounded-md text-xs sm:text-sm shadow-xs border border-zinc-200/50">
                                  {flyoutData.promo.startingPrice}
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  setIsCategoryOpen(false);
                                  navigate("/category-demo");
                                }}
                                className="w-full bg-[#FA8232] hover:bg-[#de6c20] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                              >
                                <span>SHOP NOW</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </>
              )}
            </div>

            {/* Quick Links with Lucide Icons */}
            <div className="flex items-center gap-6">
              <Link to="/track-order" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[#1B6392] transition-colors">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>Track Order</span>
              </Link>
              <Link to="/compare" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-[#1B6392] transition-colors">
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


