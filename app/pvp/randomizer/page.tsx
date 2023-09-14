import { FC } from 'react'
import data from "@/data/pokemmo.mock.data.json"
import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';
import PokemonCard from '@/components/PokemonCard';
import dynamic from 'next/dynamic';

export interface MovepoolItem {
    [move: string]: string[];
}

const DynamicCard = dynamic(() => import('@/components/PokemonCard'), {
    loading: () => <p>Loading...</p>
})


const getRandomPokemons = (pokemons: Pokemon[], count: number) => {
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.tier !== 'Uber');
    const shuffledPokemons = [...filteredPokemons]; // Make a copy to avoid modifying the original array
    const randomPokemons = [];

    for (let i = 0; i < shuffledPokemons.length; i++) {
        const randomIndex = Math.floor(Math.random() * shuffledPokemons.length);
        randomPokemons.push(shuffledPokemons.splice(randomIndex, 1)[0])

    }

    return randomPokemons;
};

const getRandomMoves = async (pokemon: string) => {

    const gens = new Generations(Dex);
    const movepool = await gens.get(5).learnsets.learnable(pokemon);

    const moves = Object.entries(movepool as MovepoolItem)
    const shuffleMoves = [...moves].sort(() => Math.random() - 0.5);
    const randomMoves = shuffleMoves.slice(0, 4);

    return randomMoves;

}


const getRandomPokemonsWithMoves = async (pokemons: Pokemon[], count: number) => {
    const randomPokemons = getRandomPokemons(pokemons, count);

    const pokemonsWithMoves = await Promise.all(
        randomPokemons.map(async (pokemon) => {
            const randomMoves = await getRandomMoves(pokemon.name);
            return { ...pokemon, moves: randomMoves };
        })
    );

    return pokemonsWithMoves;
};

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

    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons);
    const randomPokemons = getRandomPokemons(pokemons, maxPokemons);

    return (

        <div className="container py-24" style={{ "paddingRight": '2rem' }}>
            <div className="grid grid-cols-3 gap-4 ">
                {randomPokemonWithMoves && randomPokemonWithMoves.slice(0, 6).map(async (pokemon, index) => {
                    return (
                        <DynamicCard
                            name={pokemon.name}
                            key={index}
                            number={pokemon.number}
                            abilities={pokemon.abilities}
                            types={pokemon.types}
                            tier={pokemon.tier}
                            moves={pokemon.moves}
                        />
                    );
                })}
            </div>
        </div>

    )
}

export default page