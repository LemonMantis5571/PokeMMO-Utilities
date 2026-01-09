/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { motion } from 'framer-motion'
import Moves from './Moves'
import { getRandomAbility } from '@/lib/pokemon.generators'
import { Pokemon } from '@/lib/utils'

interface PokemonCard extends Pokemon {
    moves: [string, string[]][];
    newMoves: [string, { name: string; type: string; }][] | null;
    Item: string;
    index?: number;
}

const PokemonCard: FC<PokemonCard> = ({ name, types, abilities, number, tier, moves, Item, newMoves, index = 0 }) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const pokemonIMG = `https://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase().replace(/\./g, '')}.gif`;
    const itemIMG = Item == 'assault-vest'
        ? `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png`
        : `https://play.pokemonshowdown.com/sprites/itemicons/${Item}.png`;

    const randomAbility = getRandomAbility(abilities);

    const renderTypes = () => {
        if (!domLoaded) return null;
        return (
            <div className='flex justify-center gap-2'>
                <span className={`type-badge type-badge-${types[0]}`}>{types[0]}</span>
                {types[1] && <span className={`type-badge type-badge-${types[1]}`}>{types[1]}</span>}
            </div>
        );
    };

    const mappedMoves = newMoves?.map(([id, move]) => ({
        id: parseInt(id),
        name: move.name,
        type: move.type
    }));

    const renderMoves = () => {
        return (
            <div className='grid grid-cols-2 gap-2'>
                {moves.map(([move], index) => (
                    <Moves move={move} key={index} />
                ))}
            </div>
        );
    };

    const renderAccurateMoves = () => {
        return (
            <div className='grid grid-cols-2 gap-2'>
                {mappedMoves?.map((move) => (
                    <Moves move={move.name} key={move.id} className={move.type} />
                ))}
            </div>
        );
    }

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="h-full"
        >
            <Card className="pvp-card pvp-card-hover h-full flex flex-col">
                <CardHeader className="pb-3 border-b border-zinc-800">
                    <CardTitle className='capitalize text-xl font-bold text-white text-center'>
                        {name}
                    </CardTitle>
                    <div className='flex justify-center gap-2 mt-2'>
                        {renderTypes()}
                    </div>
                </CardHeader>
                <CardContent className='flex flex-col items-center flex-grow pt-4'>
                    <div className='w-full flex items-center justify-between mb-4'>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                className='object-contain w-[96px] h-[96px]'
                                src={pokemonIMG}
                                alt={name}
                            />
                        </motion.div>
                        <div className='flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded'>
                            <img src={itemIMG} alt={Item} height={20} width={20} />
                            <span className='capitalize text-sm text-zinc-300'>{Item}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        {newMoves ? renderAccurateMoves() : renderMoves()}
                    </div>
                </CardContent>
                <CardFooter className="pt-3 border-t border-zinc-800">
                    <div className='flex items-center justify-between w-full text-sm'>
                        <div className='flex items-center gap-2'>
                            <span className='text-zinc-500'>Ability:</span>
                            <span className='text-red-400 font-semibold'>{randomAbility}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-zinc-500'>Tier:</span>
                            <span className='px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-xs font-medium text-zinc-300'>{tier}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default PokemonCard