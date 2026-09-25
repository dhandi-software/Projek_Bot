export interface PriceInputProps {
  label: string;
  required?: boolean;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  id?: string;
}

export interface NumberInputProps {
  label: string;
  required?: boolean;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  step?: string;
  min?: number;
  suffix?: string;
  id?: string;
}

export interface CategorySelectProps {
  label: string;
  required?: boolean;
  value: string;
  categories: string[];
  onChange: (cat: string) => void;
  onAddCategory?: (newCat: string) => void;
}

export interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export interface MediaUploaderProps {
  image: string;
  onChange: (imgUrl: string) => void;
  showToast?: (msg: string) => void;
}
