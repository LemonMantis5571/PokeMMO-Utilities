/* eslint-disable @next/next/no-img-element */
'use client'
import { Team } from '@prisma/client';
import { FC } from 'react'
import { Icons } from '../Icons';
import { Label } from '../ui/label';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {teams?.map((team, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    onClick={() => router.push(`compendium/${team.id}`)}
                    className='pvp-card pvp-card-hover cursor-pointer overflow-hidden'
                >
                    {/* Team Name */}
                    <div className='px-4 py-3 border-b border-zinc-800'>
                        <h3 className='font-bold text-lg text-center text-white'>
                            {team.name}
                        </h3>
                    </div>

                    {/* Pokemon Sprites */}
                    <div className='flex gap-1 justify-center items-center py-4 px-4 bg-zinc-900/50'>
                        {team.members.map((pokemon, idx) => (
                            <motion.img
                                key={idx}
                                whileHover={{ scale: 1.15, y: -3 }}
                                className='w-12 h-10 sm:w-14 sm:h-12 object-contain'
                                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon.name.toLowerCase()}.png`}
                                alt={pokemon.name}
                            />
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className='flex items-center justify-between px-4 py-2.5 border-t border-zinc-800 bg-black'>
                        <div className='flex items-center gap-2'>
                            <Icons.author height={16} width={16} name='author' id='author' className="text-zinc-500" />
                            <Label className='text-sm font-medium text-zinc-300'>{team.author}</Label>
                        </div>

                        {team.authorSocials ? (
                            <div className='flex items-center gap-2'>
                                <Icons.Youtube height={16} width={16} name='Social' id='Social' className="text-red-500" />
                                <Label className='text-sm text-zinc-400'>{getSocials(team.authorSocials)}</Label>
                            </div>
                        ) : (
                            <div className='flex items-center gap-1.5'>
                                <Icons.date height={12} width={12} name='DATE' id='Date' className="text-zinc-600" />
                                <Label className='text-xs text-zinc-600'>{format(team.createdAt, 'yyyy-MM-dd')}</Label>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default TeamList