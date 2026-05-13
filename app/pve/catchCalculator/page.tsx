"use client"
import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Footer from "@/components/Footer"
import pokemonData from "@/data/pokemmo.mock.data.json"
import catchRatesData from "@/data/catchRates.json"
import {
  calculateCatchRate,
  POKEBALLS,
  STATUSES,
  type CatchResult,
} from "@/lib/catchCalculator"

interface CatchRateEntry {
  id: number
  rate: number
  hp?: number
}

// Build catch rate + base HP lookup maps
const catchRateMap = new Map<number, number>()
const baseHpMap = new Map<number, number>()
;(catchRatesData as CatchRateEntry[]).forEach((entry) => {
  catchRateMap.set(entry.id, entry.rate)
  if (entry.hp) baseHpMap.set(entry.id, entry.hp)
})

// Pokemon list for search
const pokemonList = pokemonData.Pokedex.map((p) => ({
  number: parseInt(p.pokemon.number),
  name: p.pokemon.name,
  types: p.pokemon.types,
}))

export default function CatchCalculatorPage() {
  // Form state
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState<{
    number: number
    name: string
    types: string[]
  } | null>(null)
  const [maxHp, setMaxHp] = useState(100)
  const [currentHpPercent, setCurrentHpPercent] = useState(50)
  const [useCustomHp, setUseCustomHp] = useState(false)
  const [selectedBall, setSelectedBall] = useState(POKEBALLS[0].name)
  const [selectedStatus, setSelectedStatus] = useState(STATUSES[0].name)

  // Filtered pokemon for search
  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList.slice(0, 20)
    return pokemonList
      .filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 20)
  }, [searchQuery])

  // Get catch rate and base HP for selected pokemon
  const baseCatchRate = useMemo(() => {
    if (!selectedPokemon) return 45
    return catchRateMap.get(selectedPokemon.number) ?? 45
  }, [selectedPokemon])

  const baseHp = useMemo(() => {
    if (!selectedPokemon) return 50
    return baseHpMap.get(selectedPokemon.number) ?? 50
  }, [selectedPokemon])

  // Effective max HP — auto from base stat or manual
  const effectiveMaxHp = useCustomHp ? maxHp : baseHp

  // Current HP from percentage
  const currentHp = Math.max(1, Math.round((currentHpPercent / 100) * effectiveMaxHp))

  // Get ball and status rates
  const ballRate = useMemo(
    () => POKEBALLS.find((b) => b.name === selectedBall)?.rate ?? 1,
    [selectedBall]
  )
  const statusRate = useMemo(
    () => STATUSES.find((s) => s.name === selectedStatus)?.rate ?? 1,
    [selectedStatus]
  )

  // Calculate result
  const result: CatchResult = useMemo(() => {
    return calculateCatchRate(
      baseCatchRate,
      effectiveMaxHp,
      currentHp,
      ballRate,
      statusRate
    )
  }, [baseCatchRate, effectiveMaxHp, currentHp, ballRate, statusRate])

  // Color based on probability
  const getProbColor = useCallback((prob: number) => {
    if (prob >= 80) return "text-green-400"
    if (prob >= 50) return "text-yellow-400"
    if (prob >= 25) return "text-orange-400"
    return "text-red-400"
  }, [])

  const getProbBgColor = useCallback((prob: number) => {
    if (prob >= 80) return "bg-green-500"
    if (prob >= 50) return "bg-yellow-500"
    if (prob >= 25) return "bg-orange-500"
    return "bg-red-500"
  }, [])

  const handleSelectPokemon = (pokemon: (typeof pokemonList)[0]) => {
    setSelectedPokemon(pokemon)
    setShowSearch(false)
    setSearchQuery("")
  }

  const hpPercentage = currentHpPercent

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-[100dvh] grid grid-rows-[1fr_auto]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="section-subtitle mb-2">PvE Utility</p>
            <h1 className="section-title flex items-center gap-3">
              <Target className="w-8 h-8 text-emerald-500" />
              <span>
                Catch <span className="text-emerald-500">Calculator</span>
              </span>
            </h1>
            <p className="text-zinc-500 mt-2">
              Calculate your Pokémon catch probability using the PokeMMO capture
              formula.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <motion.div
              className="pvp-card p-6 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Pokemon Search */}
              <div className="space-y-2">
                <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                  Pokémon
                </Label>
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowSearch(!showSearch)}
                    className="w-full justify-between bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-left"
                    id="pokemon-search-trigger"
                  >
                    <span className="flex items-center gap-2">
                      {selectedPokemon ? (
                        <>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.number}.png`}
                            alt={selectedPokemon.name}
                            className="w-8 h-8"
                          />
                          <span className="text-white">
                            {selectedPokemon.name}
                          </span>
                          <span className="text-zinc-500 text-xs">
                            (Base: {baseCatchRate})
                          </span>
                        </>
                      ) : (
                        <span className="text-zinc-500">
                          Select a Pokémon...
                        </span>
                      )}
                    </span>
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </Button>

                  <AnimatePresence>
                    {showSearch && (
                      <motion.div
                        className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="p-2 border-b border-zinc-800">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                              placeholder="Search Pokémon..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-9 bg-zinc-800 border-zinc-700 text-white"
                              autoFocus
                              id="pokemon-search-input"
                            />
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {filteredPokemon.map((p) => (
                            <button
                              key={p.number}
                              onClick={() => handleSelectPokemon(p)}
                              className="w-full px-3 py-2 text-left hover:bg-zinc-800 flex items-center gap-3 transition-colors"
                            >
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.number}.png`}
                                alt={p.name}
                                className="w-8 h-8"
                              />
                              <div>
                                <span className="text-white text-sm font-medium">
                                  {p.name}
                                </span>
                                <div className="flex gap-1 mt-0.5">
                                  {p.types.map((t) => (
                                    <span
                                      key={t}
                                      className={`type-badge-${t} type-badge text-[10px] px-1.5 py-0.5`}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <span className="text-zinc-500 text-xs ml-auto">
                                #{p.number}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* HP Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                    HP
                  </Label>
                  <button
                    onClick={() => setUseCustomHp(!useCustomHp)}
                    className={`text-xs px-2 py-1 rounded transition-all ${
                      useCustomHp
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-zinc-700"
                    }`}
                    id="toggle-custom-hp"
                  >
                    {useCustomHp ? "Custom HP ✓" : "Use Custom HP"}
                  </button>
                </div>

                {/* Auto HP display */}
                {!useCustomHp && (
                  <div className="flex items-center gap-2 bg-zinc-900/50 rounded-lg px-3 py-2 border border-zinc-800">
                    <span className="text-zinc-500 text-xs">Base HP:</span>
                    <span className="text-white text-sm font-bold">
                      {baseHp}
                    </span>
                    <span className="text-zinc-600 text-xs ml-auto">
                      auto from Pokédex
                    </span>
                  </div>
                )}

                {/* Custom HP input */}
                <AnimatePresence>
                  {useCustomHp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Input
                        type="number"
                        min={1}
                        max={999}
                        value={maxHp}
                        onChange={(e) => {
                          setMaxHp(Math.max(1, parseInt(e.target.value) || 1))
                        }}
                        className="bg-zinc-900 border-zinc-700 text-white"
                        placeholder="Enter actual Max HP..."
                        id="max-hp-input"
                      />
                      <p className="text-zinc-600 text-xs mt-1">
                        Enter your Pokémon&apos;s actual Max HP for more accuracy
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* HP Percentage Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-xs">Current HP</span>
                    <span className="text-white text-sm font-mono">
                      {currentHp} / {effectiveMaxHp}{" "}
                      <span className="text-zinc-500">
                        ({hpPercentage}%)
                      </span>
                    </span>
                  </div>
                  {/* HP Bar Visual */}
                  <div className="relative h-6 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <motion.div
                      className={`h-full rounded-full ${
                        hpPercentage > 50
                          ? "bg-green-500"
                          : hpPercentage > 25
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      initial={false}
                      animate={{ width: `${hpPercentage}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">
                      HP
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={currentHpPercent}
                    onChange={(e) =>
                      setCurrentHpPercent(parseInt(e.target.value))
                    }
                    className="w-full accent-emerald-500"
                    id="current-hp-slider"
                  />
                </div>
              </div>

              {/* Poké Ball */}
              <div className="space-y-2">
                <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                  Poké Ball
                </Label>
                <Select
                  value={selectedBall}
                  onValueChange={setSelectedBall}
                >
                  <SelectTrigger
                    className="bg-zinc-900 border-zinc-700 text-white"
                    id="ball-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    {POKEBALLS.map((ball) => (
                      <SelectItem
                        key={ball.name}
                        value={ball.name}
                        className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        <span className="flex items-center gap-2">
                          {ball.name}
                          <span className="text-zinc-500 text-xs">
                            ({ball.description})
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Condition */}
              <div className="space-y-2">
                <Label className="text-zinc-400 text-xs uppercase tracking-wider">
                  Status Condition
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger
                    className="bg-zinc-900 border-zinc-700 text-white"
                    id="status-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    {STATUSES.map((status) => (
                      <SelectItem
                        key={status.name}
                        value={status.name}
                        className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                      >
                        <span className="flex items-center gap-2">
                          {status.name}
                          <span className="text-zinc-500 text-xs">
                            ({status.rate}x)
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Result Panel */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Main Result */}
              <div className="pvp-card p-6">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4">
                  Catch Probability
                </p>

                <div className="text-center py-8">
                  <motion.div
                    key={result.probability.toFixed(2)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <span
                      className={`text-7xl font-black ${getProbColor(result.probability)}`}
                    >
                      {result.probability.toFixed(1)}%
                    </span>
                  </motion.div>

                  <p className="text-zinc-500 text-sm mt-2">
                    {result.probability >= 80
                      ? "Very likely to catch!"
                      : result.probability >= 50
                        ? "Good chance of catching."
                        : result.probability >= 25
                          ? "Might need a few tries."
                          : "Going to be tough!"}
                  </p>
                </div>

                {/* Probability Bar */}
                <div className="relative h-4 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getProbBgColor(result.probability)}`}
                    initial={false}
                    animate={{ width: `${result.probability}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  />
                </div>

                {/* Shake Indicators */}
                <div className="flex justify-center gap-3 mt-6">
                  {[1, 2, 3, 4].map((shake) => (
                    <motion.div
                      key={shake}
                      className={`w-4 h-4 rounded-full border-2 ${
                        shake <= result.shakeChecks
                          ? `${getProbBgColor(result.probability)} border-transparent`
                          : "border-zinc-600 bg-transparent"
                      }`}
                      initial={false}
                      animate={{
                        scale:
                          shake <= result.shakeChecks ? [1, 1.3, 1] : 1,
                      }}
                      transition={{ delay: shake * 0.1 }}
                    />
                  ))}
                  <span className="text-zinc-500 text-xs ml-2">
                    ~{result.shakeChecks} shake
                    {result.shakeChecks !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="pvp-card p-4 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Base Rate</p>
                  <p className="text-white text-2xl font-bold">
                    {baseCatchRate}
                  </p>
                </div>
                <div className="pvp-card p-4 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Ball Modifier</p>
                  <p className="text-white text-2xl font-bold">{ballRate}x</p>
                </div>
                <div className="pvp-card p-4 text-center">
                  <p className="text-zinc-500 text-xs mb-1">
                    Status Modifier
                  </p>
                  <p className="text-white text-2xl font-bold">
                    {statusRate}x
                  </p>
                </div>
                <div className="pvp-card p-4 text-center">
                  <p className="text-zinc-500 text-xs mb-1">Raw X Value</p>
                  <p className="text-white text-2xl font-bold">
                    {result.rawX.toFixed(1)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer
          birdMonth={new Date().getMonth()}
          beastMonth={new Date().getMonth()}
        />
      </motion.div>
    </AnimatePresence>
  )
}
