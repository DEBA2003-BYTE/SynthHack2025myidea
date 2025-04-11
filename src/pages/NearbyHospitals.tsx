import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Place = {
  display_name: string;
  lat: string;
  lon: string;
};

const NearbyHospitals = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });

        // Fetch hospitals nearby using Nominatim
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=hospital+clinic+near+${latitude},${longitude}`
        )
          .then((res) => res.json())
          .then((data) => setPlaces(data))
          .catch((err) => console.error("Nominatim error:", err));
      },
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Nearby Clinics & Hospitals 🏥</h1>
      {position ? (
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={14}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[position.lat, position.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {places.map((place, index) => (
            <Marker key={index} position={[parseFloat(place.lat), parseFloat(place.lon)]}>
              <Popup>{place.display_name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Fetching your location and nearby clinics...</p>
      )}
    </div>
  );
};

export default NearbyHospitals;
