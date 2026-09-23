import { PhoneCall, ArrowRight, Bot, UserCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ContactChannel } from "~/types/customerSupport";

interface SupportContactUsMobileProps {
    contactChannels: ContactChannel[];
}

export function SupportContactUsMobile({ contactChannels }: SupportContactUsMobileProps) {
    return (
        <section className="w-full py-10 px-4">
            <div className="space-y-6">
                <div className="flex flex-col items-center text-center space-y-2">
                    <span className="inline-block bg-[#2DA5F3] text-white font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider">
                        CONTACT US
                    </span>
                    <h2 className="text-xl font-extrabold text-[#191C1F]">
                        Don’t find your answer. Contact with us
                    </h2>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Call Us Card (Human CS - 09:00 - 17:00 WIB) */}
                    <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-xs flex flex-col gap-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#2DA5F3] flex items-center justify-center shrink-0 relative border border-sky-100">
                                <PhoneCall className="w-6 h-6" />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#2DA5F3] text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full border border-white uppercase">
                                    HUMAN
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <h3 className="text-sm font-bold text-[#191C1F]">
                                        {contactChannels[0].title}
                                    </h3>
                                    <span className="bg-sky-100 text-[#1B6392] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-sky-200">
                                        <UserCheck className="w-2.5 h-2.5 text-[#2DA5F3]" />
                                        Human CS Team (09:00 AM - 05:00 PM WIB)
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {contactChannels[0].description}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm font-bold text-[#191C1F]">
                            {contactChannels[0].info}
                        </p>
                        <Button className="w-full bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs min-h-[44px] uppercase tracking-wider cursor-pointer">
                            <span>{contactChannels[0].buttonText}</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                    </div>

                    {/* Chat Us Card with Bot Logo (Bot AI 24/7) */}
                    <div className="border border-zinc-200 rounded-xl p-5 bg-white shadow-xs flex flex-col gap-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 relative border border-emerald-100 p-1.5">
                                <img
                                    src="/images/Logo_Bot.png"
                                    alt="Bot Support Logo"
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full border border-white uppercase">
                                    24H
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <h3 className="text-sm font-bold text-[#191C1F]">
                                        {contactChannels[1].title}
                                    </h3>
                                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-emerald-200">
                                        <Bot className="w-2.5 h-2.5 text-emerald-600" />
                                        Bot AI 24/7 Nonstop
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {contactChannels[1].description}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm font-bold text-[#191C1F]">
                            {contactChannels[1].info}
                        </p>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs min-h-[44px] uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2">
                            <img src="/images/Logo_Bot.png" alt="Bot Logo" className="w-4 h-4 object-contain brightness-200 invert" />
                            <span>{contactChannels[1].buttonText}</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
