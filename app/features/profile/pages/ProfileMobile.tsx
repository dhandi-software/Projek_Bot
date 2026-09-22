import React from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileHeaderMobile } from "../components/ProfileMobile/ProfileHeaderMobile";
import { ProfileFormMobile } from "../components/ProfileMobile/ProfileFormMobile";
import { ProfileSecurityMobile } from "../components/ProfileMobile/ProfileSecurityMobile";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ProfileMobile() {
    const {
        profile,
        formData,
        isEditing,
        isSaving,
        toast,
        showToast,
        handleInputChange,
        handlePhotoUpload,
        handleSaveProfile,
        handleCancel,
    } = useUserProfile();

    return (
        <main className="w-full bg-gradient-to-br from-[#f6fbe8] via-zinc-50 to-[#eefde7]/70 p-3.5 min-h-screen font-geist text-zinc-900 space-y-4 animate-in fade-in duration-300 pb-16">
            {/* Toast Notification Mobile */}
            {toast && (
                <div
                    className={`fixed top-4 left-4 right-4 z-50 flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-lg text-xs font-bold transition-all ${
                        toast.variant === "destructive"
                            ? "bg-rose-600 text-white"
                            : "bg-zinc-900 text-white"
                    }`}
                >
                    {toast.variant === "destructive" ? (
                        <AlertCircle className="w-4 h-4 text-rose-300" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{toast.title}</span>
                </div>
            )}

            {/* Profile Header Banner & Avatar */}
            <ProfileHeaderMobile
                profile={profile}
                formData={formData}
                onPhotoUpload={handlePhotoUpload}
            />

            {/* Main Form Info */}
            <ProfileFormMobile
                formData={formData}
                isEditing={isEditing}
                isSaving={isSaving}
                onInputChange={handleInputChange}
                onSave={handleSaveProfile}
                onCancel={handleCancel}
            />

            {/* Security Section */}
            <ProfileSecurityMobile
                onShowToast={showToast}
            />
        </main>
    );
}
