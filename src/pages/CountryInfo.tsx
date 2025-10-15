import { useParams } from 'react-router-dom';
import { useCountryInfo } from '../hooks/useCountryInfo';
import { Hero, Error, Metrics, Skeleton } from '../components';

export default function CountryInfo() {
    const { code } = useParams<{ code: string }>();
    const { refetch, isError, country, isLoading } = useCountryInfo(code);

    if (!code) return <div className="text-center py-20 text-red-500 dark:text-red-400">Error: No Target Code Specified.</div>;

    if (isError) return <Error type="network" onRetry={refetch} />;

    if (isLoading || !country) return <Skeleton type="info" />;

    return (
        <section className="relative space-y-10">
            <Hero country={country} />
            <Metrics country={country} />
        </section>
    );
}
