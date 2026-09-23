import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SupportHeroDesktopProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}

export function SupportHeroDesktop({
    searchQuery,
    setSearchQuery,
}: SupportHeroDesktopProps) {
    return (
        <section className="w-full bg-[#F2F4F5] py-12 lg:py-16 border-b border-zinc-200/60 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left Column: Text & Search Input */}
                <div className="w-full lg:w-3/5 space-y-6">
                    <span className="inline-block bg-[#EFD33D] text-[#191C1F] font-bold text-xs px-3.5 py-1.5 rounded-sm uppercase tracking-wider shadow-2xs">
                        HELP CENTER
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#191C1F] tracking-tight leading-tight">
                        How we can help you!
                    </h1>

                    {/* Wide Search Bar Container */}
                    <div className="w-full flex items-center bg-white rounded-lg p-2 border border-zinc-300 shadow-md">
                        <div className="flex items-center flex-1 min-w-0 px-3 gap-2.5">
                            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter your question or keyword"
                                className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none py-1 min-w-0"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="px-8 uppercase tracking-wider shrink-0"
                        >
                            SEARCH
                        </Button>
                    </div>
                </div>

                {/* Right Column: Support Agent Image */}
                <div className="w-full lg:w-2/5 flex justify-center lg:justify-end items-center shrink-0">
                    <img
                        src="/images/Customer_Services.png"
                        alt="Customer Services Support Agent"
                        className="max-h-72 lg:max-h-84 w-auto object-contain drop-shadow-md"
                    />
                </div>
            </div>
        </section>
    );
}
