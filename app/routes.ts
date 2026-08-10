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
        route("guide", "routes/landing/Guide.tsx"),
        route("requirements", "routes/landing/Requirements.tsx"),
        route("format", "routes/landing/Format.tsx"),
        route("faq", "routes/landing/FAQ.tsx"),
        route("article/:slug", "routes/landing/article.tsx"),
        route("search", "routes/search.tsx"),
    ]),

    // Authentication & Dashboard (no header/footer)
    route("login", "routes/login/login.tsx"),
    route("forgot-password", "routes/forgot-password/forgot-password.tsx"),
    layout("routes/dashboard/layout.tsx", [
        route("dashboard", "routes/dashboard/index.tsx"),
        route("dashboard/koneksi", "routes/dashboard/koneksi.tsx"),
    ]),

    // Catch-all 404 Route
    route("*", "routes/$.tsx"),
] satisfies RouteConfig;
