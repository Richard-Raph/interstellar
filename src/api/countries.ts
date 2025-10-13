import axios from "axios";
import { type Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries(): Promise<Country[]> {
  const { data } = await axios.get<Country[]>(`${BASE_URL}/all`);
  return data;
}

export async function getCountryByCode(code: string): Promise<Country> {
  const { data } = await axios.get<Country[]>(`${BASE_URL}/alpha/${code}`);
  return data[0];
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const { data } = await axios.get<Country[]>(`${BASE_URL}/region/${region}`);
  return data;
}

export async function getCountryByName(name: string): Promise<Country[]> {
  const { data } = await axios.get<Country[]>(`${BASE_URL}/name/${name}`);
  return data;
}
