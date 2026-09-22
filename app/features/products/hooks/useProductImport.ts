import { useState } from "react";
import { productApi } from "~/api/productApi";
import type { ProductPayload } from "~/features/products/types/types";

export function useProductImport(onSuccess?: () => void) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [parsedProducts, setParsedProducts] = useState<ProductPayload[]>([]);
  const [importError, setImportError] = useState<string | null>(null);

  const downloadSampleCsv = () => {
    const csvContent =
      "Title,SKU,Category,Price,Stock,Materials,Brand,Description,Image\n" +
      '"Laptop Asus ROG 15","ROG-15-01","Computer & Laptop",1599.99,10,"Alloy Chassis, OLED","Asus","High performance gaming laptop","https://images.unsplash.com/photo-1603302576837-37561b2e2302"\n' +
      '"Keyboard Mechanical RGB","KEY-RGB-02","Computer Accessories",89.00,25,"Plastic, PBT Keycaps","Keychron","Wireless mechanical keyboard","https://images.unsplash.com/photo-1587829741301-dc798b83add3"';

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "template_import_produk.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileSelect = (file: File) => {
    setImportError(null);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (file.name.endsWith(".json")) {
          const json = JSON.parse(text);
          if (Array.isArray(json)) {
            setParsedProducts(json);
          } else if (json.products && Array.isArray(json.products)) {
            setParsedProducts(json.products);
          } else {
            throw new Error("Format JSON harus berupa array objek produk");
          }
        } else {
          // Parse CSV
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          if (lines.length < 2) {
            throw new Error("File CSV harus memiliki baris header dan minimal 1 data produk");
          }

          const items: ProductPayload[] = [];
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const cols = parseCsvLine(line);
            if (cols.length > 0 && cols[0]) {
              items.push({
                title: cols[0] || "",
                sku: cols[1] || "",
                category: cols[2] || "Umum",
                price: parseFloat(cols[3]) || 0,
                stock: parseInt(cols[4]) || 0,
                materials: cols[5] || "",
                brand: cols[6] || "",
                description: cols[7] || "",
                image: cols[8] || "",
                is_featured: false,
                is_active: true,
              });
            }
          }
          setParsedProducts(items);
        }
      } catch (err: any) {
        setImportError(err.message || "Gagal membaca file import");
        setParsedProducts([]);
      }
    };

    reader.readAsText(file);
  };

  const parseCsvLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const executeImport = async () => {
    if (parsedProducts.length === 0) return;
    setImportLoading(true);
    try {
      await productApi.bulkCreate(parsedProducts);
      setIsImportModalOpen(false);
      setParsedProducts([]);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setImportError(err.response?.data?.error || "Gagal mengimport produk ke database");
    } finally {
      setImportLoading(false);
    }
  };

  return {
    isImportModalOpen,
    setIsImportModalOpen,
    importLoading,
    parsedProducts,
    importError,
    downloadSampleCsv,
    handleFileSelect,
    executeImport,
    resetImport: () => {
      setParsedProducts([]);
      setImportError(null);
    },
  };
}
