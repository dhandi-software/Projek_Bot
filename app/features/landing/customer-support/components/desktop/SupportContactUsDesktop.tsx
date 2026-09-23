import { PhoneCall, ArrowRight, Bot, UserCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ContactChannel } from "~/types/customerSupport";

interface SupportContactUsDesktopProps {
    contactChannels: ContactChannel[];
}

export function SupportContactUsDesktop({ contactChannels }: SupportContactUsDesktopProps) {
    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col items-center text-center space-y-3">
                    <span className="inline-block bg-[#2DA5F3] text-white font-bold text-xs px-3.5 py-1.5 rounded uppercase tracking-wider">
                        CONTACT US
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#191C1F]">
                        Don’t find your answer. Contact with us
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Card 1: Call Us (Human CS Agent - 09:00 to 17:00 WIB) */}
                    <div className="border border-zinc-200 rounded-xl p-6 md:p-8 bg-white shadow-xs flex flex-col sm:flex-row items-start gap-6 hover:border-[#2DA5F3] transition-all w-full min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-sky-50 text-[#2DA5F3] flex items-center justify-center shrink-0 relative border border-sky-100">
                            <PhoneCall className="w-8 h-8" />
                            <span className="absolute -top-1.5 -right-1.5 bg-[#2DA5F3] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white uppercase">
                                HUMAN
                            </span>
                        </div>
                        <div className="space-y-4 flex-1 min-w-0">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-[#191C1F]">
                                        {contactChannels[0].title}
                                    </h3>
                                    <span className="bg-sky-100 text-[#1B6392] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-sky-200">
                                        <UserCheck className="w-3 h-3 text-[#2DA5F3]" />
                                        Human CS Team (09:00 AM - 05:00 PM WIB)
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-1.5">
                                    {contactChannels[0].description}
                                </p>
                            </div>
                            <p className="text-lg font-bold text-[#191C1F]">
                                {contactChannels[0].info}
                            </p>
                            <Button className="bg-[#2DA5F3] hover:bg-[#1B6392] text-white font-bold text-xs px-6 h-12 uppercase tracking-wider cursor-pointer shadow-xs">
                                <span>{contactChannels[0].buttonText}</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Card 2: Chat Us (Bot AI Assistant - 24 Hours 24/7) */}
                    <div className="border border-zinc-200 rounded-xl p-6 md:p-8 bg-white shadow-xs flex flex-col sm:flex-row items-start gap-6 hover:border-emerald-500 transition-all w-full min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 relative border border-emerald-100 p-2">
                            <img
                                src="/images/Logo_Bot.png"
                                alt="Bot Support Logo"
                                className="w-10 h-10 object-contain drop-shadow-xs"
                            />
                            <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-white shadow-2xs uppercase">
                                24H BOT
                            </span>
                        </div>
                        <div className="space-y-4 flex-1 min-w-0">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-bold text-[#191C1F]">
                                        {contactChannels[1].title}
                                    </h3>
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                        <Bot className="w-3 h-3 text-emerald-600" />
                                        Bot AI 24/7 Nonstop
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-1.5">
                                    {contactChannels[1].description}
                                </p>
                            </div>
                            <p className="text-lg font-bold text-[#191C1F]">
                                {contactChannels[1].info}
                            </p>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 h-12 uppercase tracking-wider cursor-pointer shadow-xs flex items-center gap-2">
                                <img src="/images/Logo_Bot.png" alt="Bot Logo" className="w-4 h-4 object-contain brightness-200 invert" />
                                <span>{contactChannels[1].buttonText}</span>
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
