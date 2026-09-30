import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "~/lib/utils";

export interface FilterSelectOption<T extends string | number> {
    value: T;
    label: string;
}

interface FilterSelectProps<T extends string | number> {
    options: FilterSelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    icon?: React.ReactNode;
    className?: string;
    size?: "sm" | "md";
}

export function FilterSelect<T extends string | number>({
    options,
    value,
    onChange,
    icon,
    className,
    size = "sm",
}: FilterSelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    "flex items-center gap-2 rounded-xl bg-white border border-zinc-200/90 text-zinc-700 font-bold transition-all shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98] cursor-pointer",
                    size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
                    isOpen && "border-blue-500 ring-2 ring-blue-500/20 bg-zinc-50"
                )}
            >
                {icon && <span className="text-zinc-400 shrink-0">{icon}</span>}
                <span className="truncate max-w-[130px] sm:max-w-[160px]">
                    {selectedOption?.label || String(value)}
                </span>
                <ChevronDown
                    className={cn(
                        "w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-200",
                        isOpen && "transform rotate-180 text-blue-600"
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-zinc-200/80 shadow-lg py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="max-h-60 overflow-y-auto space-y-0.5 px-1">
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button
                                    key={String(option.value)}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer",
                                        isSelected
                                            ? "bg-blue-50 text-blue-600 font-bold"
                                            : "text-zinc-700 hover:bg-zinc-100/80"
                                    )}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-2" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
