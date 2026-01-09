"use client"

import type { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getLegendaryPokemonForMonth } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

interface FooterProps {
    birdMonth: number | undefined
    beastMonth: number | undefined
}

const Footer: FC<FooterProps> = ({ birdMonth, beastMonth }) => {
    const legendary = getLegendaryPokemonForMonth(
        ["Entei", "Suicune", "Raikou"],
        ["Zapdos", "Moltres", "Articuno"],
        beastMonth,
        birdMonth,
    )

    const { currenBeast, currentBird } = legendary

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="border-t border-zinc-800 bg-black">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6">
                                <Image src="/favicon.ico" alt="PokeMMO Tools" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-white">PokeMMO Tools</span>
                        </div>
                        <p className="text-zinc-600 text-sm">
                            Tools for the PokeMMO community.
                        </p>
                    </div>

                    {/* PvP Tools */}
                    <div>
                        <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-zinc-500">PvP Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/pvp/randomizer" className="text-zinc-400 hover:text-red-500 transition-colors text-sm">
                                    ELO RIP
                                </Link>
                            </li>
                            <li>
                                <Link href="/pvp/compendium" className="text-zinc-400 hover:text-red-500 transition-colors text-sm">
                                    Compendium
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* PvE Tools */}
                    <div>
                        <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-zinc-500">PvE Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/pve/incomecheck" className="text-zinc-400 hover:text-red-500 transition-colors text-sm">
                                    Income Check
                                </Link>
                            </li>
                            <li>
                                <Link href="/pve/legendCalendar" className="text-zinc-400 hover:text-red-500 transition-colors text-sm">
                                    Legendary Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legendary of the Month */}
                    <div>
                        <h3 className="font-bold mb-4 text-xs uppercase tracking-wider text-zinc-500">Legendary of the Month</h3>
                        <div className="grid grid-cols-2 gap-3 bg-zinc-900 border border-zinc-800 p-3 rounded-lg">
                            <div className="text-center">
                                <p className="text-xs text-zinc-600 mb-1 uppercase">Bird</p>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="relative w-12 h-12 mx-auto"
                                >
                                    <Image
                                        src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currentBird?.toLowerCase()}.png`}
                                        alt={currentBird || "Legendary Bird"}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                                <p className="text-xs font-medium mt-1 text-zinc-400">{currentBird}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-zinc-600 mb-1 uppercase">Beast</p>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="relative w-12 h-12 mx-auto"
                                >
                                    <Image
                                        src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currenBeast?.toLowerCase()}.png`}
                                        alt={currenBeast || "Legendary Beast"}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                                <p className="text-xs font-medium mt-1 text-zinc-400">{currenBeast}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs">
                        © {new Date().getFullYear()} PokeMMO Tools. Not affiliated with PokeMMO.
                    </p>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-red-500/50"
                            onClick={scrollToTop}
                        >
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
}

export default Footer