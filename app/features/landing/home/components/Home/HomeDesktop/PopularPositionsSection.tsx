import * as React from "react";
import { CategoryGrid, type CategoryItem } from "~/components/ui/category";
import { Code, Database, Cpu, ShieldCheck, Cloud, Palette } from "lucide-react";

export function PopularPositionsSection() {
    const [selectedId, setSelectedId] = React.useState<string | number>("1");

    const categories: CategoryItem[] = [
        {
            id: "1",
            name: "Software Engineering",
            description: "Pengembangan aplikasi web, mobile, dan sistem enterprise.",
            icon: <Code className="size-6 text-orange-500 group-hover:text-white transition-colors" />,
            count: "5.2k+ Mahasiswa",
            badge: "Populer",
            gradient: "from-orange-500 to-amber-500",
        },
        {
            id: "2",
            name: "Artificial Intelligence",
            description: "Machine learning, NLP, computer vision, dan kecerdasan buatan.",
            icon: <Cpu className="size-6 text-orange-500 group-hover:text-white transition-colors" />,
            count: "4.8k+ Mahasiswa",
            badge: "Trending",
            gradient: "from-amber-500 to-yellow-500",
        },
        {
            id: "3",
            name: "Data Science & Analytics",
            description: "Analisis data, big data, business intelligence, dan visualisasi.",
            icon: <Database className="size-6 text-orange-500 group-hover:text-white transition-colors" />,
            count: "4.1k+ Mahasiswa",
            badge: "Favorit",
            gradient: "from-amber-600 to-orange-600",
        },
        {
            id: "4",
            name: "Network & Cyber Security",
            description: "Keamanan informasi, penetration testing, dan sistem jaringan.",
            icon: <ShieldCheck className="size-6 text-orange-500 group-hover:text-white transition-colors" />,
            count: "3.5k+ Mahasiswa",
            badge: "Hot",
            gradient: "from-red-500 to-orange-500",
        },
    ];

    return (
        <section className="w-full py-16">
            <CategoryGrid
                categories={categories}
                selectedCategoryId={selectedId}
                onSelectCategory={(cat) => setSelectedId(cat.id)}
                title="Bidang Peminatan Populer"
                subtitle="Kategori posisi magang dan Kerja Praktik dengan peminat tertinggi semester ini"
                badge="Pilihan Kategori"
                columns={4}
                cardVariant="grid-card"
                cardSize="md"
                showSearch={false}
                showViewAll={true}
                viewAllText="Eksplorasi Semua"
            />
        </section>
    );
}
