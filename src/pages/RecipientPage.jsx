import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import ListingsMap from "../components/ListingsMap";
import { subscribeToListings } from "../services/listings";

function hoursUntil(isoString) {
  if (!isoString) return 0;

  const diffMs = new Date(isoString) - new Date();

  return Math.max(
    0,
    Math.round(diffMs / (1000 * 60 * 60))
  );
}

function RecipientPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToListings((data) => {
      setListings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">

      <p className="text-sm font-medium text-marigold-dark tracking-wide">
        RECIPIENT
      </p>

      <h1 className="text-3xl font-medium mt-2">
        Available food
      </h1>

      <p className="text-ink/60 mt-2">
        Browse available food donations and claim what your organization needs.
      </p>

      {/* MAP */}
      {!loading && listings.length > 0 && (
        <div className="mt-8">
          <ListingsMap listings={listings} />
        </div>
      )}

      {/* LISTINGS */}
      <div className="mt-8 space-y-4">

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-card border border-ink/10 p-8 text-center text-ink/50">
            Loading listings...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && listings.length === 0 && (
          <div className="bg-white rounded-card border border-dashed border-ink/15 p-8 text-center text-ink/50">
            No food listings yet. New food donations will appear here when donors create listings.
          </div>
        )}

        {/* FOOD CARDS */}
       {listings
  .filter((listing) => listing.stage !== 2)
  .map((listing) => (
    <FoodCard
      key={listing.id}
      listing={{
        ...listing,
        hoursLeft: hoursUntil(listing.availableUntil),
      }}
    />
  ))}

      </div>
    </main>
  );
}

export default RecipientPage;