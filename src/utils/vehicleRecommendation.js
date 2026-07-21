// Rough weight estimate: assumes ~0.3kg per serving for typical Indian meal portions.
// This is an estimate for logistics planning, not a precise nutritional figure.
const KG_PER_SERVING = 0.3;

export function estimateWeightKg(servings) {
  return Math.round(Number(servings || 0) * KG_PER_SERVING * 10) / 10;
}

export function recommendVehicle(servings) {
  const weightKg = estimateWeightKg(servings);

  if (weightKg <= 5) {
    return { vehicle: "Auto / two-wheeler", weightKg };
  }
  if (weightKg <= 20) {
    return { vehicle: "Tempo", weightKg };
  }
  return { vehicle: "Mini truck", weightKg };
}