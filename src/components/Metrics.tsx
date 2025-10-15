import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ResolvedBorder } from '../types/country';
import type { CountryDetail } from '../hooks/useCountryInfo';
import { Map, Clock, Globe, Users, BookOpen, Landmark, Briefcase, DollarSign, MessageSquare } from 'lucide-react';

interface MetricsProps {
    country: CountryDetail;
}

interface InfoBlockProps {
    label: string;
    value: string | number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, value, icon: Icon }) => (
    <div className="p-4 rounded-lg bg-white/5 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-widest mb-1">
            <Icon className="w-4 h-4" /> <span>{label}</span>
        </div>
        <p className="text-xl font-extrabold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
);

const Border: React.FC<ResolvedBorder & { onClick: (code: string) => void }> = ({ name, code, onClick }) => (
    <button
        onClick={() => onClick(code)}
        className="px-4 py-2 rounded-full font-mono text-xs shadow-lg transition-all
        dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-400 border border-indigo-400/50 
        bg-indigo-600/10 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white"
    >
        {name}
    </button>
);

export default function Metrics({ country }: MetricsProps) {
    const navigate = useNavigate();

    const val = <T,>(obj: Record<string, T> | undefined, map: (v: T) => string) =>
        obj ? Object.values(obj).map(map).join(', ') : 'N/A';

    const nativeName = Object.values(country.name.nativeName ?? {})[0]?.official ?? 'N/A';
    const demonym =
        country.demonyms?.eng?.singular ??
        country.demonyms?.eng?.f ??
        country.demonyms?.eng?.m ?? 'N/A';

    const metrics: InfoBlockProps[] = [
        { label: 'Population', value: country.population.toLocaleString(), icon: Globe },
        { label: 'Region', value: country.region, icon: Map },
        { label: 'Capital', value: country.capital?.[0] ?? 'N/A', icon: Briefcase },
        { label: 'Status', value: country.independent ? 'Independent' : 'Dependent', icon: Landmark },
        { label: 'Native Name', value: nativeName, icon: MessageSquare },
        { label: 'Citizen Name', value: demonym, icon: Users },
    ];

    const specs = [
        { label: 'CODE (CCA2)', value: country.cca2, icon: Globe, color: 'text-blue-500' },
        { label: 'SUB REGION', value: country.subregion ?? 'N/A', icon: Map, color: 'text-red-500' },
        { label: 'LANGUAGES', value: val(country.languages, l => l), icon: BookOpen, color: 'text-green-500' },
        { label: 'TIME ZONES', value: country.timezones?.join(', ') ?? 'N/A', icon: Clock, color: 'text-cyan-500' },
        { label: 'CURRENCIES', value: val(country.currencies, c => c.name), icon: DollarSign, color: 'text-yellow-500' },
    ] as const;

    return (
        <div className="rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-gray-300/50 dark:border-indigo-900/50">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 border-b border-indigo-400/50 pb-2">
                KEY METRICS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {metrics.map(metric => <InfoBlock key={metric.label} {...metric} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b border-indigo-400/50 pb-1">
                        SPECIFICATIONS
                    </h2>
                    <div className="space-y-3 font-mono text-sm dark:text-gray-300">
                        {specs.map(({ label, value, icon: Icon, color }) => (
                            <p key={label} className="flex items-start">
                                <Icon className={`w-4 h-4 mr-2 mt-0.5 ${color}`} />
                                <span className="font-semibold text-indigo-500 w-48">{label}:</span>
                                <span className="break-words">{value}</span>
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b border-indigo-400/50 pb-1">
                        BORDER CONTACTS
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {country.borders?.length
                            ? country.borders.map(border =>
                                <Border key={border.code} {...border} onClick={code => navigate(`/country/${code}`)} />)
                            : <p className="text-gray-500 dark:text-gray-400 font-mono italic">
                                No immediate orbital neighbors detected.
                            </p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
