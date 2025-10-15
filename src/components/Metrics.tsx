// src/components/Metrics.tsx (Revised - Improved Layout)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ResolvedBorder } from '../types/country';
import type { CountryDetail } from '../hooks/useCountryInfo';
// Removed Languages icon, as it was only used for the Spanish translation
import { Globe, Map, MessageSquare, Briefcase, DollarSign, BookOpen, Clock, Users, Landmark } from 'lucide-react';

interface MetricsProps {
    country: CountryDetail;
}

export default function Metrics({ country }: MetricsProps) {
    const navigate = useNavigate();

    // --- Data Transformation Helpers (No change to logic) ---

    const getNativeName = () => {
        const nativeNameObj = country.name.nativeName;
        if (!nativeNameObj) return 'N/A';
        const firstKey = Object.keys(nativeNameObj)[0];
        return nativeNameObj[firstKey]?.official || 'N/A';
    };

    const getDemonym = () => {
        const demonymsObj = country.demonyms;
        if (!demonymsObj || !demonymsObj.eng) return 'N/A';
        return demonymsObj.eng.singular || demonymsObj.eng.f || demonymsObj.eng.m || 'N/A';
    };

    const getCurrencies = () => {
        const currencyObj = country.currencies;
        if (!currencyObj) return 'N/A';
        return Object.values(currencyObj).map(c => c.name).join(', ');
    };

    const getLanguages = () => {
        const langObj = country.languages;
        if (!langObj) return 'N/A';
        return Object.values(langObj).join(', ');
    };

    const getIndependenceStatus = () => {
        if ('independent' in country) {
            return country.independent ? 'Independent Country' : 'Dependent Territory';
        }
        return 'Status Unknown';
    }


    // --- UI Components ---

    const InfoBlock = ({ label, value, icon: Icon, className = "" }: { label: string, value: string | number, icon: React.ElementType, className?: string }) => (
        <div className={`p-4 rounded-lg bg-white/5 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium text-xs uppercase tracking-widest mb-1">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
            </div>
            {/* The 'truncate' class is removed here to ensure text wraps if it must, 
                though with the wider columns it should rarely be needed. */}
            <p className="text-xl font-extrabold text-gray-900 dark:text-gray-100">{value}</p> 
        </div>
    );

    const BorderButton = ({ name, code }: ResolvedBorder) => (
        <button
            onClick={() => navigate(`/country/${code}`)}
            className="px-4 py-2 rounded-full font-mono text-xs shadow-lg transition-all duration-300
                        bg-indigo-600/10 dark:bg-indigo-700/20 text-indigo-700 dark:text-indigo-400 border border-indigo-400/50
                        hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white 
                        hover:shadow-indigo-500/50 dark:hover:shadow-lg dark:hover:shadow-indigo-500/30"
        >
            {name}
        </button>
    );

    // --- Main Render ---
    return (
        <div className="rounded-2xl p-6 lg:p-10 shadow-2xl backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-gray-300/50 dark:border-indigo-900/50">

            {/* Grid of Key Stats */}
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 border-b border-indigo-400/50 pb-2">
                KEY METRICS
            </h2>
            {/* ✅ FIX: Changed lg:grid-cols-6 to lg:grid-cols-3 for wider metric blocks */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                {/* Row 1: Core Stats (Population gets 2 columns) */}
                <InfoBlock label="Population" value={country.population.toLocaleString()} icon={Globe} className="md:col-span-2 lg:col-span-1" />
                <InfoBlock label="Region" value={country.region} icon={Map} />
                <InfoBlock label="Capital" value={country.capital?.[0] || 'N/A'} icon={Briefcase} />
                
                {/* Row 2: Identity & Status */}
                <InfoBlock label="Status" value={getIndependenceStatus()} icon={Landmark} className="md:col-span-1 lg:col-span-1" />
                <InfoBlock label="Native Name" value={getNativeName()} icon={MessageSquare} />
                <InfoBlock label="Citizen Name" value={getDemonym()} icon={Users} />
            </div>

            {/* Detail Information and Border Contacts */}
            {/* ... (The rest of the component remains the same) ... */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-3">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b border-indigo-400/50 pb-1">
                        SPECIFICATIONS
                    </h2>
                    <div className="space-y-3 font-mono text-sm dark:text-gray-300">

                        <p className="flex items-start">
                            <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                            <span className="font-semibold text-indigo-500 w-48 inline-block flex-shrink-0">CURRENCIES:</span>
                            <span className='break-words'>{getCurrencies()}</span>
                        </p>

                        <p className="flex items-start">
                            <BookOpen className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                            <span className="font-semibold text-indigo-500 w-48 inline-block flex-shrink-0">LANGUAGES:</span>
                            <span className='break-words'>{getLanguages()}</span>
                        </p>

                        <p className="flex items-start">
                            <Map className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                            <span className="font-semibold text-indigo-500 w-48 inline-block flex-shrink-0">SUB REGION:</span>
                            <span className='break-words'>{country.subregion || 'N/A'}</span>
                        </p>

                        <p className="flex items-start">
                            <Clock className="w-4 h-4 mr-2 mt-0.5 text-cyan-500 flex-shrink-0" />
                            <span className="font-semibold text-indigo-500 w-48 inline-block flex-shrink-0">TIME ZONES:</span>
                            <span className='break-words whitespace-normal'>{country.timezones?.join(', ') || 'N/A'}</span>
                        </p>

                        <p className="flex items-start">
                            <Globe className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                            <span className="font-semibold text-indigo-500 w-48 inline-block flex-shrink-0">CODE (CCA2):</span>
                            <span className='break-words'>{country.cca2}</span>
                        </p>
                    </div>
                </div>

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
    );
}