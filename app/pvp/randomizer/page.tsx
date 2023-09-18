import { FC } from 'react'
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';
import PokemonCard from '@/components/PokemonCard';
import { getRandomPokemonsWithMoves } from '@/lib/pokemon.generators';

export interface MovepoolItem {
    [move: string]: string[];
}



export interface Pokemon {
    number: string;
    name: string;
    types: string[];
    abilities: string[];
    tier: string;
}



const page = async () => {
    const gens = new Generations(Dex);
    // const movepool = await gens.get(5).learnsets.learnable(pokemon);
    // const randomPokemons = getRandomPokemons(pokemons, maxPokemons);
    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const selectedItems: string[] = randomItem.Items.map((item) => item)
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons, selectedItems);
  
    return (

        <div className="container mt-10" style={{ "paddingRight": '2rem' }}>
            <div className="grid grid-cols-3 gap-4 ">
                {randomPokemonWithMoves && randomPokemonWithMoves.map((pokemon, index) => {
                    return (
                        <PokemonCard
                            name={pokemon.name}
                            key={index}
                            number={pokemon.number}
                            abilities={pokemon.abilities}
                            types={pokemon.types}
                            tier={pokemon.tier}
                            moves={pokemon.moves}
                            Item={pokemon.items}
                        />
                    );
                })}
            </div>
        </div>

    )
}

export default page