import React, { useRef } from "react";
import { Camera, Shield, CheckCircle2, User, RotateCcw } from "lucide-react";
import type { ProfileFormData, UserProfileData } from "../../types/profile.types";
import { getAvatarInitials } from "~/lib/avatar";

interface ProfileHeaderMobileProps {
    profile: UserProfileData;
    formData: ProfileFormData;
    onPhotoUpload: (file: File) => void;
    onResetPhoto?: () => void;
}

export function ProfileHeaderMobile({ profile, formData, onPhotoUpload, onResetPhoto }: ProfileHeaderMobileProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onPhotoUpload(e.target.files[0]);
        }
    };

    const isAdmin = (profile.role || "").toLowerCase() === "admin";

    return (
        <div className="bg-white rounded-[24px] border border-zinc-200/80 shadow-xs overflow-hidden">
            {/* Mobile Header Banner */}
            <div className={`h-32 ${isAdmin ? "bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white" : "bg-gradient-to-r from-[#b3f269] via-[#bcf677] to-[#a3eb52] text-[#152e00]"} relative p-4 flex items-start justify-between overflow-hidden`}>
                <div className="relative z-10 flex items-center gap-1.5 bg-black/10 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-extrabold border border-white/20 uppercase">
                    <Shield className="w-3 h-3" />
                    <span>Role: {profile.role}</span>
                </div>

                <div className={`relative z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${isAdmin ? "bg-amber-400 text-slate-950" : "bg-[#152e00] text-[#bcf677]"}`}>
                    <User className="w-3 h-3" />
                    <span>{isAdmin ? "Profil Administrator" : "Profile Customer"}</span>
                </div>
            </div>

            {/* Profile Avatar & Primary Info Mobile */}
            <div className="p-5 pt-0 relative flex flex-col items-center text-center -mt-14 space-y-3 z-20 w-full">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-[20px] ring-4 ring-white bg-zinc-100 shadow-md overflow-hidden flex items-center justify-center border border-zinc-200">
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

                    {onResetPhoto && formData.photo && formData.photo !== "/images/avatar.svg" && (
                        <button
                            type="button"
                            onClick={onResetPhoto}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-full text-[11px] font-bold transition-all cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reset Foto</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
