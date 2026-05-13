"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShuffleIcon, Dices } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShufflePokemons } from "@/hooks/useShuffle"
import PokemonCard from "@/components/PokemonCard"
import SkeletonCard from "@/components/SkeletonCard"
import InfoModal from "@/components/Modals/InfoModal"
import Footer from "@/components/Footer"

type ShuffledPokemon = ReturnType<typeof ShufflePokemons>[number]

const TIERS = [
  { value: "ALL", label: "All Tiers" },
  { value: "OU", label: "OverUsed" },
  { value: "UU", label: "UnderUsed" },
  { value: "NU", label: "NeverUsed" },
  { value: "Untiered", label: "No-Tier" },
]

export default function RandomizerPage() {
  const [tier, setTier] = useState("ALL")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState<ShuffledPokemon[]>([])

  const shuffle = (selectedTier: string) => {
    setIsLoading(true)
    // Small timeout to let the skeleton render before heavy JSON parsing
    setTimeout(() => {
      try {
        const result = ShufflePokemons(selectedTier)
        setPokemon(result)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }, 30)
  }

  // Initial load client-side — no SSR wait
  useEffect(() => {
    shuffle("ALL")
  }, [])

  const handleTierChange = (value: string) => {
    setTier(value)
    shuffle(value)
  }

  return (
    <div className="min-h-[100dvh] grid grid-rows-[1fr_auto]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="section-subtitle mb-2">PvP Utility</p>
          <h1 className="section-title flex items-center gap-3">
            <Dices className="w-8 h-8 text-red-500" />
            <span>
              ELO <span className="text-red-500">RIP</span>
            </span>
          </h1>
          <p className="text-zinc-500 mt-2">
            Generate random teams and challenge yourself with unexpected builds.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-8 p-4 pvp-card max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            disabled={isLoading}
            onClick={() => shuffle(tier)}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            id="shuffle-btn"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 0.5,
                repeat: isLoading ? Infinity : 0,
                ease: "linear",
              }}
            >
              <ShuffleIcon className="w-4 h-4" />
            </motion.div>
            {isLoading ? "Shuffling..." : "Shuffle"}
          </Button>

          <Select value={tier} onValueChange={handleTierChange}>
            <SelectTrigger
              className="w-40 bg-zinc-900 border-zinc-700 text-white hover:border-zinc-600"
              id="tier-select"
            >
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              {TIERS.map((t) => (
                <SelectItem
                  key={t.value}
                  value={t.value}
                  className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                >
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <InfoModal />
        </motion.div>

        {/* Pokemon Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${tier}-${pokemon[0]?.name}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pokemon.map((p, i) => (
                <PokemonCard
                  key={`${p.name}-${i}`}
                  name={p.name}
                  number={p.number}
                  abilities={p.abilities}
                  types={p.types}
                  tier={p.tier}
                  moves={p.moves}
                  Item={p.items}
                  newMoves={p.newMoves}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
    </div>
  )
}