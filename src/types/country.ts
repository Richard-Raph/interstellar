export interface Country {
  cca2: string;
  region: string;
  borders?: string[];
  capital?: string[];
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  flags: { alt: string; png: string; svg: string };
  currencies?: Record<string, { name: string; symbol: string }>;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string; official: string }>;
  };
}
