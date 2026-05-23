/* eslint-disable @next/next/no-img-element */
'use client';
import Pagination from '@/components/Pagination';
import TeamList from '@/components/TeamCompendium/TeamList';
import { Button } from '@/components/ui/button';
import { Team } from '@prisma/client';
import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { BookOpen, Search, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
    const [searchQuery, setSearchQuery] = useState('');

    const totalPages = Math.ceil(count / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutoOfRange = page > totalPages;

    const filteredTeams = teams?.filter(team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.members.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    useEffect(() => {
        setIsRendered(true);
    }, [])

    return (IsRendered &&
        <div className='min-h-screen bg-background'>
            {/* Hero Header */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 py-12">
                    <motion.div
                        className='max-w-2xl mx-auto text-center'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
                            <BookOpen className="h-4 w-4" />
                            Community Teams
                        </div>
                        <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance'>
                            Team Compendium
                        </h1>
                        <p className='text-muted-foreground text-lg mb-8'>
                            Browse and discover community-created teams for competitive play
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search teams, authors, or Pokemon..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-secondary border-border h-12"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="border-b border-border bg-card/30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span><strong className="text-foreground">{count}</strong> teams available</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Page <strong className="text-foreground">{page}</strong> of <strong className="text-foreground">{totalPages}</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {isPageOutoOfRange ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className='text-xl font-semibold text-muted-foreground mb-4'>This page doesn&apos;t exist</p>
                        <Button
                            variant={'outline'}
                            onClick={() => window.location.href = `?page=1`}
                            className="bg-secondary border-border hover:bg-muted"
                        >
                            Go back to first page
                        </Button>
                    </motion.div>
                ) : searchQuery && filteredTeams?.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className='text-xl font-semibold text-muted-foreground mb-2'>No teams found</p>
                        <p className='text-muted-foreground'>Try a different search term</p>
                    </motion.div>
                ) : (
                    <TeamList teams={searchQuery ? (filteredTeams ?? null) : teams} />
                )}

                {/* Pagination */}
                {!isPageOutoOfRange && !searchQuery && (
                    <motion.div
                        className='flex justify-center mt-12'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Pagination
                            prevPage={prevPage}
                            nextPage={nextPage}
                            currentPage={page}
                            totalPages={totalPages}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default CompendiumClient
