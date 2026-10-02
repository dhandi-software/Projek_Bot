import React from "react";
import { ArrowRight, MoreHorizontal, Copy } from "lucide-react";
import type { CustomerPaymentCard } from "~/types/customerDashboard.types";

export interface CustomerPaymentOptionsSectionProps {
    cards: CustomerPaymentCard[];
    activeCardMenuId: string | null;
    onToggleCardMenu: (id: string) => void;
    onDeleteCard: (id: string) => void;
    onAddCard?: () => void;
}

export function CustomerPaymentOptionsSection({
    cards,
    activeCardMenuId,
    onToggleCardMenu,
    onDeleteCard,
    onAddCard,
}: CustomerPaymentOptionsSectionProps) {
    return (
        <div className="w-full bg-white border border-[#E4E7E9] rounded-[4px] shadow-xs">
            {/* Header */}
            <div className="border-b border-[#E4E7E9] h-[52px] flex items-center justify-between px-6 rounded-t-[4px]">
                <h2 className="text-[14px] font-medium text-[#191C1F] uppercase tracking-wide">
                    Payment Option
                </h2>
                <button
                    type="button"
                    onClick={onAddCard}
                    className="flex items-center gap-1.5 text-[14px] font-semibold text-[#FA8232] hover:text-[#e07125] transition-colors"
                >
                    <span>Add Card</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Cards List */}
            <div className="p-6 flex flex-wrap gap-6 items-center">
                {cards.map((card) => {
                    const isVisa = card.cardType === "visa";
                    const isMenuOpen = activeCardMenuId === card.id;

                    return (
                        <div
                            key={card.id}
                            className={`relative w-[296px] h-[196px] rounded-[4px] p-6 text-white flex flex-col justify-between shadow-md transition-transform hover:scale-[1.01] ${
                                isVisa
                                    ? "bg-gradient-to-br from-[#1B6392] to-[#124261]"
                                    : "bg-gradient-to-br from-[#248E1D] to-[#2DB224]"
                            }`}
                        >
                            {/* Card Top: Balance & Menu Dots */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[16px] font-semibold">
                                        {card.balance}{" "}
                                    </span>
                                    <span className="text-[16px] font-normal opacity-90">
                                        {card.currency}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onToggleCardMenu(card.id)}
                                    className="p-1 rounded hover:bg-white/10 transition-colors text-white"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Popup Menu */}
                            {isMenuOpen && (
                                <div className="absolute top-[48px] right-6 bg-white border border-[#E4E7E9] rounded-[2px] shadow-xl z-10 w-[140px] py-1 text-[#5F6C72] text-[14px]">
                                    <button
                                        type="button"
                                        onClick={() => onToggleCardMenu(card.id)}
                                        className="w-full text-left px-4 py-2 hover:bg-zinc-100 hover:text-[#191C1F] transition-colors"
                                    >
                                        Edit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDeleteCard(card.id)}
                                        className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 font-medium transition-colors"
                                    >
                                        Delete Card
                                    </button>
                                </div>
                            )}

                            {/* Card Number */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] font-medium uppercase opacity-70 tracking-wider">
                                    Card number
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px] font-normal tracking-widest font-mono">
                                        {card.cardNumberMasked}
                                    </span>
                                    <Copy className="w-4 h-4 opacity-70 cursor-pointer hover:opacity-100" />
                                </div>
                            </div>

                            {/* Card Bottom: Brand Logo & Holder Name */}
                            <div className="flex items-center justify-between pt-1">
                                <div className="font-extrabold italic text-lg tracking-wider">
                                    {isVisa ? (
                                        <span className="text-white text-xl">VISA</span>
                                    ) : (
                                        <div className="flex items-center -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-red-500 opacity-90"></div>
                                            <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90"></div>
                                        </div>
                                    )}
                                </div>
                                <span className="text-[14px] font-medium truncate max-w-[150px]">
                                    {card.cardHolderName}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
