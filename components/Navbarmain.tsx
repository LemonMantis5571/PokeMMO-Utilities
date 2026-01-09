'use client'
import { FC } from 'react'
import Labels from './Labels'
import { isMobile } from 'react-device-detect';
import DropdownNavbar from './DropdownNavbar';
import UserAvatar from './UserAvatar';

interface NavbarmainProps { }

const Navbarmain: FC<NavbarmainProps> = ({ }) => {
  return (
    <nav className='sticky top-0 inset-x-0 h-fit w-full border-b border-zinc-800 z-[10] py-3 bg-black'>
      <div className='container mx-auto h-full flex items-center justify-between gap-4 px-4'>
        <UserAvatar />
        <div className="flex-1 flex justify-end">
          {isMobile ? (<DropdownNavbar label='Menu' />) : <Labels />}
        </div>
      </div>
    </nav>
  )
}

export default Navbarmain