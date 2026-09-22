import React from "react";
import { User, Mail, Phone, MapPin, FileText, Save, RotateCcw } from "lucide-react";
import type { ProfileFormData } from "../../types/profile.types";

interface ProfileFormDesktopProps {
    formData: ProfileFormData;
    isEditing: boolean;
    isSaving: boolean;
    onInputChange: (field: keyof Omit<ProfileFormData, "photoFile">, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ProfileFormDesktop({
    formData,
    isEditing,
    isSaving,
    onInputChange,
    onSave,
    onCancel,
}: ProfileFormDesktopProps) {
    return (
        <div className="bg-white rounded-3xl p-8 border border-zinc-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                    <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                        Informasi Pengguna
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        Kelola data profil pengguna untuk akun Anda.
                    </p>
                </div>
                {isEditing && (
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold animate-pulse">
                        Perubahan Belum Disimpan
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => onInputChange("name", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                    />
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        Username
                    </label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => onInputChange("username", e.target.value)}
                        placeholder="username"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <Mail className="w-3.5 h-3.5 text-zinc-400" />
                        Alamat Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                    />
                </div>

                {/* Nomor Telepon */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        Nomor Telepon
                    </label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => onInputChange("phone", e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                    />
                </div>

                {/* Alamat */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        Alamat Lengkap
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => onInputChange("address", e.target.value)}
                        placeholder="Masukkan alamat domisili atau toko"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all"
                    />
                </div>

                {/* Bio / Ringkasan */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        Bio & Catatan Pengguna
                    </label>
                    <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => onInputChange("bio", e.target.value)}
                        placeholder="Tulis ringkasan singkat tentang Anda atau toko Anda..."
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all resize-none"
                    />
                </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Batal</span>
                    </button>
                )}
                <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-6 py-2.5 bg-[#00a884] hover:bg-[#0d7c82] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                        isSaving ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
                </button>
            </div>
        </div>
    );
}
