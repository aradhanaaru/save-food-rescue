 const STAGES = ["Listed", "Claimed", "Picked up"];

function RouteThread({ currentStage = 0, size = "sm" }) {
  const dotSize = size === "lg" ? "w-3 h-3" : "w-2 h-2";
  const labelSize = size === "lg" ? "text-sm" : "text-[11px]";

  return (
    <div className="flex items-center w-full" aria-label={`Status: ${STAGES[currentStage]}`}>
      {STAGES.map((stage, i) => {
        const isDone = i <= currentStage;
        const isActive = i === currentStage;
        return (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <span
                    className={`absolute inline-flex ${dotSize} rounded-full bg-leaf opacity-75 animate-ping`}
                  />
                )}
                <div
                  className={`relative ${dotSize} rounded-full transition-colors duration-500 ${
                    isDone ? "bg-leaf" : "bg-sand border border-ink/20"
                  }`}
                />
              </div>
              <span
                className={`${labelSize} whitespace-nowrap transition-colors duration-500 ${
                  isDone ? "text-leaf-dark font-medium" : "text-ink/40"
                }`}
              >
                {stage}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className="flex-1 h-px mx-1 mb-4 relative bg-ink/20">
                <div
                  className="absolute inset-y-0 left-0 border-t-2 border-dotted border-leaf transition-all duration-700 ease-out"
                  style={{ width: i < currentStage ? "100%" : "0%" }}
                />
                <div className="absolute inset-0 border-t-2 border-dotted border-ink/20" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default RouteThread;