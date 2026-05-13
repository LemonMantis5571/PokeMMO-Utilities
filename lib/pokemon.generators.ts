import { Pokemon } from "./utils";
import moves from "../data/pokemon_moves.json"

type MovesData = {
    [key: string]: {
        moves: { id: number; level: number; name: string; type: string }[]
    }
};

export const getRandomPokemons = (pokemons: Pokemon[], count: number, tier: string) => {
    const filteredPokemons = pokemons.filter((pokemon) =>
        tier === 'ALL' ? pokemon.tier !== 'Uber' : pokemon.tier === tier);
    const shuffledPokemons = [...filteredPokemons]; // Make a copy to avoid modifying the original array
    const randomPokemons = [];

    for (let i = 0; i < shuffledPokemons.length; i++) {
        const randomIndex = Math.floor(Math.random() * shuffledPokemons.length);
        randomPokemons.push(shuffledPokemons.splice(randomIndex, 1)[0])

    }

    return randomPokemons.splice(0, count);
};

export const getRandomAbility = (Abilities: string[]) => {
    const shuffleAbilities = [...Abilities];
    const randomIndex = Math.floor(Math.random() * shuffleAbilities.length);
    return shuffleAbilities[randomIndex];
}

export const getRandomItems = (Items: string[]) => {
    const shuffleItems = [...Items];
    const randomIndex = Math.floor(Math.random() * shuffleItems.length);
    return shuffleItems[randomIndex];
}

/** Map Pokémon names from pokemmo.mock.data.json format → pokemon_moves.json key format */
const normalizePokemonName = (name: string): string => {
    // Replace dots, spaces and special chars with hyphens, lowercase
    let key = name
        .toLowerCase()
        .replace(/\s*\(.*?\)/g, '')   // strip "(Attack Forme)" etc.
        .replace(/\./g, '')            // Mr.Mime → mrmime → handled below
        .replace(/\s+/g, '-')          // spaces to hyphens
        .trim()
        .replace(/-+$/, '')            // trailing hyphens

    // Specific manual overrides
    const overrides: Record<string, string> = {
        'nidoranm':           'nidoran-m',
        'nidoranf':           'nidoran-f',
        'mrmime':             'mr-mime',
        'mimejr':             'mime-jr',
        'deoxys':             'deoxys',
        'wormadam-sandy':     'wormadam',
        'wormadam-trash':     'wormadam',
        'shaymin':            'shaymin',
        'giratina':           'giratina',
        'rotom-heat':         'rotom',
        'rotom-wash':         'rotom',
        'rotom-frost':        'rotom',
        'rotom-fan':          'rotom',
        'rotom-mow':          'rotom',
        'castform-sunny':     'castform',
        'castform-rainy':     'castform',
        'castform-snowy':     'castform',
        'basculin-bluestriped': 'basculin',
        'darmanitan':         'darmanitan',
        'meloetta-pirouette': 'meloetta',
    }

    return overrides[key] ?? key
}

export const getRandomMoves = (pokemon: string): [string, { name: string; type: string }][] | null => {
    try {
        const data: MovesData = moves as MovesData;
        const key = normalizePokemonName(pokemon);
        const pokemonMoves = data[key]?.moves;
        if (!pokemonMoves) return null;
        const mapped = pokemonMoves.map((move) => ({ name: move.name, type: move.type }));
        const shuffled = [...mapped].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4).map((m, i) => [String(i), m]);
    } catch {
        return null;
    }
};


export const getRandomPokemonsWithMoves = (pokemons: Pokemon[], count: number, Items: string[], tier: string) => {
    const randomPokemons = getRandomPokemons(pokemons, count, tier);
    return randomPokemons.map((pokemon) => {
        const moves = getRandomMoves(pokemon.name.toLowerCase());
        const randomItems = getRandomItems(Items);
        return { ...pokemon, moves: moves ?? [], items: randomItems, newMoves: moves };
    });
};