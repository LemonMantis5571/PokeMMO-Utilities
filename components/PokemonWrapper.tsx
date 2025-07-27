'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ShuffleIcon } from 'lucide-react';
import TierSelect from './TierSelect';
import useTier from '@/hooks/useTier';
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
        newMoves: [string, { name: string; type: string; }][] | null;
    }[];

}

const PokemonWrapper: FC<PokemonWrapperProps> = ({ ShuffledList }) => {
    const [isLoading, setIsLoading] = useState(false);
    const selectedTier = useTier();
    const [IsRendered, setIsRendered] = useState(false);
    const [ShuffledPokemons, setShuffledPokemons] = useState<PokemonWrapperProps['ShuffledList']>(ShuffledList);
    // Yeah I know I can easily stop using ssr and just use the state but I'm in love with ssr and I want to keep it
    // I might replace in the future.
    // 2025 no regrets
    
    const handleReshuffleClick = async (tier: string) => {
        setIsLoading(true);
        try {
            const newShuffledPokemons = await ShufflePokemons(tier);
            if (newShuffledPokemons) {
                setShuffledPokemons(newShuffledPokemons);
            } 
        } catch (error) {
            console.error("Error shuffling Pokémon:", error);
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
        <div className="container mt-5 pb-5" style={{ "paddingRight": '2rem' }}>
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