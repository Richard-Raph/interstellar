import Card from "../components/Card";
import Error from "../components/Error";
import Toolbar from "../components/Toolbar";
import Skeleton from "../components/Skeleton";
import { type Country } from "../types/country";
import Pagination from "../components/Pagination";
import { useCountries } from "../hooks/useCountries";
import { useState, useEffect, useCallback } from "react";

const PAGE_SIZE = 20;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');
  const { refetch, isError, isLoading, data: countries } = useCountries();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const handleFilter = useCallback((filtered: Country[], search: string) => {
    setFilteredCountries(filtered);
    setCurrentPage(1);
    setCurrentSearch(search);
  }, []);

  useEffect(() => {
    if (countries && countries.length > 0) {
      handleFilter(countries, '');
    }
  }, [countries, handleFilter]);

  if (isError) return <Error type="network" onRetry={refetch} />;

  if (isLoading || !countries)
    return (
      <section className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1 content-center">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </section>
    );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const totalFilteredCountries = filteredCountries.length;
  const paginatedCountries = filteredCountries.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <Toolbar countries={countries} onFilter={handleFilter} />

      {totalFilteredCountries > 0 ? (
        <section className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedCountries.map((country) => (
            <Card key={country.cca2} country={country} />
          ))}
        </section>
      ) : <Error type="results" query={currentSearch} />}

      {totalFilteredCountries > 0 && (
        <Pagination
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalItems={totalFilteredCountries}
        />
      )}
    </>
  );
}