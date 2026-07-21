import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteThread from "../components/RouteThread";
import { subscribeToListings } from "../services/listings";

function Landing() {
  const navigate = useNavigate();
  const [mealsRescued, setMealsRescued] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToListings((listings) => {
      const total = listings
        .filter((l) => l.stage === 2)
        .reduce((sum, l) => sum + (Number(l.quantity) || 0), 0);
      setMealsRescued(total);
    });
    return unsubscribe;
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-medium text-marigold-dark tracking-wide">
            SAVE &mdash; SMART ALLOCATION FOR VALUABLE EDIBLES
          </p>
          <h1 className="text-4xl font-medium mt-3 leading-tight">
            Surplus food shouldn't go to waste.
            <br />
            It should go somewhere.
          </h1>
          <p className="text-ink/60 mt-4 text-lg">
            Connect vendors with surplus food to NGOs nearby, and give every
            donation a place to land before it's too late.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate("/donor")}
              className="bg-marigold hover:bg-marigold-dark text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              I have food to give
            </button>
            <button
              onClick={() => navigate("/recipient")}
              className="border border-ink/15 hover:bg-sand font-medium px-6 py-3 rounded-lg transition-colors"
            >
              I'm collecting for an NGO
            </button>
          </div>

          {mealsRescued > 0 && (
            <p className="mt-6 text-sm text-leaf-dark font-medium">
              {mealsRescued} servings rescued so far
            </p>
          )}
        </div>

        <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto">
          <circle cx="140" cy="110" r="95" fill="var(--color-sand)" opacity="0.5" />
          <ellipse cx="140" cy="115" rx="42" ry="14" fill="var(--color-marigold)" opacity="0.25" />
          <ellipse cx="140" cy="110" rx="42" ry="14" fill="var(--color-marigold)" />
          <ellipse cx="140" cy="110" rx="26" ry="8" fill="var(--color-cream)" />
          <path d="M128 90 Q124 80 130 72" stroke="var(--color-ink)" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M140 90 Q136 78 142 68" stroke="var(--color-ink)" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M152 90 Q148 80 154 72" stroke="var(--color-ink)" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />
          <path
            d="M60 150 Q70 130 95 122 L118 116 Q124 114 126 119 Q128 124 122 127 L104 133"
            fill="none" stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M220 150 Q210 130 185 122 L162 116 Q156 114 154 119 Q152 124 158 127 L176 133"
            fill="none" stroke="var(--color-leaf)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </section>

      <section className="mt-20 bg-white rounded-card border border-ink/10 p-6">
        <p className="text-sm text-ink/60 mb-6">How a listing travels</p>
        <RouteThread currentStage={1} size="lg" />
      </section>
    </main>
  );
}

export default Landing;
