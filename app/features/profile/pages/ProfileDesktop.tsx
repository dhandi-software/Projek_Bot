import React from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileHeaderDesktop } from "../components/ProfileDesktop/ProfileHeaderDesktop";
import { ProfileFormDesktop } from "../components/ProfileDesktop/ProfileFormDesktop";
import { ProfileSecurityDesktop } from "../components/ProfileDesktop/ProfileSecurityDesktop";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ProfileDesktop() {
    const {
        profile,
        formData,
        isEditing,
        isSaving,
        toast,
        showToast,
        handleInputChange,
        handlePhotoUpload,
        handleResetPhoto,
        handleSaveProfile,
        handleCancel,
    } = useUserProfile();

    return (
        <main className="w-full bg-gradient-to-br from-[#f6fbe8] via-zinc-50 to-[#eefde7]/70 py-8 min-h-screen font-geist text-zinc-900 animate-in fade-in duration-300">
            <div className="container mx-auto px-4 md:px-6 w-full space-y-8">
                {/* Toast Notification */}
                {toast && (
                    <div
                        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all animate-in fade-in slide-in-from-bottom-4 ${
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
                <ProfileHeaderDesktop
                    profile={profile}
                    formData={formData}
                    onPhotoUpload={handlePhotoUpload}
                    onResetPhoto={handleResetPhoto}
                />

                {/* Main Profile Info Form */}
                <ProfileFormDesktop
                    formData={formData}
                    isEditing={isEditing}
                    isSaving={isSaving}
                    onInputChange={handleInputChange}
                    onSave={handleSaveProfile}
                    onCancel={handleCancel}
                />

                {/* Security Card */}
                <ProfileSecurityDesktop
                    onShowToast={showToast}
                />
            </div>
        </main>
    );
}
