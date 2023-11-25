/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react'
import Moves from '@/components/Moves';
import { useToast } from "@/components/ui/use-toast"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PokePaste, PokemonMember } from '@/lib/types/PokemonMembertypes';
import { Icons } from '@/components/Icons';
import { convertToPokepaste } from '@/lib/pokepaste.generator';

interface PokemonTeamCardProps {
    team: {
        name: string,
        description?: string | null,
        tier?: string | null,
        members: PokemonMember[]
    }
}

const PokemonTeamCard: FC<PokemonTeamCardProps> = ({ team }) => {
    const { toast } = useToast();
    const capitalizeFirstLetter = (str: string) => {
        const capitalized = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
        return capitalized;
    };

    const copytoclipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Copied to clipboard',
            description: 'You can share this link with your friends',
            duration: 2000,
        });
    }

    const pokepastetoClipboard = (team: PokePaste) => {
        const pokepasteContent = convertToPokepaste(team);
        navigator.clipboard.writeText(pokepasteContent);
        toast({
            title: 'PokePaste copied to clipboard',
            description: 'You can input this paste in showdown',
            duration: 2000,
        });
    }


    return (
        <div className='flex flex-col sm:flex-col xl:flex-row items-center sm:gap-5 md:gap-8 p-4 '>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                {team.members.map((pokemon, index) => {
                    return (
                        <Card className='text-center rounded-xl shadow-sm shadow-slate-800' key={index}>
                            <CardHeader>
                                <CardTitle className='capitalize text-base w-full'>{pokemon.name}</CardTitle>
                                <CardDescription >
                                    <div className='flex flex-col text-center gap-2 items-center flex-wrap'>
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
                                                    <ul key={index} className='flex space-x-2 text-start w-full text-green-300'>
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
                                <div className='w-full h-full flex items-center justify-start sm:flex-wrap md:flex-nowrap'>
                                    <img
                                        style={{ imageRendering: 'pixelated' }}
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
                            <CardFooter className="flex flex-wrap justify-center sm:justify-start gap-2">
                                <span className='text-sm '>Ability: </span>
                                <span className='capitalize orange_gradient font-bold'>{pokemon.ability}</span>
                                <span className='text-sm '>Nature: </span>
                                <span className='capitalize orange_gradient font-bold'>{capitalizeFirstLetter(pokemon.nature)}</span>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
            <div className='w-[300px] 
            sm:w-[300px] 
            md:w-[350px] 
            lg:w-[400px] 
            h-[250px] 
            sm:h-[400px] 
            md:h-[400px] 
            flex 
            flex-col 
            justify-start
            items-center 
            py-8
            px-4
            mt-3 
            rounded-xl
            gap-4'>
                <h1 className='font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0'>{team.name}</h1>
                <div className='relative flex justify-start items-center px-6 bg-[rgb(24,24,27)] rounded-xl h-full sm:h-14 w-full sm:w-80' >
                    <p className='text-center text-sm text-muted-foreground'>Copy team url to clipboard</p>
                    <div className='absolute top-1 right-2 cursor-pointer'>
                        <Icons.copytoclipboard height={15} width={15} onClick={copytoclipboard} />
                    </div>
                </div>
                <div className='relative flex justify-start items-center px-6 bg-[rgb(24,24,27)] rounded-xl h-full sm:h-14 w-full sm:w-80' >
                    <p className='text-center text-sm text-muted-foreground'>Copy team in pokepaste format</p>
                    <div className='absolute top-1 right-2 cursor-pointer'>
                        <Icons.copytoclipboard height={15} width={15} onClick={() => pokepastetoClipboard(team)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonTeamCard