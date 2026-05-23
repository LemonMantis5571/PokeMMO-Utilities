/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { PokePaste, PokemonMember } from '@/lib/types/PokemonMembertypes';
import { convertToPokepaste } from '@/lib/pokepaste.generator';
import TeamMemberList from '@/components/TeamCompendium/TeamMemberList';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Share2, FileText, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PokemonTeamCardProps {
    team: {
        name: string,
        description?: string | null,
        tier?: string | null,
        members: PokemonMember[]
    }
}

const PokemonTeamCard: FC<PokemonTeamCardProps> = ({ team }) => {
    const { toast } = useToast();

    const copytoclipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Link copied!',
            description: 'Share this team with your friends',
            duration: 2000,
        });
    }

    const pokepastetoClipboard = (team: PokePaste) => {
        const pokepasteContent = convertToPokepaste(team);
        navigator.clipboard.writeText(pokepasteContent);
        toast({
            title: 'PokePaste copied!',
            description: 'Ready to import in Showdown',
            duration: 2000,
        });
    }

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <div className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 py-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Back Button */}
                        <Link 
                            href="/pvp/compendium?page=1" 
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm">Back to Compendium</span>
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {team.tier && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                                            <Shield className="h-3.5 w-3.5" />
                                            {team.tier}
                                        </span>
                                    )}
                                </div>
                                <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
                                    {team.name}
                                </h1>
                                {team.description && (
                                    <p className="text-muted-foreground mt-2 max-w-2xl">{team.description}</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copytoclipboard}
                                    className="gap-2"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => pokepastetoClipboard(team)}
                                    className="gap-2"
                                >
                                    <FileText className="h-4 w-4" />
                                    Export PokePaste
                                </Button>
                            </div>
                        </div>

                        {/* Team Preview Row */}
                        <div className="flex items-center gap-2 mt-6 p-3 bg-secondary/50 rounded-lg border border-border w-fit">
                            {team.members.map((pokemon, idx) => (
                                <motion.img
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    className='w-10 h-10 object-contain'
                                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`}
                                    alt={pokemon.name}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://play.pokemonshowdown.com/sprites/gen5/${pokemon.name.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Team Members Grid */}
            <div className="container mx-auto px-4 py-8">
                <motion.div 
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <TeamMemberList team={team} />
                </motion.div>

                {/* Quick Copy Section */}
                <motion.div
                    className="mt-8 p-6 bg-card border border-border rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Copy className="h-4 w-4" />
                        Quick Export
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <button
                            onClick={copytoclipboard}
                            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary border border-border rounded-lg transition-colors group"
                        >
                            <div className="text-left">
                                <p className="font-medium text-foreground">Copy Team URL</p>
                                <p className="text-sm text-muted-foreground">Share this team with friends</p>
                            </div>
                            <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                        <button
                            onClick={() => pokepastetoClipboard(team)}
                            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary border border-border rounded-lg transition-colors group"
                        >
                            <div className="text-left">
                                <p className="font-medium text-foreground">Copy PokePaste</p>
                                <p className="text-sm text-muted-foreground">Import directly into Showdown</p>
                            </div>
                            <FileText className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PokemonTeamCard
