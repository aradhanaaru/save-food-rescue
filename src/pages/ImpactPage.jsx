import { useEffect, useMemo, useState } from "react";
import { subscribeToListings } from "../services/listings";

function ImpactPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToListings((data) => {
      setListings(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const impact = useMemo(() => {
    let totalFoodPosted = 0;
    let totalFoodClaimed = 0;
    let completedPickups = 0;

    listings.forEach((listing) => {
      totalFoodPosted += Number(listing.quantity || 0);
      totalFoodClaimed += Number(listing.claimedQuantity || 0);

      if (listing.stage === 2) {
        completedPickups++;
      }
    });

    return {
      totalFoodPosted,
      totalFoodClaimed,
      remainingFood: totalFoodPosted - totalFoodClaimed,
      completedPickups,
    };
  }, [listings]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm font-medium text-marigold-dark tracking-wide">
        OUR IMPACT
      </p>

      <h1 className="text-3xl md:text-4xl font-medium mt-2">
        Every serving rescued matters.
      </h1>

      <p className="text-ink/60 mt-3 max-w-2xl">
        SAVE helps connect surplus food with people and organizations that
        need it, while making the rescue process visible and measurable.
      </p>

      {loading ? (
        <div className="mt-10 bg-white rounded-card border border-ink/10 p-8 text-center text-ink/50">
          Loading impact data...
        </div>
      ) : (
        <>
          {/* IMPACT STATISTICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            <div className="bg-white rounded-card border border-ink/10 p-6">
              <p className="text-sm text-ink/60">
                Food listed
              </p>

              <p className="text-3xl font-medium mt-2">
                {impact.totalFoodPosted}
              </p>

              <p className="text-sm text-ink/50 mt-1">
                servings available through SAVE
              </p>
            </div>

            <div className="bg-white rounded-card border border-ink/10 p-6">
              <p className="text-sm text-ink/60">
                Food claimed
              </p>

              <p className="text-3xl font-medium mt-2">
                {impact.totalFoodClaimed}
              </p>

              <p className="text-sm text-ink/50 mt-1">
                servings matched with recipients
              </p>
            </div>

            <div className="bg-white rounded-card border border-ink/10 p-6">
              <p className="text-sm text-ink/60">
                Still available
              </p>

              <p className="text-3xl font-medium mt-2">
                {impact.remainingFood}
              </p>

              <p className="text-sm text-ink/50 mt-1">
                servings waiting to be claimed
              </p>
            </div>

            <div className="bg-white rounded-card border border-ink/10 p-6">
              <p className="text-sm text-ink/60">
                Completed pickups
              </p>

              <p className="text-3xl font-medium mt-2">
                {impact.completedPickups}
              </p>

              <p className="text-sm text-ink/50 mt-1">
                completed rescue activities
              </p>
            </div>
          </div>

          {/* RESCUE PROGRESS */}
          <section className="mt-8 bg-white rounded-card border border-ink/10 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-medium">
                  Rescue progress
                </h2>

                <p className="text-sm text-ink/60 mt-1">
                  How much of the listed food has already been claimed.
                </p>
              </div>

              <p className="text-2xl font-medium text-leaf-dark">
                {impact.totalFoodPosted > 0
                  ? Math.round(
                      (impact.totalFoodClaimed /
                        impact.totalFoodPosted) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>

            <div className="mt-5 h-3 bg-ink/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-leaf rounded-full transition-all"
                style={{
                  width: `${
                    impact.totalFoodPosted > 0
                      ? Math.min(
                          100,
                          (impact.totalFoodClaimed /
                            impact.totalFoodPosted) *
                            100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-ink/50 mt-2">
              <span>
                {impact.totalFoodClaimed} claimed
              </span>

              <span>
                {impact.totalFoodPosted} total servings
              </span>
            </div>
          </section>

          {/* LISTING ACTIVITY */}
          <section className="mt-8">
            <h2 className="text-xl font-medium">
              Recent rescue activity
            </h2>

            {listings.length === 0 ? (
              <div className="mt-4 bg-white rounded-card border border-dashed border-ink/15 p-8 text-center text-ink/50">
                Impact data will appear here once food listings are created.
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {listings.slice(0, 5).map((listing) => {
                  const total = Number(listing.quantity || 0);
                  const claimed = Number(
                    listing.claimedQuantity || 0
                  );

                  return (
                    <div
                      key={listing.id}
                      className="bg-white rounded-card border border-ink/10 p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-medium">
                          {listing.foodName}
                        </p>

                        <p className="text-sm text-ink/60 mt-1">
                          {claimed} of {total} servings claimed
                        </p>
                      </div>

                      <span className="text-sm font-medium text-leaf-dark">
                        {claimed === total && total > 0
                          ? "Fully claimed"
                          : `${total - claimed} remaining`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default ImpactPage;