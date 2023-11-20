/* eslint-disable @next/next/no-img-element */
'use client';
import { Icons } from '@/components/Icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { FC } from 'react'

interface CompendiumClientProps {

}

async function getRickAndMorty() {
    const response = await fetch('https://rickandmortyapi.com/api/character/2');
    const data = await response.json();
    console.log(data);
}

const team1 = [
    {
        name: 'BalanceTeam',
        description: 'This is a balance team',
        id: Date.now(),
        author: 'LemonMantis5571',
        pokemon: [
            'volcarona',
            'spiritomb',
            'espeon',
            'magnezone',
            'gastrodon',
            'scizor'
        ]
    },
    {
        name: 'HyperOffenseTeam',
        description: 'This is a hyper offense team',
        id: Date.now(),
        author: 'LemonMantis5571',
        pokemon: [
            'gallade',
            'charizard',
            'pikachu',
            'venusaur',
            'lugia',
            'medicham'
        ]

    },
    {
        name: 'StallTeam',
        description: 'This is a stall team',
        id: Date.now(),
        author: 'LemonMantis5571',
        pokemon: [
            'blissey',
            'skarmory',
            'slowbro',
            'umbreon',
            'forretress',
            'chansey'
        ]
    },
    {
        name: 'BulkyOffenseTeam',
        description: 'This is a bulky offense team',
        id: Date.now(),
        author: 'LemonMantis5571',
        pokemon: [
            'scolipede',
            'espeon',
            'mr-mime',
            'smeargle',
            'ninjask',
            'xatu'
        ]
    }
];

const CompendiumClient: FC<CompendiumClientProps> = ({ }) => {

    return (
        <div className='container mx-auto grid grid-cols-1 gap-5'>
            <div className='flex items-center py-4'>
                <Input className='max-w-sm' placeholder='Filter by Name' />
            </div>
            {team1.map((team, index) => {
                return (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='rounded 
                                mx-auto border 
                                max-w-xl max-h-fit
                              bg-zinc-900
                              border-black
                              hover:bg-zinc-950
                                opacity-90'
                                key={index}>
                                    <div className='relative'>
                                        <div className='flex justify-center py-2'>
                                            <p className='font-bold text-zinc-200'>
                                                {team.name}
                                            </p>
                                        </div>
                                        <div className='absolute top-2 right-2'>
                                            <Link href={`/pvp/compendium/${team.id}`} target='_blank'>
                                                <Icons.externalLink height={20} width={20}>
                                                </Icons.externalLink>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 justify-center items-center mb-5'>
                                        {team.pokemon.map((pokemon, index) => {
                                            console.log(pokemon);
                                            return (
                                                <img 
                                                key={index} 
                                                className='object-contain 
                                                sm:w-[68px] 
                                                sm:h-[56px]' 
                                                width={40} 
                                                height={30} 
                                                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${pokemon.toLowerCase()}.png`} alt='pokemon'></img>
                                            )
                                        })}
                                    </div>
                                    <div className='flex gap-2 p-2'>
                                        <Icons.author height={20} width={20} id='author' />
                                        <Label className='text-sm font-semibold' htmlFor='author'>{team.author}</Label>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{team.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </div>)
}

export default CompendiumClient