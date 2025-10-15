import Map from './Map';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronLeft } from 'lucide-react';
import type { CountryDetail } from '../hooks/useCountryInfo';

interface HeroProps {
    country: CountryDetail;
}

export default function Hero({ country }: HeroProps) {
    const navigate = useNavigate();
    const { name, flags, latlng } = country;

    return (
        <section className="relative w-full h-96 overflow-hidden rounded-none md:rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-900">
            <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between py-4 px-6 bg-black/40 backdrop-blur-sm">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-sm font-semibold text-white hover:text-indigo-400 transition"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    <span className="uppercase tracking-wider">Country List</span>
                </button>

                <p className="flex items-center text-xs font-mono text-green-400">
                    <Zap className="w-3 h-3 mr-1 animate-pulse" /> GLOBAL DATA STREAM ACTIVE
                </p>
            </header>

            <img src={flags.png} alt={flags.alt} className="absolute inset-0 w-full h-full object-cover" />

            <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent flex flex-col md:flex-row md:items-end justify-between text-white">
                <div className="space-y-2 md:space-y-3">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
                        {name.common}
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-indigo-300">
                        {name.official}
                    </p>
                </div>

                <div className="flex flex-col items-center mt-4 md:mt-0">
                    <div className="w-44 h-28 md:w-64 md:h-40 rounded-lg shadow-xl border-4 border-white/50 overflow-hidden">
                        <Map countryName={name.common} coordinates={latlng as [number, number]} />
                    </div>
                    <p className="flex items-center text-xs font-mono mt-2 text-indigo-300">
                        <Zap className="w-3 h-3 mr-1" /> LIVE LOCATION
                    </p>
                </div>
            </div>
        </section>
    );
}
