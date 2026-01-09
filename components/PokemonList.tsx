'use client'
import { FC } from 'react'
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';
import { motion } from 'framer-motion';

interface PokemonListProps {
    ShuffledPokemons: {
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

const PokemonList: FC<PokemonListProps> = ({ ShuffledPokemons }) => {
    return (
        <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
        >
            {ShuffledPokemons ? ShuffledPokemons.map((pokemon, index) => {
                return (
                    <PokemonCard
                        name={pokemon.name}
                        key={`${pokemon.name}-${index}`}
                        number={pokemon.number}
                        abilities={pokemon.abilities}
                        types={pokemon.types}
                        tier={pokemon.tier}
                        moves={pokemon.moves}
                        Item={pokemon.items}
                        newMoves={pokemon.newMoves}
                        index={index}
                    />
                );
            }) : [...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </motion.div>
    )
}

export default PokemonList