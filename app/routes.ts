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
    ]),

    // API Routes
    route("api/chat-ai", "routes/api/chat-ai.ts"),

    // Authentication & Dashboard
    route("login", "routes/login/login.tsx"),
    route("register", "routes/register/register.tsx"),
    route("forgot-password", "routes/forgot-password/forgot-password.tsx"),
    layout("routes/dashboard/layout.tsx", [
        route("dashboard", "routes/dashboard/index.tsx"),
        route("dashboard/koneksi", "routes/dashboard/koneksi.tsx"),
        route("dashboard/chat", "routes/dashboard/chat.tsx"),
        route("dashboard/produk", "routes/dashboard/produk.tsx"),
        route("dashboard/banner", "routes/dashboard/banner.tsx"),
        route("dashboard/profile", "routes/landing/About.tsx", { id: "dashboard-profile" }),
    ]),

    // Catch-all 404 Route
    route("*", "routes/$.tsx"),
] satisfies RouteConfig;
