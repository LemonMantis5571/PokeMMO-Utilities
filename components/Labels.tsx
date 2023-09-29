'use client'
import React, { FC } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from './ListItem'
import { CoinsIcon, SkullIcon, SunIcon, TimerIcon } from 'lucide-react'
interface LabelsProps {

}

const Labels: FC<LabelsProps> = ({ }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className='text-sm'>PvP Utilities</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 w-fit md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/pvp/randomizer"
                                    >
                                        <SkullIcon className='self-center' height={50} width={50} />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            ELO R.I.P
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Generate completely random teams for every pvp format!
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/" title="Weather Control" customIcon={SunIcon}>
                                Control rain, sun, sandstorm and trick room in your pvp battle!
                            </ListItem>

                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className='text-sm'>PvE Utilities</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-fit md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                            <li className="row-span-3 flex items-center justify-center">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <TimerIcon className='self-center' height={50} width={50} />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Gym Time Splitter
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            {`Record your entire run and timestamp your gym's fights`}
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/" title="Income Check" customIcon={CoinsIcon}>
                                Calculate your entire income based on gyms/trainers defeated!
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>)
}


export default Labels