import {
    type RouteConfig,
    index,
    route,
    prefix,
    layout,
} from "@react-router/dev/routes";

export default [
    layout("routes/landing/landing-layout.tsx", [
        route("/", "routes/landing/Home.tsx"),
        route("profile", "routes/landing/About.tsx"),
        route("guide", "routes/landing/Guide.tsx"),
        route("requirements", "routes/landing/Requirements.tsx"),
        route("format", "routes/landing/Format.tsx"),
        route("faq", "routes/landing/FAQ.tsx"),
        route("article/:slug", "routes/landing/article.tsx"),
        route("search", "routes/search.tsx"),
        route("category-demo", "routes/landing/CategoryDemo.tsx"),
        route("product/*", "routes/landing/ProductDetail.tsx"),
        route("product-detail/*", "routes/landing/ProductDetail.tsx", { id: "product-detail-alias" }),
        route("track-order", "routes/landing/TrackOrder.tsx"),
        route("track-order/detail", "routes/landing/TrackOrderDetail.tsx"),
        route("compare", "routes/landing/Compare.tsx"),
    ]),


    // API Routes
    route("api/chat-ai", "routes/api/chat-ai.ts"),

    // Authentication & Dashboard
    route("login", "routes/login/login.tsx"),
    route("register", "routes/register/register.tsx"),
    route("forgot-password", "routes/forgot-password/forgot-password.tsx"),
    layout("routes/admin/layout.tsx", [
        route("admin", "routes/admin/index.tsx"),
        route("admin/dashboard", "routes/admin/index.tsx", { id: "admin-dashboard" }),
        route("admin/koneksi", "routes/admin/koneksi.tsx"),
        route("admin/chat", "routes/admin/chat.tsx"),
        route("admin/produk", "routes/admin/produk.tsx"),
        route("admin/banner", "routes/admin/banner.tsx"),
        route("admin/profile", "routes/landing/About.tsx", { id: "admin-profile" }),
        // Backward compatibility alias for dashboard
        route("dashboard", "routes/admin/index.tsx", { id: "legacy-dashboard" }),
        route("dashboard/koneksi", "routes/admin/koneksi.tsx", { id: "legacy-dashboard-koneksi" }),
        route("dashboard/chat", "routes/admin/chat.tsx", { id: "legacy-dashboard-chat" }),
        route("dashboard/produk", "routes/admin/produk.tsx", { id: "legacy-dashboard-produk" }),
        route("dashboard/banner", "routes/admin/banner.tsx", { id: "legacy-dashboard-banner" }),
    ]),

    // Catch-all 404 Route
    route("*", "routes/$.tsx"),
] satisfies RouteConfig;
