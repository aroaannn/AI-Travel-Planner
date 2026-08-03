// components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Itinerary } from '@/lib/schema';

export default function Map({ itinerary }: { itinerary: Itinerary | null }) {
  // Default coordinates (e.g., London / Western Europe) if no trip is loaded
  const defaultCenter: [number, number] = [20.0, 0.0]; 
  const defaultZoom = 2; // Zoomed out world view

  // If we have an itinerary, center on the first activity
  const hasTrip = itinerary && itinerary.days && itinerary.days.length > 0;
  const firstActivity = hasTrip ? itinerary.days[0].activities[0] : null;
  
  const center: [number, number] = firstActivity 
    ? [firstActivity.coordinates.lat, firstActivity.coordinates.lng] 
    : defaultCenter;
    
  const zoom = hasTrip ? 12 : defaultZoom;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative z-0 min-h-[400px]">
      <MapContainer 
        key={hasTrip ? itinerary.destination : 'default-map'} // Re-renders map when trip changes
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hasTrip && itinerary.days.flatMap((day) =>
          day.activities.map((activity, idx) => (
            <Marker 
              key={`${day.dayNumber}-${idx}`} 
              position={[activity.coordinates.lat, activity.coordinates.lng]}
            >
              <Popup>
                <strong>{activity.placeName}</strong>
                <br />
                {activity.type}
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}