import { useParams } from 'react-router-dom';
import { useCountryInfo } from '../hooks/useCountryInfo';
import { Hero, Error, Metrics, Skeleton } from '../components';

export default function CountryInfo() {
    const { code } = useParams<{ code: string }>();
    const { country, isLoading, isError, refetch } = useCountryInfo(code);

    if (!code) return <div className="text-center py-20 text-red-500 dark:text-red-400">Error: No Target Code Specified.</div>;

    if (isLoading) return <Skeleton type="info" />;

    if (isError || !country) return <Error type="network" onRetry={refetch} />;

    return (
        <section className="relative space-y-10">
            <Hero country={country} />
            <Metrics country={country} />
        </section>
    );
}
