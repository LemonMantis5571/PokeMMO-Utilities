"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, TrendingUp, Trophy, Users, Search, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Footer from "@/components/Footer"
import statsData from "@/data/pvp-stats-sanitized.json"

type SortField = "rank" | "winRate" | "usageRate" | "wins"
type SortDirection = "asc" | "desc"

interface PokemonStat {
  id: number
  name: string
  winRate: number
  usageRate: number
  wins: number
  overallUsageCount: number
  overallMatches: number
  rank: number
  topItems: { id: number; name: string; count: number; percent: number }[]
  topAbilities: { id: number; name: string; count: number; percent: number }[]
  topNatures: { id: number; name: string; count: number; percent: number }[]
  commonAllies: { id: number; name: string; count: number; percent: number }[]
}

const getSpriteUrl = (name: string) => {
  const sanitized = name.toLowerCase().replace(/\./g, "").replace(/ /g, "-")
  return `https://play.pokemonshowdown.com/sprites/xyani/${sanitized}.gif`
}

const getStaticSpriteUrl = (name: string) => {
  const sanitized = name.toLowerCase().replace(/\./g, "").replace(/ /g, "-")
  return `https://play.pokemonshowdown.com/sprites/gen5/${sanitized}.png`
}

export default function OUStatsPage() {
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonStat | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const { metadata, statsList } = statsData as { metadata: typeof statsData.metadata; statsList: PokemonStat[] }

  const filteredAndSorted = useMemo(() => {
    let filtered = statsList.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      const modifier = sortDirection === "asc" ? 1 : -1
      return (aVal - bVal) * modifier
    })

    return filtered
  }, [statsList, search, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection(field === "rank" ? "asc" : "desc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    )
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
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">PvP Analytics</p>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-amber-500" />
            <span>
              OU <span className="text-amber-500">Statistics</span>
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive usage and win rate data from {metadata.totalMatchesRecorded.toLocaleString()} ranked matches.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Users className="w-4 h-4" />
              <span>Total Pokemon</span>
            </div>
            <p className="text-2xl font-bold">{metadata.totalSpeciesWithStats}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Trophy className="w-4 h-4" />
              <span>Total Matches</span>
            </div>
            <p className="text-2xl font-bold">{metadata.totalMatchesRecorded.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Top Usage</span>
            </div>
            <p className="text-2xl font-bold">{statsList[0]?.usageRate.toFixed(1)}%</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Best Win Rate</span>
            </div>
            <p className="text-2xl font-bold">
              {Math.max(...statsList.slice(0, 50).map((p) => p.winRate)).toFixed(1)}%
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <Select value={viewMode} onValueChange={(v: "table" | "cards") => setViewMode(v)}>
            <SelectTrigger className="w-32 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="table">Table</SelectItem>
              <SelectItem value="cards">Cards</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Table View */}
        {viewMode === "table" && (
          <motion.div
            className="bg-card border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => toggleSort("rank")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Rank <SortIcon field="rank" />
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Pokemon</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => toggleSort("usageRate")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Usage <SortIcon field="usageRate" />
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => toggleSort("winRate")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Win Rate <SortIcon field="winRate" />
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                      <button
                        onClick={() => toggleSort("wins")}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Wins <SortIcon field="wins" />
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Top Item</th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Top Ability</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredAndSorted.slice(0, 100).map((pokemon, index) => (
                      <motion.tr
                        key={pokemon.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: Math.min(index * 0.02, 0.5) }}
                        className="border-b border-border hover:bg-secondary/30 cursor-pointer transition-colors"
                        onClick={() => setSelectedPokemon(selectedPokemon?.id === pokemon.id ? null : pokemon)}
                      >
                        <td className="p-4">
                          <span className={`font-bold ${pokemon.rank <= 3 ? "text-amber-500" : pokemon.rank <= 10 ? "text-foreground" : "text-muted-foreground"}`}>
                            #{pokemon.rank}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={getSpriteUrl(pokemon.name)}
                              alt={pokemon.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = getStaticSpriteUrl(pokemon.name)
                              }}
                            />
                            <span className="font-semibold">{pokemon.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${pokemon.usageRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{pokemon.usageRate.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${pokemon.winRate >= 52 ? "text-emerald-500" : pokemon.winRate <= 48 ? "text-red-500" : "text-foreground"}`}>
                            {pokemon.winRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="text-muted-foreground">{pokemon.wins.toLocaleString()}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground capitalize">
                            {pokemon.topItems[0]?.name || "-"}
                          </span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground capitalize">
                            {pokemon.topAbilities[0]?.name || "-"}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Cards View */}
        {viewMode === "cards" && (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.slice(0, 50).map((pokemon, index) => (
                <motion.div
                  key={pokemon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(index * 0.03, 0.6) }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-amber-500/50 transition-colors"
                  onClick={() => setSelectedPokemon(selectedPokemon?.id === pokemon.id ? null : pokemon)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-sm font-bold ${pokemon.rank <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                      #{pokemon.rank}
                    </span>
                    <span className={`text-sm font-medium ${pokemon.winRate >= 52 ? "text-emerald-500" : pokemon.winRate <= 48 ? "text-red-500" : "text-foreground"}`}>
                      {pokemon.winRate.toFixed(1)}% WR
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getSpriteUrl(pokemon.name)}
                      alt={pokemon.name}
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getStaticSpriteUrl(pokemon.name)
                      }}
                    />
                    <h3 className="font-bold mt-2">{pokemon.name}</h3>
                    <div className="flex items-center gap-2 mt-2 w-full">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${pokemon.usageRate}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{pokemon.usageRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedPokemon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] bg-card border border-border rounded-lg p-4 shadow-xl z-50"
            >
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getSpriteUrl(selectedPokemon.name)}
                  alt={selectedPokemon.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{selectedPokemon.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPokemon(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Close
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Rank #{selectedPokemon.rank} | {selectedPokemon.usageRate.toFixed(1)}% Usage | {selectedPokemon.winRate.toFixed(1)}% Win Rate
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Top Items</h4>
                  <div className="space-y-1">
                    {selectedPokemon.topItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="capitalize truncate">{item.name}</span>
                        <span className="text-muted-foreground">{item.percent.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Top Abilities</h4>
                  <div className="space-y-1">
                    {selectedPokemon.topAbilities.slice(0, 3).map((ability) => (
                      <div key={ability.id} className="flex items-center justify-between text-sm">
                        <span className="capitalize truncate">{ability.name}</span>
                        <span className="text-muted-foreground">{ability.percent.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Common Teammates</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPokemon.commonAllies.slice(0, 6).map((ally) => (
                    <div
                      key={ally.id}
                      className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-xs"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getStaticSpriteUrl(ally.name)}
                        alt={ally.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span>{ally.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
    </div>
  )
}
