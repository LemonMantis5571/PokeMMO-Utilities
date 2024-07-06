import { getRandomPokemonsWithMoves } from "@/lib/pokemon.generators";
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { Pokemon } from "@/lib/utils";
export const ShufflePokemons = async (tier: string) => {
    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const selectedItems: string[] = randomItem.Items.map((item) => item);
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons, selectedItems, tier);
    return randomPokemonWithMoves;
}