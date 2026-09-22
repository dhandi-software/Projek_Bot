import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { ProfileDesktop, ProfileMobile } from "~/features/profile/pages";

export function meta() {
    return [
        { title: "Profil Pengguna - Dhandi Ecommerce" },
        { name: "description", content: "Kelola profil dan informasi akun Anda" },
    ];
}

export default function ProfileRoute() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <ProfileMobile /> : <ProfileDesktop />;
}
