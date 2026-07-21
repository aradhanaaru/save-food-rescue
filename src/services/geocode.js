// Uses OpenStreetMap's free Nominatim geocoding service - no API key needed.
// Rate limit: max 1 request/second, fine for a hackathon demo.
// countrycodes=in restricts results to India only, so vague place names
// don't accidentally match a similarly-named place in another country.
export async function geocodeAddress(address) {
  if (!address) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
      address
    )}`;
    const response = await fetch(url);
    const results = await response.json();

    if (results.length === 0) return null;

    return {
      lat: parseFloat(results[0].lat),
      lng: parseFloat(results[0].lon),
    };
  } catch (err) {
    console.error("Geocoding failed:", err);
    return null;
  }
}