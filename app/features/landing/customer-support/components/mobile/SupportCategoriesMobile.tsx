import { Link } from "react-router";
import type { HelpCategory } from "~/types/customerSupport";

interface SupportCategoriesMobileProps {
    categories: HelpCategory[];
}

export function SupportCategoriesMobile({ categories }: SupportCategoriesMobileProps) {
    return (
        <section className="w-full py-8 px-4 border-b border-zinc-200/60">
            <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#191C1F] text-center">
                    What can we assist you with today?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.id}
                                to={cat.link}
                                className="flex items-center gap-3.5 p-4 rounded-lg border border-zinc-200 bg-white hover:border-[#2DA5F3] min-h-[56px] transition-all group active:bg-zinc-50"
                            >
                                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#2DA5F3] flex items-center justify-center shrink-0 group-hover:bg-[#2DA5F3] group-hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-semibold text-[#191C1F] group-hover:text-[#2DA5F3] transition-colors">
                                    {cat.title}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
