/* eslint-disable @next/next/no-img-element */
'use client';
import Pagination from '@/components/Pagination';
import TeamList from '@/components/TeamCompendium/TeamList';
import { Button } from '@/components/ui/button';
import { Team } from '@prisma/client';
import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion';

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
        <div className='container mx-auto px-4 py-8'>
            {/* Header */}
            <motion.div
                className='text-center mb-8'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="section-subtitle mb-2">Browse Community Teams</p>
                <h1 className='section-title text-red-500 mb-2'>Team Compendium</h1>
                <p className='text-zinc-500'>Click on a team to see more details</p>
            </motion.div>

            {/* Team Grid */}
            {isPageOutoOfRange ? (
                <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className='text-xl font-semibold text-zinc-400 mb-4'>This page doesn&apos;t exist</p>
                    <Button
                        variant={'outline'}
                        onClick={() => window.location.href = `?page=1`}
                        className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                    >
                        Go back to first page
                    </Button>
                </motion.div>
            ) : (
                <TeamList teams={teams} />
            )}

            {/* Pagination */}
            <motion.div
                className='flex justify-center mt-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {!isPageOutoOfRange && (
                    <Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        currentPage={page}
                        totalPages={totalPages}
                    />
                )}
            </motion.div>
        </div>
    )
}

export default CompendiumClient