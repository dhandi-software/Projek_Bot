import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

interface NeedHelpHeaderMobileProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function NeedHelpHeaderMobile({ searchQuery, setSearchQuery }: NeedHelpHeaderMobileProps) {
    return (
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border-b border-zinc-100 py-6 px-4">
            <div className="space-y-4 text-center">
                <div>
                    <span className="inline-block bg-[#2DA5F3] text-white font-bold text-[10px] px-3 py-1 rounded uppercase tracking-wider mb-1.5">
                        HELP CENTER
                    </span>
                    <h1 className="text-xl font-extrabold text-[#191C1F]">
                        Help Center & FAQ
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        Find quick answers about orders, shipping & bot services.
                    </p>
                </div>
                <div className="relative w-full">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <Input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-3 h-10 bg-white border-zinc-200 rounded-xl focus:border-[#2DA5F3] text-xs shadow-xs"
                    />
                </div>
            </div>
        </div>
    );
}
