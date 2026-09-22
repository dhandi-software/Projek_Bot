import React, { useRef } from "react";
import { Camera, Shield, CheckCircle2, User } from "lucide-react";
import type { ProfileFormData, UserProfileData } from "../../types/profile.types";
import { getAvatarInitials } from "~/lib/avatar";

interface ProfileHeaderMobileProps {
    profile: UserProfileData;
    formData: ProfileFormData;
    onPhotoUpload: (file: File) => void;
}

export function ProfileHeaderMobile({ profile, formData, onPhotoUpload }: ProfileHeaderMobileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onPhotoUpload(e.target.files[0]);
        }
    };

    return (
        <div className="bg-white rounded-[24px] border border-zinc-200/80 shadow-xs overflow-hidden">
            {/* Mobile Header Banner M3 Lime Green */}
            <div className="h-32 bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] relative p-4 flex items-start justify-between overflow-hidden text-[#152e00]">
                {/* Enriched & Enlarged M3 Material Shapes Mobile */}
                {/* Shape 1: SVG Large Material Hexagon Mobile */}
                <div className="absolute top-1 left-2 opacity-35 pointer-events-none animate-m3-blob-1">
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <polygon points="36,4 64,20 64,52 36,68 8,52 8,20" stroke="#152e00" strokeWidth="2.5" fill="#152e00" opacity="0.12" />
                    </svg>
                </div>
                {/* Shape 2: Floating Capsule Pill Mobile */}
                <div className="absolute -top-4 -right-4 w-48 h-24 rounded-full bg-[#9fe94b]/60 border border-[#152e00]/15 pointer-events-none animate-m3-blob-2" />
                {/* Shape 3: Hollow Ring Mobile */}
                <div className="absolute top-2 right-12 w-14 h-14 rounded-full border-3 border-[#152e00]/30 pointer-events-none animate-m3-horizontal" />
                {/* Shape 4: Corner Arc Outline Mobile */}
                <div className="absolute top-1 right-0 w-28 h-28 border-t-3 border-l-3 border-[#152e00]/50 rounded-tl-full pointer-events-none" />
                {/* Shape 5: Rotated Diamond Chip Mobile */}
                <div className="absolute bottom-2 right-28 w-6 h-6 rounded-md bg-[#152e00]/15 rotate-45 border border-[#152e00]/20 pointer-events-none" />

                <div className="relative z-10 flex items-center gap-1.5 bg-[#152e00]/10 backdrop-blur-xs px-3 py-1 rounded-full text-[#152e00] text-[10px] font-extrabold border border-[#152e00]/20 uppercase">
                    <Shield className="w-3 h-3" />
                    <span>Role: {profile.role}</span>
                </div>

                <div className="relative z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#152e00] text-[#bcf677] font-bold text-[10px]">
                    <User className="w-3 h-3" />
                    <span>Profile Customer</span>
                </div>
            </div>

            {/* Profile Avatar & Primary Info Mobile */}
            <div className="p-5 pt-0 relative flex flex-col items-center text-center -mt-14 space-y-3 z-20 w-full">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-[20px] ring-4 ring-white bg-[#bcf677]/20 shadow-md overflow-hidden flex items-center justify-center border border-zinc-200">
                        {formData.photo && formData.photo !== "/images/avatar.svg" ? (
                            <img
                                src={formData.photo}
                                alt={formData.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#152e00] text-[#bcf677] font-black text-2xl flex items-center justify-center">
                                {getAvatarInitials(formData.name || profile.name)}
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 bg-[#152e00] text-[#bcf677] p-2 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer border-2 border-white"
                        title="Upload Foto"
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="space-y-1 w-full">
                    <div className="flex items-center justify-center gap-1.5">
                        <h1 className="text-lg font-black text-zinc-900 tracking-tight">
                            {formData.name || "Nama Pengguna"}
                        </h1>
                        <CheckCircle2 className="w-4 h-4 text-[#84cc16]" />
                    </div>
                    <p className="text-zinc-500 text-xs font-semibold">
                        @{formData.username || "username"} · <span className="text-zinc-400">{formData.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
