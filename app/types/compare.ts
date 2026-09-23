export interface CompareItem {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    ratingCount: number;
    soldBy: string;
    brand: string;
    model: string;
    stockStatus: "IN STOCK" | "OUT OF STOCK";
    size: string;
    weight: string;
}

export interface CompareState {
    items: CompareItem[];
}
