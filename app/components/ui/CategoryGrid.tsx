import * as React from "react";
import { cn } from "~/lib/utils";
import { CategoryCard, type CategoryItem, type CategoryCardProps } from "./CategoryCard";
import { ChevronRight, Search, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";

export interface CategoryGridProps {
  categories: CategoryItem[];
  selectedCategoryId?: string | number;
  onSelectCategory?: (category: CategoryItem) => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  cardVariant?: CategoryCardProps["variant"];
  cardSize?: CategoryCardProps["size"];
  layout?: "grid" | "carousel" | "pills";
  showSearch?: boolean;
  searchPlaceholder?: string;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  viewAllText?: string;
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export function CategoryGrid({
  categories = [],
  selectedCategoryId,
  onSelectCategory,
  title = "Jelajahi Kategori",
  subtitle = "Temukan berbagai topik dan berita terbaru berdasarkan kategori pilihan Anda",
  badge = "Kategori Popular",
  columns = 4,
  cardVariant = "grid-card",
  cardSize = "md",
  layout = "grid",
  showSearch = false,
  searchPlaceholder = "Cari kategori...",
  showViewAll = false,
  onViewAllClick,
  viewAllText = "Lihat Semua",
  loading = false,
  skeletonCount = 8,
  className,
}: CategoryGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter categories based on search query
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase().trim();
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(query) ||
        cat.description?.toLowerCase().includes(query)
    );
  }, [categories, searchQuery]);

  // Column CSS classes mapper
  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  return (
    <section className={cn("w-full space-y-6", className)}>
      {/* Section Header */}
      {(title || subtitle || showSearch || showViewAll) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
            {badge && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400 border border-orange-500/20">
                <Sparkles className="size-3.5" />
                <span>{badge}</span>
              </div>
            )}
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Action Bar (Search & View All) */}
          <div className="flex items-center gap-3">
            {showSearch && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>
            )}

            {showViewAll && (
              <Button
                variant="outline"
                size="sm"
                onClick={onViewAllClick}
                className="rounded-xl border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500 gap-1 text-xs font-semibold"
              >
                <span>{viewAllText}</span>
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className={cn("grid gap-4", gridColsClass[columns])}>
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-2xl border border-border/60 bg-card p-5 animate-pulse flex flex-col justify-between"
            >
              <div className="size-11 rounded-xl bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded-md bg-muted" />
                <div className="h-3 w-1/2 rounded-md bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categories Items Render */}
      {!loading && (
        <>
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center">
              <LayoutGrid className="size-10 text-muted-foreground/50 mb-3" />
              <h3 className="font-semibold text-base text-foreground">
                Kategori Tidak Ditemukan
              </h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Coba gunakan kata kunci pencarian yang lain atau hapus filter.
              </p>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-orange-600 hover:bg-orange-500/10"
                >
                  Reset Pencarian
                </Button>
              )}
            </div>
          ) : layout === "pills" ? (
            // Pills Horizontal Flex Wrap / Scroll
            <div className="flex flex-wrap gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant="pill"
                  size={cardSize}
                  isActive={selectedCategoryId === category.id}
                  onSelect={onSelectCategory}
                />
              ))}
            </div>
          ) : layout === "carousel" ? (
            // Horizontal Carousel Container
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="snap-start shrink-0 w-[180px] sm:w-[220px]"
                >
                  <CategoryCard
                    category={category}
                    variant={cardVariant}
                    size={cardSize}
                    isActive={selectedCategoryId === category.id}
                    onSelect={onSelectCategory}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Standard Responsive Grid Layout
            <div className={cn("grid gap-4 md:gap-5", gridColsClass[columns])}>
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  variant={cardVariant}
                  size={cardSize}
                  isActive={selectedCategoryId === category.id}
                  onSelect={onSelectCategory}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
