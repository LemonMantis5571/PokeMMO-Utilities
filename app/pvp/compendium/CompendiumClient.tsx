/* eslint-disable @next/next/no-img-element */
'use client';
import Pagination from '@/components/Pagination';
import TeamList from '@/components/TeamCompendium/TeamList';
import { Button } from '@/components/ui/button';
import { Team } from '@prisma/client';
import { FC, useState, useEffect } from 'react'

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
    const [IsRendered, setIsRendered] = useState(false);


    const totalPages = Math.ceil(count / perPage);

    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutoOfRange = page > totalPages;

    useEffect(() => {
        setIsRendered(true);
    }, [])

    return (IsRendered &&
        <div className='container mx-auto grid grid-cols-1 gap-4'>
            <div className='flex items-center justify-center py-2 flex-col gap-2'>
                <h1 className='font-heading mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0'>Team List</h1>
                <p className='text-sm font-semibold text-zinc-200'>Click on a team to see more details</p>
                <p className='text-center text-sm text-muted-foreground'>Want to see your team here? DM me in discord or PokeMMO</p>
            </div>
            {isPageOutoOfRange ? (<div>
                <p className='text-center text-sm font-extrabold'>This page doesn&apos;t exist</p></div>) :
                <TeamList teams={teams} />}
            <div className='flex justify-center mb-2'>
                {isPageOutoOfRange ? (<Button variant={'outline'} onClick={() => window.location.href = `?page=1`} >Go back</Button>) : (
                    <Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        currentPage={page}
                        totalPages={totalPages} />)
                }
            </div>
        </div>
    )

}

export default CompendiumClient