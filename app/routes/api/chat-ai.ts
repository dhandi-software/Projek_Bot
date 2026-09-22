import { type ActionFunctionArgs, data } from "react-router";

const ECOMMERCE_SYSTEM_PROMPT = `Anda adalah Asisten AI Resmi Dhandi Ecommerce (Customer Support AI). 
Tugas Anda adalah membantu pelanggan yang sedang belanja di toko online Dhandi Ecommerce.
Anda ramah, solutif, membantu, dan profesional.

Fokus bantuan Anda:
1. Rekomendasi produk (Laptop MacBook Pro M3, Dell XPS, Smartphone Samsung S24 Ultra, Headphone Sony WH-1000XM5, LG Monitor, dll).
2. Informasi promo diskon (Diskon hingga 50%, Voucher belanja, Free Shipping / Gratis Ongkir).
3. Metode Pembayaran (Transfer Bank, E-Wallet, Kartu Kredit, COD).
4. Pengiriman barang (Pengiriman cepat 2-4 hari kerja dengan garansi 100% barang original).
5. Kebijakan Retur (Garansi retur 7 hari & 100% money-back guarantee).

Aturan Format & Penulisan Penting:
- Jika memberikan langkah-langkah atau daftar poin utama, gunakan nomor berurutan yang rapi (1., 2., 3., dst).
- Jika ada rincian/detail di bawah poin utama, gunakan tanda strip (-) untuk sub-poin agar rapi dan tidak berantakan.
- JANGAN mengulang penomoran ganda (seperti 1. di bawah 1.). Poin utama = Nomor (1., 2.), Sub-poin = Strip (-).
- Gunakan Bahasa Indonesia yang ramah, sopan, dan terstruktur rapi (gunakan emoji belanja 🛒📦✨ jika relevan).
- Jangan menjawab topik akademis / kerja praktik. Jika ada yang menanyakan kerja praktik, santun katakan bahwa Anda adalah Asisten Belanja Dhandi Ecommerce.`;

const API_KEYS = [
  process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "",
].filter(Boolean);

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest"
];

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { messages } = await request.json();

    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction: ${ECOMMERCE_SYSTEM_PROMPT}` }],
      },
      ...messages,
    ];

    for (const key of API_KEYS) {
      for (const model of MODELS) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contents }),
            }
          );
          const result = await res.json();
          if (res.ok && result.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data(result);
          }
        } catch (e) {
          // ignore & try next
        }
      }
    }

    return data({ error: "Failed to generate AI response" }, { status: 500 });
  } catch (err: any) {
    return data({ error: err.message || "Server Error" }, { status: 500 });
  }
}
