'use client'
import { FC } from 'react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from './ui/menubar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Labels from './Labels'

interface NavbarmainProps {

}

const Navbarmain: FC<NavbarmainProps> = ({ }) => {
  return (<nav className='sticky top-0 inset-x-0 h-fit border-b z-[10] py-4 bg-background flex gap-5 justify-content-center'>
    <div className='container max-w-full h-full mx-auto flex gap-5'>
      <Avatar className='h-10 w-10'>
        <AvatarImage src='https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png' alt='Avatar' className='hover:cursor-pointer' />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className='m-auto'>
          <Labels/>
      </div>
    </div>
  </nav>)
}

export default Navbarmain