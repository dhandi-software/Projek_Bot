import { useOutletContext } from "react-router";
import type { ContextType } from "~/root";
import { HomeDesktop, HomeMobile } from "~/features/landing/home/pages";

export default function Home() {
    const { isMobile } = useOutletContext<ContextType>();
    return isMobile ? <HomeMobile /> : <HomeDesktop />;
}

export function meta() {
    return [
        { title: "Dhandi Ecommerce" },
        { name: "description", content: "Welcome to Dhandi Ecommerce" },
    ];
}
