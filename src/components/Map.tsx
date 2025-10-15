import L from 'leaflet';
import { X } from 'lucide-react';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { createPortal } from 'react-dom';
import { Popup, Marker, TileLayer, MapContainer } from 'react-leaflet';

L.Icon.Default.mergeOptions({
    iconUrl: 'marker-icon.png',
    shadowUrl: 'marker-shadow.png',
    iconRetinaUrl: 'marker-icon-2x.png',
});

interface MapProps {
    countryName: string;
    coordinates: [number, number];
}

export default function Map({ countryName, coordinates }: MapProps) {
    const [expanded, setExpanded] = useState(false);

    const MapView = (interactive = false) => (
        <MapContainer
            center={coordinates}
            zoom={interactive ? 5 : 4}
            className="w-full h-full z-0"
            scrollWheelZoom={interactive}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={coordinates}>
                <Popup>{countryName}</Popup>
            </Marker>
        </MapContainer>
    );

    return (
        <>
            <div
                onClick={() => setExpanded(true)}
                className="relative w-full h-full cursor-pointer"
            >
                {MapView(false)}
                <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors" />
            </div>

            {expanded && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="relative w-full h-full md:w-3/4 md:h-3/4 p-4">
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/50">
                            {MapView(true)}
                        </div>
                        <button
                            onClick={() => setExpanded(false)}
                            className="absolute top-8 right-8 text-white bg-black/70 p-3 rounded-full hover:bg-black/90 transition"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
