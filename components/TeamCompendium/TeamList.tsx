/* eslint-disable @next/next/no-img-element */
'use client'
import { Team } from '@prisma/client';
import { FC } from 'react'
import { Icons } from '../Icons';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface TeamListProps {
    teams: ({
        members: {
            name: string
        }[]
    } & Team)[] | null;
}

const TeamList: FC<TeamListProps> = ({ teams }) => {
    const getSocials = (socials: string | null) => {
        if (socials !== null) {
            const matchResult = socials.match(/@([^/]+)/);
            const url = matchResult ? matchResult[1] : null;
            return url;
        }
        return null;
    }

    const router = useRouter();

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {teams?.map((team, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => router.push(`compendium/${team.id}`)}
                    className='group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5'
                >
                    {/* Pokemon Sprites - Prominent Display */}
                    <div className='relative flex gap-0.5 justify-center items-center py-6 px-3 bg-gradient-to-b from-secondary/80 to-card'>
                        {team.members.map((pokemon, idx) => (
                            <motion.div
                                key={idx}
                                className="relative"
                                whileHover={{ scale: 1.2, y: -4, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <img
                                    className='w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-md'
                                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`}
                                    alt={pokemon.name}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://play.pokemonshowdown.com/sprites/gen5/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`
                                    }}
                                />
                            </motion.div>
                        ))}
                        
                        {/* Hover Arrow */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-primary text-primary-foreground p-2 rounded-full">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    {/* Team Info */}
                    <div className='px-4 py-4 border-t border-border'>
                        <h3 className='font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-1'>
                            {team.name}
                        </h3>
                        
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                                    <Icons.author height={14} width={14} name='author' id='author' className="text-muted-foreground" />
                                </div>
                                <span className='text-sm font-medium text-foreground'>{team.author}</span>
                            </div>

                            {team.authorSocials ? (
                                <div className='flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors'>
                                    <Icons.Youtube height={14} width={14} name='Social' id='Social' className="text-red-500" />
                                    <span className='text-xs'>{getSocials(team.authorSocials)}</span>
                                    <ExternalLink className="h-3 w-3" />
                                </div>
                            ) : (
                                <span className='text-xs text-muted-foreground'>
                                    {format(team.createdAt, 'MMM d, yyyy')}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default TeamList
