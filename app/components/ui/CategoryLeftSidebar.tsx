import * as React from "react";
import { cn } from "~/lib/utils";
import { CategoryCard, type CategoryItem } from "./CategoryCard";
import { Search, Layers, Sparkles, Filter, ChevronRight } from "lucide-react";
import { Code, Database, Cpu, ShieldCheck, Cloud, Palette, Terminal, Globe } from "lucide-react";

export interface CategoryLeftSidebarProps {
  categories?: CategoryItem[];
  selectedId?: string | number;
  onSelect?: (category: CategoryItem) => void;
  title?: string;
  className?: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "1",
    name: "Software Engineering",
    description: "Web, Mobile & Systems",
    icon: <Code className="size-5 text-orange-500" />,
    count: "5.2k",
    badge: "Hot",
  },
  {
    id: "2",
    name: "Artificial Intelligence",
    description: "Machine Learning & AI",
    icon: <Cpu className="size-5 text-amber-500" />,
    count: "4.8k",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Data Science",
    description: "Big Data & Analytics",
    icon: <Database className="size-5 text-orange-600" />,
    count: "4.1k",
  },
  {
    id: "4",
    name: "Cyber Security",
    description: "Network & Security",
    icon: <ShieldCheck className="size-5 text-red-500" />,
    count: "3.5k",
  },
  {
    id: "5",
    name: "Cloud Computing",
    description: "AWS, DevOps & K8s",
    icon: <Cloud className="size-5 text-sky-500" />,
    count: "2.9k",
  },
  {
    id: "6",
    name: "UI/UX Design",
    description: "Product & Web Design",
    icon: <Palette className="size-5 text-rose-500" />,
    count: "3.2k",
  },
];

export function CategoryLeftSidebar({
  categories = DEFAULT_CATEGORIES,
  selectedId: initialSelectedId = "1",
  onSelect,
  title = "Kategori Utama",
  className,
}: CategoryLeftSidebarProps) {
  const [selectedId, setSelectedId] = React.useState<string | number>(initialSelectedId);
  const [search, setSearch] = React.useState("");

  const handleSelect = (category: CategoryItem) => {
    setSelectedId(category.id);
    if (onSelect) {
      onSelect(category);
    }
  };

  const filteredCategories = React.useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
    );
  }, [categories, search]);

  return (
    <aside
      className={cn(
        "w-full max-w-xs shrink-0 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/75 transition-all duration-300 space-y-4",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
            <Layers className="size-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground tracking-tight">{title}</h3>
            <p className="text-[11px] text-muted-foreground">Pilih topik peminatan</p>
          </div>
        </div>
        <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-600 border border-orange-500/20">
          {categories.length} Topik
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kategori..."
          className="w-full rounded-xl border border-border/70 bg-background pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/40"
        />
      </div>

      {/* Categories Vertical List */}
      <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted">
        {filteredCategories.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            Kategori tidak ditemukan
          </div>
        ) : (
          filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              variant="horizontal"
              size="sm"
              isActive={selectedId === category.id}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      {/* Footer Info / View All */}
      <div className="border-t border-border/60 pt-3">
        <button
          type="button"
          className="w-full flex items-center justify-between rounded-xl p-2 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            Lihat Semua Kategori
          </span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </aside>
  );
}
