import type { PopularTopic } from "~/types/customerSupport";

interface SupportPopularTopicsDesktopProps {
    popularTopics: PopularTopic[];
}

export function SupportPopularTopicsDesktop({ popularTopics }: SupportPopularTopicsDesktopProps) {
    return (
        <section className="w-full py-12 border-b border-zinc-200/60 bg-zinc-50/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#191C1F]">
                    Popular Topics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        {popularTopics.slice(0, 3).map((topic) => (
                            <div key={topic.id} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 hover:text-[#2DA5F3] cursor-pointer group transition-colors min-w-0">
                                <span className="text-zinc-400 group-hover:text-[#2DA5F3] font-bold shrink-0">•</span>
                                <span className="font-medium group-hover:underline leading-snug">{topic.question}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {popularTopics.slice(3, 6).map((topic) => (
                            <div key={topic.id} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 hover:text-[#2DA5F3] cursor-pointer group transition-colors min-w-0">
                                <span className="text-zinc-400 group-hover:text-[#2DA5F3] font-bold shrink-0">•</span>
                                <span className="font-medium group-hover:underline leading-snug">{topic.question}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        {popularTopics.slice(6, 9).map((topic) => (
                            <div key={topic.id} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 hover:text-[#2DA5F3] cursor-pointer group transition-colors min-w-0">
                                <span className="text-zinc-400 group-hover:text-[#2DA5F3] font-bold shrink-0">•</span>
                                <span className="font-medium group-hover:underline leading-snug">{topic.question}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
