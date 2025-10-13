import Card from "../components/Card";
import Error from "../components/Error";
import Skeleton from "../components/Skeleton";
import { useCountries } from "../hooks/useCountries";

export default function Dashboard() {
  const { data: countries, isLoading, isError, refetch, searchQuery } = useCountries();

  if (isLoading) {
    return (
      <section className="grid gap-12 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </section>
    );
  }

  // Network error scenario
  if (isError) {
    return <Error type="network" onRetry={refetch} />;
  }

  // No results scenario
  if (!countries || countries.length === 0) {
    return <Error type="results" query={searchQuery} />;
  }

  return (
    <section className="grid gap-12 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {countries.map((country) => (
        <Card key={country.cca3} country={country} />
      ))}
    </section>
  );
}
