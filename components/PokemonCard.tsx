/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MovepoolItem, Pokemon } from '@/app/pvp/randomizer/page'
import Moves from './Moves'

interface PokemonCard extends Pokemon {
    moves: [string, string[]][];
}


const PokemonCard: FC<PokemonCard> = ({ name, types, abilities, number, tier, moves }) => {
    const [domLoaded, setDomLoaded] = useState(false);

    const pokemonIMG = `https://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase().replace(/\./g, '')}.gif`;

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div>
            <Card className="text-center" >
                <CardHeader>
                    <CardTitle className='capitalize text-base' >
                        {name ? name : 'Loading...'}
                    </CardTitle>
                    <CardDescription className='flex flex-col justify-center gap-2'>
                        {domLoaded && (
                            <div className='flex justify-center gap-1'>
                                <div className={types[0]}>{types[0]}</div>
                                <div className={types[1]} >{types[1] ? types[1] : null}</div>
                            </div>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col items-center'>
                    <div className='w-full h-full flex items-center justify-start'>
                        <img style={{ imageRendering: 'crisp-edges' }} className='object-scale-down w-[120px] h-[120px]' src={pokemonIMG} alt='pokemon'>
                        </img>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        {moves.map(([move, learnable], index) => (
                            <Moves move={move} key={index} />
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-center gap-2 text-base'>
                        <div className='font-bold flex gap-2'>
                            Ability:
                            <p className='orange_gradient '>{abilities[0]}
                            </p>
                        </div>
                        <div className='font-bold flex gap-2'>
                            Tier:
                            <p className='text-gray-500'>{tier}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PokemonCard