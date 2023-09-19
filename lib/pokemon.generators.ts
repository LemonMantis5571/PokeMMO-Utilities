import { MovepoolItem, Pokemon } from "@/app/pvp/randomizer/page";
import { Abilities, Generations } from "@pkmn/data";
import { Dex } from "@pkmn/dex";


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
    const shuffleMoves = [...moves].sort(() => Math.random() - 0.5);
    const randomMoves = shuffleMoves.slice(0, 4);

    return randomMoves;

}


export const getRandomPokemonsWithMoves = async (pokemons: Pokemon[], count: number, Items: string[], tier: string) => {
    const randomPokemons = getRandomPokemons(pokemons, count, tier);


    const pokemonsWithMoves = await Promise.all(
        randomPokemons.map(async (pokemon) => {
            const randomMoves = await getRandomMoves(pokemon.name);
            const randomItems = getRandomItems(Items);
            // const randomAbilities = getRandomAbility(pokemon.abilities);
            return { ...pokemon, moves: randomMoves, items: randomItems};
        })
    );

    return pokemonsWithMoves;
};