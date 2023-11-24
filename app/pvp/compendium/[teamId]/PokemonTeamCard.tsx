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
                                <CardTitle className='capitalize text-base w-full'>{pokemon.name}</CardTitle>
                                <CardDescription >
                                    <div className='flex flex-col text-center gap-2 items-center'>
                                        <div className='flex justify-center gap-1'>
                                            <div className={`${capitalizeFirstLetter(pokemon.type)} capitalize`}>
                                                {pokemon.type.toLowerCase()}
                                            </div>
                                            <div className={`${pokemon.type2 ? capitalizeFirstLetter(pokemon.type2) : ''} capitalize`}>
                                                {pokemon.type2 ? pokemon.type2.toLowerCase() : null}
                                            </div>
                                        </div>
                                        <div className='flex w-full'>
                                            {pokemon.evs.map((ev, index) => {
                                                return (
                                                    <ul key={index} className='flex space-x-2 text-start w-full text-green-500'>
                                                        <li>{ev.hp ? `Hp: ${ev.hp}` : null}</li>
                                                        <li>{ev.atk ? `Atk: ${ev.atk}` : null}</li>
                                                        <li>{ev.def ? `Def: ${ev.def}` : null}</li>
                                                        <li>{ev.spaatk ? `SpA: ${ev.spaatk}` : null}</li>
                                                        <li>{ev.spd ? `SpD: ${ev.spd}` : null}</li>
                                                        <li>{ev.spe ? `Spe: ${ev.spe}` : null}</li>
                                                    </ul>

                                                )
                                            })}
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
                                            <Moves move={move.name} className={`${capitalizeFirstLetter(move.type)}`} key={index} />
                                        )
                                    })}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Ability: </span>
                                    <span className='capitalize orange_gradient font-bold'>{pokemon.ability}</span>
                                    <span className='text-sm '>Nature: </span>
                                    <span className='capitalize orange_gradient font-bold'>{capitalizeFirstLetter(pokemon.nature)}</span>

                                </div>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div >

    )
}

export default PokemonTeamCard