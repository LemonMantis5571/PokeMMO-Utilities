import PokemonWrapper from "@/components/PokemonWrapper";
import { ShufflePokemons } from "@/hooks/useShuffle";

export interface MovepoolItem {
    [move: string]: string[];
}

const page = async () => {
    const randomPokemonWithMoves = await ShufflePokemons('ALL');
    const ShuffledPokemons = randomPokemonWithMoves.map((pokemon) => {
        return {
            name: pokemon.name,
            number: pokemon.number,
            abilities: pokemon.abilities,
            types: pokemon.types,
            tier: pokemon.tier,
            items: pokemon.items,
            moves: pokemon.moves,
            newMoves: pokemon.newMoves
        };
    });


    return (
        <PokemonWrapper ShuffledList={ShuffledPokemons} />
    )
}

export default page