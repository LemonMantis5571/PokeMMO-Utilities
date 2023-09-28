'use client'
import { FC } from 'react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from './ui/menubar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Labels from './Labels'
import TierSelect from './TierSelect'

interface NavbarmainProps {

}

const Navbarmain: FC<NavbarmainProps> = ({ }) => {
  return (<nav className='sticky top-0 inset-x-0 h-fit border-b z-[10] py-4 bg-background flex flex-shrink gap-5 justify-content-center'>
    <div className='container max-w-full h-full mx-auto flex gap-5'>
      <Avatar className='h-10 w-10'>
        <a href="/">
          <AvatarImage src='https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png' alt='Avatar' className='hover:cursor-pointer' />
        </a>
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className='h-10 w-10'>
        <a href="https://github.com/LemonMantis5571" target='_blank'>
          <AvatarImage src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='Avatar' className='hover:cursor-pointer' />
        </a>
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className='m-auto'>
        <Labels />
      </div>
    </div>
  </nav>)
}

export default Navbarmain