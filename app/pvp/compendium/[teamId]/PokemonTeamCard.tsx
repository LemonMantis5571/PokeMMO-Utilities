/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react'
import Moves from '@/components/Moves';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PokemonMember } from '@/lib/types/PokemonMembertypes';

interface PokemonTeamCardProps {
    team: {
        name: string,
        description?: string | null,
        members: PokemonMember[]
    }
}

const PokemonTeamCard: FC<PokemonTeamCardProps> = ({ team }) => {

    const capitalizeFirstLetter = (str: string) => {
        const capitalized = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);  
        return capitalized;
    };


    return (
        <div>
            <p>{team.name}</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {team.members.map((pokemon, index) => {
                    return (
                        <Card className='text-center' key={index}>
                            <CardHeader>
                                <CardTitle className='capitalize text-base'>{pokemon.name}</CardTitle>
                                <CardDescription >
                                    <div className='flex justify-center gap-1'>
                                        <div className={`${capitalizeFirstLetter(pokemon.type)} capitalize`}>
                                            {pokemon.type.toLowerCase()}
                                        </div>
                                        <div className={`${pokemon.type2 ? capitalizeFirstLetter(pokemon.type2) : ''} capitalize`}>
                                            {pokemon.type2 ? pokemon.type2.toLowerCase() : null}
                                        </div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <div className='w-full h-full flex items-center justify-start'>
                                    <img
                                        style={{ imageRendering: 'crisp-edges' }}
                                        className='object-scale-down 
                                    w-[120px] 
                                    h-[120px]'
                                        src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name.toLowerCase().replace(/\./g, '')}.gif`}
                                        alt='pokemon'>
                                    </img>
                                    <div className='text-center capitalize justify-end flex w-full gap-2'>
                                        <img src={`${pokemon.item === "Assault-Vest" ?
                                            `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png` :
                                            `https://play.pokemonshowdown.com/sprites/itemicons/${pokemon.item?.toLowerCase()}.png`} 
                                            `}
                                            alt='icon-img' height={24} width={24} ></img>
                                        <span>{pokemon.item}</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    {pokemon.moves.map((move, index) => {
                                        return (
                                            <Moves move={move.name} key={index} />
                                        )
                                    })}
                                </div>
                            </CardContent>
                            <CardFooter>
                                {pokemon.ability}
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div >

    )
}

export default PokemonTeamCard