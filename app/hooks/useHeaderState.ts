import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/hooks/useAuth";
import { useCart } from "~/context/CartContext";

export function useHeaderState() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const cart = useCart();
    
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("smartphone");
    const [activeBrand, setActiveBrand] = useState<string>("iPhone");

    // Live update for photo when profile changes
    useEffect(() => {
        const updatePhoto = () => {
            const savedPhoto = localStorage.getItem("userPhoto");
            setUserPhoto(savedPhoto || user?.photo || null);
        };
        updatePhoto();
        window.addEventListener("user-profile-updated", updatePhoto);
        return () => window.removeEventListener("user-profile-updated", updatePhoto);
    }, [user]);

    // Search debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearchSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    }, [navigate, searchQuery]);

    const closeAllMenus = useCallback(() => {
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsCategoryOpen(false);
        setIsMenuOpen(false);
    }, []);

    return {
        user,
        isAuthenticated,
        userPhoto,
        logout,
        cart,
        isCategoryOpen,
        setIsCategoryOpen,
        isCartOpen,
        setIsCartOpen,
        isUserMenuOpen,
        setIsUserMenuOpen,
        isMenuOpen,
        setIsMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        debouncedQuery,
        activeCategory,
        setActiveCategory,
        activeBrand,
        setActiveBrand,
        handleSearchSubmit,
        closeAllMenus,
    };
}
