'use client'
import React, { FC, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';
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
import { ShufflePokemons } from '@/hooks/useShuffle';
import PokemonList from './PokemonList';
import InfoModal from './Modals/InfoModal';

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
        <div className="container mt-5" style={{ "paddingRight": '2rem' }}>
            <div className='flex justify-center gap-5'>
                <Button disabled={isLoading} className='m-auto flex justify-center mb-5 gap-2 rounded' variant={'default'} onClick={() => handleReshuffleClick(!selectedTier.tier.value ? 'ALL' : selectedTier.tier.value)}>
                    <ShuffleIcon />
                    Shuffle!
                </Button>
                <InfoModal />
                <TierSelect />
            </div>
            <PokemonList ShuffledPokemons={ShuffledPokemons} />
        </div>
    )
}

export default PokemonWrapper