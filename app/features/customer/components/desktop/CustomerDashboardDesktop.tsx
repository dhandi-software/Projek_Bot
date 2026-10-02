import React from "react";
import { Link, useNavigate } from "react-router";
import { NavigationSideBar } from "~/components/ui/NavigationSideBar";
import { useCustomerDashboard } from "~/hooks/useCustomerDashboard";
import { CustomerAccountInfoSection } from "./CustomerAccountInfoSection";
import { CustomerPaymentOptionsSection } from "./CustomerPaymentOptionsSection";
import { CustomerRecentOrdersSection } from "./CustomerRecentOrdersSection";
import { CustomerBrowsingHistorySection } from "./CustomerBrowsingHistorySection";

export function CustomerDashboardDesktop() {
    const navigate = useNavigate();
    const {
        profile,
        billingAddress,
        cards,
        orders,
        stats,
        browsingHistory,
        activeCardMenuId,
        handleToggleCardMenu,
        handleDeleteCard,
        logout,
    } = useCustomerDashboard();

    return (
        <div className="w-full bg-white pb-16 pt-8 px-8">
            <div className="max-w-[1320px] mx-auto flex gap-8 items-start">
                {/* Navigation Sidebar Component (Figma node: 21:7312) */}
                <NavigationSideBar
                    activeId="dashboard"
                    onLogout={logout}
                    onSelect={(id) => {
                        if (id === "order-history") navigate("/orders");
                        if (id === "track-order") navigate("/track-order");
                        if (id === "shopping-cart") navigate("/cart");
                        if (id === "wishlist") navigate("/wishlist");
                        if (id === "compare") navigate("/compare");
                        if (id === "cards-address") navigate("/profile");
                        if (id === "setting") navigate("/settings");
                    }}
                />

                {/* Main Dashboard Content Area (Figma node: 21:7444) */}
                <main className="flex-1 flex flex-col gap-6 min-w-0">
                    {/* Header Greeting */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[20px] font-semibold text-[#191C1F]">
                            Hello, {profile.name}
                        </h1>
                        <p className="text-[14px] text-[#475156] leading-relaxed max-w-[720px]">
                            From your account dashboard, you can easily check & view your{" "}
                            <Link to="/orders" className="text-[#2DA5F3] font-medium hover:underline">
                                Recent Orders
                            </Link>
                            , manage your{" "}
                            <Link to="/profile" className="text-[#2DA5F3] font-medium hover:underline">
                                Shipping and Billing Addresses
                            </Link>
                            {" "}and edit your{" "}
                            <Link to="/profile" className="text-[#2DA5F3] font-medium hover:underline">
                                Password
                            </Link>
                            {" "}and{" "}
                            <Link to="/profile" className="text-[#2DA5F3] font-medium hover:underline">
                                Account Details
                            </Link>
                            .
                        </p>
                    </div>

                    {/* Row 1: Account Info, Billing Address & Quick Stats */}
                    <CustomerAccountInfoSection
                        profile={profile}
                        billingAddress={billingAddress}
                        stats={stats}
                        onEditAccount={() => navigate("/profile")}
                        onEditAddress={() => navigate("/profile")}
                    />

                    {/* Row 2: Payment Option Cards */}
                    <CustomerPaymentOptionsSection
                        cards={cards}
                        activeCardMenuId={activeCardMenuId}
                        onToggleCardMenu={handleToggleCardMenu}
                        onDeleteCard={handleDeleteCard}
                        onAddCard={() => navigate("/profile")}
                    />

                    {/* Row 3: Recent Orders Table */}
                    <CustomerRecentOrdersSection
                        orders={orders}
                        onViewAll={() => navigate("/orders")}
                    />

                    {/* Row 4: Browsing History Carousel/Grid */}
                    <CustomerBrowsingHistorySection
                        products={browsingHistory}
                        onViewAll={() => navigate("/history")}
                    />
                </main>
            </div>
        </div>
    );
}

export default CustomerDashboardDesktop;
