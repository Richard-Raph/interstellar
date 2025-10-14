import type { ResolvedBorder } from '../types/country';
import { useParams, useNavigate } from 'react-router-dom';
import { useCountryInfo, type CountryDetail } from '../hooks/useCountryInfo';
import { ChevronLeft, Globe, Map, MessageSquare, Briefcase } from 'lucide-react';

export default function CountryInfo() {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();

    // Use the custom hook to fetch and resolve data
    const { country, isLoading, isError } = useCountryInfo(code);

    // --- Data Transformation Helpers ---

    // Safely extracts the official native name
    const getNativeName = (country: CountryDetail | null) => {
        const nativeNameObj = country?.name.nativeName;
        if (!nativeNameObj) return 'N/A';
        // Get the value of the first key in the nativeName object
        const firstKey = Object.keys(nativeNameObj)[0];
        return nativeNameObj[firstKey].official || 'N/A';
    };

    // Formats currencies into a comma-separated string
    const getCurrencies = (country: CountryDetail | null) => {
        const currencyObj = country?.currencies;
        if (!currencyObj) return 'N/A';
        return Object.values(currencyObj).map(c => c.name).join(', ');
    };

    // Formats languages into a comma-separated string
    const getLanguages = (country: CountryDetail | null) => {
        const langObj = country?.languages;
        if (!langObj) return 'N/A';
        return Object.values(langObj).join(', ');
    };

    // --- UI Components ---

    // Component for displaying key metrics
    const InfoBlock = ({ label, value, icon: Icon, className = "" }: { label: string, value: string | number, icon: React.ElementType, className?: string }) => (
        <div className={`p-4 rounded-lg bg-white/5 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium text-xs uppercase tracking-widest mb-1">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
            </div>
            <p className="text-xl font-extrabold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    );
    
    // Interactive button for border countries
    const BorderButton = ({ name, code }: ResolvedBorder) => (
        <button
            // Navigation to the new country detail page
            onClick={() => navigate(`/country/${code}`)}
            className="px-4 py-2 rounded-full font-mono text-xs shadow-lg transition-all duration-300
                       bg-indigo-600/10 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-400 border border-indigo-400/50
                       hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white 
                       hover:shadow-indigo-500/50 dark:hover:shadow-lg dark:hover:shadow-indigo-500/30"
        >
            {name}
        </button>
    );

    // --- Loading and Error States ---

    if (!code) return <div className="text-center py-20 text-red-500 dark:text-red-400">Error: No Target Code Specified.</div>;

    if (isLoading) {
        // Futuristic Skeleton Loading (using a placeholder component)
        return (
            <div className="py-10">
                <div className="w-48 h-8 mb-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="rounded-2xl p-10 shadow-2xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-indigo-900/50">
                    {/* Replace with your actual Skeleton component */}
                    <div className="h-96 w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                </div>
            </div>
        );
    }
    
    if (isError || !country) {
        return (
            <div className="text-center py-20 text-red-500 dark:text-red-400">
                <p className="text-2xl font-mono mb-4">&gt; FATAL ERROR: CONNECTION LOST</p>
                <p>Failed to retrieve data for code **{code}**. The specified stellar coordinates returned no data.</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    Return to Data Log
                </button>
            </div>
        );
    }

    // --- Main Render (Data is available) ---
    return (
        <div className="py-10">
            {/* Back Button - Clear Command */}
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center mb-10 text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="tracking-wider">RETURN TO DATA LOG</span>
            </button>

            {/* Main Data Panel - Hologram Effect */}
            <div className="rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-md 
                            bg-white/70 dark:bg-gray-900/70 border border-gray-300/50 dark:border-indigo-900/50">
                
                {/* Header: Flag and Name */}
                <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 pb-6 mb-8 border-b border-indigo-200 dark:border-indigo-800">
                    <img 
                        src={country.flags.png} 
                        alt={country.flags.alt} 
                        className="w-full lg:w-48 h-auto lg:h-32 object-cover rounded-lg shadow-xl border border-gray-200 dark:border-gray-700" 
                    />
                    <div className="flex-grow">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-2">
                            {country.name.common}
                        </h1>
                        <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
                            {country.name.official}
                        </p>
                    </div>
                </div>

                {/* Grid of Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <InfoBlock label="Population" value={country.population.toLocaleString()} icon={Globe} />
                    <InfoBlock label="Region" value={country.region} icon={Map} />
                    <InfoBlock label="Capital" value={country.capital?.[0] || 'N/A'} icon={Briefcase} />
                    <InfoBlock label="Native Name" value={getNativeName(country)} icon={MessageSquare} />
                </div>

                {/* Detail Information and Border Contacts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Primary Details Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b border-indigo-400/50 pb-1">
                            SPECIFICATIONS
                        </h2>
                        <div className="space-y-3 font-mono text-sm dark:text-gray-300">
                            <p><span className="font-semibold text-indigo-500 w-48 inline-block">SUB REGION:</span> {country.subregion || 'N/A'}</p>
                            <p><span className="font-semibold text-indigo-500 w-48 inline-block">CURRENCIES:</span> {getCurrencies(country)}</p>
                            <p><span className="font-semibold text-indigo-500 w-48 inline-block">LANGUAGES:</span> {getLanguages(country)}</p>
                            <p><span className="font-semibold text-indigo-500 w-48 inline-block">CODE (CCA2):</span> {country.cca2}</p>
                        </div>
                    </div>

                    {/* Border Countries Column (Interactive Terminal View) */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b border-indigo-400/50 pb-1">
                            BORDER CONTACTS
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {country.borders && country.borders.length > 0 ? (
                                country.borders.map((border) => (
                                    <BorderButton key={border.code} name={border.name} code={border.code} />
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 font-mono italic">
                                    No immediate orbital neighbors detected.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            
            {/* Map Placeholder - For future integration */}
            <div className="mt-10 p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-dashed border-indigo-400/50 dark:border-indigo-600/50 text-center text-gray-500 dark:text-gray-400">
                <p className="font-mono">
                    [INTERACTIVE MAP DISPLAY AREA - TO BE INTEGRATED USING REACT-LEAFLET]
                </p>
            </div>
        </div>
    );
}
