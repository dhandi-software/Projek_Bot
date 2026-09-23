import { Link } from "react-router";
import type { QuickHelpCategory } from "../../hooks/useNeedHelp";

interface NeedHelpQuickCardsDesktopProps {
    categories: QuickHelpCategory[];
}

export function NeedHelpQuickCardsDesktop({ categories }: NeedHelpQuickCardsDesktopProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                    <Link
                        key={cat.id}
                        to={cat.link}
                        className="group border border-zinc-200 rounded-xl p-5 bg-white shadow-xs hover:shadow-md hover:border-[#2DA5F3] transition-all flex items-center gap-4 cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#2DA5F3] group-hover:bg-[#2DA5F3] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-[#191C1F] group-hover:text-[#2DA5F3] transition-colors truncate">
                                {cat.title}
                            </h3>
                            <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5 leading-snug">
                                {cat.description}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
