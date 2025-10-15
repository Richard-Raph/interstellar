// Hero.tsx (Adjusted for Flag Background)

import { Zap, ChevronLeft } from 'lucide-react';
import type { CountryDetail } from '../hooks/useCountryInfo';
import { useNavigate } from 'react-router-dom';
import Map from './Map'; // Map is still imported but not used as the main background

interface HeroProps {
    country: CountryDetail;
}

export default function Hero({ country }: HeroProps) {
    const navigate = useNavigate();
    const { name, flags, latlng } = country;

    const mapCoordinates: [number, number] = [latlng[0], latlng[1]];

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-none md:rounded-2xl shadow-xl md:shadow-2xl">
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between py-4 px-7 bg-black/40 backdrop-blur-sm">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    <span className="tracking-wider uppercase">Country List</span>
                </button>

                <p className="flex items-center text-xs font-mono text-green-400">
                    <Zap className="w-3 h-3 mr-1 animate-pulse" />
                    <span>GLOBAL DATA STREAM ACTIVE</span>
                </p>
            </div>

            <img
                src={flags.png}
                alt={flags.alt}
                className="w-full h-full absolute object-cover inset-0"
            />

            {/* --- Overlay Content: Name, Official Name, and MAP --- */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-7 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between">

                {/* Country Name and Official Name */}
                <div className="text-white space-y-2">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                        {name.common}
                    </h1>
                    <p className="text-xl font-medium text-indigo-300 drop-shadow-md">
                        {name.official}
                    </p>
                </div>

                {/* Map Panel (Moved and Sized) */}
                <div className="flex flex-col items-center">
                    <div className="w-48 h-32 md:w-64 md:h-40 rounded-lg shadow-2xl border-4 border-white/50 overflow-hidden">
                        <Map
                            countryName={name.common}
                            coordinates={mapCoordinates}
                        />
                    </div>
                    <p className="flex items-center text-xs font-mono mt-1 text-indigo-300">
                        <Zap className="w-3 h-3 mr-1" />
                        LIVE LOCATION
                    </p>
                </div>
            </div>
        </div>
    );
}
