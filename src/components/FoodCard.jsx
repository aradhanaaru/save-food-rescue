import { useState } from "react";
import RouteThread from "./RouteThread";
import { claimPortion, markPickedUp } from "../services/listings";
import { recommendVehicle } from "../utils/vehicleRecommendation";

function FoodCard({ listing }) {
  const {
    id,
    foodName,
    quantity,
    foodType,
    pickupLocation,
    hoursLeft,
    stage = 0,
    claimedQuantity = 0,
  } = listing;

  const [claimAmount, setClaimAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const urgent = hoursLeft <= 2;
  const totalQuantity = Number(quantity);
  const remaining = Math.max(0, totalQuantity - claimedQuantity);
  const { vehicle, weightKg } = recommendVehicle(quantity);

  const handleClaim = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await claimPortion(listing, claimAmount);
      setClaimAmount("");
    } catch (err) {
      console.error("Failed to claim:", err);
      alert(err.message || "Couldn't claim. Check the console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePickup = async () => {
    try {
      await markPickedUp(id);
    } catch (err) {
      console.error("Failed to mark as picked up:", err);
      alert("Couldn't update pickup status.");
    }
  };

  return (
    <div className="bg-white rounded-card border border-ink/10 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-medium leading-snug">{foodName}</p>
          <p className="text-sm text-ink/60 mt-1">
            Serves {quantity} &middot; {foodType}
          </p>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium ${
            urgent ? "bg-clay/10 text-clay-dark" : "bg-marigold/10 text-marigold-dark"
          }`}
        >
          {hoursLeft}h left
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm text-ink/60">
        <i className="ti ti-map-pin text-base" aria-hidden="true" />
        {pickupLocation}
      </div>

      <div className="mt-2 text-xs text-ink/50">
        Est. {weightKg}kg &middot; suggested pickup vehicle: <span className="font-medium text-ink/70">{vehicle}</span>
      </div>

      {stage === 0 && claimedQuantity > 0 && (
        <p className="mt-2 text-xs text-marigold-dark font-medium">
          {claimedQuantity} of {totalQuantity} servings already claimed &middot; {remaining} left
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-dashed border-ink/10">
        <RouteThread currentStage={stage} />
      </div>

      {stage === 0 && (
        <form onSubmit={handleClaim} className="mt-4 flex gap-2">
          <input
            type="number"
            min="1"
            max={remaining}
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
            placeholder={`Up to ${remaining}`}
            className="w-28 border border-ink/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marigold/40 focus:border-marigold"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-marigold hover:bg-marigold-dark text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {submitting ? "Claiming..." : "Claim servings"}
          </button>
        </form>
      )}

      {stage === 1 && (
        <button
          onClick={handlePickup}
          className="mt-4 w-full bg-leaf hover:bg-leaf-dark text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Mark as picked up
        </button>
      )}

      {stage === 2 && (
        <p className="mt-4 text-center text-sm text-leaf-dark font-medium">
          Rescue completed
        </p>
      )}
    </div>
  );
}

export default FoodCard;
