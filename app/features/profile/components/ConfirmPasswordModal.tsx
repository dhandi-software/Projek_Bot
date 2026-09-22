import React from "react";
import { KeyRound, ShieldAlert, X, Loader2 } from "lucide-react";

interface ConfirmPasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export function ConfirmPasswordModal({
    open,
    onOpenChange,
    onConfirm,
    isLoading = false,
}: ConfirmPasswordModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-[90vw] max-w-[440px] min-w-[300px] shrink-0 bg-white rounded-2xl md:rounded-3xl p-6 md:p-7 border border-zinc-200/80 shadow-2xl space-y-5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => !isLoading && onOpenChange(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Icon & Title */}
                <div className="flex flex-col items-center text-center space-y-3 pt-1">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-600 shadow-xs">
                        <ShieldAlert className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5 w-full">
                        <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">
                            Konfirmasi Ubah Kata Sandi
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-500 leading-relaxed px-1">
                            Apakah Anda yakin ingin mengubah kata sandi akun Anda? Anda harus menggunakan kata sandi baru ini untuk masuk pada sesi berikutnya.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2 w-full">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs md:text-sm font-bold transition-all disabled:opacity-50 cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <KeyRound className="w-4 h-4" />
                                <span>Ya, Ubah Sandi</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
