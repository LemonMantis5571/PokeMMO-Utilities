import {
  Field,
  Generations,
  ITEMS,
  MOVES,
  Move,
  NATURES,
  Pokemon,
  SPECIES,
  calculate,
} from '@smogon/calc';
import pokedexData from '@/data/pokemmo.mock.data.json';
import pokemonMovesData from '@/data/pokemon_moves.json';
import { POKEMMO_SETDEX } from '@/data/pokemmo.sets';

export type StatKey = 'hp' | 'atk' | 'def' | 'spa' | 'spd' | 'spe';
export type StatusValue = '' | 'brn' | 'par' | 'psn' | 'tox' | 'slp' | 'frz';
export type WeatherValue = '' | 'Sun' | 'Rain' | 'Sand' | 'Hail' | 'Snow';
export type TerrainValue = '' | 'Electric' | 'Grassy' | 'Psychic' | 'Misty';

type LegacyMoveEntry = {
  id: number;
  level?: number;
  name: string;
  type: string;
};

type LegacySpread = Partial<Record<'hp' | 'at' | 'df' | 'sa' | 'sd' | 'sp', number>>;

type SetEntry = {
  level?: number;
  ability?: string;
  item?: string;
  nature?: string;
  evs?: LegacySpread;
  ivs?: LegacySpread;
  moves?: string[];
};

type SetDex = Record<string, Record<string, SetEntry>>;

type MovesData = Record<string, { moves: LegacyMoveEntry[] }>;

type PokedexEntry = {
  pokemon: {
    number: string;
    name: string;
    types: string[];
    abilities: string[];
    tier: string;
  };
};

export type CalculatorPokemon = {
  number: number;
  name: string;
  types: string[];
  abilities: string[];
  tier: string;
};

export type StatSpread = Record<StatKey, number>;

export type BattlePokemonState = {
  species: string;
  setName: string;
  level: number;
  ability: string;
  item: string;
  nature: string;
  status: StatusValue;
  currentHpPercent: number;
  evs: StatSpread;
  moves: string[];
};

export type BattleFieldState = {
  weather: WeatherValue;
  terrain: TerrainValue;
  attackerReflect: boolean;
  attackerLightScreen: boolean;
  defenderReflect: boolean;
  defenderLightScreen: boolean;
};

export type MoveCalculation = {
  move: string;
  description: string;
  damage: [number, number];
  percentage: [number, number];
  category: string;
  type: string;
  isBest?: boolean;
};

const generation = Generations.get(9);

const pokedex = (pokedexData.Pokedex as PokedexEntry[])
  .map((entry) => ({
    number: Number(entry.pokemon.number),
    name: entry.pokemon.name,
    types: entry.pokemon.types,
    abilities: entry.pokemon.abilities,
    tier: entry.pokemon.tier,
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

const pokemonMap = new Map(pokedex.map((pokemon) => [pokemon.name, pokemon]));

const moveNames = Object.keys(MOVES[9])
  .filter((move) => move !== '(No Move)')
  .sort((left, right) => left.localeCompare(right));

const moveNameById = new Map(moveNames.map((move) => [toId(move), move]));

const itemNames = Array.from(new Set((ITEMS[9] as string[]).filter(Boolean))).sort(
  (left, right) => left.localeCompare(right),
);

const natureNames = Object.keys(NATURES).sort((left, right) => left.localeCompare(right));

const moveData = pokemonMovesData as MovesData;
const setDex = POKEMMO_SETDEX as SetDex;

export const pokemonOptions = pokedex;
export const itemOptions = itemNames;
export const moveOptions = moveNames;
export const natureOptions = natureNames;

export const weatherOptions: { label: string; value: WeatherValue }[] = [
  { label: 'None', value: '' },
  { label: 'Sun', value: 'Sun' },
  { label: 'Rain', value: 'Rain' },
  { label: 'Sand', value: 'Sand' },
  { label: 'Hail', value: 'Hail' },
  { label: 'Snow', value: 'Snow' },
];

export const terrainOptions: { label: string; value: TerrainValue }[] = [
  { label: 'None', value: '' },
  { label: 'Electric', value: 'Electric' },
  { label: 'Grassy', value: 'Grassy' },
  { label: 'Psychic', value: 'Psychic' },
  { label: 'Misty', value: 'Misty' },
];

export const statusOptions: { label: string; value: StatusValue }[] = [
  { label: 'Healthy', value: '' },
  { label: 'Burned', value: 'brn' },
  { label: 'Paralyzed', value: 'par' },
  { label: 'Poisoned', value: 'psn' },
  { label: 'Badly Poisoned', value: 'tox' },
  { label: 'Asleep', value: 'slp' },
  { label: 'Frozen', value: 'frz' },
];

export const defaultEvs = (): StatSpread => ({
  hp: 0,
  atk: 0,
  def: 0,
  spa: 0,
  spd: 0,
  spe: 0,
});

export const defaultFieldState = (): BattleFieldState => ({
  weather: '',
  terrain: '',
  attackerReflect: false,
  attackerLightScreen: false,
  defenderReflect: false,
  defenderLightScreen: false,
});

export function createDefaultPokemonState(species: string): BattlePokemonState {
  const pokemon = getPokemon(species) ?? pokemonOptions[0];
  const setNames = getSetOptions(pokemon.name);
  const defaultSetName = setNames[0] ?? '';
  const set = defaultSetName ? getSet(pokemon.name, defaultSetName) : undefined;
  const suggestedMoves = set?.moves?.length ? normalizeMoves(set.moves) : getSuggestedMoves(pokemon.name);
  return {
    species: pokemon.name,
    setName: defaultSetName,
    level: set?.level ?? 50,
    ability: set?.ability ?? pokemon.abilities[0] ?? '',
    item: set?.item ?? '',
    nature: set?.nature ?? guessDefaultNature(pokemon.name),
    status: '',
    currentHpPercent: 100,
    evs: set?.evs ? normalizeLegacySpread(set.evs) : defaultEvs(),
    moves: suggestedMoves,
  };
}

export function getPokemon(name: string) {
  return pokemonMap.get(name);
}

export function getSuggestedMoves(species: string) {
  const key = normalizePokemonName(species);
  const entries = moveData[key]?.moves ?? [];
  const sorted = [...entries].sort((left, right) => {
    const rightLevel = right.level ?? -1;
    const leftLevel = left.level ?? -1;
    return rightLevel - leftLevel;
  });

  const uniqueMoves: string[] = [];
  const seen = new Set<string>();

  for (const entry of sorted) {
    const mapped = moveNameById.get(toId(entry.name));
    if (!mapped || seen.has(mapped)) continue;
    seen.add(mapped);
    uniqueMoves.push(mapped);
    if (uniqueMoves.length >= 12) break;
  }

  return uniqueMoves;
}

export function getSetOptions(species: string) {
  return Object.keys(setDex[species] ?? {}).sort((left, right) => left.localeCompare(right));
}

export function getSet(species: string, setName: string) {
  return setDex[species]?.[setName];
}

export function applySetToState(state: BattlePokemonState, setName: string) {
  const set = getSet(state.species, setName);
  if (!set) {
    return { ...state, setName };
  }

  return {
    ...state,
    setName,
    level: set.level ?? state.level,
    ability: set.ability ?? state.ability,
    item: set.item ?? state.item,
    nature: set.nature ?? state.nature,
    evs: set.evs ? normalizeLegacySpread(set.evs) : state.evs,
    moves: set.moves?.length ? normalizeMoves(set.moves) : state.moves,
  };
}

export function getAbilityOptions(species: string) {
  return getPokemon(species)?.abilities ?? [];
}

export function calculateMoveResults(
  attackerState: BattlePokemonState,
  defenderState: BattlePokemonState,
  fieldState: BattleFieldState,
) {
  const attacker = buildPokemon(attackerState);
  const defender = buildPokemon(defenderState);
  const maxHp = defender.maxHP();

  const attackerField = new Field({
    weather: fieldState.weather || undefined,
    terrain: fieldState.terrain || undefined,
    attackerSide: {
      isReflect: fieldState.attackerReflect,
      isLightScreen: fieldState.attackerLightScreen,
    },
    defenderSide: {
      isReflect: fieldState.defenderReflect,
      isLightScreen: fieldState.defenderLightScreen,
    },
  });

  const calculations = attackerState.moves.map((moveName) => {
    if (!moveName) {
      return {
        move: 'Empty slot',
        description: 'Pick a move to see damage.',
        damage: [0, 0] as [number, number],
        percentage: [0, 0] as [number, number],
        category: 'Status',
        type: 'None',
      };
    }

    const move = new Move(generation, moveName);
    const result = calculate(generation, attacker, defender, move, attackerField);
    const [low, high] = result.range() as [number, number];
    const percentLow = roundPercentage(low, maxHp);
    const percentHigh = roundPercentage(high, maxHp);

    return {
      move: moveName,
      description: low === 0 && high === 0 ? getZeroDamageText(attacker.name, defender.name, moveName) : result.desc(),
      damage: [low, high] as [number, number],
      percentage: [percentLow, percentHigh] as [number, number],
      category: move.category,
      type: move.type,
    };
  });

  const bestMove = calculations.reduce(
    (best, current) => (current.damage[1] > best.damage[1] ? current : best),
    calculations[0],
  );

  return calculations.map((calculation) => ({
    ...calculation,
    isBest: calculation.move === bestMove.move && bestMove.damage[1] > 0,
  }));
}

function buildPokemon(state: BattlePokemonState) {
  const pokemon = new Pokemon(generation, state.species, {
    level: state.level,
    ability: state.ability || undefined,
    item: state.item || undefined,
    nature: state.nature,
    evs: state.evs,
    ivs: {
      hp: 31,
      atk: 31,
      def: 31,
      spa: 31,
      spd: 31,
      spe: 31,
    },
    status: state.status || undefined,
  });

  const maxHp = pokemon.maxHP();
  pokemon.originalCurHP = Math.max(1, Math.round((state.currentHpPercent / 100) * maxHp));
  return pokemon;
}

function guessDefaultNature(species: string) {
  const suggested = getSuggestedMoves(species);
  const hasMoreSpecial = suggested.filter((moveName) => {
    const move = new Move(generation, moveName);
    return move.category === 'Special';
  }).length;
  return hasMoreSpecial >= 2 ? 'Timid' : 'Jolly';
}

function normalizeLegacySpread(spread: LegacySpread): StatSpread {
  return {
    hp: spread.hp ?? 0,
    atk: spread.at ?? 0,
    def: spread.df ?? 0,
    spa: spread.sa ?? 0,
    spd: spread.sd ?? 0,
    spe: spread.sp ?? 0,
  };
}

function normalizeMoves(moves: string[]) {
  return Array.from({ length: 4 }, (_, index) => moves[index] ?? '');
}

function normalizePokemonName(name: string) {
  const raw = name
    .toLowerCase()
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .trim()
    .replace(/-+$/, '');

  const overrides: Record<string, string> = {
    nidoranm: 'nidoran-m',
    nidoranf: 'nidoran-f',
    mrmime: 'mr-mime',
    mimejr: 'mime-jr',
    'wormadam-sandy': 'wormadam',
    'wormadam-trash': 'wormadam',
    'rotom-heat': 'rotom',
    'rotom-wash': 'rotom',
    'rotom-frost': 'rotom',
    'rotom-fan': 'rotom',
    'rotom-mow': 'rotom',
    'castform-sunny': 'castform',
    'castform-rainy': 'castform',
    'castform-snowy': 'castform',
    'basculin-bluestriped': 'basculin',
    'meloetta-pirouette': 'meloetta',
  };

  return overrides[raw] ?? raw;
}

function toId(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function roundPercentage(damage: number, maxHp: number) {
  if (maxHp <= 0) return 0;
  return Number(((damage / maxHp) * 100).toFixed(1));
}

function getZeroDamageText(attacker: string, defender: string, move: string) {
  return `${attacker}'s ${move} does no damage to ${defender}.`;
}

export function getTypeBadgeClass(type: string) {
  return `type-badge type-badge-${type}`;
}

export function getPokemonTypes(species: string) {
  return getPokemon(species)?.types ?? [];
}

export function getSpeciesTier(species: string) {
  return getPokemon(species)?.tier ?? 'Unknown';
}

export function getSpeciesSprite(species: string) {
  const pokemon = getPokemon(species);
  if (!pokemon) return null;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`;
}

export function getGeneration() {
  return generation;
}

export function getSpeciesData(name: string) {
  return (SPECIES[9] as Record<string, unknown>)[name];
}
