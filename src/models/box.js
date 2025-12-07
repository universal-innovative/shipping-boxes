import { hexToRgbString } from "../utils/hexToRgbString";
import { COUNTRY_RATES } from "./rates";

export function normalizeWeight(w) {
  const n = Number(w);
  if (!isFinite(n)) return 0;
  return Math.max(0, n);
}

export function computeCost(country, weight) {
  const rate = COUNTRY_RATES[country] ?? 0;
  const w = normalizeWeight(weight);
  return rate * w;
}

export function makeBox({ receiver, weight, hexColor, country }) {
  const normalizedWeight = normalizeWeight(weight);
  return {
    id: crypto.randomUUID(),
    receiver: receiver.trim(),
    weight: normalizedWeight,
    colorRgb: hexToRgbString(hexColor),
    country,
    costInInr: computeCost(country, normalizedWeight),
    createdAt: Date.now(),
  };
}
