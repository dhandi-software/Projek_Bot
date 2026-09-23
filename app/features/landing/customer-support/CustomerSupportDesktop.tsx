import { useCustomerSupport } from "~/hooks/useCustomerSupport";
import { BreadCustomerSupportDesktop } from "~/components/template/breadcrumb/BreadCustomerSupportDesktop";
import {
    SupportHeroDesktop,
    SupportCategoriesDesktop,
    SupportPopularTopicsDesktop,
    SupportContactUsDesktop,
} from "~/features/landing/customer-support/components/desktop";

export function CustomerSupportDesktop() {
    const {
        searchQuery,
        setSearchQuery,
        helpCategories,
        popularTopics,
        contactChannels,
    } = useCustomerSupport();

    return (
        <div className="w-full bg-white">
            <BreadCustomerSupportDesktop />

            <SupportHeroDesktop
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <SupportCategoriesDesktop
                categories={helpCategories}
            />

            <SupportPopularTopicsDesktop
                popularTopics={popularTopics}
            />

            <SupportContactUsDesktop
                contactChannels={contactChannels}
            />
        </div>
    );
}
