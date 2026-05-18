/* eslint-disable @next/next/no-img-element */
'use client';
import { Calendar } from "@/components/ui/calendar"
import React from 'react'
import BirdDayComponent from "./BirdDayComponent";
import BeastDayComponent from "./BeastDayComponent";
import { getLegendaryPokemonForMonth } from '@/lib/utils';
import { Flame, Zap, Droplets, Wind } from "lucide-react";

const legendaryBeasts = ['Entei', 'Suicune', 'Raikou'];
const legendaryBirds = ['Zapdos', 'Moltres', 'Articuno'];

const pokemonInfo: Record<string, { type: string; color: string; icon: React.ElementType }> = {
    Entei: { type: "Fire", color: "text-orange-500", icon: Flame },
    Suicune: { type: "Water", color: "text-cyan-400", icon: Droplets },
    Raikou: { type: "Electric", color: "text-yellow-400", icon: Zap },
    Zapdos: { type: "Electric", color: "text-yellow-400", icon: Zap },
    Moltres: { type: "Fire", color: "text-orange-500", icon: Flame },
    Articuno: { type: "Ice", color: "text-sky-300", icon: Wind },
};

const LegendCalendar = () => {
    const [birdDate, setBirdDate] = React.useState<Date | undefined>(new Date());
    const [beastDate, setBeastDate] = React.useState<Date | undefined>(new Date());
    const birdMonth = birdDate?.getMonth();
    const beastMonth = beastDate?.getMonth();

    const { currenBeast, currentBird } = getLegendaryPokemonForMonth(
        legendaryBeasts,
        legendaryBirds,
        beastMonth,
        birdMonth
    );

    const beastInfo = pokemonInfo[currenBeast || 'Entei'];
    const birdInfo = pokemonInfo[currentBird || 'Zapdos'];
    const BeastIcon = beastInfo.icon;
    const BirdIcon = birdInfo.icon;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs text-muted-foreground mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Schedule
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
                        Legendary Calendar
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto text-pretty">
                        Track the rotating legendary Pokemon spawns. Select a month to see which legendaries are available.
                    </p>
                </header>

                {/* Current Legendaries Display */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Beast Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-orange-500/30 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Legendary Beast</span>
                                        <h2 className="text-2xl font-bold text-foreground mt-1">{currenBeast}</h2>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border ${beastInfo.color}`}>
                                        <BeastIcon className="w-3.5 h-3.5" />
                                        <span className="text-xs font-medium">{beastInfo.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center py-4">
                                    <img
                                        className="w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                                        src={`https://img.pokemondb.net/sprites/home/normal/${currenBeast?.toLowerCase()}.png`}
                                        alt={currenBeast || "Legendary Beast"}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                    <span className="text-sm text-muted-foreground">
                                        {beastDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="text-xs text-muted-foreground">Roaming Johto</span>
                                </div>
                            </div>
                        </div>

                        {/* Bird Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-sky-500/30 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Legendary Bird</span>
                                        <h2 className="text-2xl font-bold text-foreground mt-1">{currentBird}</h2>
                                    </div>
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border ${birdInfo.color}`}>
                                        <BirdIcon className="w-3.5 h-3.5" />
                                        <span className="text-xs font-medium">{birdInfo.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center py-4">
                                    <img
                                        className="w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                                        src={`https://img.pokemondb.net/sprites/home/normal/${currentBird?.toLowerCase()}.png`}
                                        alt={currentBird || "Legendary Bird"}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                                    <span className="text-sm text-muted-foreground">
                                        {birdDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="text-xs text-muted-foreground">Roaming Kanto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Schedule Section */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-xl font-semibold text-foreground">Schedule</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Beasts Calendar */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <h3 className="font-medium text-foreground">Legendary Beasts</h3>
                                <span className="text-xs text-muted-foreground ml-auto">Entei, Suicune, Raikou</span>
                            </div>
                            <div className="bg-card rounded-xl border border-border p-4">
                                <Calendar
                                    key="BeastsCalendar"
                                    fromYear={2023}
                                    fromMonth={new Date(2023, 7)}
                                    components={{ DayContent: BeastDayComponent }}
                                    mode="single"
                                    onMonthChange={(month) => setBeastDate(month)}
                                    selected={beastDate}
                                    required
                                    onSelect={setBeastDate}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Birds Calendar */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Wind className="w-4 h-4 text-sky-400" />
                                <h3 className="font-medium text-foreground">Legendary Birds</h3>
                                <span className="text-xs text-muted-foreground ml-auto">Zapdos, Moltres, Articuno</span>
                            </div>
                            <div className="bg-card rounded-xl border border-border p-4">
                                <Calendar
                                    fromYear={2023}
                                    fromMonth={new Date(2023, 7)}
                                    key="BirdsCalendar"
                                    components={{ DayContent: BirdDayComponent }}
                                    mode="single"
                                    onMonthChange={(month) => setBirdDate(month)}
                                    selected={birdDate}
                                    required
                                    onSelect={setBirdDate}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Info Section */}
                <section className="mt-16 p-6 rounded-2xl bg-secondary/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-2">How it works</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Legendary Pokemon in PokeMMO rotate on a monthly basis. The beasts (Entei, Suicune, Raikou) roam the Johto region, while the birds (Zapdos, Moltres, Articuno) roam Kanto. Use the calendars above to plan your hunts and track which legendaries are currently available.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default LegendCalendar
