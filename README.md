# 🤖 Frontend - Projek Bot WhatsApp

Ini adalah bagian antarmuka pengguna (Frontend) untuk mengelola dan memonitor Bot WhatsApp Anda. Aplikasi ini dibangun untuk memudahkan pengaturan koneksi (seperti menampilkan dan melakukan pemindaian QR Code secara real-time) serta manajemen fitur bot lainnya.

## 🚀 Getting Started

### 📦 Installation

Pastikan Anda sudah menginstal Node.js, lalu jalankan:

```bash
npm install
```

### 🧪 Run the App

Untuk menjalankan *development server*:

```bash
npm run dev
```

Server biasanya akan berjalan di `http://localhost:3000` atau `http://localhost:5173`.

### 🔨 Build for Production

Untuk mem-build proyek ke versi *production*:

```bash
npm run build
```

## 🌐 Tech Stack

- ⚛️ **React** (via React Router / Vite)
- 🧠 **TypeScript**
- 🎨 **Tailwind CSS**
- 🧩 **Shadcn/UI** (untuk komponen UI)

## 📂 Struktur Folder Utama

- `app/` - Berisi seluruh *source code* utama (komponen, *routes*, *hooks*, dll).
- `public/` - Berisi aset statis (gambar, icon, dll) yang langsung diakses tanpa *bundling*.
