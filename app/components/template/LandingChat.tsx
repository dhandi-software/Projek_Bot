import React from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useLandingChat } from "~/hooks/useLandingChat";

function renderFormattedText(text: string, isUser = false) {
    const lines = text.split("\n");

    return (
        <div className="space-y-1.5">
            {lines.map((line, lineIdx) => {
                let trimmed = line.trim();
                if (!trimmed) return <div key={lineIdx} className="h-0.5" />;

                const isBullet = /^[*\-•]\s*/.test(trimmed);
                if (isBullet) {
                    trimmed = trimmed.replace(/^[*\-•]\s*/, "");
                }

                const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
                let numStr = "";
                if (numMatch) {
                    numStr = `${numMatch[1]}.`;
                    trimmed = numMatch[2];
                }

                const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                const parsedContent = parts.map((part, pIdx) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                            <strong
                                key={pIdx}
                                className={isUser ? "font-bold text-white" : "font-bold text-slate-900"}
                            >
                                {part.slice(2, -2)}
                            </strong>
                        );
                    }
                    return part;
                });

                if (numStr) {
                    return (
                        <div
                            key={lineIdx}
                            className={`flex items-start gap-2 pl-0.5 my-1 font-medium ${
                                isUser ? "text-white" : "text-slate-900"
                            }`}
                        >
                            <span
                                className={`font-extrabold shrink-0 text-xs ${
                                    isUser ? "text-white" : "text-blue-600"
                                }`}
                            >
                                {numStr}
                            </span>
                            <div className="flex-1 leading-relaxed">{parsedContent}</div>
                        </div>
                    );
                }

                if (isBullet) {
                    return (
                        <div
                            key={lineIdx}
                            className={`flex items-start gap-2 pl-4 my-0.5 ${
                                isUser ? "text-white/90" : "text-slate-700"
                            }`}
                        >
                            <span
                                className={`size-1.5 rounded-full shrink-0 mt-1.5 ${
                                    isUser ? "bg-white" : "bg-sky-500"
                                }`}
                            />
                            <div className="flex-1 leading-relaxed">{parsedContent}</div>
                        </div>
                    );
                }

                return (
                    <p
                        key={lineIdx}
                        className={`leading-relaxed ${isUser ? "text-white" : "text-slate-800"}`}
                    >
                        {parsedContent}
                    </p>
                );
            })}
        </div>
    );
}

export default function LandingChat() {
    const {
        isOpen,
        setIsOpen,
        messages,
        input,
        setInput,
        isLoading,
        messagesEndRef,
        handleSend,
        handleKeyDown,
    } = useLandingChat();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {isOpen && (
                <div className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-lg border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[calc(100vh-8rem)] animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-xs">
                                <Sparkles className="size-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm tracking-wide">Dhandi Ecommerce AI</h3>
                                <p className="text-[11px] text-white/90 font-medium">Asisten Belanja Online 24/7</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                            aria-label="Tutup obrolan"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2.5 ${
                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                                <div
                                    className={`size-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                                        msg.role === "user"
                                            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white"
                                            : "bg-slate-900 text-sky-400"
                                    }`}
                                >
                                    {msg.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                                </div>
                                <div
                                    className={`max-w-[82%] px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs rounded-2xl ${
                                        msg.role === "user"
                                            ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-tr-none"
                                            : "bg-white border border-slate-200 text-slate-800 rounded-tl-none font-normal"
                                    }`}
                                >
                                    {renderFormattedText(msg.text, msg.role === "user")}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-2.5 flex-row">
                                <div className="size-8 rounded-full flex items-center justify-center shrink-0 bg-slate-900 text-sky-400">
                                    <Bot className="size-4" />
                                </div>
                                <div className="px-3.5 py-2.5 text-xs shadow-2xs rounded-2xl bg-white border border-slate-200 rounded-tl-none text-slate-600 flex items-center gap-2">
                                    <Loader2 className="size-3.5 animate-spin text-blue-600" />
                                    <span>Dhandi AI sedang mengetik...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-slate-200 bg-white">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanya seputar produk, promo, atau pengiriman..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-1.5 size-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                                aria-label="Kirim"
                            >
                                <Send className="size-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="size-14 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-108 transition-all animate-in zoom-in duration-300 cursor-pointer ring-4 ring-sky-500/25"
                    aria-label="Buka bantuan Dhandi Ecommerce AI"
                >
                    <MessageCircle className="size-7" />
                </button>
            )}
        </div>
    );
}
