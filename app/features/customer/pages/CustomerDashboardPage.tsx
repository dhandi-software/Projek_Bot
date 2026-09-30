import React from "react";
import { CustomerDashboardDesktop } from "../components/desktop/CustomerDashboardDesktop";
import { CustomerDashboardMobile } from "../components/mobile/CustomerDashboardMobile";

export function CustomerDashboardPage() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Desktop View (screens md and up) */}
            <div className="hidden md:block">
                <CustomerDashboardDesktop />
            </div>

            {/* Mobile View (screens smaller than md) */}
            <div className="block md:hidden">
                <CustomerDashboardMobile />
            </div>
        </div>
    );
}

export default CustomerDashboardPage;
