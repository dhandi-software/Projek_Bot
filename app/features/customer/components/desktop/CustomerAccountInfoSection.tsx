import React from "react";
import { Rocket, Clock, CheckCircle2 } from "lucide-react";
import type {
    CustomerProfileInfo,
    CustomerBillingAddress,
    CustomerDashboardStats,
} from "../../types/customerDashboard.types";

export interface CustomerAccountInfoSectionProps {
    profile: CustomerProfileInfo;
    billingAddress: CustomerBillingAddress;
    stats: CustomerDashboardStats;
    onEditAccount?: () => void;
    onEditAddress?: () => void;
}

export function CustomerAccountInfoSection({
    profile,
    billingAddress,
    stats,
    onEditAccount,
    onEditAddress,
}: CustomerAccountInfoSectionProps) {
    return (
        <div className="w-full flex gap-6 items-start">
            {/* 1. Account Info Card */}
            <div className="flex-1 bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col justify-between pb-6 shadow-xs min-w-[312px]">
                <div>
                    <div className="bg-white border-b border-[#E4E7E9] h-[52px] flex items-center px-6 rounded-t-[4px]">
                        <h2 className="text-[14px] font-medium text-[#191C1F] uppercase tracking-wide">
                            Account Info
                        </h2>
                    </div>

                    <div className="flex flex-col gap-5 px-6 pt-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover shrink-0 border border-zinc-200"
                            />
                            <div className="flex flex-col">
                                <h3 className="text-[16px] font-semibold text-[#191C1F] leading-snug">
                                    {profile.name}
                                </h3>
                                <p className="text-[14px] text-[#5F6C72]">{profile.location}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 text-[14px] leading-tight">
                            <div className="flex items-center">
                                <span className="text-[#191C1F] font-normal">Email:</span>
                                <span className="text-[#5F6C72] ml-1.5 truncate">{profile.email}</span>
                            </div>
                            {profile.secEmail && (
                                <div className="flex items-center">
                                    <span className="text-[#191C1F] font-normal">Sec Email:</span>
                                    <span className="text-[#5F6C72] ml-1.5 truncate">{profile.secEmail}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <span className="text-[#191C1F] font-normal">Phone:</span>
                                <span className="text-[#5F6C72] ml-1.5">{profile.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 pt-5">
                    <button
                        type="button"
                        onClick={onEditAccount}
                        className="h-12 border-2 border-[#D5EDFD] rounded-[2px] px-6 text-[#2DA5F3] font-bold text-[14px] tracking-wide uppercase hover:bg-sky-50 transition-colors"
                    >
                        Edit Account
                    </button>
                </div>
            </div>

            {/* 2. Billing Address Card */}
            <div className="flex-1 bg-white border border-[#E4E7E9] rounded-[4px] flex flex-col justify-between pb-6 shadow-xs min-w-[312px]">
                <div>
                    <div className="bg-white border-b border-[#E4E7E9] h-[52px] flex items-center px-6 rounded-t-[4px]">
                        <h2 className="text-[14px] font-medium text-[#191C1F] uppercase tracking-wide">
                            Billing Address
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 px-6 pt-5 text-[14px]">
                        <h3 className="font-medium text-[#191C1F]">{billingAddress.name}</h3>
                        <p className="text-[#5F6C72] leading-relaxed line-clamp-3">
                            {billingAddress.address}
                        </p>

                        <div className="pt-2 flex flex-col gap-1 text-[14px]">
                            <div className="flex items-center">
                                <span className="text-[#191C1F]">Phone Number:</span>
                                <span className="text-[#5F6C72] ml-1.5">{billingAddress.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[#191C1F]">Email:</span>
                                <span className="text-[#5F6C72] ml-1.5 truncate">{billingAddress.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 pt-5">
                    <button
                        type="button"
                        onClick={onEditAddress}
                        className="h-12 border-2 border-[#D5EDFD] rounded-[2px] px-6 text-[#2DA5F3] font-bold text-[14px] tracking-wide uppercase hover:bg-sky-50 transition-colors"
                    >
                        Edit Address
                    </button>
                </div>
            </div>

            {/* 3. Fun-Fact Quick Stats Column */}
            <div className="flex flex-col gap-4 shrink-0 w-[280px]">
                {/* Total Orders (Blue) */}
                <div className="bg-[#EAF6FE] rounded-[4px] p-4 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-[2px] shrink-0 text-[#2DA5F3] shadow-xs">
                        <Rocket className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[20px] font-semibold text-[#191C1F] leading-tight">
                            {stats.totalOrders}
                        </span>
                        <span className="text-[14px] text-[#475156]">Total Orders</span>
                    </div>
                </div>

                {/* Pending Orders (Orange) */}
                <div className="bg-[#FFF3EB] rounded-[4px] p-4 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-[2px] shrink-0 text-[#FA8232] shadow-xs">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[20px] font-semibold text-[#191C1F] leading-tight">
                            {String(stats.pendingOrders).padStart(2, "0")}
                        </span>
                        <span className="text-[14px] text-[#475156]">Pending Orders</span>
                    </div>
                </div>

                {/* Completed Orders (Green) */}
                <div className="bg-[#EAF7E9] rounded-[4px] p-4 flex items-center gap-4">
                    <div className="bg-white p-3 rounded-[2px] shrink-0 text-[#2DB224] shadow-xs">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[20px] font-semibold text-[#191C1F] leading-tight">
                            {stats.completedOrders}
                        </span>
                        <span className="text-[14px] text-[#475156]">Completed Orders</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
