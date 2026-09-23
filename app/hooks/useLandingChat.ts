import { useState, useRef, useEffect } from "react";
import type { LandingChatMessage } from "~/types/chat";

const API_KEYS = [import.meta.env?.VITE_GEMINI_API_KEY || ""].filter(Boolean);

const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

const ECOMMERCE_SYSTEM_PROMPT = `Anda adalah Asisten AI Resmi Dhandi Ecommerce (Customer Support AI). 
Tugas Anda adalah membantu pelanggan yang sedang belanja online di toko Dhandi Ecommerce.
Anda ramah, solutif, membantu, dan profesional.

Fokus bantuan Anda:
1. Rekomendasi produk (Laptop MacBook Pro M3 Max/Pro/Air, Dell XPS, Smartphone Samsung S24 Ultra, Headphone Sony, dll).
2. Informasi promo diskon (Diskon hingga 50%, Voucher promo, Free Shipping / Gratis Ongkir).
3. Metode Pembayaran (Transfer Bank, E-Wallet, Kartu Kredit, COD).
4. Pengiriman barang (Pengiriman cepat 2-4 hari kerja dengan garansi 100% original).
5. Kebijakan Retur (Garansi retur 7 hari & 100% money-back guarantee).

Aturan Format & Penulisan Penting:
- Jika memberikan langkah-langkah atau daftar poin utama, gunakan nomor berurutan yang rapi (1., 2., 3., dst).
- Jika ada rincian/detail di bawah poin utama, gunakan tanda strip (-) untuk sub-poin agar rapi dan tidak berantakan.
- JANGAN mengulang penomoran ganda (seperti 1. di bawah 1.). Poin utama = Nomor (1., 2.), Sub-poin = Strip (-).
- Jawablah dengan ringkas, jelas, dan terstruktur menggunakan Bahasa Indonesia yang ramah (boleh gunakan emoji 🛒📦✨).
- Jangan menjawab topik akademis / kerja praktik. Jika ada user menanyakan kerja praktik, santun katakan bahwa Anda adalah Asisten Belanja Dhandi Ecommerce.`;

export function getSmartInstantResponse(userQuery: string): string {
    const query = userQuery.toLowerCase();

    if (query.includes("baju") || query.includes("pakaian") || query.includes("fashion")) {
        return `Untuk **fashion pakaian (baju/celana)** saat ini **belum tersedia** di Dhandi Ecommerce. 🛒

Namun kami menyediakan **Tech Fashion & Aksesoris Modern**:
1. **Watches & Accessories:** Jam tangan & aksesoris bergaya.
2. **Wearable Technology:** Smartwatch (seperti Apple Watch & Galaxy Watch).
3. **Mobile & Computer Accessories:** Pouch, sleeve MacBook, dan aksesoris gaya lainnya.

Fokus utama kami saat ini adalah **Elektronik, MacBook, Gadget, & Tech Wearables**! 💻⌚`;
    }

    if (
        query.includes("macbook") ||
        query.includes("laptop") ||
        query.includes("produk") ||
        query.includes("jelaskan") ||
        query.includes("detail") ||
        query.includes("dhandi") ||
        query.includes("elektronik") ||
        query.includes("handphone") ||
        query.includes("headphone")
    ) {
        return `Dhandi Ecommerce adalah platform belanja online terpercaya untuk laptop & gadget premium! 🛒✨

Berikut keunggulan & layanan utama kami:
1. **Katalog MacBook & Gadget Flagship:**
   - MacBook Pro 16" M3 Max, MacBook Pro 14" M3 Pro, MacBook Air 15" M3 (Garansi Resmi)
   - Spesifikasi tinggi untuk profesional, creator, dan kebutuhan harian
2. **Promo Diskon & Penawaran Eksklusif:**
   - Diskon hingga 30% + Potongan Voucher Belanja
   - Gratis Ongkir ke seluruh wilayah Indonesia
3. **Jaminan Layanan Pelanggan:**
   - Pengiriman Cepat (1-3 Hari Kerja)
   - Garansi Retur 7 Hari & 100% Original

Ada seri MacBook atau gadget tertentu yang ingin Anda tanyakan? 💻`;
    }

    if (
        query.includes("promo") ||
        query.includes("diskon") ||
        query.includes("voucher") ||
        query.includes("ongkir")
    ) {
        return `Dhandi Ecommerce menyediakan Promo Belanja Hemat setiap hari! 🎉

Promo Aktif Saat Ini:
1. **Diskon Laptop & Gadget Hingga 30%:** Khusus jajaran MacBook M3 & Aksesoris.
2. **Voucher Gratis Ongkir:** Bebas biaya kirim ke seluruh daerah.
3. **Cashback Pembayaran:** Potongan ekstra dengan E-Wallet & Transfer Bank.

Yuk checkout produk impian Anda sekarang! 🛒✨`;
    }

    if (
        query.includes("bayar") ||
        query.includes("pembayaran") ||
        query.includes("cod") ||
        query.includes("transfer")
    ) {
        return `Metode pembayaran di Dhandi Ecommerce sangat praktis & aman: 💳

1. **Transfer Bank & Virtual Account:** (BCA, Mandiri, BNI, BRI)
2. **E-Wallet Instan:** (GoPay, OVO, ShopeePay, DANA)
3. **Kartu Kredit & Cicilan 0%**
4. **COD (Bayar di Tempat):** Bebas cemas untuk lokasi yang didukung.

Semua transaksi dijamin aman 100%! 🛡️`;
    }

    return `Terima kasih telah menghubungi Dhandi Ecommerce! 🛒✨

Kami menyediakan berbagai laptop flagship (seperti **MacBook Pro M3**), smartphone, dan aksesoris original berkualitas tinggi.

Apa yang bisa kami bantu?
1. Rekomendasi Laptop MacBook & Gadget
2. Informasi Diskon & Voucher Promo
3. Opsi Pengiriman & Garansi Retur`;
}

export function useLandingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<LandingChatMessage[]>([
        {
            role: "model",
            text: "Halo! Selamat datang di Dhandi Ecommerce. 🛒 Saya Asisten AI Dhandi, siap membantu Anda mencari produk terbaik, promo diskon, dan informasi pengiriman. Ada yang bisa saya bantu hari ini?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput("");

        const newMessages: LandingChatMessage[] = [
            ...messages,
            { role: "user", text: userText },
        ];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const apiMessages = newMessages.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.text }],
            }));

            let aiText = "";

            const directPayload = {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `System Instruction: ${ECOMMERCE_SYSTEM_PROMPT}`,
                            },
                        ],
                    },
                    ...apiMessages,
                ],
            };

            // Direct Gemini API call with 2.5s AbortController timeout
            for (const key of API_KEYS) {
                for (const model of MODELS) {
                    try {
                        const controller = new AbortController();
                        const timer = setTimeout(
                            () => controller.abort(),
                            2500,
                        );

                        const directRes = await fetch(
                            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(directPayload),
                                signal: controller.signal,
                            },
                        );
                        clearTimeout(timer);

                        const directData = await directRes.json();
                        if (
                            directRes.ok &&
                            directData.candidates?.[0]?.content?.parts?.[0]?.text
                        ) {
                            aiText = directData.candidates[0].content.parts[0].text;
                            break;
                        }
                    } catch {
                        // Fail fast on timeout
                    }
                }
                if (aiText) break;
            }

            // Backend route fallback if needed
            if (!aiText) {
                try {
                    const controller = new AbortController();
                    const timer = setTimeout(() => controller.abort(), 2500);

                    const response = await fetch("/api/chat-ai", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ messages: apiMessages }),
                        signal: controller.signal,
                    });
                    clearTimeout(timer);

                    const data = await response.json();
                    if (
                        response.ok &&
                        data.candidates?.[0]?.content?.parts?.[0]?.text
                    ) {
                        aiText = data.candidates[0].content.parts[0].text;
                    }
                } catch {
                    // Ignore
                }
            }

            if (!aiText) {
                aiText = getSmartInstantResponse(userText);
            }

            setMessages((prev) => [...prev, { role: "model", text: aiText }]);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", text: getSmartInstantResponse(userText) },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return {
        isOpen,
        setIsOpen,
        messages,
        input,
        setInput,
        isLoading,
        messagesEndRef,
        handleSend,
        handleKeyDown,
    };
}
