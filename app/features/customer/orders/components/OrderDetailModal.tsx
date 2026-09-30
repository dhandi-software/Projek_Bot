import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { OrderDetailDesktopModal } from "./desktop/OrderDetailDesktopModal";
import { OrderDetailMobileDrawer } from "./mobile/OrderDetailMobileDrawer";
import type { OrderDetailModalProps } from "../types/orderDetail.types";

export function OrderDetailModal({ orderId, isOpen, onClose }: OrderDetailModalProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!isOpen || !orderId || !mounted) return null;

    const modalContent = isMobile ? (
        <OrderDetailMobileDrawer orderId={orderId} isOpen={isOpen} onClose={onClose} />
    ) : (
        <OrderDetailDesktopModal orderId={orderId} isOpen={isOpen} onClose={onClose} />
    );

    return createPortal(modalContent, document.body);
}

export default OrderDetailModal;
