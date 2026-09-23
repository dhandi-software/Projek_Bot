import type { FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

interface NeedHelpContactFormDesktopProps {
    email: string;
    setEmail: (v: string) => void;
    subject: string;
    setSubject: (v: string) => void;
    message: string;
    setMessage: (v: string) => void;
    isSubmitted: boolean;
    onSubmit: (e: FormEvent) => void;
}

export function NeedHelpContactFormDesktop({
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isSubmitted,
    onSubmit,
}: NeedHelpContactFormDesktopProps) {
    return (
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-7 shadow-xs space-y-6 sticky top-24">
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#191C1F]">
                    Don’t find your answer, Ask for support.
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                    Submit your questions or inquiries below. Our technical support team will respond to your email as soon as possible.
                </p>
            </div>

            {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold">Message Sent Successfully!</p>
                        <p className="text-xs text-emerald-700 mt-1">
                            Thank you! Our support team will get back to you via email within 24 hours.
                        </p>
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-700">Email address</label>
                        <Input
                            type="email"
                            required
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white border-zinc-200 h-11 text-xs sm:text-sm focus:border-[#2DA5F3]"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-700">Subject</label>
                        <Input
                            type="text"
                            required
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="bg-white border-zinc-200 h-11 text-xs sm:text-sm focus:border-[#2DA5F3]"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-700">Message (Optional)</label>
                        <Textarea
                            placeholder="Message (Optional)"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="bg-white border-zinc-200 text-xs sm:text-sm focus:border-[#2DA5F3] resize-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className="w-full uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <span>SEND MESSAGE</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </form>
            )}
        </div>
    );
}
