'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ShuffleIcon } from 'lucide-react';
import TierSelect from './TierSelect';
import useTier from '@/hooks/useTier';
import { ShufflePokemons } from '@/hooks/useShuffle';
import PokemonList from './PokemonList';
import InfoModal from './Modals/InfoModal';
import { motion } from 'framer-motion';

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
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="section-subtitle mb-2">Pokemon Randomizer</p>
                <h1 className="section-title text-red-500 mb-2">ELO RIP</h1>
                <p className="text-zinc-500 max-w-md mx-auto">
                    Generate random teams and challenge yourself with unexpected builds
                </p>
            </motion.div>

            {/* Controls */}
            <motion.div
                className='flex flex-wrap justify-center items-center gap-4 mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg max-w-xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Button
                    disabled={isLoading}
                    className='flex items-center gap-2'
                    onClick={() => handleReshuffleClick(!selectedTier.tier.value ? 'ALL' : selectedTier.tier.value)}
                >
                    <motion.div
                        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0, ease: "linear" }}
                    >
                        <ShuffleIcon className="w-5 h-5" />
                    </motion.div>
                    {isLoading ? 'Shuffling...' : 'Shuffle'}
                </Button>
                <InfoModal />
                <TierSelect />
            </motion.div>

            {/* Pokemon Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <PokemonList ShuffledPokemons={ShuffledPokemons} />
            </motion.div>
        </div>
    )
}

export default PokemonWrapper