import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const TAMIL_NADU_BOUNDS = [
  [8.0, 76.5],
  [13.6, 80.5],
];
const TAMIL_NADU_CENTER = [11.0, 78.5];

function ListingsMap({ listings }) {
  const donorListings = listings.filter((l) => l.lat && l.lng);

  return (
    <div className="rounded-card overflow-hidden border border-ink/10" style={{ height: "300px" }}>
      <MapContainer
        center={TAMIL_NADU_CENTER}
        zoom={7}
        minZoom={7}
        maxBounds={TAMIL_NADU_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {donorListings.map((listing) => (
          <Marker key={listing.id} position={[listing.lat, listing.lng]}>
            <Popup>
              <strong>{listing.foodName}</strong>
              <br />
              Serves {listing.quantity} &middot; {listing.pickupLocation}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ListingsMap;
