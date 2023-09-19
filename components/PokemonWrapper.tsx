'use client'
import React, { FC, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import { Pokemon } from '@/app/pvp/randomizer/page';
import { Button } from './ui/button';
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { getRandomPokemonsWithMoves } from '@/lib/pokemon.generators';
import { Divide, ShuffleIcon } from 'lucide-react';
import InfoModal from './Modals/InfoModal';
import TierSelect from './TierSelect';
import useTier from '@/hooks/useTier';


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

const ShufflePokemons = async (tier: string) => {
    const pokemons: Pokemon[] = data.Pokedex.map((data) => data.pokemon);
    const selectedItems: string[] = randomItem.Items.map((item) => item)
    const maxPokemons = 6;
    const randomPokemonWithMoves = await getRandomPokemonsWithMoves(pokemons, maxPokemons, selectedItems, tier);

    return randomPokemonWithMoves;
}


const PokemonWrapper: FC<PokemonWrapperProps> = ({ ShuffledList }) => {
    const selectedTier = useTier();
    const [ShuffledPokemons, setShuffledPokemons] = useState<PokemonWrapperProps['ShuffledList']>();


    const handleReshuffleClick = async (tier: string) => {
        const newShuffledPokemons = await ShufflePokemons(tier);
        setShuffledPokemons(newShuffledPokemons);

    };

    useEffect(() => {
        setShuffledPokemons(ShuffledList);
    }, [ShuffledList,]);


    const description = (
        <p>
            General Info & Rules:
            You can change items between pokemons
        </p>
    )


    return (
        <div className="container mt-10" style={{ "paddingRight": '2rem' }}>
            <div className='flex justify-center'>
                <Button className='m-auto flex justify-center mb-5 gap-2' variant={'default'} onClick={() => handleReshuffleClick(selectedTier.tier.value)}>
                    <ShuffleIcon />
                    Shuffle!
                </Button>
                <TierSelect onReshuffleClick={() => handleReshuffleClick(selectedTier.tier.value)} />
            </div>
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