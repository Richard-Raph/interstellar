import { type Country } from "../types/country";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries } from "../api/countries";

export function useCountries() {
  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
