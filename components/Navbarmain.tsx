'use client'
import { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Labels from './Labels'
import { isMobile } from 'react-device-detect';
import DropdownNavbar from './DropdownNavbar';
import UserAvatar from './UserAvatar';

interface NavbarmainProps {

}

const Navbarmain: FC<NavbarmainProps> = ({ }) => {
  return (
    <nav className='sticky top-0 inset-x-0 h-fit w-full border-b z-[10] py-4 bg-background flex'>
      <div className='max-w-full h-full w-full mx-auto flex flex-grow gap-4 px-4'>
        <UserAvatar />
        {isMobile ? (<DropdownNavbar label='Play!' />) : <Labels />}
      </div>
    </nav>)
}

export default Navbarmain