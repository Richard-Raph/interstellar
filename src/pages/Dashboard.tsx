import { useState, useEffect } from "react";
import type { Country } from "../types/country";
import { useCountries } from "../hooks/useCountries";
import { Card, Error, Toolbar, Skeleton, Pagination } from "../components";

const PAGE_SIZE = 20;

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const { data, refetch, isError, isLoading } = useCountries();

  useEffect(() => {
    if (data && !isLoading) {
      setFiltered(data);
      setReady(true);
    }
  }, [data, isLoading]);

  if (isError) return <Error type="network" onRetry={refetch} />;
  if (!ready || isLoading) {
    return (
      <section className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1 content-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </section>
    );
  }

  const handleFilter = (list: Country[], query: string) => {
    setFiltered(list);
    setQuery(query);
    setPage(1);
  };

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const pageData = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Toolbar countries={data!} onFilter={handleFilter} />
      {total ? (
        <>
          <section className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pageData.map((c) => (
              <Card key={c.cca2} country={c} />
            ))}
          </section>
          <Pagination
            totalItems={total}
            currentPage={page}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      ) : (
        <Error type="results" query={query} />
      )}
    </>
  );
}
