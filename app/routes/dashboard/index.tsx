import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { DashboardDesktop, DashboardMobile } from "~/features/dashboard/pages";

export function meta() {
    return [
        { title: "Dashboard Overview - Projek Bot" },
        { name: "description", content: "Dashboard Ringkasan Penjualan dan Performa Bot" },
    ];
}

export default function DashboardIndex() {
    const context = useOutletContext<ContextType | undefined>();
    const [isMobileWindow, setIsMobileWindow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileWindow(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = context?.isMobile ?? isMobileWindow;

    return isMobile ? <DashboardMobile /> : <DashboardDesktop />;
}
