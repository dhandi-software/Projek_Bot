import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import type { InvoiceData, InvoiceHookResult } from "~/types/invoice.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export function useInvoice(customOrderId?: string): InvoiceHookResult {
    const params = useParams<{ orderId: string }>();
    const orderId = customOrderId || params.orderId;

    const [invoice, setInvoice] = useState<InvoiceData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDownloadingPDF, setIsDownloadingPDF] = useState<boolean>(false);

    const fetchInvoice = useCallback(async () => {
        if (!orderId) {
            setError("Nomor pesanan (Order ID) tidak valid.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("Pesanan tidak ditemukan.");
                }
                throw new Error("Gagal mengambil data pesanan dari server.");
            }

            const data = await res.json();
            const orderData: InvoiceData = data.data || data;
            setInvoice(orderData);
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan saat memuat invoice.");
        } finally {
            setIsLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        fetchInvoice();
    }, [fetchInvoice]);

    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val || 0);
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        try {
            return new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }) + " WIB";
        } catch {
            return dateStr;
        }
    };

    const handlePrint = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    const handleDownloadPDF = async () => {
        if (!orderId) return;
        setIsDownloadingPDF(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/invoice`);
            if (!res.ok) throw new Error("Gagal mengunduh file PDF invoice.");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Invoice_${orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            alert(err.message || "Terjadi kesalahan saat mendownload invoice.");
        } finally {
            setIsDownloadingPDF(false);
        }
    };

    return {
        invoice,
        isLoading,
        error,
        formatRupiah,
        formatDate,
        handlePrint,
        handleDownloadPDF,
        isDownloadingPDF,
    };
}
