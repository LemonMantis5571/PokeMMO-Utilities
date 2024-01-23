/* eslint-disable @next/next/no-img-element */
import { Team } from '@prisma/client';
import { FC } from 'react'
import { Icons } from './Icons';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface TeamListProps {
    teams: ({
        members: {
            name: string
        }[]
    } & Team)[] | null;
}

const TeamList: FC<TeamListProps> = ({ teams }) => {
    const router = useRouter();
    return (
        teams?.map((team, index) => {
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
                            <Icons.author height={20} width={20} name='author' id='author' />
                            <Label className='text-sm font-semibold'>{team.author}</Label>
                        </div>
                        {team.authorSocials && <div className='flex gap-2 p-2'>
                            <Icons.Youtube height={20} width={20} name='Social' id='Social' />
                            <Label className='text-sm font-semibold'>{team.authorSocials ? 'Smooge' : null}</Label>
                        </div>}
                        {!team.authorSocials && <div className='hidden sm:flex absolute w-max top-0 right-0 gap-1 p-2'>
                            <Icons.date height={15} width={15} name='DATE' id='Date' />
                            <Label className=' text-xs font-semibold'>{format(team.createdAt, 'yyyy-MM-dd')}</Label>
                        </div>}
                    </div>
                </div>

            )
        })
    )
}

export default TeamList