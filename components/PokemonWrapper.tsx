'use client'
import React, { FC, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
import { Pokemon } from '@/app/pvp/randomizer/page';
import { Button } from './ui/button';
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { getRandomPokemonsWithMoves } from '@/lib/pokemon.generators';
import { ShuffleIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import TierSelect from './TierSelect';
import useTier from '@/hooks/useTier';
import SkeletonCard from './SkeletonCard';


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
    const [isLoading, setIsLoading] = useState(false);
    const selectedTier = useTier();
    const [IsRendered, setIsRendered] = useState(false);
    const [ShuffledPokemons, setShuffledPokemons] = useState<PokemonWrapperProps['ShuffledList']>(ShuffledList);
    // Yeah I know I can easily stop using ssr and just use the state but I'm in love with ssr and I want to keep it
    // I might replace in the future.

    const handleReshuffleClick = async (tier: string) => {
        setIsLoading(true);
        try {
            const newShuffledPokemons = await ShufflePokemons(tier);
            setShuffledPokemons(newShuffledPokemons);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsRendered(true);
    }, []);


    useEffect(() => {
        if (IsRendered && selectedTier.tier.value) {
            const ShuffleOnchange = async () => {
                try {
                    await handleReshuffleClick(selectedTier.tier.value);
                } catch (error) {
                    console.log(error);
                }
            }

            ShuffleOnchange();
        }
    }, [selectedTier.tier.value, IsRendered]);



    return (IsRendered &&
        <div className="container mt-10" style={{ "paddingRight": '2rem' }}>
            <div className='flex justify-center gap-5'>
                <Button disabled={isLoading} className='m-auto flex justify-center mb-5 gap-2 rounded' variant={'default'} onClick={() => handleReshuffleClick(!selectedTier.tier.value ? 'ALL' : selectedTier.tier.value)}>
                    <ShuffleIcon />
                    Shuffle!
                </Button>
                <Dialog >
                    <DialogTrigger asChild className='flex flex-wrap m-auto mb-5'>
                        <Button className='rounded'>INFO</Button>
                    </DialogTrigger>
                    <DialogContent className='flex flex-wrap' >
                        <DialogHeader>
                            <DialogTitle>General Info</DialogTitle>
                            <DialogDescription>
                                <ul className='gap-2 flex flex-col flex-wrap p-4'>
                                    <li>
                                        <p>
                                            Evs & Nature are up to the player due to being really costly and not beginner friendly.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            The database such as pokemon, abilities and tiers are up to November 7th, if any mistake please make an issue
                                            or a PR will be super apreciated, I had mocked the data from pokemmo shout wiki big thanks to them.
                                        </p>
                                    </li>
                                </ul>
                            </DialogDescription>
                            <DialogTitle>Rules</DialogTitle>
                            <DialogDescription>
                                <ul className='gap-2 flex flex-col p-4'>
                                    <li>
                                        <p>
                                            Moves that are not available for x or y reason can be changed.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            If there are 2 pokemon of the same species, you can reroll or change that pokemon for a new one.
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Items are interchangeable between pokemon
                                            eg: Garchomp w/ whiteherb can change its item to pikachu with choice band.
                                        </p>
                                    </li>
                                </ul>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <p>Made by LemonMantis5571</p>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <TierSelect />
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {ShuffledPokemons ? ShuffledPokemons.map((pokemon, index) => {
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
                }) : [...Array(6)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    )
}

export default PokemonWrapper