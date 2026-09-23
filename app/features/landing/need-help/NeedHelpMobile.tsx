import { useNeedHelp } from "./hooks/useNeedHelp";
import {
    NeedHelpHeaderMobile,
    NeedHelpQuickCardsMobile,
    NeedHelpFaqMobile,
    NeedHelpContactFormMobile,
} from "./components/mobile";

export function NeedHelpMobile() {
    const {
        quickCategories,
        faqItems,
        openFaqId,
        toggleFaq,
        email,
        setEmail,
        subject,
        setSubject,
        message,
        setMessage,
        isSubmitted,
        handleSubmitForm,
        searchQuery,
        setSearchQuery,
    } = useNeedHelp();

    return (
        <div className="w-full bg-zinc-50/50 min-h-screen pb-12">
            <NeedHelpHeaderMobile
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="p-4 space-y-8">
                <NeedHelpQuickCardsMobile categories={quickCategories} />

                <NeedHelpFaqMobile
                    faqItems={faqItems}
                    openFaqId={openFaqId}
                    toggleFaq={toggleFaq}
                />

                <NeedHelpContactFormMobile
                    email={email}
                    setEmail={setEmail}
                    subject={subject}
                    setSubject={setSubject}
                    message={message}
                    setMessage={setMessage}
                    isSubmitted={isSubmitted}
                    onSubmit={handleSubmitForm}
                />
            </div>
        </div>
    );
}
