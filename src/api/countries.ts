import axios from "axios";
import type { Country, ResolvedBorder } from '../types/country';

const BASE_URL = "https://restcountries.com/v3.1";

const FIELDS = "cca2,name,flags,region,borders,capital,languages,subregion,currencies,population";

function sortCountriesAlphabetically(countries: Country[]): Country[] {
  return countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en", { sensitivity: "base" })
  );
}

// 1. Fetch All Countries (USED by the dashboard)
export async function getAllCountries(): Promise<Country[]> {
  const url = `${BASE_URL}/all?fields=${FIELDS}`;
  const { data } = await axios.get<Country[]>(url);
  return sortCountriesAlphabetically(data);
}

// 2. Fetch Country by Name (USED for Search functionality in the dashboard)
export async function getCountryByName(name: string): Promise<Country[]> {
  const url = `${BASE_URL}/name/${name}?fields=${FIELDS}`;
  const { data } = await axios.get<Country[]>(url);
  return data;
}

// 3. Fetch Single Country by Code (USED by useCountryInfo.ts)
export async function getCountryByCode(code: string): Promise<Country> {
  const url = `${BASE_URL}/alpha/${code}`;
  const { data } = await axios.get<Country[]>(url);
  return data[0];
}

// 4. Fetch Border Names by Codes (USED by useCountryInfo.ts)
export async function getBordersByCodes(codes: string[]): Promise<ResolvedBorder[]> {
  if (codes.length === 0) return [];

  const codeList = codes.join(',');
  const url = `${BASE_URL}/alpha?codes=${codeList}&fields=cca2,name`;

  try {
    const { data } = await axios.get<{ cca2: string; name: { common: string } }[]>(url);

    return data.map(country => ({
      name: country.name.common,
      code: country.cca2,
    }));
  } catch (error) {
    console.error("Failed to fetch border country names:", error);
    return [];
  }
}
