/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import { PokemonMember } from '@/lib/types/PokemonMembertypes'
import Moves from '../Moves';
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
    pokemon: PokemonMember;
    index?: number;
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ pokemon, index = 0 }) => {

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    };

    const getEvString = (evs: typeof pokemon.evs) => {
        const evStrings: string[] = [];
        evs.forEach(ev => {
            if (ev.hp && ev.hp > 0) evStrings.push(`${ev.hp} HP`);
            if (ev.atk && ev.atk > 0) evStrings.push(`${ev.atk} Atk`);
            if (ev.def && ev.def > 0) evStrings.push(`${ev.def} Def`);
            if (ev.spaatk && ev.spaatk > 0) evStrings.push(`${ev.spaatk} SpA`);
            if (ev.spd && ev.spd > 0) evStrings.push(`${ev.spd} SpD`);
            if (ev.spe && ev.spe > 0) evStrings.push(`${ev.spe} Spe`);
        });
        return evStrings.join(' / ');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className='bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors'
        >
            {/* Header with Pokemon name and types */}
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex items-center justify-between">
                    <h3 className='capitalize text-lg font-bold text-foreground'>
                        {pokemon.name}
                    </h3>
                    <div className='flex gap-1.5'>
                        <span className={`type-badge type-badge-${capitalizeFirstLetter(pokemon.type)}`}>
                            {pokemon.type.toLowerCase()}
                        </span>
                        {pokemon.type2 && (
                            <span className={`type-badge type-badge-${capitalizeFirstLetter(pokemon.type2)}`}>
                                {pokemon.type2.toLowerCase()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Pokemon sprite and item */}
            <div className='px-4 py-4'>
                <div className='flex items-center gap-4 mb-4'>
                    <div className="relative">
                        <img
                            className='w-24 h-24 object-contain'
                            src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.gif`}
                            alt={pokemon.name}
                            onError={(e) => {
                                e.currentTarget.src = `https://play.pokemonshowdown.com/sprites/gen5/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`
                            }}
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        {/* Item */}
                        {pokemon.item && (
                            <div className='flex items-center gap-2 px-3 py-2 bg-secondary/50 border border-border rounded-lg'>
                                <img
                                    src={`${pokemon.item === "Assault-Vest" ?
                                        `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png` :
                                        `https://play.pokemonshowdown.com/sprites/itemicons/${pokemon.item?.toLowerCase()}.png`} 
                                    `}
                                    alt={pokemon.item || 'item'}
                                    className="w-5 h-5"
                                />
                                <span className='capitalize text-sm text-foreground font-medium'>{pokemon.item}</span>
                            </div>
                        )}
                        
                        {/* Ability & Nature */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="px-2 py-1.5 bg-secondary/30 rounded">
                                <span className="text-muted-foreground text-xs">Ability</span>
                                <p className="capitalize text-primary font-semibold text-xs">{pokemon.ability}</p>
                            </div>
                            <div className="px-2 py-1.5 bg-secondary/30 rounded">
                                <span className="text-muted-foreground text-xs">Nature</span>
                                <p className="capitalize text-primary font-semibold text-xs">{capitalizeFirstLetter(pokemon.nature)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EVs */}
                {pokemon.evs.length > 0 && (
                    <div className="mb-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <span className="text-xs text-emerald-500 font-medium">EVs: </span>
                        <span className="text-xs text-emerald-400">{getEvString(pokemon.evs)}</span>
                    </div>
                )}

                {/* Moves Grid */}
                <div className='grid grid-cols-2 gap-2'>
                    {pokemon.moves.map((move, idx) => (
                        <Moves
                            move={move.name}
                            className={move.type}
                            key={idx}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default TeamMemberCard
