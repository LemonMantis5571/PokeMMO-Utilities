'use client'
import React, { FC, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import { Pokemon } from '@/app/pvp/randomizer/page';
import { Button } from './ui/button';
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { getRandomPokemonsWithMoves } from '@/lib/pokemon.generators';
import { ShuffleIcon } from 'lucide-react';


interface PokemonWrapperProps {
    ShuffledList: {
        name: string;
        number: string;
        abilities: string[];
        types: string[];
        tier: string;
        items: string;
        moves: [string, string[]][];
    }[];

}

const ShufflePokemons = async () => {
    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const selectedItems: string[] = randomItem.Items.map((item) => item)
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons, selectedItems);

    return randomPokemonWithMoves;
}


const PokemonWrapper: FC<PokemonWrapperProps> = ({ ShuffledList }) => {
    const [ShuffledPokemons, setShuffledPokemons] = useState<PokemonWrapperProps['ShuffledList']>();

    useEffect(() => {
        setShuffledPokemons(ShuffledList);

    }, [ShuffledList]);

    const handleReshuffleClick = async () => {
        const newShuffledPokemons = await ShufflePokemons();
        setShuffledPokemons(newShuffledPokemons);

    };



    return (
        <div className="container mt-10" style={{ "paddingRight": '2rem' }}>
            <Button className='m-auto flex justify-center mb-5 gap-2' variant={'default'} onClick={handleReshuffleClick}>
                <ShuffleIcon/>
                Shuffle!
                </Button>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {ShuffledPokemons && ShuffledPokemons.map((pokemon, index) => {
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

export default PokemonWrapper