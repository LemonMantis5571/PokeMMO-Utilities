/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pokemon } from '@/app/pvp/randomizer/page'


const PokemonCard: FC<Pokemon> = ({ name, types, abilities, number, tier }) => {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className='capitalize text-base'>{name}</CardTitle>
                <CardDescription className='flex flex-col justify-center gap-2'>
                    <div className='flex justify-center gap-2'>
                        <p className={types[0]}>{types[0]}</p>
                        <p className={types[1]} >{types[1] ? types[1] : null}</p>
                    </div>

                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
                <div className='w-full h-full flex items-center justify-center'>
                    <img style={{ imageRendering: 'crisp-edges' }} className='object-scale-down w-[120px] h-[120px]' src={`https://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase()}.gif`} alt='pokemon'>
                    </img>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    {/* <p>{moves[0]}</p>
                        <p>{moves[1]}</p>
                        <p>{moves[2]}</p>
                        <p>{moves[3]}</p> */}
                </div>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default PokemonCard