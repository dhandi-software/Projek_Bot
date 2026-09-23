import { useCustomerSupport } from "~/hooks/useCustomerSupport";
import { BreadCustomerSupportMobile } from "~/components/template/breadcrumb/BreadCustomerSupportMobile";
import {
    SupportHeroMobile,
    SupportCategoriesMobile,
    SupportPopularTopicsMobile,
    SupportContactUsMobile,
} from "~/features/landing/customer-support/components/mobile";

export function CustomerSupportMobile() {
    const {
        searchQuery,
        setSearchQuery,
        helpCategories,
        popularTopics,
        contactChannels,
    } = useCustomerSupport();

    return (
        <div className="w-full bg-white pb-12">
            <BreadCustomerSupportMobile />

            <SupportHeroMobile
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <SupportCategoriesMobile
                categories={helpCategories}
            />

            <SupportPopularTopicsMobile
                popularTopics={popularTopics}
            />

            <SupportContactUsMobile
                contactChannels={contactChannels}
            />
        </div>
    );
}
