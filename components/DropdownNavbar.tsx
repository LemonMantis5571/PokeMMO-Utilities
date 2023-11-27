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
            <DropdownMenuItem><Link href={'/pvp/compendium'}>PvP Compendium</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
                PvE Utilities
            </DropdownMenuLabel>
            <DropdownMenuItem><Link href={'/pvp/randomizer'}>Gym Rerun</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/'}>Income Check</Link></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}

export default DropdownNavbar