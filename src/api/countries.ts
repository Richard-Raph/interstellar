import axios from "axios";
import { type Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

const REQUIRED_FIELDS = "cca2,name,flags,region,borders,capital,languages,subregion,currencies,population";

function sortCountriesAlphabetically(countries: Country[]): Country[] {
  return countries.sort((a, b) =>
    a.name.common.localeCompare(b.name.common, "en", { sensitivity: "base" })
  );
}

export async function getAllCountries(): Promise<Country[]> {
  const url = `${BASE_URL}/all?fields=${REQUIRED_FIELDS}`;
  const { data } = await axios.get<Country[]>(url);
  return sortCountriesAlphabetically(data);
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const url = `${BASE_URL}/region/${region}?fields=${REQUIRED_FIELDS}`;
  const { data } = await axios.get<Country[]>(url);
  return sortCountriesAlphabetically(data);
}

export async function getCountryByName(name: string): Promise<Country[]> {
  const url = `${BASE_URL}/name/${name}?fields=${REQUIRED_FIELDS}`;
  const { data } = await axios.get<Country[]>(url);
  return data;
}

export async function getCountryByCode(code: string): Promise<Country> {
  const { data } = await axios.get<Country[]>(`${BASE_URL}/alpha/${code}`);
  return data[0];
}
