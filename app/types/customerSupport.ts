import type { LucideIcon } from "lucide-react";

export interface HelpCategory {
    id: string;
    title: string;
    icon: LucideIcon;
    link: string;
}

export interface PopularTopic {
    id: string;
    category: string;
    question: string;
    answer?: string;
}

export interface ContactChannel {
    id: string;
    title: string;
    description: string;
    info: string;
    buttonText: string;
    type: "phone" | "chat";
}
