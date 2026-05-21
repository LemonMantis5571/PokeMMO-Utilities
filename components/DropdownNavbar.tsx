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
import { Menu, Dices, BookOpen, DollarSign, Calendar, Target, Clock, FlaskConical, BarChart3 } from 'lucide-react'

interface DropdownNavbarProps {
    label: string
}

const DropdownNavbar: FC<DropdownNavbarProps> = ({ label }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={'sm'} variant={'outline'} className="bg-secondary border-border hover:bg-muted gap-2">
                    <Menu className="w-4 h-4" />
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border min-w-[180px]">
                <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-wider">
                    PvP Utilities
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <Dices className="w-4 h-4 mr-2 text-red-500" />
                    <Link href={'/pvp/randomizer'} className="w-full">ELO RIP</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <BookOpen className="w-4 h-4 mr-2 text-amber-500" />
                    <Link href={'/pvp/compendium?page=1'} className="w-full">Compendium</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <FlaskConical className="w-4 h-4 mr-2 text-rose-500" />
                    <Link href={'/pvp/calculator'} className="w-full">Damage Calculator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <BarChart3 className="w-4 h-4 mr-2 text-amber-500" />
                    <Link href={'/pvp/stats'} className="w-full">OU Statistics</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuLabel className="text-muted-foreground text-xs uppercase tracking-wider">
                    PvE Utilities
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                    <Link href={'/pve/incomecheck'} className="w-full">Income Check</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    <Link href={'/pve/legendCalendar'} className="w-full">Legendary Calendar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <Target className="w-4 h-4 mr-2 text-cyan-500" />
                    <Link href={'/pve/catchCalculator'} className="w-full">Catch Calculator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-secondary cursor-pointer focus:bg-secondary">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    <Link href={'/pve/gymRerun'} className="w-full">Gym Rerun</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownNavbar
