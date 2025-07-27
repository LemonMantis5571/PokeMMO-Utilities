"use client"

import type { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getLegendaryPokemonForMonth } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronUp, Github, Twitter, ExternalLink } from "lucide-react"

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
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <footer className="border-t border-zinc-900">
            <div className="container px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <Image src="/favicon.ico" alt="PokeMMO Tools" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-lg">PokeMMO Tools</span>
                        </div>
                        <p className="text-zinc-400 text-sm">
                            A collection of tools to enhance your PokeMMO experience, created by the community, for the community.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="icon" className="rounded-full bg-zinc-900 hover:bg-zinc-800 h-9 w-9">
                                <Link href="https://github.com/LemonMantis5571/PokeMMO-Utilities" target="_blank">
                                    <Github className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-zinc-400">PvP Tools</h3>
                        <ul className="space-y-2">
                            {[{
                                name: "Team Randomizer",
                                link: "/pvp/randomizer"
                            },
                            {
                                name: "Compendium",
                                link: "/pvp/compendium"
                            },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.link} target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-zinc-400">PvE Tools</h3>
                        <ul className="space-y-2">
                            {[{
                                name: "Income Check",
                                link: "/pve/incomecheck"
                            },
                            {
                                name: "Legendary Calendar",
                                link: "/pve/legendCalendar"
                            },
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.link} target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-zinc-400">Legendary of the Month</h3>
                        <div className="grid grid-cols-2 gap-4 bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                            <div className="text-center">
                                <p className="text-xs text-zinc-500 mb-1">BIRD</p>
                                <motion.div whileHover={{ y: -5 }} className="relative w-16 h-16 mx-auto">
                                    <Image
                                        src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currentBird?.toLowerCase()}.png`}
                                        alt={currentBird || "Legendary Bird"}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                                <p className="text-sm font-medium mt-1">{currentBird}</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-zinc-500 mb-1">BEAST</p>
                                <motion.div whileHover={{ y: -5 }} className="relative w-16 h-16 mx-auto">
                                    <Image
                                        src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currenBeast?.toLowerCase()}.png`}
                                        alt={currenBeast || "Legendary Beast"}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                                <p className="text-sm font-medium mt-1">{currenBeast}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} PokeMMO Tools. Not affiliated with PokeMMO.
                    </p>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-zinc-900 hover:bg-zinc-800"
                        onClick={scrollToTop}
                    >
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
    