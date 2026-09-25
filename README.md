# 🤖 Fullstack Platform - WhatsApp Bot & E-Commerce System

Sistem Manajemen E-Commerce dan Bot WhatsApp Terintegrasi yang dibangun dengan arsitektur modern berbasis **React 18 (React Router v7 / Vite)** & **Go (Fiber v2 / GORM)**.

---

## 📋 Daftar Isi
- [🚀 Quick Start](#-quick-start)
- [🌐 Tech Stack Utama](#-tech-stack-utama)
- [🗺️ Struktur Projek Keseluruhan (Frontend & Backend)](#️-struktur-projek-keseluruhan-frontend--backend)
- [🛍️ 1. Modul User (Storefront & Public Client)](#️-1-modul-user-storefront--public-client)
- [⚙️ 2. Modul Admin (Backoffice Management System)](#️-2-modul-admin-backoffice-management-system)
- [🖥️ 3. Arsitektur Backend (Go / Fiber / GORM)](#️-3-arsitektur-backend-go--fiber--gorm)
- [🛠️ Best Practices & Code Standards](#️-best-practices--code-standards)

---

## 🚀 Quick Start

### 1. Frontend (`Bot_FE`)

```bash
cd Bot_FE
npm install
npm run dev
```
Aplikasi berjalan pada `http://localhost:5173` atau `http://localhost:3000`.

### 2. Backend (`Bot_BE`)

```bash
cd Bot_BE
go run cmd/main.go
```
API Server berjalan pada `http://localhost:8080`.

---

## 🌐 Tech Stack Utama

### Frontend (`Bot_FE`)
- ⚛️ **Core**: React 18, React Router v7, Vite
- 🧠 **Language**: TypeScript (Strict Checking)
- 🎨 **Styling**: Tailwind CSS, Lucide React Icons
- 🧩 **UI Components**: Shadcn UI & Custom Component Tokens
- 💬 **Real-time**: Socket.IO Client

### Backend (`Bot_BE`)
- 🐹 **Core**: Go (Golang 1.20+)
- ⚡ **HTTP Web Framework**: Fiber v2 (`github.com/gofiber/fiber/v2`)
- 🗄️ **ORM / Database**: GORM (SQLite / PostgreSQL / MySQL)
- 📲 **WhatsApp Engine**: Whatsmeow Go Library / Baileys Sync Engine
- 🔌 **WebSockets**: Gorilla / Fiber WebSockets (`wshub`)

---

## 🗺️ Struktur Projek Keseluruhan (Frontend & Backend)

### 📂 1. Frontend Architecture (`Bot_FE/app/`)

```text
Bot_FE/app/
├── api/                             # Layer API Clients (Axios/Fetch Wrappers)
│   ├── categoryApi.ts               # API Service untuk Kategori Produk
│   ├── productApi.ts                # API Service untuk Produk
│   ├── bannerApi.ts                 # API Service untuk Banner Promo
│   └── chatApi.ts                   # API Service untuk Messaging & WhatsApp
├── components/                      # Global UI Library (Standardized Elements)
│   ├── ui/                          # Shadcn UI (button, dialog, input, dropdown, dll)
│   └── layout/                      # Navbar, Footer, & Sidebar Wrappers
├── features/                        # Feature-Driven Modules
│   ├── landing/                     # [USER] Storefront Public Pages
│   │   ├── home/                    # Halaman Beranda Utama (Hero, Deals, Categories)
│   │   ├── category/                # Katalog Produk & Filter
│   │   ├── product-detail/          # Detail Informasi & Galeri Produk
│   │   ├── checkout/                # Keranjang & Proses Pembayaran
│   │   ├── wishlist/                # Favorit & Komparasi Produk
│   │   ├── customer-support/        # Bantuan & Kontak Support
│   │   └── Article/                 # Edukasi & Artikel Berita
│   ├── products/                    # [ADMIN] Manajemen Produk & Kategori
│   │   ├── components/
│   │   │   ├── ProductManagement/   # Single Folder Unified Component Structure
│   │   │   │   ├── ProductManagementDesktop.tsx  # Page Container Desktop
│   │   │   │   ├── ProductManagementMobile.tsx   # Page Container Mobile
│   │   │   │   ├── index.ts                      # Re-export Entrypoint
│   │   │   │   └── components/
│   │   │   │       ├── desktop/     # Subkomponen Desktop (Header, Filter, Table, Form, DeleteModal)
│   │   │   │       └── mobile/      # Subkomponen Mobile  (Header, Filter, List, Form, DeleteModal)
│   │   │   ├── CategoryManagementDesktop/  # View Kategori Desktop
│   │   │   ├── CategoryManagementMobile/   # View Kategori Mobile
│   │   │   ├── BannerManagementDesktop/    # View Banner Desktop
│   │   │   ├── BannerManagementMobile/     # View Banner Mobile
│   │   │   └── ProductFormControls.tsx     # Custom Form Input Elements (WebP, Price, Numbers)
│   │   ├── hooks/                   # Custom Hooks (useProducts, useCategories, dll)
│   │   └── types/                   # Type Definitions (ProductPayload, CategoryItem)
│   ├── chat/                        # Fitur Live Chat Real-Time
│   ├── dashboard/                   # Dashboard Analitik & KPI Admin
│   ├── profile/                     # Pengaturan Profil User & Admin
│   ├── login/                       # Autentikasi Masuk Sistem
│   └── register/                    # Pendaftaran Akun Baru
├── routes/                          # Application Page Routes
│   ├── landing/                     # [USER ROUTES]
│   │   ├── index.tsx                # Layout Landing User
│   │   ├── Home.tsx                 # Beranda Utama (`/`)
│   │   ├── CategoryDemo.tsx         # Katalog Kategori (`/category`)
│   │   ├── ProductDetail.tsx        # Detail Produk (`/product/:id`)
│   │   ├── Cart.tsx                 # Keranjang Belanja (`/cart`)
│   │   ├── Checkout.tsx             # Form Pembayaran (`/checkout`)
│   │   ├── TrackOrder.tsx           # Lacak Status Pesanan (`/track-order`)
│   │   ├── Wishlist.tsx             # Produk Favorit (`/wishlist`)
│   │   ├── Compare.tsx              # Perbandingan Produk (`/compare`)
│   │   ├── CustomerSupport.tsx      # Layanan Pelanggan (`/customer-support`)
│   │   ├── FAQ.tsx                  # Tanya Jawab Umum (`/faq`)
│   │   └── Article.tsx              # Berita & Artikel (`/article`)
│   ├── admin/                       # [ADMIN ROUTES]
│   │   ├── layout.tsx               # Admin Navigation Layout & Sidebar
│   │   ├── index.tsx                # Dashboard KPI Admin (`/admin`)
│   │   ├── produk.tsx               # Manajemen Produk (`/admin/produk`)
│   │   ├── kategori.tsx             # Manajemen Kategori (`/admin/kategori`)
│   │   ├── banner.tsx               # Manajemen Banner Promo (`/admin/banner`)
│   │   ├── koneksi.tsx              # Monitor QR Code WhatsApp (`/admin/koneksi`)
│   │   └── chat.tsx                 # Live Inbox WhatsApp (`/admin/chat`)
│   ├── ProtectedRoute.tsx           # Security Auth Middleware Guard
│   └── RoleGuard.tsx                # Role Access Control Guard (Admin/Customer)
└── types/                           # Global TypeScript Types
```

---

### 📂 2. Backend Architecture (`Bot_BE/`)

```text
Bot_BE/
├── cmd/
│   └── main.go                      # Entrypoint Aplikasi Backend (Go Fiber Initialization)
├── internal/
│   ├── config/                      # Pengaturan Environment & DB Connection
│   ├── provider/
│   │   └── database.go              # GORM DB Migration & Seeding Provider
│   ├── model/                       # GORM Struct Models & Schemas
│   │   ├── product.go               # Model Produk (`id`, `title`, `sku`, `price`, `stock`, `category`, dll)
│   │   ├── category.go              # Model Kategori (`id`, `name`, `slug`, `icon`, `is_active`)
│   │   ├── banner.go                # Model Banner Promo (`id`, `title`, `image_url`, `link`)
│   │   ├── customer.go              # Model User & Pelanggan
│   │   ├── admin.go                 # Model Administrator
│   │   ├── config.go                # Model Konfigurasi Bot WhatsApp
│   │   └── activity_log.go          # Audit Log Aktivitas Sistem
│   ├── handler/                     # HTTP Route Handlers (REST API Controller)
│   │   ├── product_handler.go       # CRUD API Produk (`GET`, `POST`, `PUT`, `DELETE`)
│   │   ├── category_handler.go      # CRUD API Kategori & Auto-Seed Default
│   │   ├── banner_handler.go        # CRUD API Banner
│   │   ├── auth_handler.go          # Registrasi, Login JWT, Profile Handler
│   │   ├── customer_handler.go      # Pengelolaan Data Pelanggan
│   │   ├── message_handler.go       # Handler Log & Pengiriman Pesan WA
│   │   ├── chat_handler.go          # Live Chat REST API
│   │   └── config_handler.go        # Pengaturan Bot & Koneksi WhatsApp
│   ├── service/                     # Business Logic Services
│   ├── server/
│   │   └── server.go                # Fiber Route Registry & Middleware Setup
│   └── wshub/                       # Real-Time WebSocket Hub (Broadcast Engine)
├── data/                            # Database File Storage (bot.db SQLite / Data Dump)
├── docker-compose.yml               # Container Orchestration
└── Dockerfile                       # Go Production Docker Build Manifest
```

---

## 🛍️ 1. Modul User (Storefront & Public Client)

Ditujukan untuk pembeli dan pengguna umum dengan antarmuka yang responsif, cepat, dan interaktif.

### 1.1. Beranda / Storefront Utama (`/`)
- **Main Hero Carousel**: Banner promosi interaktif produk terbaru.
- **Shop by Category**: Penyaring langsung menuju kategori pilihan (Laptop, Smartphone, Audio, dll).
- **Flash Deals & Best Sales**: Menampilkan produk diskon dan keuntungan belanja.
- **Gamification Rewards**: Kupon interaktif penarik minat calon pembeli.

### 1.2. Katalog & Pencarian Produk (`/category` & `/search`)
- **Penyaring Kategori Dinamis**: Mengambil langsung dari backend tanpa pengurutan statis.
- **Pencarian Instant**: Berdasarkan Kata Kunci, Brand, atau Kode SKU.
- **Urutan Harga**: Termurah, Termahal, & Diskon Terbesar.

### 1.3. Detail Produk (`/product/:id`)
- **WebP Galeri Image**: Media converter ringan resolusi tinggi.
- **Informasi Diskon**: Perhitungan penghematan dari harga normal.
- **Deskripsi Rich Text**: Format teks tebal, daftar poin, dan instruksi penggunaan.

### 1.4. Keranjang & Checkout (`/cart`, `/checkout`, `/track-order`)
- **Manajemen Keranjang Belanja**: Ubah kuantitas, centang pilihan belanja.
- **Form Pembayaran**: Pengisian alamat pengiriman, kurir, dan metode pembayaran.
- **Pelacakan Pesanan Real-Time**: Status pesanan dari diproses hingga dikirim.

### 1.5. Live Chat WhatsApp Bot (`/chat`)
- **Pesan Real-Time**: Terhubung langsung dengan WhatsApp Bot melalui WebSockets.
- **Lampiran Gambar & Bukti Transfer**: Mengunggah foto produk langsung dari ruang percakapan.

---

## ⚙️ 2. Modul Admin (Backoffice Management System)

Pengelolaan data e-commerce, produk, kategori, banner promo, dan aktivitas pelanggan.

### 2.1. Dashboard Utama (`/admin`)
- **KPI Cards**: Penjualan Total, Produk Aktif, Pesanan Baru, & User Terdaftar.
- **Grafik Omzet & Aktivitas**: Monitoring statistik toko real-time.

### 2.2. Manajemen Produk (`/admin/produk`)
Terstruktur dalam 1 folder terpadu [`ProductManagement/`](file:///c:/Users/USER/Documents/All%20Projek/Projek_Bot/Bot_FE/app/features/products/components/ProductManagement):
- **Komponen Desktop (`ProductManagementDesktop.tsx`)**:
  - `ProductHeaderDesktop`: Breadcrumbs, Import CSV/JSON, Download Template, Tambah Produk.
  - `ProductFilterDesktop`: Search input & dynamic category filter pills.
  - `ProductTableDesktop`: Data tabel lengkap dengan gambar WebP, SKU, harga, stok, badge status.
  - `ProductFormDesktop`: Layout form 2-kolom full width.
  - `ProductDeleteModalDesktop`: Modal konfirmasi hapus aman.
- **Komponen Mobile (`ProductManagementMobile.tsx`)**:
  - `ProductHeaderMobile` & `ProductFilterMobile`.
  - `ProductListMobile`: Tampilan kartu produk seluler.
  - `ProductFormMobile`: Form stack vertikal + sticky bottom bar.
  - `ProductDeleteModalMobile`.

#### Fitur Canggih Form Controls (`ProductFormControls.tsx`):
1. **Leading Zero Removal (`PriceInput` & `NumberInput`)**: Menghapus angka `0` di depan secara otomatis saat mengetik nominal harga atau stok.
2. **Auto Canvas WebP Converter (`MediaUploader`)**: Mengonversi gambar perangkat ke format WebP super ringan (maks. 5MB + Notifikasi Toast otomatis).
3. **Rich Text Formatting (`RichTextEditor`)**: Editor deskripsi produk lengkap (Bold, Italic, List, Link).
4. **Dynamic Category Sync (`CategorySelect`)**: Mengambil data kategori dinamis dari backend API (`GET /api/categories`).

### 2.3. Manajemen Kategori (`/admin/kategori`)
- **Dynamic Categories (Single Source of Truth)**: Terhubung langsung ke API `/api/categories`.
- **Validation Duplicate**: Menolak nama kategori ganda (HTTP 400 & Toast client-side).
- **Dynamic Icons**: Penyesuaian ikon otomatis dengan Lucide React Icons.

### 2.4. Monitor Koneksi WhatsApp (`/admin/koneksi`)
- **Real-Time QR Code Scanner**: Menampilkan QR Code untuk pendaftaran perangkat WhatsApp Bot secara langsung di aplikasi.

---

## 🖥️ 3. Arsitektur & Dokumentasi Backend (Go / Fiber / GORM)

Dokumentasi lengkap backend tersedia di 👉 **[`Bot_BE/README.md`](../Bot_BE/README.md)**.

### Ringkasan Fitur Backend (`Bot_BE`):
1. **Auto Seeding Database**: Saat server dinyalakan, `category_handler.go` otomatis seeding 6 kategori standar jika DB kosong.
2. **Real-Time WebSocket Hub (`wshub`)**: Endpoint `/ws` untuk broadcasting pesan masuk WA & pembaruan QR Code ke frontend secara instan.
3. **WAHA WhatsApp Gateway**: Sesi otentikasi QR Code (`/api/wa/qr`), pengecekan status (`/api/wa/status`), dan webhook listener (`/api/wa/webhook`).
4. **Ringkasan API Endpoints**:
   - 🛍️ **Produk**: `GET /api/products`, `GET /api/products/search`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
   - 🏷️ **Kategori**: `GET /api/categories`, `POST /api/categories` (dengan validasi nama unik HTTP 400), `PUT`, `DELETE`
   - 🎨 **Banner**: `GET /api/banners`, `POST /api/banners`, `PUT`, `DELETE`
   - 🔐 **Auth & User**: `POST /api/auth/login`, `POST /api/customer/register`, `POST /api/customer/login`, `GET /api/customer/profile`
   - 💬 **Live Chat**: `GET /api/chat/contacts`, `GET /api/chat/history/:jid`, `POST /api/chat/send`

---

## 🛠️ Best Practices & Code Standards

1. **Standardized Button System**:
   Semua tombol di aplikasi menggunakan komponen terpusat `<Button>` (`app/components/ui/button.tsx`) dengan styling `cn(...)`.
2. **Separation of Concerns**:
   Logika state & API dipisahkan dari view UI melalui custom hooks (`useProducts.ts`, `useCategories.ts`, `useCategoryManagement.ts`).
3. **Desain Mobile-First & Touch Target**:
   Elemen interaktif pada perangkat seluler memiliki ukuran area sentuh minimal 44px untuk kenyamanan maksimal pengguna smartphone.
