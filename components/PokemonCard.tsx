/* eslint-disable @next/next/no-img-element */
'use client'
import { FC } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { motion } from 'framer-motion'
import Moves from './Moves'
import { getRandomAbility } from '@/lib/pokemon.generators'
import { Pokemon } from '@/lib/utils'

interface MoveEntry {
    name: string
    type: string
}

interface PokemonCardProps extends Pokemon {
    moves: [string, MoveEntry][] | null
    newMoves?: [string, MoveEntry][] | null
    Item: string
    index?: number
}

const PokemonCard: FC<PokemonCardProps> = ({ name, types, abilities, number, tier, moves, Item, index = 0 }) => {
    const pokemonIMG = `https://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase().replace(/\./g, '')}.gif`
    const itemIMG = Item === 'assault-vest'
        ? `https://archives.bulbagarden.net/media/upload/b/b1/Dream_Assault_Vest_Sprite.png`
        : `https://play.pokemonshowdown.com/sprites/itemicons/${Item}.png`

    const randomAbility = getRandomAbility(abilities)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="h-full"
        >
            <Card className="bg-card border-border hover:border-red-500/30 h-full flex flex-col transition-colors duration-200">
                <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className='capitalize text-xl font-bold text-foreground text-center'>
                        {name}
                    </CardTitle>
                    <div className='flex justify-center gap-2 mt-2'>
                        {types.map((t) => (
                            <span key={t} className={`type-badge type-badge-${t}`}>{t}</span>
                        ))}
                    </div>
                </CardHeader>

                <CardContent className='flex flex-col items-center flex-grow pt-4'>
                    <div className='w-full flex items-center justify-between mb-4'>
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl" />
                            <img
                                className='object-contain w-[96px] h-[96px] relative z-10'
                                style={{ imageRendering: 'pixelated' }}
                                src={pokemonIMG}
                                alt={name}
                            />
                        </motion.div>
                        <div className='flex items-center gap-2 bg-secondary border border-border px-3 py-2 rounded-lg'>
                            <img src={itemIMG} alt={Item} height={20} width={20} />
                            <span className='capitalize text-sm text-foreground'>{Item}</span>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-2 w-full'>
                        {moves?.map(([id, move]) => (
                            <Moves move={move.name} key={id} className={move.type} />
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-border">
                    <div className='flex items-center justify-between w-full text-sm'>
                        <div className='flex items-center gap-2'>
                            <span className='text-muted-foreground'>Ability:</span>
                            <span className='text-red-400 font-semibold'>{randomAbility}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-muted-foreground'>Tier:</span>
                            <span className='px-2 py-0.5 bg-secondary border border-border rounded text-xs font-medium text-foreground'>{tier}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default PokemonCard
