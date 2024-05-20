/* eslint-disable @next/next/no-img-element */
'use client';
import { FC } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { PokePaste, PokemonMember } from '@/lib/types/PokemonMembertypes';
import { Icons } from '@/components/Icons';
import { convertToPokepaste } from '@/lib/pokepaste.generator';
import TeamMemberList from '@/components/TeamCompendium/TeamMemberList';

interface PokemonTeamCardProps {
    team: {
        name: string,
        description?: string | null,
        tier?: string | null,
        members: PokemonMember[]
    }
}

const PokemonTeamCard: FC<PokemonTeamCardProps> = ({ team }) => {
    const { toast } = useToast();

    const copytoclipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Copied to clipboard',
            description: 'You can share this link with your friends',
            duration: 2000,
        });
    }

    const pokepastetoClipboard = (team: PokePaste) => {
        const pokepasteContent = convertToPokepaste(team);
        navigator.clipboard.writeText(pokepasteContent);
        toast({
            title: 'PokePaste copied to clipboard',
            description: 'You can input this paste in showdown',
            duration: 2000,
        });
    }


    return (
        <div className='flex flex-col sm:flex-col xl:flex-row items-center sm:gap-5 md:gap-8 p-4 '>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                <TeamMemberList team={team} />
            </div>
            <div className='w-[300px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[250px] sm:h-[400px] md:h-[400px] flex flex-col justify-start
            items-center 
            py-8
            px-4
            mt-3 
            rounded-xl
            gap-4'>
                <h1 className='font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0'>{team.name}</h1>
                <div className='relative flex justify-start items-center px-6 bg-[rgb(24,24,27)] rounded-xl h-full sm:h-14 w-full sm:w-80' >
                    <p className='text-center text-sm text-muted-foreground'>Copy team url to clipboard</p>
                    <div className='absolute top-1 right-2 cursor-pointer'>
                        <Icons.copytoclipboard height={15} width={15} onClick={copytoclipboard} />
                    </div>
                </div>
                <div className='relative flex justify-start items-center px-6 bg-[rgb(24,24,27)] rounded-xl h-full sm:h-14 w-full sm:w-80' >
                    <p className='text-center text-sm text-muted-foreground'>Copy team in pokepaste format</p>
                    <div className='absolute top-1 right-2 cursor-pointer'>
                        <Icons.copytoclipboard height={15} width={15} onClick={() => pokepastetoClipboard(team)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonTeamCard