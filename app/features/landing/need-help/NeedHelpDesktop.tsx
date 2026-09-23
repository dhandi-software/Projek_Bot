import { useNeedHelp } from "./hooks/useNeedHelp";
import {
    NeedHelpHeaderDesktop,
    NeedHelpQuickCardsDesktop,
    NeedHelpFaqDesktop,
    NeedHelpContactFormDesktop,
} from "./components/desktop";

export function NeedHelpDesktop() {
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
        <div className="w-full bg-zinc-50/50 min-h-screen pb-20">
            <NeedHelpHeaderDesktop
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
                <NeedHelpQuickCardsDesktop categories={quickCategories} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-7">
                        <NeedHelpFaqDesktop
                            faqItems={faqItems}
                            openFaqId={openFaqId}
                            toggleFaq={toggleFaq}
                        />
                    </div>
                    <div className="lg:col-span-5">
                        <NeedHelpContactFormDesktop
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
            </div>
        </div>
    );
}
