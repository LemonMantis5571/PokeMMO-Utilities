// PokeMMO Catch Rate Calculator
// Based on Gen 3/4 capture formula used by pokemmo-hub

export interface PokeBallInfo {
  name: string;
  rate: number;
  description: string;
}

export interface StatusInfo {
  name: string;
  rate: number;
}

export const POKEBALLS: PokeBallInfo[] = [
  { name: "Poké Ball", rate: 1, description: "1x catch rate" },
  { name: "Great Ball", rate: 1.5, description: "1.5x catch rate" },
  { name: "Ultra Ball", rate: 2, description: "2x catch rate" },
  { name: "Master Ball", rate: 255, description: "Guaranteed catch" },
  { name: "Net Ball", rate: 3.5, description: "3.5x for Water/Bug types" },
  { name: "Nest Ball", rate: 3.5, description: "Higher rate for low-level Pokémon" },
  { name: "Repeat Ball", rate: 3.5, description: "3.5x for already caught species" },
  { name: "Timer Ball", rate: 4, description: "Up to 4x as turns increase" },
  { name: "Dusk Ball", rate: 3.5, description: "3.5x at night or in caves" },
  { name: "Quick Ball", rate: 5, description: "5x on first turn" },
  { name: "Luxury Ball", rate: 1, description: "1x catch rate, boosts friendship" },
  { name: "Premier Ball", rate: 1, description: "1x catch rate, cosmetic" },
  { name: "Dive Ball", rate: 3.5, description: "3.5x while surfing/fishing" },
];

export const STATUSES: StatusInfo[] = [
  { name: "None", rate: 1 },
  { name: "Sleep", rate: 2 },
  { name: "Freeze", rate: 2 },
  { name: "Paralysis", rate: 1.5 },
  { name: "Poison", rate: 1.5 },
  { name: "Burn", rate: 1.5 },
];

export interface CatchResult {
  probability: number;       // 0-100 percentage
  shakeChecks: number;       // how many shakes on average
  rawX: number;              // the raw x value before probability conversion
  formulaText: string;       // readable formula
}

/**
 * Calculate catch rate probability using the Gen 3/4 formula.
 * 
 * x = (((max_hp * 3 - current_hp * 2) * base_rate * ball_rate) / (max_hp * 3)) * status_rate
 * 
 * if x >= 255: 100% catch
 * else: y = 65536 / sqrt(sqrt(255 / x))
 *        probability = ((y / 65536) ^ 4) * 100%
 */
export function calculateCatchRate(
  baseRate: number,
  maxHp: number,
  currentHp: number,
  ballRate: number,
  statusRate: number
): CatchResult {
  // Ensure valid inputs
  if (maxHp <= 0) maxHp = 1;
  if (currentHp <= 0) currentHp = 1;
  if (currentHp > maxHp) currentHp = maxHp;

  // Master Ball = guaranteed
  if (ballRate >= 255) {
    return {
      probability: 100,
      shakeChecks: 4,
      rawX: 255,
      formulaText: "Master Ball: Guaranteed catch!",
    };
  }

  // Calculate x
  const x = (((maxHp * 3 - currentHp * 2) * baseRate * ballRate) / (maxHp * 3)) * statusRate;

  if (x >= 255) {
    return {
      probability: 100,
      shakeChecks: 4,
      rawX: x,
      formulaText: `x = (((${maxHp}×3 - ${currentHp}×2) × ${baseRate} × ${ballRate}) / (${maxHp}×3)) × ${statusRate} = ${x.toFixed(2)} ≥ 255 → 100%`,
    };
  }

  // Calculate y and final probability
  const y = 65536 / Math.sqrt(Math.sqrt(255 / x));
  const probability = Math.pow(y / 65536, 4) * 100;

  // Clamp between 0 and 100
  const clampedProbability = Math.min(100, Math.max(0, probability));

  // Calculate average shake checks (each shake has y/65536 chance)
  const shakeChance = y / 65536;
  const avgShakes = Math.min(4, Math.floor(shakeChance * 4));

  return {
    probability: clampedProbability,
    shakeChecks: avgShakes,
    rawX: x,
    formulaText: `x = (((${maxHp}×3 - ${currentHp}×2) × ${baseRate} × ${ballRate}) / (${maxHp}×3)) × ${statusRate} = ${x.toFixed(2)}`,
  };
}
