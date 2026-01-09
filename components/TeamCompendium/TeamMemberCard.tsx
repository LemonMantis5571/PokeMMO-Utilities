/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { PokemonMember } from '@/lib/types/PokemonMembertypes'
import Moves from '../Moves';

interface TeamMemberCardProps {
    pokemon: PokemonMember;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ pokemon }) => {

    const capitalizeFirstLetter = (str: string) => {
        const capitalized = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
        return capitalized;
    };

    return (
        <Card className='pvp-card overflow-hidden'>
            <CardHeader className="pb-2 border-b border-zinc-800">
                <CardTitle className='capitalize text-lg font-bold text-center text-white'>
                    {pokemon.name}
                </CardTitle>
                <div className='flex flex-col text-center gap-2 items-center mt-2'>
                    <div className='flex justify-center gap-2'>
                        <span className={`type-badge type-badge-${capitalizeFirstLetter(pokemon.type)}`}>
                            {pokemon.type.toLowerCase()}
                        </span>
                        {pokemon.type2 && (
                            <span className={`type-badge type-badge-${capitalizeFirstLetter(pokemon.type2)}`}>
                                {pokemon.type2.toLowerCase()}
                            </span>
                        )}
                    </div>
                    <div className='flex w-full flex-wrap justify-center gap-x-3 gap-y-1 text-xs'>
                        {pokemon.evs.map((ev, index) => (
                            <ul key={index} className='flex flex-wrap gap-x-2 text-green-500'>
                                {ev.hp != null && ev.hp > 0 && <li>Hp: {ev.hp}</li>}
                                {ev.atk != null && ev.atk > 0 && <li>Atk: {ev.atk}</li>}
                                {ev.def != null && ev.def > 0 && <li>Def: {ev.def}</li>}
                                {ev.spaatk != null && ev.spaatk > 0 && <li>SpA: {ev.spaatk}</li>}
                                {ev.spd != null && ev.spd > 0 && <li>SpD: {ev.spd}</li>}
                                {ev.spe != null && ev.spe > 0 && <li>Spe: {ev.spe}</li>}
                            </ul>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-4 pt-4'>
                <div className='w-full flex items-center justify-between'>
                    <img
                        className='object-contain w-[96px] h-[96px]'
                        src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name.toLowerCase().replace(/\./g, '')}.gif`}
                        alt={pokemon.name}
                    />
                    <div className='flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded'>
                        <img
                            src={`${pokemon.item === "Assault-Vest" ?
                                `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png` :
                                `https://play.pokemonshowdown.com/sprites/itemicons/${pokemon.item?.toLowerCase()}.png`} 
                            `}
                            alt={pokemon.item || 'item'}
                            height={20}
                            width={20}
                        />
                        <span className='capitalize text-sm text-zinc-300'>{pokemon.item}</span>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    {pokemon.moves.map((move, index) => (
                        <Moves
                            move={move.name}
                            className={move.type}
                            key={index}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                    <span className='text-sm text-zinc-500'>Ability:</span>
                    <span className='capitalize text-red-400 font-semibold'>{pokemon.ability}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className='text-sm text-zinc-500'>Nature:</span>
                    <span className='capitalize text-red-400 font-semibold'>{capitalizeFirstLetter(pokemon.nature)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default TeamMemberCard