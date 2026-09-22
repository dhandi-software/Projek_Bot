export interface User {
    id: string;
    email: string;
    role: "admin" | "customer";
    token: string;
    name?: string;
    nama?: string;
    refresh_token?: string;
    last_login?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: string;
    message?: string;
    data: User;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    error?: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
}

export interface RegisterResponse {
    code: number;
    status: string;
    message: string;
    data?: any;
}

// Password Types

export interface ProfileData {
    user_id: string;
    email: string;
    role: "admin" | "customer";
    name: string;
    username: string;
    photo: string;
    bio: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProfileResponse {
    code: number;
    status: string;
    message: string;
    data: ProfileData;
}

export interface ProfileUpdateRequest {
    username?: string;
    bio?: string;
    photo?: string | File;
    name?: string;
    email?: string;
}

// Password Types
export interface ChangePasswordRequest {
    old_password: string;
    new_password: string;
}

export interface ChangePasswordResponse {
    code: number;
    status: string;
    message: string;
    data?: any;
}

export interface UpdatePasswordRequest {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

export interface UserAccount {
    id: string;
    email: string;
    name: string;
    role: "admin" | "customer";
    created_at: string;
    updated_at: string;
    avatar?: string;
    handle?: string;
    username?: string;
    password?: string;
    bio?: string;
}

export interface UserAccountResponse {
    code: number;
    status: string;
    message: string;
    data: UserAccount[] | UserAccount;
}

export interface UpdateRoleRequest {
    role: string;
}

// Dashboard Analytics Types
export interface OmsetStat {
    amount: string;
    change: string;
    isPositive: boolean;
    comparison: string;
}

export interface TotalOrderStat {
    count: number;
    change: string;
    isPositive: boolean;
    comparison: string;
}

export interface AverageOrderValueStat {
    value: string;
    change: string;
    isPositive: boolean;
    comparison: string;
}

export interface ReturnRateStat {
    rate: string;
    change: string;
    isPositive: boolean;
    comparison: string;
}

export interface PencapaianTargetStat {
    percentage: number;
    status: string;
    realisasi: string;
    target: string;
    surplus: string;
}

export interface MonthlyTrend {
    month: string;
    omset: number;
    order: number;
    target: number;
}

export interface TrafficSource {
    name: string;
    percentage: number;
    color: string;
}

export interface WeeklyOrder {
    day: string;
    orders: number;
    returns: number;
}

export interface TopProduct {
    rank: number;
    title: string;
    soldCount: number;
    change: string;
    isPositive: boolean;
    image?: string;
}

export interface LatestOrder {
    id: string;
    customer: string;
    items: string;
    total: string;
    paymentMethod?: string;
    date?: string;
    time: string;
    status: string;
}

export interface DashboardStats {
    omset: OmsetStat;
    totalOrder: TotalOrderStat;
    averageOrderValue: AverageOrderValueStat;
    returnRate: ReturnRateStat;
    pencapaianTarget: PencapaianTargetStat;
    monthlyTrends: MonthlyTrend[];
    salesTrend?: Array<{ day: string; value: number }>;
    topProducts?: TopProduct[];
    trafficSources: TrafficSource[];
    weeklyOrders: WeeklyOrder[];
    latestOrders: LatestOrder[];
}

export interface HeatmapDay {
    day: string;
    level: number;
}

// User Profile Feature Types
export interface UserProfileData {
    id?: number | string;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    photo: string;
    role: 'admin' | 'customer';
}

export interface ProfileFormData {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: string;
    bio: string;
    photo: string;
    photoFile: File | null;
}

export interface ToastMessage {
    title: string;
    variant: "success" | "destructive" | "default";
}

