import type { PopularTopic } from "~/types/customerSupport";

interface SupportPopularTopicsMobileProps {
    popularTopics: PopularTopic[];
}

export function SupportPopularTopicsMobile({ popularTopics }: SupportPopularTopicsMobileProps) {
    return (
        <section className="w-full py-8 px-4 border-b border-zinc-200/60 bg-zinc-50/40">
            <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#191C1F]">
                    Popular Topics
                </h2>

                <div className="space-y-3">
                    {popularTopics.map((topic) => (
                        <div key={topic.id} className="flex items-start gap-2 text-xs text-zinc-700 active:text-[#2DA5F3] py-1">
                            <span className="text-zinc-400 font-bold">•</span>
                            <span className="font-medium leading-snug">{topic.question}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
