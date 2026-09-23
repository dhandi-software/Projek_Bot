import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function CreditCardView() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    return (
        <div className="border border-amber-200 bg-amber-50/40 rounded-lg p-4 space-y-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold text-amber-900">
                <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Kartu Kredit / Debit Online</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-normal">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>256-bit Encrypted</span>
                </div>
            </div>

            <div className="space-y-2.5">
                <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-zinc-700">Nomor Kartu</Label>
                    <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8921"
                        className="h-10 text-xs border-zinc-300 bg-white font-mono"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-zinc-700">Nama di Kartu</Label>
                        <Input
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Nama Lengkap Pemilik"
                            className="h-10 text-xs border-zinc-300 bg-white"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-zinc-700">Expired</Label>
                            <Input
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="h-10 text-xs border-zinc-300 bg-white text-center font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[11px] font-semibold text-zinc-700">CVV</Label>
                            <Input
                                type="password"
                                maxLength={4}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="•••"
                                className="h-10 text-xs border-zinc-300 bg-white text-center font-mono"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
