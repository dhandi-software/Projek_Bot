import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "../../hooks/useNeedHelp";

interface NeedHelpFaqMobileProps {
    faqItems: FaqItem[];
    openFaqId: string;
    toggleFaq: (id: string) => void;
}

export function NeedHelpFaqMobile({ faqItems, openFaqId, toggleFaq }: NeedHelpFaqMobileProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#191C1F]">
                Frequently Asked Questions
            </h2>
            <div className="space-y-3">
                {faqItems.map((item) => {
                    const isOpen = openFaqId === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`border rounded-xl transition-all overflow-hidden ${
                                isOpen
                                    ? "border-[#2DA5F3] bg-white shadow-xs"
                                    : "border-zinc-200 bg-white"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFaq(item.id)}
                                className={`w-full p-4 flex items-center justify-between text-left cursor-pointer font-bold text-xs transition-colors ${
                                    isOpen
                                        ? "bg-[#2DA5F3] text-white"
                                        : "text-[#191C1F]"
                                }`}
                            >
                                <span className="pr-3 leading-snug">{item.question}</span>
                                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                                    isOpen ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                                }`}>
                                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                </div>
                            </button>
                            {isOpen && (
                                <div className="p-4 bg-white text-xs text-zinc-600 leading-relaxed space-y-3 border-t border-zinc-100">
                                    <p>{item.answer}</p>
                                    {item.bullets && item.bullets.length > 0 && (
                                        <ul className="list-disc pl-4 space-y-1.5 text-zinc-600 text-[11px]">
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
