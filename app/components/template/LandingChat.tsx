import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "model";
  text: string;
};

const API_KEYS = [
  import.meta.env?.VITE_GEMINI_API_KEY || "",
].filter(Boolean);

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
];

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

function getSmartInstantResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  if (query.includes("baju") || query.includes("pakaian") || query.includes("fashion")) {
    return `Untuk **fashion pakaian (baju/celana)** saat ini **belum tersedia** di Dhandi Ecommerce. 🛒

Namun kami menyediakan **Tech Fashion & Aksesoris Modern**:
1. **Watches & Accessories:** Jam tangan & aksesoris bergaya.
2. **Wearable Technology:** Smartwatch (seperti Apple Watch & Galaxy Watch).
3. **Mobile & Computer Accessories:** Pouch, sleeve MacBook, dan aksesoris gaya lainnya.

Fokus utama kami saat ini adalah **Elektronik, MacBook, Gadget, & Tech Wearables**! 💻⌚`;
  }

  if (query.includes("macbook") || query.includes("laptop") || query.includes("produk") || query.includes("jelaskan") || query.includes("detail") || query.includes("dhandi") || query.includes("elektronik") || query.includes("handphone") || query.includes("headphone")) {
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

  if (query.includes("promo") || query.includes("diskon") || query.includes("voucher") || query.includes("ongkir")) {
    return `Dhandi Ecommerce menyediakan Promo Belanja Hemat setiap hari! 🎉

Promo Aktif Saat Ini:
1. **Diskon Laptop & Gadget Hingga 30%:** Khusus jajaran MacBook M3 & Aksesoris.
2. **Voucher Gratis Ongkir:** Bebas biaya kirim ke seluruh daerah.
3. **Cashback Pembayaran:** Potongan ekstra dengan E-Wallet & Transfer Bank.

Yuk checkout produk impian Anda sekarang! 🛒✨`;
  }

  if (query.includes("bayar") || query.includes("pembayaran") || query.includes("cod") || query.includes("transfer")) {
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

function renderFormattedText(text: string, isUser = false) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        let trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-0.5" />;

        // Check if line starts with a bullet (*, -, •)
        const isBullet = /^[*\-•]\s*/.test(trimmed);
        if (isBullet) {
          trimmed = trimmed.replace(/^[*\-•]\s*/, "");
        }

        // Check if line starts with a number like "1. ", "2. ", "10. "
        const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
        let numStr = "";
        if (numMatch) {
          numStr = `${numMatch[1]}.`;
          trimmed = numMatch[2];
        }

        // Parse **bold text**
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        const parsedContent = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong
                key={pIdx}
                className={isUser ? "font-bold text-white" : "font-bold text-slate-900"}
              >
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        // Case 1: Numbered line (1., 2., 3.)
        if (numStr) {
          return (
            <div
              key={lineIdx}
              className={`flex items-start gap-2 pl-0.5 my-1 font-medium ${
                isUser ? "text-white" : "text-slate-900"
              }`}
            >
              <span
                className={`font-extrabold shrink-0 text-xs ${
                  isUser ? "text-white" : "text-blue-600"
                }`}
              >
                {numStr}
              </span>
              <div className="flex-1 leading-relaxed">{parsedContent}</div>
            </div>
          );
        }

        // Case 2: Sub-bullet item (-)
        if (isBullet) {
          return (
            <div
              key={lineIdx}
              className={`flex items-start gap-2 pl-4 my-0.5 ${
                isUser ? "text-white/90" : "text-slate-700"
              }`}
            >
              <span
                className={`size-1.5 rounded-full shrink-0 mt-1.5 ${
                  isUser ? "bg-white" : "bg-sky-500"
                }`}
              />
              <div className="flex-1 leading-relaxed">{parsedContent}</div>
            </div>
          );
        }

        // Case 3: Regular text
        return (
          <p
            key={lineIdx}
            className={`leading-relaxed ${isUser ? "text-white" : "text-slate-800"}`}
          >
            {parsedContent}
          </p>
        );
      })}
    </div>
  );
}

export default function LandingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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

    const newMessages: Message[] = [...messages, { role: "user", text: userText }];
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
            parts: [{ text: `System Instruction: ${ECOMMERCE_SYSTEM_PROMPT}` }],
          },
          ...apiMessages,
        ],
      };

      // Direct Gemini API call with 2.5s AbortController timeout
      for (const key of API_KEYS) {
        for (const model of MODELS) {
          try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 2500);

            const directRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(directPayload),
                signal: controller.signal,
              }
            );
            clearTimeout(timer);

            const directData = await directRes.json();
            if (directRes.ok && directData.candidates?.[0]?.content?.parts?.[0]?.text) {
              aiText = directData.candidates[0].content.parts[0].text;
              break;
            }
          } catch (err) {
            // timeout or error, fail fast
          }
        }
        if (aiText) break;
      }

      // Backend route fallback if needed with 2.5s timeout
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
          if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
            aiText = data.candidates[0].content.parts[0].text;
          }
        } catch (e) {
          // ignore
        }
      }

      // Instant Smart Knowledge-base Response fallback (0ms) if API takes too long or fails
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-lg border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[calc(100vh-8rem)] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header (BLUE GRADIENT THEME) */}
          <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-xs">
                <Sparkles className="size-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-wide">Dhandi Ecommerce AI</h3>
                <p className="text-[11px] text-white/90 font-medium">Asisten Belanja Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup obrolan"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`size-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                      : "bg-slate-900 text-sky-400"
                  }`}
                >
                  {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                </div>
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none font-normal"
                  }`}
                >
                  {renderFormattedText(msg.text, msg.role === "user")}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5 flex-row">
                <div className="size-8 rounded-full flex items-center justify-center shrink-0 bg-slate-900 text-sky-400">
                  <Bot className="size-4" />
                </div>
                <div className="px-3.5 py-2.5 text-xs shadow-2xs rounded-2xl bg-white border border-slate-200 rounded-tl-none text-slate-600 flex items-center gap-2">
                  <Loader2 className="size-3.5 animate-spin text-blue-600" />
                  <span>Dhandi AI sedang mengetik...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya seputar produk, promo, atau pengiriman..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 size-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                aria-label="Kirim"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="size-14 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-108 transition-all animate-in zoom-in duration-300 cursor-pointer ring-4 ring-sky-500/25"
          aria-label="Buka bantuan Dhandi Ecommerce AI"
        >
          <MessageCircle className="size-7" />
        </button>
      )}
    </div>
  );
}
