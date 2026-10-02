import { useState } from "react";
import type { FormEvent } from "react";
import { Heart, Package, Tag, RotateCcw } from "lucide-react";

export interface QuickHelpCategory {
    id: string;
    title: string;
    description: string;
    icon: typeof Heart;
    link: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    bullets?: string[];
}

export function useNeedHelp() {
    const [openFaqId, setOpenFaqId] = useState<string>("faq-2");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const quickCategories: QuickHelpCategory[] = [
        {
            id: "wishlist-compare",
            title: "Wishlist & Compare",
            description: "Guide to saving favorite items & comparing specifications.",
            icon: Heart,
            link: "/wishlist",
        },
        {
            id: "shipping-delivery",
            title: "Shipping & Delivery",
            description: "Shipping time estimates, courier options, and delivery fees.",
            icon: Package,
            link: "/track-order",
        },
        {
            id: "voucher-discount",
            title: "Voucher & Discount",
            description: "How to use coupon codes, special promos, and discounts.",
            icon: Tag,
            link: "/category-demo",
        },
        {
            id: "return-refund",
            title: "Return & Refund",
            description: "Item return terms, warranty claims, and refund process.",
            icon: RotateCcw,
            link: "/customer-support",
        },
    ];

    const faqItems: FaqItem[] = [
        {
            id: "faq-1",
            question: "How do I place an order for bot automation products?",
            answer: "Product ordering can be completed directly through our catalog page. Select your desired bot license, add it to cart, and follow the automated payment checkout process.",
            bullets: [
                "Select bot product and license quantity.",
                "Fill in account details or shipping information.",
                "Complete payment using your preferred method.",
                "License credentials and access details will be emailed immediately."
            ]
        },
        {
            id: "faq-2",
            question: "What are the delivery timelines and account activation times?",
            answer: "For digital products & bot automation licenses, account activation is fully automated within 5 to 15 minutes after payment confirmation. Physical items are dispatched within 1 to 3 business days.",
            bullets: [
                "Automated 24/7 activation for digital licenses.",
                "Real-time tracking number update for physical packages.",
                "Instant status notification sent directly via Email & WhatsApp."
            ]
        },
        {
            id: "faq-3",
            question: "Do bot automation products include warranty and setup support?",
            answer: "Yes, every bot automation product purchase includes complimentary installation support from our technical engineers alongside regular system update guarantees.",
            bullets: [
                "Comprehensive setup documentation and user guides.",
                "Remote installation assistance if required.",
                "Script update guarantee whenever target platforms update."
            ]
        },
        {
            id: "faq-4",
            question: "What payment methods are supported?",
            answer: "We support a wide range of instant payment methods including Bank Transfers (BCA, Mandiri, BRI, BNI), QRIS (GoPay, OVO, DANA, ShopeePay), and Credit Cards.",
            bullets: [
                "Automated payment verification without manual receipt uploads.",
                "Zero processing fees on most instant e-wallet channels."
            ]
        },
        {
            id: "faq-5",
            question: "How can I get assistance if I encounter technical issues?",
            answer: "You can reach our technical support team anytime via our 24/7 AI Live Chat Bot or through Human Customer Service during business hours (09:00 AM - 05:00 PM WIB).",
            bullets: [
                "24/7 Nonstop AI Live Chat Assistant available round the clock.",
                "Human technical support via call & chat during business hours."
            ]
        },
    ];

    const filteredFaqs = faqItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFaq = (id: string) => {
        setOpenFaqId(prev => (prev === id ? "" : id));
    };

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !subject) return;
        setIsSubmitted(true);
        setTimeout(() => {
            setEmail("");
            setSubject("");
            setMessage("");
            setIsSubmitted(false);
        }, 4000);
    };

    return {
        quickCategories,
        faqItems: filteredFaqs,
        openFaqId,
        toggleFaq,
        email,
        setEmail,
        subject,
        setSubject,
        message,
        setMessage,
        isSubmitted,
        handleSubmitForm,
        searchQuery,
        setSearchQuery,
    };
}
