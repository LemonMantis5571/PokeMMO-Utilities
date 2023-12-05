/* eslint-disable @next/next/no-img-element */
'use client';
import { Icons } from '@/components/Icons';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
    count: number;
    perPage: number;
    page: number;

}

const CompendiumClient: FC<CompendiumClientProps> = ({ teams, count, perPage, page }) => {

    const router = useRouter();

    const totalPages = Math.ceil(count / perPage);

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutoOfRange = page > totalPages;

    return (
        <div className='container mx-auto grid grid-cols-1 gap-5'>
            <div className='flex items-center justify-center py-2 flex-col gap-2'>
                <h1 className='font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0'>Team List</h1>
                <p className='text-sm font-semibold text-zinc-200'>Click on a team to see more details</p>
                <p className='text-center text-sm text-muted-foreground'>Want to see your team here? DM me in discord or PokeMMO</p>
            </div>
            {isPageOutoOfRange ? (<div>
                <p className='text-center text-sm font-extrabold'>This page doesn&apos;t exist</p></div>) :
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
                                    <Label className='text-sm font-semibold' htmlFor='author'>{team.author}</Label>
                                </div>
                                {team.authorSocials && <div className='flex gap-2 p-2'>
                                    <Icons.Youtube height={20} width={20} name='Social' id='Social' />
                                    <Label className='text-sm font-semibold' htmlFor='Social'>{team.authorSocials ? 'Smooge' : null}</Label>
                                </div>}
                                {!team.authorSocials && <div className='hidden sm:flex absolute w-max top-0 right-0 gap-1 p-2'>
                                    <Icons.date height={15} width={15} name='DATE' id='Date' />
                                    <Label className=' text-xs font-semibold' htmlFor='Date'>{format(team.createdAt, 'yyyy-MM-dd')}</Label>
                                </div>}
                            </div>
                        </div>

                    )
                })}
            <div className='flex justify-center mb-4'>
                {isPageOutoOfRange ? (<Button variant={'outline'} onClick={() => window.location.href = `?page=1`} >Go back</Button>) : (
                    <Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        currentPage={page}
                        totalPages={totalPages} />)}
            </div>
        </div>
    )

}

export default CompendiumClient