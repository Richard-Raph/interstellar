export interface Country {
  cca3: string;
  tld?: string[];
  region: string;
  borders?: string[];
  capital?: string[];
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  flags: { png: string; svg: string; alt?: string };
  currencies?: Record<string, { name: string; symbol: string }>;
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
}
