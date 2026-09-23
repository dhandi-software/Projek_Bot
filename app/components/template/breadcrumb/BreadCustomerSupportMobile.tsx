import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

export function BreadCustomerSupportMobile() {
    return (
        <div className="w-full bg-[#F2F4F5] border-b border-zinc-200/60 px-4 py-2.5">
            <Breadcrumb>
                <BreadcrumbList className="gap-1.5 flex-wrap">
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to="/"
                                className="text-xs font-medium text-zinc-500 hover:text-[#1B6392] transition-colors flex items-center gap-1"
                            >
                                <Home className="w-3 h-3 text-zinc-500" />
                                <span>Home</span>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-zinc-400">
                        <ChevronRight className="w-3 h-3" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <span className="text-xs font-medium text-zinc-500">
                                Pages
                            </span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-zinc-400">
                        <ChevronRight className="w-3.5 h-3.5" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <span className="text-xs font-semibold text-[#2DA5F3]">
                                Customer Support
                            </span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
