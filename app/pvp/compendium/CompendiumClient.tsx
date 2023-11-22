/* eslint-disable @next/next/no-img-element */
'use client';
import { Icons } from '@/components/Icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Team } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react'

interface CompendiumClientProps {
    teams: ({
        members: {
            name: string
        }[]
    } & Team)[] | null;
}

const CompendiumClient: FC<CompendiumClientProps> = ({ teams }) => {
    console.log(teams);
    return (
        <div className='container mx-auto grid grid-cols-1 gap-5'>
            <div className='flex items-center py-4'>
                <Input className='max-w-sm' placeholder='Filter by Name' />
            </div>
            {teams?.map((team, index) => {
                return (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <div className='rounded 
                                mx-auto border 
                                max-w-xl max-h-fit
                              bg-zinc-900
                              border-black
                              hover:bg-zinc-950
                                opacity-90'
                                key={index}>
                                <TooltipTrigger>
                                    <div className='relative'>
                                        <div className='flex justify-center py-2'>
                                            <p className='font-bold text-zinc-200'>
                                                {team.name}
                                            </p>
                                        </div>
                                        <div className='absolute top-2 right-2'>
                                            <Link href={`/pvp/compendium/${team.id}`} target='_blank'>
                                                <Icons.externalLink height={20} width={20}>
                                                </Icons.externalLink>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 justify-center items-center mb-5'>
                                        {team.members.map((pokemon, index) => {
                                            return (
                                                <img
                                                    key={index}
                                                    className='object-contain 
                                                    sm:w-[68px] 
                                                    sm:h-[56px]'
                                                    width={40}
                                                    height={30}
                                                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon.name.toLowerCase()}.png`} alt='pokemon'></img>
                                            )
                                        })}
                                    </div>
                                    <div className='flex gap-2 p-2'>
                                        <Icons.author height={20} width={20} id='author' />
                                        <Label className='text-sm font-semibold' htmlFor='author'>LemonMantis</Label>
                                        <Icons.date height={20} width={20} id='Date' />
                                        <Label className='text-sm font-semibold' htmlFor='Date'>{format(team.createdAt, 'yyyy-MM-dd')}</Label>
                                    </div>

                                </TooltipTrigger>
                            </div>

                            <TooltipContent>
                                <p>{team.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </div>)
}

export default CompendiumClient