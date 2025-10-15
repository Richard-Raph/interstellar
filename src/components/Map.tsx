import 'leaflet/dist/leaflet.css';
import { Popup, Marker, TileLayer, MapContainer } from 'react-leaflet';

interface MapProps {
    countryName: string;
    coordinates: [number, number];
}

export default function Map({ countryName, coordinates }: MapProps) {
    return (
        <MapContainer zoom={5} minZoom={2} maxZoom={10} center={coordinates} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates}>
                <Popup>{countryName}</Popup>
            </Marker>
        </MapContainer>
    );
}
