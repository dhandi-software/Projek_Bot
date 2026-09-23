import { Link } from "react-router";
import type { QuickHelpCategory } from "../../hooks/useNeedHelp";

interface NeedHelpQuickCardsMobileProps {
    categories: QuickHelpCategory[];
}

export function NeedHelpQuickCardsMobile({ categories }: NeedHelpQuickCardsMobileProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                    <Link
                        key={cat.id}
                        to={cat.link}
                        className="border border-zinc-200 rounded-xl p-4 bg-white shadow-xs flex items-center gap-3.5 cursor-pointer active:bg-zinc-50"
                    >
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#2DA5F3] flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-xs font-bold text-[#191C1F] truncate">
                                {cat.title}
                            </h3>
                            <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                                {cat.description}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
