import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SupportHeroMobileProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}

export function SupportHeroMobile({
    searchQuery,
    setSearchQuery,
}: SupportHeroMobileProps) {
    return (
        <section className="w-full bg-[#F2F4F5] py-8 px-4 border-b border-zinc-200/60">
            <div className="flex flex-col items-center text-center space-y-4">
                <span className="inline-block bg-[#EFD33D] text-[#191C1F] font-bold text-xs px-3 py-1 rounded-sm uppercase tracking-wider">
                    HELP CENTER
                </span>
                <h1 className="text-2xl font-extrabold text-[#191C1F]">
                    How we can help you!
                </h1>

                <div className="w-full flex flex-col sm:flex-row items-stretch gap-2.5 bg-white rounded-lg p-2 border border-zinc-300 shadow-xs">
                    <div className="flex items-center flex-1 px-3 min-h-[44px]">
                        <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter your question or keyword"
                            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none h-10 min-w-0"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="md"
                        className="px-6 uppercase tracking-wider shrink-0"
                    >
                        SEARCH
                    </Button>
                </div>
            </div>
        </section>
    );
}
