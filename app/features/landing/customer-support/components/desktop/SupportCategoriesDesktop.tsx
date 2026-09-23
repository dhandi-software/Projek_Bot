import { Link } from "react-router";
import type { HelpCategory } from "~/types/customerSupport";

interface SupportCategoriesDesktopProps {
    categories: HelpCategory[];
}

export function SupportCategoriesDesktop({ categories }: SupportCategoriesDesktopProps) {
    return (
        <section className="w-full py-12 border-b border-zinc-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#191C1F] text-center">
                    What can we assist you with today?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.id}
                                to={cat.link}
                                className="flex items-center gap-4 p-5 rounded-lg border border-zinc-200 bg-white hover:border-[#2DA5F3] hover:shadow-md transition-all group min-w-0 w-full cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#2DA5F3] flex items-center justify-center shrink-0 group-hover:bg-[#2DA5F3] group-hover:text-white transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-semibold text-[#191C1F] group-hover:text-[#2DA5F3] transition-colors leading-snug">
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
