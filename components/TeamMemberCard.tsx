/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { PokemonMember } from '@/lib/types/PokemonMembertypes'
import Moves from './Moves';
interface TeamMemberCardProps {
    pokemon: PokemonMember;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ pokemon }) => {

    const capitalizeFirstLetter = (str: string) => {
        const capitalized = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
        return capitalized;
    };
    return (<>
        <Card className='text-center rounded-xl shadow-sm shadow-slate-800' >
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
                        className='object-scale-down w-[120px] h-[120px]'
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
        </Card></>)
}

export default TeamMemberCard