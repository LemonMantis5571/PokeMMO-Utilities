"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShuffleIcon, Dices, Sparkles, Trophy, Zap } from "lucide-react"
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
  { value: "ALL", label: "All Tiers", color: "bg-gradient-to-r from-red-500 to-orange-500" },
  { value: "OU", label: "OverUsed", color: "bg-red-500" },
  { value: "UU", label: "UnderUsed", color: "bg-amber-500" },
  { value: "NU", label: "NeverUsed", color: "bg-emerald-500" },
  { value: "Untiered", label: "No-Tier", color: "bg-zinc-500" },
]

export default function RandomizerPage() {
  const [tier, setTier] = useState("ALL")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState<ShuffledPokemon[]>([])
  const [shuffleCount, setShuffleCount] = useState(0)

  const shuffle = (selectedTier: string) => {
    setIsLoading(true)
    setTimeout(() => {
      try {
        const result = ShufflePokemons(selectedTier)
        setPokemon(result)
        setShuffleCount(prev => prev + 1)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }, 30)
  }

  useEffect(() => {
    shuffle("ALL")
  }, [])

  const handleTierChange = (value: string) => {
    setTier(value)
    shuffle(value)
  }

  const currentTier = TIERS.find(t => t.value === tier)

  return (
    <div className="min-h-[100dvh] grid grid-rows-[1fr_auto]">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4" />
            PvP Challenge Mode
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-3">
            ELO <span className="text-red-500">RIP</span>
          </h1>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            Generate completely random teams and challenge yourself with unexpected builds
          </p>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Button
            disabled={isLoading}
            onClick={() => shuffle(tier)}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-12 text-base shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all"
            id="shuffle-btn"
          >
            <motion.div
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 0.5,
                repeat: isLoading ? Infinity : 0,
                ease: "linear",
              }}
              className="mr-2"
            >
              <Dices className="w-5 h-5" />
            </motion.div>
            {isLoading ? "Rolling..." : "Roll Team"}
          </Button>

          <Select value={tier} onValueChange={handleTierChange}>
            <SelectTrigger
              className="w-44 bg-card border-border text-foreground hover:border-muted-foreground h-12"
              id="tier-select"
            >
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {TIERS.map((t) => (
                <SelectItem
                  key={t.value}
                  value={t.value}
                  className="text-foreground hover:bg-secondary focus:bg-secondary"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <InfoModal />
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Tier: <span className="text-foreground font-medium">{currentTier?.label}</span></span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>Shuffles: <span className="text-foreground font-medium">{shuffleCount}</span></span>
          </div>
        </motion.div>

        {/* Team Preview Strip */}
        <AnimatePresence mode="wait">
          {!isLoading && pokemon.length > 0 && (
            <motion.div
              key={`preview-${shuffleCount}`}
              className="flex justify-center gap-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {pokemon.map((p, i) => (
                <motion.div
                  key={`mini-${p.name}-${i}`}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-card border border-border flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, borderColor: "rgb(239 68 68 / 0.5)" }}
                >
                  <img
                    src={`https://play.pokemonshowdown.com/sprites/xyani/${p.name.toLowerCase().replace(/\./g, '')}.gif`}
                    alt={p.name}
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pokemon Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
              key={`grid-${shuffleCount}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pokemon.map((p, i) => (
                <PokemonCard
                  key={`${p.name}-${shuffleCount}-${i}`}
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
