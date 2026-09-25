import { useState, useEffect, useCallback } from "react";
import { useAuth } from "~/hooks/useAuth";
import type { UserProfileData, ProfileFormData, ToastMessage } from "../types/profile.types";

export function useUserProfile() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<UserProfileData>({
        name: user?.name || "Pengguna Bot",
        username: user?.username || "user_bot",
        email: user?.email || "user@example.com",
        phone: user?.phone || "081234567890",
        address: user?.address || "Jakarta, Indonesia",
        bio: "Pengguna aktif platform eCommerce & Bot Automation.",
        photo: user?.photo || "/images/avatar.svg",
        role: user?.role || "customer",
    });

    const [formData, setFormData] = useState<ProfileFormData>({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
        photo: profile.photo,
        photoFile: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState<ToastMessage | null>(null);

    const showToast = useCallback((title: string, variant: ToastMessage["variant"] = "success") => {
        setToast({ title, variant });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    }, []);

    // Load profile on mount
    useEffect(() => {
        const savedUserStr = localStorage.getItem("user");

        let currentEmail = user?.email;
        let currentRole = (user?.role || "customer").toLowerCase();

        if (!currentEmail && savedUserStr) {
            try {
                const parsedUser = JSON.parse(savedUserStr);
                currentEmail = parsedUser.email;
                currentRole = (parsedUser.role || "customer").toLowerCase();
            } catch (e) {
                console.error("Error parsing saved user", e);
            }
        }

        const isAdmin = currentRole === "admin";

        // Admin accounts must NEVER use customer photo cache
        if (isAdmin) {
            localStorage.removeItem("userPhoto");
            localStorage.removeItem("userProfile");
        }

        const rolePhotoKey = `userPhoto_${currentRole}_${currentEmail || "guest"}`;
        const roleProfileKey = `userProfile_${currentRole}_${currentEmail || "guest"}`;

        const savedRolePhoto = localStorage.getItem(rolePhotoKey);
        const savedRoleProfileStr = localStorage.getItem(roleProfileKey);

        let loadedData: UserProfileData = {
            name: user?.name || (isAdmin ? "Administrator System" : "Pengguna Bot"),
            username: user?.username || (isAdmin ? "admin" : "user_bot"),
            email: currentEmail || (isAdmin ? "admin@dhandiecommerce.com" : "user@example.com"),
            phone: user?.phone || "081234567890",
            address: user?.address || "Jakarta, Indonesia",
            bio: isAdmin ? "Administrator Platform Dhandi Ecommerce." : "Pengguna aktif platform eCommerce & Bot Automation.",
            photo: savedRolePhoto || (isAdmin ? "/images/avatar.svg" : (user?.photo || "/images/avatar.svg")),
            role: (currentRole === "admin" ? "admin" : "customer") as "admin" | "customer",
        };

        if (savedRoleProfileStr) {
            try {
                const parsed = JSON.parse(savedRoleProfileStr);
                if (parsed.email === currentEmail) {
                    loadedData = { ...loadedData, ...parsed };
                    if (savedRolePhoto) {
                        loadedData.photo = savedRolePhoto;
                    }
                }
            } catch (e) {
                console.error("Error parsing cached role profile", e);
            }
        }

        setProfile(loadedData);
        setFormData({
            name: loadedData.name,
            username: loadedData.username,
            email: loadedData.email,
            phone: loadedData.phone,
            address: loadedData.address,
            bio: loadedData.bio,
            photo: loadedData.photo,
            photoFile: null,
        });
    }, [user]);

    const handleInputChange = (field: keyof Omit<ProfileFormData, "photoFile">, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setIsEditing(true);
    };

    const handlePhotoUpload = (file: File) => {
        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            showToast("Format gambar tidak valid. Gunakan JPG, PNG, WebP, atau GIF", "destructive");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast("Ukuran foto maksimal 5MB", "destructive");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const base64Photo = e.target.result as string;
                setFormData((prev) => ({
                    ...prev,
                    photo: base64Photo,
                    photoFile: file,
                }));
                setProfile((prev) => ({
                    ...prev,
                    photo: base64Photo,
                }));

                // Role & Email scoped photo key
                const currentRole = (profile.role || "customer").toLowerCase();
                const rolePhotoKey = `userPhoto_${currentRole}_${profile.email}`;
                localStorage.setItem(rolePhotoKey, base64Photo);

                showToast("Foto profil berhasil diupload & disimpan!", "success");
                window.dispatchEvent(new Event("user-profile-updated"));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleResetPhoto = () => {
        const defaultPhoto = "/images/avatar.svg";
        const currentRole = (profile.role || "customer").toLowerCase();
        const rolePhotoKey = `userPhoto_${currentRole}_${profile.email}`;
        
        localStorage.removeItem(rolePhotoKey);
        localStorage.removeItem("userPhoto");

        setFormData((prev) => ({
            ...prev,
            photo: defaultPhoto,
            photoFile: null,
        }));
        setProfile((prev) => ({
            ...prev,
            photo: defaultPhoto,
        }));

        showToast("Foto profil berhasil direset!", "success");
        window.dispatchEvent(new Event("user-profile-updated"));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            const updatedProfile: UserProfileData = {
                ...profile,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                bio: formData.bio,
                photo: formData.photo,
            };

            const currentRole = (profile.role || "customer").toLowerCase();
            const roleProfileKey = `userProfile_${currentRole}_${formData.email}`;
            const rolePhotoKey = `userPhoto_${currentRole}_${formData.email}`;

            localStorage.setItem(roleProfileKey, JSON.stringify(updatedProfile));
            localStorage.setItem(rolePhotoKey, formData.photo);

            setProfile(updatedProfile);
            setIsEditing(false);
            showToast("Profil berhasil diperbarui dan disimpan!", "success");

            window.dispatchEvent(new Event("user-profile-updated"));
        } catch (err: any) {
            showToast(err.message || "Gagal menyimpan profil", "destructive");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: profile.name,
            username: profile.username,
            email: profile.email,
            phone: profile.phone,
            address: profile.address,
            bio: profile.bio,
            photo: profile.photo,
            photoFile: null,
        });
        setIsEditing(false);
    };

    return {
        profile,
        formData,
        isEditing,
        isSaving,
        toast,
        showToast,
        logout,
        handleInputChange,
        handlePhotoUpload,
        handleResetPhoto,
        handleSaveProfile,
        handleCancel,
    };
}
