export interface WishlistItem {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    stockStatus: "IN STOCK" | "OUT OF STOCK";
}

export interface WishlistState {
    items: WishlistItem[];
}
