/* eslint-disable @next/next/no-img-element */
'use client';
import { Icons } from '@/components/Icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Team } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FC } from 'react'

interface CompendiumClientProps {
    teams: ({
        members: {
            name: string
        }[]
    } & Team)[] | null;
}

const CompendiumClient: FC<CompendiumClientProps> = ({ teams }) => {

    const router = useRouter();
    return (
        <div className='container mx-auto grid grid-cols-1 gap-5'>
            <div className='flex items-center py-4'>
                <Input className='max-w-sm' placeholder='Filter by Name' />
            </div>
            {teams?.map((team, index) => {
                return (
                    <div onClick={() => router.push(`compendium/${team.id}`)} className='rounded 
                                mx-auto border 
                                max-w-xl max-h-fit
                              bg-zinc-900
                              border-black
                              hover:bg-zinc-950
                                opacity-90
                                cursor-pointer'
                        key={index}>
                        <div className='relative'>
                            <div className='flex justify-center py-2'>
                                <p className='font-bold text-zinc-200'>
                                    {team.name}
                                </p>
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
                        <div className='flex relative w-full'>
                            <div className='flex gap-2 p-2'>
                                <Icons.author height={20} width={20} id='author' />
                                <Label className='text-sm font-semibold' htmlFor='author'>LemonMantis</Label>
                            </div>
                            <div className='flex absolute w-max top-0 right-0 gap-2 p-2'>
                                <Icons.date height={20} width={20} id='Date' />
                                <Label className='text-sm font-semibold' htmlFor='Date'>{format(team.createdAt, 'yyyy-MM-dd')}</Label>
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )

}

export default CompendiumClient