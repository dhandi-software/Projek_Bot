import React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import {
    Layers,
    Store,
    MapPin,
    ShoppingCart,
    Heart,
    ArrowLeftRight,
    CreditCard,
    Clock,
    Settings,
    LogOut,
} from "lucide-react";

export interface NavItemConfig {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    badge?: string | number;
    badgeVariant?: "default" | "orange" | "secondary";
}

export interface NavigationSideBarProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Active item ID override (misal: 'order-history', 'dashboard', dll) */
    activeId?: string;
    /** Daftar item navigasi custom (default mengambil dari Figma design jika kosong) */
    items?: NavItemConfig[];
    /** Callback saat menu diklik */
    onSelect?: (id: string, item: NavItemConfig) => void;
    /** Callback saat tombol Log-out diklik */
    onLogout?: () => void;
    /** Warna background highlight item aktif (default sesuai Figma: #FA8232) */
    activeBgClass?: string;
}

export const DEFAULT_FIGMA_NAV_ITEMS: NavItemConfig[] = [
    { id: "dashboard", label: "Dashboard", icon: Layers, href: "/customer/dashboard" },
    { id: "order-history", label: "Order History", icon: Store, href: "/customer/orders" },
    { id: "track-order", label: "Track Order", icon: MapPin, href: "/track-order" },
    { id: "shopping-cart", label: "Shopping Cart", icon: ShoppingCart, href: "/cart" },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist" },
    { id: "compare", label: "Compare", icon: ArrowLeftRight, href: "/compare" },
    { id: "cards-address", label: "Cards & Address", icon: CreditCard, href: "/profile" },
    { id: "browsing-history", label: "Browsing History", icon: Clock, href: "/history" },
    { id: "setting", label: "Setting", icon: Settings, href: "/settings" },
    { id: "logout", label: "Log-out", icon: LogOut },
];

export const NavigationSideBar = React.forwardRef<HTMLDivElement, NavigationSideBarProps>(
    (
        {
            activeId = "order-history",
            items = DEFAULT_FIGMA_NAV_ITEMS,
            onSelect,
            onLogout,
            activeBgClass = "bg-[#FA8232]",
            className,
            ...props
        },
        ref
    ) => {
        const location = useLocation();

        const isItemActive = (item: NavItemConfig) => {
            if (activeId && activeId === item.id) return true;
            if (item.href && location.pathname === item.href) return true;
            return false;
        };

        return (
            <aside
                ref={ref}
                className={cn(
                    "w-[264px] bg-white border border-[#E4E7E9] rounded-[4px] py-4 shadow-[0px_8px_20px_rgba(0,0,0,0.08)] flex flex-col shrink-0 select-none",
                    className
                )}
                data-name="Navigation Side-bar"
                {...props}
            >
                <nav className="w-full flex flex-col space-y-0.5">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = isItemActive(item);
                        const isLogout = item.id === "logout";

                        const handleClick = (e: React.MouseEvent) => {
                            if (isLogout) {
                                e.preventDefault();
                                if (onLogout) onLogout();
                            } else if (onSelect) {
                                onSelect(item.id, item);
                            }
                        };

                        const itemContent = (
                            <div
                                onClick={handleClick}
                                className={cn(
                                    "h-[40px] w-full flex items-center px-6 gap-3 transition-colors cursor-pointer group",
                                    isActive
                                        ? cn(activeBgClass, "text-white font-semibold")
                                        : "text-[#5F6C72] hover:bg-zinc-50 hover:text-[#191C1F]"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                                        isActive ? "text-white" : "text-[#5F6C72] group-hover:text-[#191C1F]"
                                    )}
                                />
                                <span className="text-[14px] leading-[20px] font-normal truncate flex-1">
                                    {item.label}
                                </span>
                                {item.badge !== undefined && (
                                    <span
                                        className={cn(
                                            "text-xs px-2 py-0.5 rounded-full font-bold shrink-0",
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-zinc-100 text-zinc-600"
                                        )}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        );

                        if (item.href && !isLogout) {
                            return (
                                <Link key={item.id} to={item.href} className="w-full block">
                                    {itemContent}
                                </Link>
                            );
                        }

                        return (
                            <div key={item.id} className="w-full">
                                {itemContent}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        );
    }
);

NavigationSideBar.displayName = "NavigationSideBar";
export default NavigationSideBar;
