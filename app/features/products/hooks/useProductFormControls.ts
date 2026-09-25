import React, { useState, useRef, useEffect } from "react";
import {
  Laptop,
  Gamepad2,
  Smartphone,
  Headphones,
  Plug,
  Package,
  Folder,
  Tv,
  Camera,
  Watch,
  Shirt,
  BookOpen,
  Volume2,
  Box,
  Tag,
} from "lucide-react";

export const DYNAMIC_ICON_RULES: Array<{ keywords: string[]; icon: React.ComponentType<{ className?: string }> }> = [
  { keywords: ["headphone", "headset", "audio", "earphone", "head-phone"], icon: Headphones },
  { keywords: ["laptop", "computer", "komputer", "pc", "macbook"], icon: Laptop },
  { keywords: ["gaming", "game", "console", "ps5", "xbox"], icon: Gamepad2 },
  { keywords: ["smartphone", "phone", "hp", "mobile", "handphone"], icon: Smartphone },
  { keywords: ["accessories", "aksesoris", "plug", "kabel", "charger"], icon: Plug },
  { keywords: ["tv", "televisi", "monitor", "layar"], icon: Tv },
  { keywords: ["camera", "kamera", "foto"], icon: Camera },
  { keywords: ["watch", "jam", "smartwatch"], icon: Watch },
  { keywords: ["shirt", "baju", "pakaian", "kaos", "fashion"], icon: Shirt },
  { keywords: ["book", "buku", "komik"], icon: BookOpen },
  { keywords: ["speaker", "sound", "suara"], icon: Volume2 },
  { keywords: ["box", "kotak", "paket"], icon: Box },
];

export function renderCategoryIcon(name: string, className = "w-4 h-4") {
  if (!name) return React.createElement(Package, { className: `${className} text-slate-500` });
  const normalized = name.trim().toLowerCase();

  for (const rule of DYNAMIC_ICON_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return React.createElement(rule.icon, { className: `${className} text-blue-600` });
    }
  }

  return React.createElement(Folder, { className: `${className} text-amber-500` });
}

export function usePriceInput(value: number | undefined | null, onChange: (val: number) => void) {
  const formatNumber = (num: number): string => {
    if (!num && num !== 0) return "";
    if (num === 0) return "";
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const [displayValue, setDisplayValue] = useState<string>(
    value ? formatNumber(value) : ""
  );

  useEffect(() => {
    if (value === 0 && displayValue !== "") {
      const parsed = parseInt(displayValue.replace(/\D/g, ""), 10);
      if (isNaN(parsed) || parsed === 0) {
        setDisplayValue("");
      }
    } else if (value && value > 0) {
      setDisplayValue(formatNumber(value));
    } else if (value === undefined || value === null) {
      setDisplayValue("");
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const digitsOnly = rawInput.replace(/\D/g, "");

    if (!digitsOnly) {
      setDisplayValue("");
      onChange(0);
      return;
    }

    const numericVal = parseInt(digitsOnly, 10);
    setDisplayValue(new Intl.NumberFormat("id-ID").format(numericVal));
    onChange(numericVal);
  };

  return { displayValue, handleChange };
}

export function useNumberInput(value: number | undefined | null, step: string, onChange: (val: number) => void) {
  const [displayValue, setDisplayValue] = useState<string>(
    value !== undefined && value !== null && value !== 0 ? String(value) : ""
  );

  const prevValueRef = useRef<number | undefined | null>(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      if (value === undefined || value === null || value === 0) {
        if (displayValue !== "" && value !== 0) {
          setDisplayValue("");
        }
      } else {
        setDisplayValue(String(value));
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);

    if (raw === "" || raw === "-") {
      onChange(0);
      return;
    }

    const parsed = step.includes(".") ? parseFloat(raw) : parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return { displayValue, handleChange };
}

export function useCategorySelect(
  value: string,
  onChange: (cat: string) => void,
  onAddCategory?: (newCat: string) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsAdding(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (trimmed) {
      if (onAddCategory) {
        onAddCategory(trimmed);
      }
      onChange(trimmed);
      setNewCatName("");
      setIsAdding(false);
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isAdding,
    setIsAdding,
    newCatName,
    setNewCatName,
    dropdownRef,
    handleCreateCategory,
  };
}

export function useRichTextEditor(value: string, onChange: (val: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (type: "bold" | "italic" | "list" | "link") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);

    let replacement = "";
    let cursorOffset = 0;

    switch (type) {
      case "bold":
        replacement = selected ? `**${selected}**` : "**teks bold**";
        cursorOffset = selected ? start + replacement.length : start + 2;
        break;
      case "italic":
        replacement = selected ? `*${selected}*` : "*teks italic*";
        cursorOffset = selected ? start + replacement.length : start + 1;
        break;
      case "list":
        replacement = selected ? `\n- ${selected}` : "\n- Item daftar";
        cursorOffset = start + replacement.length;
        break;
      case "link":
        replacement = selected ? `[${selected}](https://)` : "[Judul Link](https://)";
        cursorOffset = start + replacement.length - 1;
        break;
    }

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorOffset, cursorOffset);
    }, 0);
  };

  return { textareaRef, insertFormat };
}

export function useMediaUploader(
  image: string,
  onChange: (imgUrl: string) => void,
  showToast?: (msg: string) => void
) {
  const [activeTab, setActiveTab] = useState<"device" | "link">("device");
  const [urlInput, setUrlInput] = useState(image.startsWith("http") ? image : "");
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image.startsWith("http")) {
      setUrlInput(image);
    }
  }, [image]);

  const convertToWebP = (file: File, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0);
          const webpUrl = canvas.toDataURL("image/webp", quality);
          resolve(webpUrl);
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        if (showToast) {
          showToast("Ukuran file gambar melebihi 5MB!");
        } else {
          alert("Ukuran file gambar melebihi 5MB!");
        }
        return;
      }
      setIsConverting(true);
      try {
        const webpDataUrl = await convertToWebP(file);
        if (webpDataUrl) {
          onChange(webpDataUrl);
        }
      } catch (err) {
        console.error("Gagal mengkonversi gambar ke WebP:", err);
      } finally {
        setIsConverting(false);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  return {
    activeTab,
    setActiveTab,
    urlInput,
    setUrlInput,
    isConverting,
    fileInputRef,
    handleFileChange,
    handleUrlSubmit,
  };
}
