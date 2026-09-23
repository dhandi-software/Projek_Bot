import { useState } from "react";
import {
    Truck,
    Lock,
    CreditCard,
    User,
    Heart,
    Package,
    Tag,
    RotateCcw,
} from "lucide-react";
import type { HelpCategory, PopularTopic, ContactChannel } from "~/types/customerSupport";

export function useCustomerSupport() {
    const [searchQuery, setSearchQuery] = useState("");

    const helpCategories: HelpCategory[] = [
        { id: "cat-1", title: "Track Order", icon: Truck, link: "/track-order" },
        { id: "cat-2", title: "Reset Password", icon: Lock, link: "/forgot-password" },
        { id: "cat-3", title: "Payment Option", icon: CreditCard, link: "/checkout" },
        { id: "cat-4", title: "User Account", icon: User, link: "/login" },
        { id: "cat-5", title: "Wishlist & Compare", icon: Heart, link: "/wishlist" },
        { id: "cat-6", title: "Shipping & Delivery", icon: Package, link: "/need-help" },
        { id: "cat-7", title: "Voucher & Discount", icon: Tag, link: "/category-demo" },
        { id: "cat-8", title: "Return & Refund", icon: RotateCcw, link: "/need-help" },
    ];

    const popularTopics: PopularTopic[] = [
        { id: "top-1", category: "Returns", question: "How do I return my item?" },
        { id: "top-2", category: "Returns", question: "What is Dhandi's Returns Policy?" },
        { id: "top-3", category: "Returns", question: "How long is the refund process?" },
        { id: "top-4", category: "Delivery", question: "What are the 'Delivery Timelines'?" },
        { id: "top-5", category: "Campaign", question: "What is 'Discover Your Dhandi Campaign 2026'?" },
        { id: "top-6", category: "Offers", question: "What is the Voucher & Gift Offer in this Campaign?" },
        { id: "top-7", category: "Order", question: "How to cancel Dhandi Order." },
        { id: "top-8", category: "Community", question: "Ask the Digital and Device Community" },
        { id: "top-9", category: "Account", question: "How to change my shop name?" },
    ];

    const contactChannels: ContactChannel[] = [
        {
            id: "channel-phone",
            title: "Call Us (Human CS Agent)",
            description: "Our live human customer support team is available to assist you directly from 09:00 AM to 05:00 PM (WIB).",
            info: "+1-202-555-0126",
            buttonText: "CALL HUMAN CS",
            type: "phone",
        },
        {
            id: "channel-chat",
            title: "Chat Bot AI Assistant 24/7",
            description: "Our automated AI Bot is available 24 hours nonstop every day to assist your inquiries & transactions instantly.",
            info: "Support@dhandiecommerce.com",
            buttonText: "CHAT BOT AI NOW",
            type: "chat",
        },
    ];

    const filteredTopics = popularTopics.filter((topic) =>
        topic.question.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return {
        searchQuery,
        setSearchQuery,
        helpCategories,
        popularTopics: filteredTopics,
        contactChannels,
    };
}
