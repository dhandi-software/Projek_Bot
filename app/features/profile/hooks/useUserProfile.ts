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
        const savedProfileStr = localStorage.getItem("userProfile");
        const savedPhoto = localStorage.getItem("userPhoto");

        let loadedData: UserProfileData = {
            name: user?.name || "Pengguna Bot",
            username: user?.username || "user_bot",
            email: user?.email || "user@example.com",
            phone: user?.phone || "081234567890",
            address: user?.address || "Jakarta, Indonesia",
            bio: "Pengguna aktif platform eCommerce & Bot Automation.",
            photo: savedPhoto || user?.photo || "/images/avatar.svg",
            role: user?.role || "customer",
        };

        if (savedProfileStr) {
            try {
                const parsed = JSON.parse(savedProfileStr);
                loadedData = { ...loadedData, ...parsed };
            } catch (e) {
                console.error("Error parsing cached profile", e);
            }
        } else if (savedUserStr) {
            try {
                const parsedUser = JSON.parse(savedUserStr);
                loadedData = {
                    ...loadedData,
                    name: parsedUser.name || loadedData.name,
                    email: parsedUser.email || loadedData.email,
                    phone: parsedUser.phone || loadedData.phone,
                    address: parsedUser.address || loadedData.address,
                    role: parsedUser.role || loadedData.role,
                };
            } catch (e) {
                console.error("Error parsing cached user", e);
            }
        }

        if (savedPhoto) {
            loadedData.photo = savedPhoto;
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

                // Immediately persist uploaded photo to localStorage
                localStorage.setItem("userPhoto", base64Photo);
                const currentUserStr = localStorage.getItem("user");
                if (currentUserStr) {
                    try {
                        const currentUserObj = JSON.parse(currentUserStr);
                        localStorage.setItem("user", JSON.stringify({ ...currentUserObj, photo: base64Photo }));
                    } catch (e) {
                        console.error("Failed to update user photo in localStorage", e);
                    }
                }

                showToast("Foto profil berhasil diupload & disimpan!", "success");
                window.dispatchEvent(new Event("user-profile-updated"));
            }
        };
        reader.readAsDataURL(file);
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

            // Save to localStorage for instant persistence across pages & components
            localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            localStorage.setItem("userPhoto", formData.photo);
            localStorage.setItem("userUsername", formData.username);

            // Update main user object in localStorage
            const currentUserStr = localStorage.getItem("user");
            if (currentUserStr) {
                try {
                    const currentUserObj = JSON.parse(currentUserStr);
                    const newAuthUser = {
                        ...currentUserObj,
                        name: formData.name,
                        email: formData.email,
                        username: formData.username,
                        phone: formData.phone,
                        address: formData.address,
                        photo: formData.photo,
                    };
                    localStorage.setItem("user", JSON.stringify(newAuthUser));
                } catch (e) {
                    console.error("Failed to update user localStorage", e);
                }
            }

            setProfile(updatedProfile);
            setIsEditing(false);
            showToast("Profil berhasil diperbarui dan disimpan!", "success");

            // Dispatch window event so Header components immediately re-render avatar
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
        handleSaveProfile,
        handleCancel,
    };
}
