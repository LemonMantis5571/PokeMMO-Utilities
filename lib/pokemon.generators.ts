import { MovepoolItem } from "@/app/pvp/randomizer/page";
import { Generations } from "@pkmn/data";
import { Dex } from "@pkmn/dex";
import { Pokemon } from "./utils";
import moves from "../data/pokemon_moves.json"

type MovesData = {
    [key: string]: { 
        moves: [
            {
                id: number,
                level: number,
                name: string, 
                type: string,
            }
        ]
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

export const getRandomMoves = async (pokemon: string) => {

    const gens = new Generations(Dex);
    const movepool = await gens.get(5).learnsets.learnable(pokemon);
    const moves = Object.entries(movepool as MovepoolItem)
    const filteredMoves = moves.filter(([key]) => !key.includes('doubleteam')); // DoubleTeam is useless in PokeMMO

    const shuffleMoves = [...filteredMoves].sort(() => Math.random() - 0.5);
    const randomMoves = shuffleMoves.slice(0, 4);

    return randomMoves;

}


export const newGetRandomMoves = async (pokemon: string) => {
    try {
        const randomMoves: MovesData = moves as any;
        const movesDataForPokemon = Object.entries(randomMoves[pokemon].moves.map((move) => {
            return { name: move.name, type: move.type, }
        }));
        const shuffleMoves = [...movesDataForPokemon].sort(() => Math.random() - 0.5);
        const randomMovesForPokemon = shuffleMoves.slice(0, 4);
        return randomMovesForPokemon;
        
    } catch (error) {
        console.log(error, pokemon);
        return null;
    }


}

export const getRandomPokemonsWithMoves = async (pokemons: Pokemon[], count: number, Items: string[], tier: string) => {
    const randomPokemons = getRandomPokemons(pokemons, count, tier);


    const pokemonsWithMoves = await Promise.all(
        randomPokemons.map(async (pokemon) => {
            const randomMoves = await getRandomMoves(pokemon.name);
            const newRandomMoves = await newGetRandomMoves(pokemon.name.toLowerCase());
            const randomItems = getRandomItems(Items);
            return { ...pokemon, moves: randomMoves, items: randomItems, newMoves: newRandomMoves};
        })
    );

    return pokemonsWithMoves;
};