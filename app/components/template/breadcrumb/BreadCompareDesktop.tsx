import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export function BreadCompareDesktop() {
    return (
        <div className="w-full bg-[#F2F4F5] border-b border-zinc-200/60">
            <div className="max-w-7xl mx-auto py-3.5 px-4 md:px-8">
                <Breadcrumb>
                    <BreadcrumbList className="gap-2">
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    to="/"
                                    className="text-xs sm:text-sm font-medium text-zinc-500 hover:text-[#1B6392] transition-colors flex items-center gap-1.5"
                                >
                                    <Home className="w-3.5 h-3.5 text-zinc-500" />
                                    <span>Home</span>
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-zinc-400">
                            <ChevronRight className="w-3.5 h-3.5" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span className="text-xs sm:text-sm font-medium text-zinc-500">
                                    Pages
                                </span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-zinc-400">
                            <ChevronRight className="w-3.5 h-3.5" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span className="text-xs sm:text-sm font-semibold text-[#2DA5F3]">
                                    Compare
                                </span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}
