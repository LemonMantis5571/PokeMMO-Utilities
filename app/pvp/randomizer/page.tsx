import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import PokemonCard from '@/components/PokemonCard';
import { getRandomPokemonsWithMoves } from '@/lib/pokemon.generators';
import PokemonWrapper from "@/components/PokemonWrapper";


export interface MovepoolItem {
    [move: string]: string[];
}



export interface Pokemon {
    number: string; // yeah I should modify the json to be number instead of string. Either that or Cast to int lol
    name: string;
    types: string[];
    abilities: string[];
    tier: string;
}

const ShufflePokemons = async () => {
    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const selectedItems: string[] = randomItem.Items.map((item) => item)
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons, selectedItems);

    return randomPokemonWithMoves;
}

const page = async () => {
    const randomPokemonWithMoves = await ShufflePokemons();
    const ShuffledPokemons = randomPokemonWithMoves.map((pokemon) => {
        return {
            name: pokemon.name,
            number: pokemon.number,
            abilities: pokemon.abilities,
            types: pokemon.types,
            tier: pokemon.tier,
            items: pokemon.items,
            moves: pokemon.moves
        };
    });


    return (
        <PokemonWrapper ShuffledList={ShuffledPokemons} />
    )
}

export default page