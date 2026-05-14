'use client'
import { FC } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu, Dices, Trophy, Coins, Calendar, Target, Timer, Crosshair } from 'lucide-react'

interface DropdownNavbarProps {
    label: string
}

const DropdownNavbar: FC<DropdownNavbarProps> = ({ label }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'sm'} variant={'outline'} className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 gap-2">
                    <Menu className="w-4 h-4" />
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-zinc-800 min-w-[180px]">
                <DropdownMenuLabel className="text-zinc-500 text-xs uppercase tracking-wider">
                    PvP Utilities
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Dices className="w-4 h-4 mr-2 text-red-500" />
                    <Link href={'/pvp/randomizer'} className="w-full">ELO RIP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    <Link href={'/pvp/compendium?page=1'} className="w-full">Compendium</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Crosshair className="w-4 h-4 mr-2 text-rose-500" />
                    <Link href={'/pvp/calculator'} className="w-full">Damage Calculator</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuLabel className="text-zinc-500 text-xs uppercase tracking-wider">
                    PvE Utilities
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Coins className="w-4 h-4 mr-2 text-green-500" />
                    <Link href={'/pve/incomecheck'} className="w-full">Income Check</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    <Link href={'/pve/legendCalendar'} className="w-full">Legendary Calendar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Target className="w-4 h-4 mr-2 text-cyan-500" />
                    <Link href={'/pve/catchCalculator'} className="w-full">Catch Calculator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer focus:bg-zinc-900">
                    <Timer className="w-4 h-4 mr-2 text-orange-500" />
                    <Link href={'/pve/gymRerun'} className="w-full">Gym Rerun</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownNavbar
