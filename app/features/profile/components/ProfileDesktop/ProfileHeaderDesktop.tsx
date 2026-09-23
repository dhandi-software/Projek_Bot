import React, { useRef } from "react";
import { Camera, Shield, CheckCircle2, UploadCloud, User, Star, RotateCcw } from "lucide-react";
import type { ProfileFormData, UserProfileData } from "../../types/profile.types";
import { getAvatarInitials } from "~/lib/avatar";

interface ProfileHeaderDesktopProps {
    profile: UserProfileData;
    formData: ProfileFormData;
    onPhotoUpload: (file: File) => void;
    onResetPhoto?: () => void;
}

export function ProfileHeaderDesktop({ profile, formData, onPhotoUpload, onResetPhoto }: ProfileHeaderDesktopProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onPhotoUpload(e.target.files[0]);
        }
    };

    const isAdmin = (profile.role || "").toLowerCase() === "admin";

    return (
        <div className="bg-white rounded-[32px] border border-zinc-200/80 shadow-xs overflow-hidden transition-all">
            {/* Cover Banner with M3 Shapes */}
            <div className={`h-54 ${isAdmin ? "bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white" : "bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] text-[#152e00]"} relative p-6 flex items-start justify-between overflow-hidden`}>
                {/* Shapes */}
                <div className="absolute -top-8 -left-10 w-72 h-38 rounded-full bg-white/10 border border-white/10 pointer-events-none animate-m3-blob-1" />
                <div className="absolute top-4 left-44 opacity-20 pointer-events-none animate-m3-horizontal">
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                        <polygon points="48,5 84,26 84,70 48,91 12,70 12,26" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                </div>
                <div className="absolute bottom-5 left-[54%] text-white/20 pointer-events-none animate-bounce">
                    <Star className="w-8 h-8 fill-current" />
                </div>

                <div className="relative z-10 flex items-center gap-2 bg-black/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold tracking-wide uppercase">
                    <Shield className="w-4 h-4" />
                    <span>Role: {profile.role}</span>
                </div>

                <div className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-extrabold text-xs ${isAdmin ? "bg-amber-400 text-slate-950" : "bg-[#152e00] text-[#bcf677]"}`}>
                    <User className="w-3.5 h-3.5" />
                    <span>{isAdmin ? "Profil Administrator" : "Profil Customer"}</span>
                </div>
            </div>

            {/* Profile Avatar & Primary Info */}
            <div className="p-8 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 z-20">
                <div className="flex items-end gap-6">
                    {/* Avatar Container */}
                    <div className="relative group shrink-0">
                        <div className="w-32 h-32 rounded-[24px] ring-4 ring-white bg-zinc-100 shadow-lg overflow-hidden flex items-center justify-center border border-zinc-200">
                            {formData.photo && formData.photo !== "/images/avatar.svg" ? (
                                <img
                                    src={formData.photo}
                                    alt={formData.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#152e00] text-[#bcf677] font-black text-4xl flex items-center justify-center">
                                    {getAvatarInitials(formData.name || profile.name)}
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-[#152e00]/75 text-white rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 cursor-pointer font-extrabold text-xs backdrop-blur-xs"
                        >
                            <Camera className="w-6 h-6 text-[#bcf677]" />
                            <span>Ubah Foto</span>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="pb-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                                {formData.name || "Nama Pengguna"}
                            </h1>
                            <CheckCircle2 className="w-6 h-6 text-[#84cc16] fill-[#84cc16]/10" />
                        </div>
                        <p className="text-zinc-500 text-sm font-semibold">
                            @{formData.username || "username"} · <span className="text-zinc-400">{formData.email}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {onResetPhoto && formData.photo && formData.photo !== "/images/avatar.svg" && (
                        <button
                            type="button"
                            onClick={onResetPhoto}
                            className="flex items-center gap-2 px-4 py-3 border border-red-200 hover:bg-red-50 text-red-600 rounded-full text-xs font-bold transition-all cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset Foto</span>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2.5 px-5 py-3 bg-[#152e00] hover:bg-[#152e00]/90 text-white rounded-full text-xs font-extrabold transition-all shadow-xs active:scale-97 cursor-pointer"
                    >
                        <UploadCloud className="w-4 h-4 text-[#bcf677]" />
                        <span>Upload Foto Profil</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
