import * as React from "react";
import { useParams, useSearchParams } from "react-router";

export interface ProductDetailData {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  availability: string;
  brand: string;
  sku: string;
  description: string;
  features: string[];
  images: string[];
  colors: { id: string; name: string; hex: string }[];
  sizes: string[];
  specs: Record<string, string>;
  additionalInfo?: {
    weight?: string;
    dimensions?: string;
    colorOptions?: string;
    warranty?: string;
    modelNumber?: string;
  };
  shippingWarranty?: {
    courier?: string;
    deliveryTime?: string;
    guarantee?: string;
  };
}

export type ProductItem = ProductDetailData;

export const PRODUCTS_DATABASE: Record<string, ProductDetailData> = {
  "1": {
    id: "1",
    title: "MacBook Pro M3 Max 16-inch (36GB RAM, 1TB SSD) - Space Black",
    category: "Computer & Laptop",
    categoryId: "computer-laptop",
    price: "$2,499.00",
    originalPrice: "$2,899.00",
    discountBadge: "14% OFF",
    rating: 4.9,
    reviewsCount: 328,
    availability: "In Stock",
    brand: "Apple",
    sku: "MBP-M3MAX-16-BLK",
    description: "MacBook Pro 16-inch with M3 Max chip takes power and efficiency to unprecedented heights. It delivers exceptional performance whether it's plugged in or on battery, and features a stunning Liquid Retina XDR display and all the ports you need.",
    features: [
      "Apple M3 Max chip with 16-core CPU and 40-core GPU",
      "36GB Unified Memory for extreme multi-tasking and pro workflows",
      "1TB Superfast SSD Storage with 7.4GB/s read speeds",
      "16.2-inch Liquid Retina XDR display with ProMotion 120Hz refresh rate",
      "Up to 22 hours battery life with fast charging capability",
      "Six-speaker sound system with force-cancelling woofers and Spatial Audio",
    ],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { id: "black", name: "Space Black", hex: "#1D1D1F" },
      { id: "silver", name: "Silver", hex: "#E3E4E5" },
      { id: "spacegray", name: "Space Gray", hex: "#68696D" },
    ],
    sizes: ["512GB", "1TB SSD", "2TB SSD", "4TB SSD"],
    specs: {
      "Processor": "Apple M3 Max (16-Core)",
      "Memory": "36GB Unified Memory",
      "Storage": "1TB NVMe SSD",
      "Display": "16.2\" Liquid Retina XDR (3456 x 2234)",
      "Graphics": "Integrated 40-Core GPU",
      "Battery": "100Wh Lithium-Polymer",
      "Weight": "2.16 kg (4.8 lbs)",
      "Warranty": "1 Year Official Apple Warranty",
    },
    additionalInfo: {
      weight: "2.16 kg (4.8 lbs)",
      dimensions: "35.57 x 24.81 x 1.68 cm",
      colorOptions: "Space Black, Silver, Space Gray",
      warranty: "1 Year Official AppleCare Warranty",
      modelNumber: "MUW63ID/A",
    },
    shippingWarranty: {
      courier: "FedEx Express / DHL Premium",
      deliveryTime: "2-4 Business Days Worldwide",
      guarantee: "100% Genuine Apple Authorized Product",
    },
  },
  "2": {
    id: "2",
    title: "Dell XPS 15 OLED Touch Display - Intel Core i9, 32GB RAM",
    category: "Computer & Laptop",
    categoryId: "computer-laptop",
    price: "$1,899.00",
    originalPrice: "$2,199.00",
    discountBadge: "13% OFF",
    rating: 4.8,
    reviewsCount: 194,
    availability: "In Stock",
    brand: "Dell",
    sku: "DELL-XPS15-OLED",
    description: "Immerse yourself in content with stunning 3.5K OLED touchscreen display. Packed with 13th Gen Intel Core i9 processor and NVIDIA GeForce RTX 4070 graphics.",
    features: [
      "13th Gen Intel Core i9-13900H Processor",
      "15.6-inch 3.5K (3456x2160) OLED Touch Display",
      "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "32GB DDR5 RAM & 1TB M.2 PCIe NVMe SSD",
      "CNC Machined Aluminum chassis with carbon fiber palm rest",
    ],
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { id: "platinum", name: "Platinum Silver", hex: "#D8D9DD" },
    ],
    sizes: ["16GB RAM", "32GB RAM", "64GB RAM"],
    specs: {
      "Processor": "Intel Core i9-13900H",
      "Memory": "32GB DDR5",
      "Graphics": "RTX 4070 8GB",
      "Display": "15.6\" 3.5K OLED Touch",
      "Warranty": "2 Year Premium Support",
    },
    additionalInfo: {
      weight: "1.92 kg",
      dimensions: "34.4 x 23.0 x 1.8 cm",
      warranty: "2 Year Dell Premium Support Warranty",
    },
  },
  "3": {
    id: "3",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "Headphone",
    categoryId: "headphone",
    price: "$399.00",
    originalPrice: "$449.00",
    discountBadge: "11% OFF",
    rating: 4.9,
    reviewsCount: 512,
    availability: "In Stock",
    brand: "Sony",
    sku: "SONY-WH1000XM5-BLK",
    description: "Industry-leading noise canceling with two processors and 8 microphones for unprecedented sound quality and crystal-clear hands-free calling.",
    features: [
      "Auto NC Optimizer automatically adjusts noise canceling based on your environment",
      "Magnificent Sound, engineered with Integrated Processor V1",
      "Up to 30-hour battery life with quick charging (3 min for 3 hours of playback)",
      "Ultra-comfortable, lightweight design with soft fit leather",
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { id: "black", name: "Black", hex: "#111111" },
      { id: "silver", name: "Silver", hex: "#E5E5E5" },
    ],
    sizes: ["Standard"],
    specs: {
      "Connectivity": "Bluetooth 5.2 / 3.5mm Aux",
      "Battery Life": "30 Hours (NC On)",
      "Charging": "USB-C Fast Charging",
      "Weight": "250 gram",
    },
    additionalInfo: {
      weight: "250g",
      warranty: "1 Year Official Sony Warranty",
    },
  },
  "4": {
    id: "4",
    title: "Samsung Galaxy S24 Ultra 512GB AI Smartphone",
    category: "SmartPhone",
    categoryId: "smartphone",
    price: "$1,299.00",
    originalPrice: "$1,419.00",
    discountBadge: "8% OFF",
    rating: 4.7,
    reviewsCount: 420,
    availability: "In Stock",
    brand: "Samsung",
    sku: "SAM-S24U-512GB",
    description: "Galaxy AI is here. Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    features: [
      "200MP Main Camera with AI Enhanced Zoom and Quad Tele System",
      "Snapdragon 8 Gen 3 for Galaxy Processor with enhanced ray tracing",
      "Built-in S Pen with air gestures and precision writing",
      "Titanium frame construction with Corning Gorilla Armor glass",
    ],
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { id: "black", name: "Titanium Black", hex: "#222222" },
      { id: "gray", name: "Titanium Gray", hex: "#777777" },
      { id: "violet", name: "Titanium Violet", hex: "#4A3B63" },
    ],
    sizes: ["256GB", "512GB", "1TB"],
    specs: {
      "Display": "6.8\" Dynamic AMOLED 2X 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP + 50MP + 12MP + 10MP",
      "Battery": "5000 mAh 45W Super Fast",
    },
    additionalInfo: {
      weight: "232g",
      warranty: "1 Year Official SEIN Warranty",
    },
  },
  "5": {
    id: "5",
    title: "LG UltraGear 32-inch QHD Gaming Monitor 165Hz 1ms",
    category: "Electronics Devices",
    categoryId: "electronics",
    price: "$699.00",
    originalPrice: "$899.00",
    discountBadge: "22% OFF",
    rating: 4.8,
    reviewsCount: 260,
    availability: "In Stock",
    brand: "LG",
    sku: "LG-32GP850-B",
    description: "LG UltraGear Nano IPS Gaming Monitor with 1ms response time and 165Hz refresh rate brings fluid gaming motion and vibrant color accuracy.",
    features: [
      "32-inch QHD (2560 x 1440) Nano IPS Display",
      "1ms (GtG) Response Time & 165Hz Refresh Rate",
      "NVIDIA G-SYNC Compatible & AMD FreeSync Premium",
      "VESA DisplayHDR 400 with 98% DCI-P3 Color Gamut",
    ],
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { id: "black", name: "Matt Black", hex: "#1A1A1A" },
    ],
    sizes: ["27-inch", "32-inch"],
    specs: {
      "Screen Size": "32 inch QHD",
      "Panel Type": "Nano IPS",
      "Refresh Rate": "165Hz",
      "Response Time": "1ms (GtG)",
    },
  },
};

export function useProductDetail() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const productId = params.id || params["*"] || searchParams.get("id") || "1";
  const cleanId = productId.replace(/^\//, "").trim();
  const product = PRODUCTS_DATABASE[cleanId] || PRODUCTS_DATABASE["1"];

  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.id || "");
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[0] || "");
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState<"description" | "additional" | "specification" | "reviews">("description");

  React.useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedColor(product.colors[0]?.id || "");
    setSelectedSize(product.sizes[0] || "");
    setQuantity(1);
  }, [cleanId, product]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return {
    product,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    handleIncrement,
    handleDecrement,
    activeTab,
    setActiveTab,
  };
}

