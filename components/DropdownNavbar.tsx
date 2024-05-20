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

interface DropdownNavbarProps {
    label: string
}

const DropdownNavbar: FC<DropdownNavbarProps> = ({ label }) => {
    return (<DropdownMenu>
        <DropdownMenuTrigger>
            <Button size={'sm'} variant={'outline'}>{label}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                PvP Utilities
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/pvp/randomizer'}>Randomizer</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/pvp/compendium?page=1'}>PvP Compendium</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
                PvE Utilities
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/'}>Gym Rerun</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/pve/incomecheck'}>Income Check</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/pve/legendCalendar'}>Legendary Calendar</Link></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}

export default DropdownNavbar