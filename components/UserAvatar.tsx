import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
    return (<>
        <Avatar className='h-8 w-8 sm:h-10 sm:w-10'>
            <a href="/">
                <AvatarImage src='https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png' alt='Avatar' className='hover:cursor-pointer' />
            </a>
            <AvatarFallback>PK</AvatarFallback>
        </Avatar>
        <Avatar className='h-8 w-8 sm:h-10 sm:w-10'>
            <a href="https://github.com/LemonMantis5571" target='_blank'>
                <AvatarImage src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='Avatar' className='hover:cursor-pointer' />
            </a>
            <AvatarFallback>GH</AvatarFallback>
        </Avatar></>);
}

export default UserAvatar;