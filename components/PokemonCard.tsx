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
import { Pokemon } from '@/app/pvp/randomizer/page'
import Moves from './Moves'

interface PokemonCard extends Pokemon {
    moves: [string, string[]][];
    Item: string;
}




const PokemonCard: FC<PokemonCard> = ({ name, types, abilities, number, tier, moves, Item}) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const pokemonIMG = `https://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase().replace(/\./g, '')}.gif`;
    const itemIMG = Item == 'assault-vest' 
    ? `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png` 
    : `https://play.pokemonshowdown.com/sprites/itemicons/${Item}.png`; // I cannot find the assault vest sprite LFMAO

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div>
            <Card className="text-center" >
                <CardHeader>
                    <CardTitle className='capitalize text-base' >
                        {name}
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
                        <div className='text-center capitalize justify-end flex w-full gap-2'>
                            <img src={itemIMG} alt='icon-img' height={24} width={24} ></img>
                            <span>{Item}</span>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        {moves.map(([move, learnable], index) => (
                            <Moves move={move} key={index} />
                        ))}
                    </div>
                    
                </CardContent>
                <CardFooter>
                    <div className='flex items-center justify-center gap-2 text-base flex-wrap'>
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