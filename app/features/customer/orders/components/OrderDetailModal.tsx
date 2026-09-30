import React, { useState, useEffect } from "react";
import { OrderDetailDesktopModal } from "./desktop/OrderDetailDesktopModal";
import { OrderDetailMobileDrawer } from "./mobile/OrderDetailMobileDrawer";
import type { OrderDetailModalProps } from "../types/orderDetail.types";

export function OrderDetailModal({ orderId, isOpen, onClose }: OrderDetailModalProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return <OrderDetailMobileDrawer orderId={orderId} isOpen={isOpen} onClose={onClose} />;
    }

    return <OrderDetailDesktopModal orderId={orderId} isOpen={isOpen} onClose={onClose} />;
}

export default OrderDetailModal;
