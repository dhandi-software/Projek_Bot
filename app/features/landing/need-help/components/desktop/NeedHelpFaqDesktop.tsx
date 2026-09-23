import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "../../hooks/useNeedHelp";

interface NeedHelpFaqDesktopProps {
    faqItems: FaqItem[];
    openFaqId: string;
    toggleFaq: (id: string) => void;
}

export function NeedHelpFaqDesktop({ faqItems, openFaqId, toggleFaq }: NeedHelpFaqDesktopProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-[#191C1F]">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {faqItems.map((item) => {
                    const isOpen = openFaqId === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`border rounded-xl transition-all overflow-hidden ${
                                isOpen
                                    ? "border-[#2DA5F3] bg-white shadow-sm"
                                    : "border-zinc-200 bg-white hover:border-zinc-300"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFaq(item.id)}
                                className={`w-full p-5 flex items-center justify-between text-left cursor-pointer font-bold text-sm transition-colors ${
                                    isOpen
                                        ? "bg-[#2DA5F3] text-white"
                                        : "text-[#191C1F] hover:text-[#2DA5F3]"
                                }`}
                            >
                                <span className="pr-4 leading-relaxed">{item.question}</span>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                    isOpen ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                                }`}>
                                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>
                            {isOpen && (
                                <div className="p-6 bg-white text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-4">
                                    <p>{item.answer}</p>
                                    {item.bullets && item.bullets.length > 0 && (
                                        <ul className="list-disc pl-5 space-y-2 text-zinc-600">
                                            {item.bullets.map((bullet, idx) => (
                                                <li key={idx}>{bullet}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
