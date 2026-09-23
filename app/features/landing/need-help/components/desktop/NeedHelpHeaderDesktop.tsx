import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";

interface NeedHelpHeaderDesktopProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function NeedHelpHeaderDesktop({ searchQuery, setSearchQuery }: NeedHelpHeaderDesktopProps) {
    return (
        <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border-b border-zinc-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <span className="inline-block bg-[#2DA5F3] text-white font-bold text-xs px-3.5 py-1.5 rounded uppercase tracking-wider mb-2">
                        HELP CENTER
                    </span>
                    <h1 className="text-3xl font-extrabold text-[#191C1F] tracking-tight">
                        Help Center & FAQ Services
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Find quick answers to your questions about orders, shipping, and bot automation services.
                    </p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <Input
                        type="text"
                        placeholder="Search questions or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 pr-4 h-11 bg-white border-zinc-200 rounded-xl focus:border-[#2DA5F3] text-sm shadow-xs"
                    />
                </div>
            </div>
        </div>
    );
}
