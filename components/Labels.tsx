'use client'
import React, { FC } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ListItem from './ListItem'
import { Calendar, DollarSign, FlaskConical, Dices, BookOpen, Target, Clock } from 'lucide-react'

interface LabelsProps { }

const Labels: FC<LabelsProps> = ({ }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className='text-sm bg-transparent hover:bg-secondary data-[state=open]:bg-secondary'>
                        PvP Utilities
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-fit md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-card border border-border rounded-lg">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-secondary border border-border p-6 no-underline outline-none hover:border-red-500/50 transition-colors"
                                        href="/pvp/randomizer"
                                    >
                                        <Dices className='self-center text-red-500' height={50} width={50} />
                                        <div className="mb-2 mt-4 text-lg font-bold text-red-500">
                                            ELO RIP
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Generate completely random teams for every pvp format!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/pvp/compendium?page=1" title="Team Compendium" customIcon={BookOpen}>
                                List of pre-built pokemmo teams for every pvp format!
                            </ListItem>
                            <ListItem href="/pvp/calculator" title="Damage Calculator" customIcon={FlaskConical}>
                                Fast head to head damage checks with a trimmed down PokeMMO battle builder.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className='text-sm bg-transparent hover:bg-secondary data-[state=open]:bg-secondary'>
                        PvE Utilities
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-fit md:w-[400px] md:grid-cols-2 lg:w-[500px] bg-card border border-border rounded-lg">
                            <li className="row-span-3 flex items-center justify-center">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-secondary border border-border p-6 no-underline outline-none hover:border-emerald-500/50 transition-colors"
                                        href="/pve/incomecheck"
                                    >
                                        <DollarSign className='self-center text-emerald-500' height={50} width={50} />
                                        <div className="mb-2 mt-4 text-lg font-bold text-emerald-500">
                                            Income Check
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Calculate your entire income based on gyms/trainers defeated!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/pve/legendCalendar" title="Legendary Calendar" customIcon={Calendar}>
                                Check the next legendary pokemons to appear in the game!
                            </ListItem>
                            <ListItem href="/pve/catchCalculator" title="Catch Calculator" customIcon={Target}>
                                Calculate your Pokémon catch probability using the capture formula!
                            </ListItem>
                            <ListItem href="/pve/gymRerun" title="Gym Rerun" customIcon={Clock}>
                                Track your gym rerun times with a stopwatch per trainer!
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Labels
