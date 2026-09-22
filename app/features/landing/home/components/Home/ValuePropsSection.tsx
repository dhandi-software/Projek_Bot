import React from "react";
import { Package, Trophy, CreditCard, Headphones } from "lucide-react";

export function ValuePropsSection() {
  const features = [
    {
      icon: Package,
      title: "FASTED DELIVERY",
      subtitle: "Delivery in 24/H",
    },
    {
      icon: Trophy,
      title: "24 HOURS RETURN",
      subtitle: "100% money-back guarantee",
    },
    {
      icon: CreditCard,
      title: "SECURE PAYMENT",
      subtitle: "Your money is safe",
    },
    {
      icon: Headphones,
      title: "SUPPORT 24/7",
      subtitle: "Live contact/message",
    },
  ];

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-lg shadow-sky-950/5 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60">
        {features.map((feature, idx) => {
          const IconComp = feature.icon;
          return (
            <div
              key={feature.title}
              className={`flex items-center gap-3.5 ${
                idx > 0 ? "pt-3 md:pt-0 md:pl-4" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-900 shrink-0 shadow-2xs">
                <IconComp className="w-5 h-5 text-zinc-800 stroke-[1.75]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#191C1F] leading-tight tracking-wider uppercase">
                  {feature.title}
                </span>
                <span className="text-[11px] text-[#5F6C72] truncate leading-tight mt-1">
                  {feature.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
