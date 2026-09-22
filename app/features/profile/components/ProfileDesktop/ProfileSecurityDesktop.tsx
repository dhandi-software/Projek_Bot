import React, { useState } from "react";
import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { ConfirmPasswordModal } from "../ConfirmPasswordModal";
import { authService } from "~/services/authService";

interface ProfileSecurityDesktopProps {
    onShowToast: (title: string, variant?: "success" | "destructive" | "default") => void;
}

export function ProfileSecurityDesktop({ onShowToast }: ProfileSecurityDesktopProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            onShowToast("Semua kolom kata sandi wajib diisi", "destructive");
            return;
        }
        if (newPassword !== confirmPassword) {
            onShowToast("Konfirmasi kata sandi baru tidak cocok", "destructive");
            return;
        }
        if (newPassword.length < 6) {
            onShowToast("Kata sandi minimal 6 karakter", "destructive");
            return;
        }

        // Open modal dialog for confirmation
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = async () => {
        setIsUpdating(true);
        try {
            const savedUserStr = localStorage.getItem("user");
            let userId: number | undefined = undefined;
            if (savedUserStr) {
                try {
                    const parsed = JSON.parse(savedUserStr);
                    if (parsed.id) userId = Number(parsed.id);
                } catch (e) {
                    console.error("Failed to parse user ID", e);
                }
            }

            const res = await authService.changePassword(userId, currentPassword, newPassword);
            setIsUpdating(false);
            setShowConfirmModal(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onShowToast(res.message || "Kata sandi berhasil diperbarui!", "success");
        } catch (err: any) {
            setIsUpdating(false);
            setShowConfirmModal(false);
            const errMsg = err.response?.data?.message || err.message || "Gagal memperbarui kata sandi";
            onShowToast(errMsg, "destructive");
        }
    };

    return (
        <div className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xs space-y-6">
            <div className="border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-[#00a884]" />
                    <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                        Keamanan & Kata Sandi
                    </h2>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                    Perbarui kata sandi secara berkala untuk menjaga keamanan akun Anda.
                </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 w-full">
                {/* Kata Sandi Saat Ini */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        Kata Sandi Saat Ini
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all pr-11"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                            title={showCurrentPassword ? "Sembunyikan Kata Sandi" : "Lihat Kata Sandi"}
                        >
                            {showCurrentPassword ? <EyeOff className="w-5 h-5 text-zinc-600" /> : <Eye className="w-5 h-5 text-zinc-600" />}
                        </button>
                    </div>
                </div>

                {/* Kata Sandi Baru & Konfirmasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                            Kata Sandi Baru
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Minimal 6 karakter"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all pr-11"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                                title={showNewPassword ? "Sembunyikan Kata Sandi" : "Lihat Kata Sandi"}
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5 text-zinc-600" /> : <Eye className="w-5 h-5 text-zinc-600" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                            Konfirmasi Sandi Baru
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ulangi sandi baru"
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all pr-11"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                                title={showConfirmPassword ? "Sembunyikan Kata Sandi" : "Lihat Kata Sandi"}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5 text-zinc-600" /> : <Eye className="w-5 h-5 text-zinc-600" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{isUpdating ? "Memproses..." : "Perbarui Kata Sandi"}</span>
                    </button>
                </div>
            </form>

            <ConfirmPasswordModal
                open={showConfirmModal}
                onOpenChange={setShowConfirmModal}
                onConfirm={handleConfirmUpdate}
                isLoading={isUpdating}
            />
        </div>
    );
}
