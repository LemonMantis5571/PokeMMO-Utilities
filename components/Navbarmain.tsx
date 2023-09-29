'use client'
import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Labels from './Labels'
import { isMobile } from 'react-device-detect';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import Link from 'next/link';
import { Button } from './ui/button';

interface NavbarmainProps {

}

const Navbarmain: FC<NavbarmainProps> = ({ }) => {
  return (
    <nav className='sticky top-0 inset-x-0 h-fit w-full border-b z-[10] py-4 bg-background flex'>
      <div className='max-w-full h-full w-full mx-auto flex flex-grow gap-4 px-4'>
        <Avatar className='h-8 w-8 sm:h-10 sm:w-10'>
          <a href="/">
            <AvatarImage src='https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png' alt='Avatar' className='hover:cursor-pointer' />
          </a>
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar className='h-8 w-8 sm:h-10 sm:w-10'>
          <a href="https://github.com/LemonMantis5571" target='_blank'>
            <AvatarImage src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='Avatar' className='hover:cursor-pointer' />
          </a>
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        {isMobile ? (<DropdownMenu>
          <DropdownMenuTrigger>
            <Button size={'sm'} variant={'outline'} > PLAY!</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              PvP Utilities
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={'/pvp/randomizer'}>Randomizer</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/'}>Weather Control</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              PvE Utilities
            </DropdownMenuLabel>
            <DropdownMenuItem><Link href={'/pvp/randomizer'}>Gym Rerun</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href={'/'}>Income Check</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>) : <Labels />}
      </div>
    </nav>)
}

export default Navbarmain