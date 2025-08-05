export interface FilterConfig {
  key: string;
  label: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple?: boolean;
}
