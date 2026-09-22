import React from "react";
import { User, Mail, Phone, MapPin, FileText, Save, RotateCcw } from "lucide-react";
import type { ProfileFormData } from "../../types/profile.types";

interface ProfileFormMobileProps {
    formData: ProfileFormData;
    isEditing: boolean;
    isSaving: boolean;
    onInputChange: (field: keyof Omit<ProfileFormData, "photoFile">, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ProfileFormMobile({
    formData,
    isEditing,
    isSaving,
    onInputChange,
    onSave,
    onCancel,
}: ProfileFormMobileProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-zinc-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <h2 className="text-sm font-bold text-zinc-900">Informasi Pengguna</h2>
                {isEditing && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                        Belum Disimpan
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {/* Nama Lengkap */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <User className="w-3 h-3 text-zinc-400" /> Nama Lengkap
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => onInputChange("name", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884]"
                    />
                </div>

                {/* Username */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <User className="w-3 h-3 text-zinc-400" /> Username
                    </label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => onInputChange("username", e.target.value)}
                        placeholder="username"
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884]"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <Mail className="w-3 h-3 text-zinc-400" /> Alamat Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => onInputChange("email", e.target.value)}
                        placeholder="email@domain.com"
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884]"
                    />
                </div>

                {/* Nomor Telepon */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <Phone className="w-3 h-3 text-zinc-400" /> Nomor Telepon
                    </label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => onInputChange("phone", e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884]"
                    />
                </div>

                {/* Alamat */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-zinc-400" /> Alamat Lengkap
                    </label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => onInputChange("address", e.target.value)}
                        placeholder="Masukkan alamat domisili"
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884]"
                    />
                </div>

                {/* Bio */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-600 flex items-center gap-1 uppercase tracking-wider">
                        <FileText className="w-3 h-3 text-zinc-400" /> Bio / Catatan
                    </label>
                    <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => onInputChange("bio", e.target.value)}
                        placeholder="Bio singkat..."
                        className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-900 focus:bg-white focus:outline-none focus:border-[#00a884] resize-none"
                    />
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-zinc-100 flex items-center gap-2">
                {isEditing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-zinc-100 active:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Batal</span>
                    </button>
                )}
                <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#00a884] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? "Menyimpan..." : "Simpan Profil"}</span>
                </button>
            </div>
        </div>
    );
}
