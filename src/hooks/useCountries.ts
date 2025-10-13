import { useQuery } from "@tanstack/react-query";
import { Country, getAllCountries, getCountryByName, getCountriesByRegion } from "../api/countries";

interface UseCountriesParams {
  region?: string;
  searchQuery?: string;
}

export function useCountries({ searchQuery, region }: UseCountriesParams = {}) {
  const queryKey = ["countries", region ?? "", searchQuery ?? ""];

  const queryFn = async (): Promise<Country[]> => {
    if (searchQuery) {
      return getCountryByName(searchQuery);
    } else if (region) {
      return getCountriesByRegion(region);
    } else {
      return getAllCountries();
    }
  };

  return useQuery<Country[], Error>({
    queryFn,
    queryKey,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
