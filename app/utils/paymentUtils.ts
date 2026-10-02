import { useState, useEffect } from "react";

export interface BankDisplayInfo {
    bankName: string;
    bankCode: string;
    fullLabel: string;
}

export function getBankDisplayInfo(vaBank?: string, paymentType?: string, vaNumber?: string): BankDisplayInfo {
    let rawBank = (vaBank || "").toLowerCase().trim();
    const rawType = (paymentType || "").toLowerCase().trim();

    if (!rawBank) {
        if (rawType.includes("bca")) rawBank = "bca";
        else if (rawType.includes("mandiri")) rawBank = "mandiri";
        else if (rawType.includes("bni")) rawBank = "bni";
        else if (rawType.includes("bri")) rawBank = "bri";
        else if (rawType.includes("permata")) rawBank = "permata";
        else if (rawType.includes("cimb")) rawBank = "cimb";
        else if (rawType.includes("danamon")) rawBank = "danamon";
        else if (vaNumber) {
            if (vaNumber.startsWith("3902") || vaNumber.startsWith("800") || vaNumber.startsWith("7000")) rawBank = "bca";
            else if (vaNumber.startsWith("8800") || vaNumber.startsWith("89")) rawBank = "mandiri";
            else if (vaNumber.startsWith("988") || vaNumber.startsWith("88")) rawBank = "bni";
            else if (vaNumber.startsWith("123") || vaNumber.startsWith("100")) rawBank = "bri";
            else rawBank = "bca";
        }
    }

    switch (rawBank) {
        case "bca":
            return { bankName: "Bank BCA", bankCode: "BCA", fullLabel: "Transfer Bank (Bank BCA)" };
        case "mandiri":
            return { bankName: "Bank Mandiri", bankCode: "MANDIRI", fullLabel: "Transfer Bank (Bank Mandiri)" };
        case "bni":
            return { bankName: "Bank BNI", bankCode: "BNI", fullLabel: "Transfer Bank (Bank BNI)" };
        case "bri":
            return { bankName: "Bank BRI", bankCode: "BRI", fullLabel: "Transfer Bank (Bank BRI)" };
        case "permata":
            return { bankName: "Bank Permata", bankCode: "PERMATA", fullLabel: "Transfer Bank (Bank Permata)" };
        case "cimb":
            return { bankName: "Bank CIMB Niaga", bankCode: "CIMB", fullLabel: "Transfer Bank (Bank CIMB Niaga)" };
        case "danamon":
            return { bankName: "Bank Danamon", bankCode: "DANAMON", fullLabel: "Transfer Bank (Bank Danamon)" };
        default:
            if (rawType === "bank_transfer" || rawType.includes("bank") || vaNumber) {
                return { bankName: "Bank BCA", bankCode: "BCA", fullLabel: "Transfer Bank (Bank BCA)" };
            }
            return { bankName: paymentType || "Transfer Bank", bankCode: "BANK", fullLabel: paymentType || "Transfer Bank" };
    }
}

const EXPIRE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours

export interface PaymentCountdownResult {
    remainingMs: number;
    isExpired: boolean;
    formattedTime: string; // "23:59:59"
    hours: number;
    minutes: number;
    seconds: number;
    expireAtStr: string;
}

export function usePaymentCountdown(createdAtStr?: string, status?: string): PaymentCountdownResult {
    const [timeLeft, setTimeLeft] = useState<PaymentCountdownResult>({
        remainingMs: EXPIRE_DURATION_MS,
        isExpired: false,
        formattedTime: "24:00:00",
        hours: 24,
        minutes: 0,
        seconds: 0,
        expireAtStr: "",
    });

    useEffect(() => {
        if (!createdAtStr) return;

        const updateTimer = () => {
            const createdTime = new Date(createdAtStr).getTime();
            if (isNaN(createdTime)) return;

            const expireTime = createdTime + EXPIRE_DURATION_MS;
            const now = Date.now();
            const remainingMs = Math.max(0, expireTime - now);
            const isExpired = remainingMs <= 0;

            const totalSec = Math.floor(remainingMs / 1000);
            const hours = Math.floor(totalSec / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            const seconds = totalSec % 60;

            const pad = (n: number) => String(n).padStart(2, "0");
            const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

            const expireDate = new Date(expireTime);
            const expireAtStr =
                expireDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }) + " WIB";

            setTimeLeft({
                remainingMs,
                isExpired,
                formattedTime,
                hours,
                minutes,
                seconds,
                expireAtStr,
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [createdAtStr, status]);

    return timeLeft;
}
