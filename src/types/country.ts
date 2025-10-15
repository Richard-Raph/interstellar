export interface Country {
  cca2: string;
  tld?: string[];
  region: string;
  borders?: string[];
  capital?: string[];
  subregion?: string;
  population: number;
  timezones?: string[];
  independent?: boolean;
  latlng: [number, number];
  languages?: Record<string, string>;
  flags: { alt: string; png: string; svg: string };
  currencies?: Record<string, { name: string; symbol: string }>;
  demonyms?: {
    fra: { f: string; m: string; };
    eng: { f: string; m: string; plural: string; singular: string; };
  };
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string; official: string }>;
  };
}

export interface ResolvedBorder {
  name: string;
  code: string;
}
