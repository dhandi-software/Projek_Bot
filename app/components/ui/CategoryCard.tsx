import * as React from "react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface CategoryItem {
  id: string | number;
  name: string;
  description?: string;
  icon?: React.ReactNode | string;
  count?: number | string;
  badge?: string;
  slug?: string;
  color?: string; // HEX or Tailwind color class
  gradient?: string; // Custom gradient e.g. "from-amber-500 to-orange-600"
}

export interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryItem;
  variant?: "grid-card" | "horizontal" | "pill" | "minimal" | "featured";
  isActive?: boolean;
  onSelect?: (category: CategoryItem) => void;
  href?: string;
  showCount?: boolean;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      category,
      variant = "grid-card",
      isActive = false,
      onSelect,
      href,
      showCount = true,
      showBadge = true,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const { name, description, icon, count, badge, gradient } = category;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }
      if (onSelect) {
        onSelect(category);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (onSelect) {
          onSelect(category);
        }
      }
    };

    // Render Icon element safely
    const renderIcon = () => {
      if (!icon) {
        return <Sparkles className="size-6 text-brand-primary" />;
      }
      if (typeof icon === "string") {
        return (
          <img
            src={icon}
            alt={name}
            className="size-7 object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        );
      }
      return icon;
    };

    // Card sizes config
    const sizeClasses = {
      sm: "p-3.5 text-xs gap-2",
      md: "p-5 text-sm gap-3",
      lg: "p-6 text-base gap-4",
    };

    // --- VARIANT 1: Grid Card (Default Figma-style Icon Card) ---
    if (variant === "grid-card") {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          tabIndex={0}
          role="button"
          aria-selected={isActive}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer select-none",
            sizeClasses[size],
            isActive
              ? "border-orange-500 bg-gradient-to-b from-orange-500/10 via-background to-background shadow-lg shadow-orange-500/10 ring-2 ring-orange-500/30"
              : "border-border/60 bg-card hover:border-orange-500/40 hover:bg-card/90 hover:shadow-md hover:shadow-orange-500/5",
            className
          )}
          {...(props as any)}
        >
          {/* Subtle Background Glow on Hover */}
          <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/0 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Top Row: Icon Container & Badge */}
          <div className="flex items-start justify-between w-full">
            <div
              className={cn(
                "flex items-center justify-center rounded-xl p-3 shadow-xs transition-all duration-300 group-hover:scale-110",
                gradient
                  ? `bg-gradient-to-br ${gradient} text-white shadow-md`
                  : isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-muted/80 text-foreground group-hover:bg-orange-500 group-hover:text-white"
              )}
            >
              {renderIcon()}
            </div>

            {/* Badge or Arrow */}
            <div className="flex items-center gap-1.5">
              {showBadge && badge && (
                <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  {badge}
                </span>
              )}
              <div className="opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-y-0.5">
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-orange-500" />
              </div>
            </div>
          </div>

          {/* Bottom Section: Name & Count */}
          <div className="mt-4 flex flex-col gap-1">
            <h4
              className={cn(
                "font-semibold tracking-tight transition-colors line-clamp-1",
                isActive
                  ? "text-orange-600 dark:text-orange-400 font-bold"
                  : "text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400"
              )}
            >
              {name}
            </h4>

            {description && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}

            {showCount && count !== undefined && (
              <span className="mt-1 text-[11px] font-medium text-muted-foreground/80">
                {count} {typeof count === "number" ? (count === 1 ? "Item" : "Items") : ""}
              </span>
            )}
          </div>
        </motion.div>
      );
    }

    // --- VARIANT 2: Featured Hero Card ---
    if (variant === "featured") {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -5, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          tabIndex={0}
          role="button"
          aria-selected={isActive}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-300 cursor-pointer border select-none",
            "bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white border-neutral-800 shadow-xl",
            isActive && "ring-2 ring-orange-500 border-orange-500",
            className
          )}
          {...(props as any)}
        >
          {/* Ambient Lighting Background */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/0 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between w-full z-10">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25">
              {renderIcon()}
            </div>

            {showBadge && badge && (
              <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-orange-300 border border-white/10">
                {badge}
              </span>
            )}
          </div>

          <div className="mt-8 z-10">
            <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
              {name}
            </h3>
            {description && (
              <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
            {showCount && count !== undefined && (
              <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-400">
                <span>{count} Konten Terkait</span>
                <ArrowUpRight className="size-4 text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    // --- VARIANT 3: Horizontal Card ---
    if (variant === "horizontal") {
      return (
        <motion.div
          ref={ref}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          tabIndex={0}
          role="button"
          aria-selected={isActive}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 cursor-pointer select-none",
            isActive
              ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500"
              : "border-border/60 bg-card hover:border-orange-500/40 hover:bg-accent/50",
            className
          )}
          {...(props as any)}
        >
          <div className="flex items-center justify-center size-12 shrink-0 rounded-xl bg-muted group-hover:bg-orange-500 group-hover:text-white transition-colors">
            {renderIcon()}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm truncate text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400">
                {name}
              </h4>
              {showCount && count !== undefined && (
                <span className="text-xs text-muted-foreground ml-2 shrink-0">
                  {count}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      );
    }

    // --- VARIANT 4: Pill Chip Variant ---
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        tabIndex={0}
        role="button"
        aria-selected={isActive}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer select-none whitespace-nowrap",
          isActive
            ? "border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20"
            : "border-border/70 bg-background text-foreground hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-600",
          className
        )}
        {...(props as any)}
      >
        <span className="shrink-0 size-4 flex items-center justify-center">
          {renderIcon()}
        </span>
        <span>{name}</span>
        {showCount && count !== undefined && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px]",
              isActive
                ? "bg-white/20 text-white"
                : "bg-muted text-muted-foreground group-hover:bg-orange-500/20"
            )}
          >
            {count}
          </span>
        )}
      </motion.div>
    );
  }
);

CategoryCard.displayName = "CategoryCard";
