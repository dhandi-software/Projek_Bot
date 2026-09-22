import React, { useRef } from "react";
import { Camera, Shield, CheckCircle2, UploadCloud, User, Star } from "lucide-react";
import type { ProfileFormData, UserProfileData } from "../../types/profile.types";
import { getAvatarInitials } from "~/lib/avatar";

interface ProfileHeaderDesktopProps {
    profile: UserProfileData;
    formData: ProfileFormData;
    onPhotoUpload: (file: File) => void;
}

export function ProfileHeaderDesktop({ profile, formData, onPhotoUpload }: ProfileHeaderDesktopProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onPhotoUpload(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white rounded-[32px] border border-zinc-200/80 shadow-xs overflow-hidden transition-all">
            {/* Expressive M3 Lime Green Customer Banner Cover with Medium-Large Material 3 Shapes */}
            <div className="h-54 bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] relative p-6 flex items-start justify-between overflow-hidden text-[#152e00]">
                {/* === LEFT MATERIAL SHAPES === */}
                {/* Shape L1: Floating Capsule Pill */}
                <div className="absolute -top-8 -left-10 w-72 h-38 rounded-full bg-[#9fe94b]/55 border border-[#152e00]/15 pointer-events-none animate-m3-blob-1" />
                {/* Shape L2: SVG Material Hexagon Left */}
                <div className="absolute top-4 left-44 opacity-40 pointer-events-none animate-m3-horizontal">
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                        <polygon points="48,5 84,26 84,70 48,91 12,70 12,26" fill="#152e00" opacity="0.14" stroke="#152e00" strokeWidth="2.5" />
                    </svg>
                </div>
                {/* Shape L3: Hollow Ring Left */}
                <div className="absolute top-8 left-28 w-24 h-24 rounded-full border-3 border-[#152e00]/25 pointer-events-none animate-m3-blob-2" />
                {/* Shape L4: Arc Curve Outline Left */}
                <div className="absolute -bottom-8 left-16 w-44 h-44 border-t-3 border-r-3 border-[#152e00]/40 rounded-tr-full pointer-events-none" />
                {/* Shape L5: Rotated Diamond Chip Left */}
                <div className="absolute bottom-6 left-72 w-9 h-9 rounded-xl bg-[#152e00]/15 rotate-45 border border-[#152e00]/20 pointer-events-none animate-pulse" />

                {/* === MIDDLE MATERIAL SHAPES === */}
                {/* Shape M1: Floating Pill Capsule Middle */}
                <div className="absolute top-2 left-1/3 w-64 h-32 rounded-full bg-[#d2fa94]/65 border border-[#152e00]/15 pointer-events-none animate-m3-blob-2" />
                {/* Shape M2: SVG Concentric Hexagon Middle */}
                <div className="absolute top-5 left-[39%] opacity-40 pointer-events-none animate-m3-blob-1">
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                        <polygon points="42,5 74,24 74,60 42,79 10,60 10,24" stroke="#152e00" strokeWidth="2.5" fill="none" />
                        <circle cx="42" cy="42" r="12" fill="#152e00" opacity="0.22" />
                    </svg>
                </div>
                {/* Shape M3: Dotted Grid Matrix Middle */}
                <div className="absolute bottom-4 left-[48%] opacity-35 pointer-events-none">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <circle cx="7" cy="7" r="3.5" fill="#152e00" />
                        <circle cx="28" cy="7" r="3.5" fill="#152e00" />
                        <circle cx="49" cy="7" r="3.5" fill="#152e00" />
                        <circle cx="7" cy="28" r="3.5" fill="#152e00" />
                        <circle cx="28" cy="28" r="3.5" fill="#152e00" />
                        <circle cx="49" cy="28" r="3.5" fill="#152e00" />
                        <circle cx="7" cy="49" r="3.5" fill="#152e00" />
                        <circle cx="28" cy="49" r="3.5" fill="#152e00" />
                        <circle cx="49" cy="49" r="3.5" fill="#152e00" />
                    </svg>
                </div>
                {/* Shape M4: Material Star Icon Middle */}
                <div className="absolute bottom-5 left-[54%] text-[#152e00]/35 pointer-events-none animate-bounce">
                    <Star className="w-8 h-8 fill-[#152e00]/25" />
                </div>

                {/* === RIGHT MATERIAL SHAPES === */}
                {/* Shape R1: SVG Hexagon Right */}
                <div className="absolute top-2 right-60 opacity-40 pointer-events-none animate-m3-blob-2">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="#152e00" opacity="0.14" stroke="#152e00" strokeWidth="2.5" />
                    </svg>
                </div>
                {/* Shape R2: Floating Capsule Pill Right */}
                <div className="absolute top-3 right-16 w-76 h-36 rounded-full bg-[#9fe94b]/65 border border-[#152e00]/15 pointer-events-none animate-m3-blob-1" />
                {/* Shape R3: Hollow Ring Right */}
                <div className="absolute top-4 right-10 w-24 h-24 rounded-full border-3 border-[#152e00]/30 pointer-events-none animate-m3-horizontal" />
                {/* Shape R4: Arc Curve Outline Right */}
                <div className="absolute top-5 right-4 w-48 h-48 border-t-3 border-l-3 border-[#152e00]/55 rounded-tl-full pointer-events-none" />

                <div className="relative z-10 flex items-center gap-2 bg-[#152e00]/10 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#152e00]/20 text-[#152e00] text-xs font-bold tracking-wide uppercase">
                    <Shield className="w-4 h-4 text-[#152e00]" />
                    <span>Role: {profile.role}</span>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#152e00] text-[#bcf677] font-extrabold text-xs">
                    <User className="w-3.5 h-3.5" />
                    <span>Profil Customer</span>
                </div>
            </div>

            {/* Profile Avatar & Primary Info */}
            <div className="p-8 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 z-20">
                <div className="flex items-end gap-6">
                    {/* Avatar Container */}
                    <div className="relative group shrink-0">
                        <div className="w-32 h-32 rounded-[24px] ring-4 ring-white bg-[#bcf677]/20 shadow-lg overflow-hidden flex items-center justify-center border border-zinc-200">
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
