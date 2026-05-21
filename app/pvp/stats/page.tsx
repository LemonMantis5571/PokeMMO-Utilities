"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, TrendingUp, TrendingDown, Trophy, Users, Search, ChevronDown, ChevronUp, ArrowUpDown, GitCompare, X, Minus } from "lucide-react"
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

// Import all month data
import marchData from "@/data/pvp-stats-march-2026-sanitized.json"
import aprilData from "@/data/pvp-stats-april-2026-sanitized.json"
import mayData from "@/data/pvp-stats-may-sanitized.json"

type SortField = "rank" | "winRate" | "usageRate" | "wins"
type SortDirection = "asc" | "desc"
type MonthKey = "march" | "april" | "may"

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

interface StatsData {
  metadata: {
    totalSpeciesWithStats: number
    totalMatchesRecorded: number
    generatedAt: string
  }
  statsList: PokemonStat[]
}

const monthsData: Record<MonthKey, StatsData> = {
  march: marchData as StatsData,
  april: aprilData as StatsData,
  may: mayData as StatsData,
}

const monthLabels: Record<MonthKey, string> = {
  march: "March 2026",
  april: "April 2026",
  may: "May 2026",
}

const getSpriteUrl = (name: string) => {
  const sanitized = name.toLowerCase().replace(/\./g, "").replace(/ /g, "-")
  return `https://play.pokemonshowdown.com/sprites/xyani/${sanitized}.gif`
}

const getStaticSpriteUrl = (name: string) => {
  const sanitized = name.toLowerCase().replace(/\./g, "").replace(/ /g, "-")
  return `https://play.pokemonshowdown.com/sprites/gen5/${sanitized}.png`
}

// Component to show stat change with arrow
function StatChange({ current, previous, suffix = "", invert = false }: { current: number; previous: number | undefined; suffix?: string; invert?: boolean }) {
  if (previous === undefined) return null
  
  const diff = current - previous
  if (Math.abs(diff) < 0.01) return <Minus className="w-3 h-3 text-muted-foreground" />
  
  const isPositive = invert ? diff < 0 : diff > 0
  const Icon = isPositive ? TrendingUp : TrendingDown
  const colorClass = isPositive ? "text-emerald-500" : "text-red-500"
  
  return (
    <span className={`flex items-center gap-0.5 text-xs ${colorClass}`}>
      <Icon className="w-3 h-3" />
      {Math.abs(diff).toFixed(1)}{suffix}
    </span>
  )
}

// Rank change indicator
function RankChange({ current, previous }: { current: number; previous: number | undefined }) {
  if (previous === undefined) return <span className="text-xs text-muted-foreground">NEW</span>
  
  const diff = previous - current // Inverted: lower rank is better
  if (diff === 0) return null
  
  const isPositive = diff > 0
  const Icon = isPositive ? TrendingUp : TrendingDown
  const colorClass = isPositive ? "text-emerald-500" : "text-red-500"
  
  return (
    <span className={`flex items-center gap-0.5 text-xs ${colorClass}`}>
      <Icon className="w-3 h-3" />
      {Math.abs(diff)}
    </span>
  )
}

export default function OUStatsPage() {
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<SortField>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonStat | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>("may")
  const [compareMonth, setCompareMonth] = useState<MonthKey | null>(null)
  const [comparingPokemon, setComparingPokemon] = useState<string | null>(null)

  const currentData = monthsData[selectedMonth]
  const compareData = compareMonth ? monthsData[compareMonth] : null
  
  const { metadata, statsList } = currentData

  // Create a map for quick lookup of comparison data
  const compareMap = useMemo(() => {
    if (!compareData) return new Map<string, PokemonStat>()
    return new Map(compareData.statsList.map(p => [p.name, p]))
  }, [compareData])

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

  const handleCompareClick = (pokemonName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setComparingPokemon(comparingPokemon === pokemonName ? null : pokemonName)
  }

  // Get comparison data for a specific Pokemon
  const getComparisonForPokemon = (name: string) => {
    if (!comparingPokemon || comparingPokemon !== name) return null
    
    const marchPokemon = monthsData.march.statsList.find(p => p.name === name)
    const aprilPokemon = monthsData.april.statsList.find(p => p.name === name)
    const mayPokemon = monthsData.may.statsList.find(p => p.name === name)
    
    return { march: marchPokemon, april: aprilPokemon, may: mayPokemon }
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
          
          {/* Month Selector */}
          <Select value={selectedMonth} onValueChange={(v: MonthKey) => setSelectedMonth(v)}>
            <SelectTrigger className="w-40 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="may">May 2026</SelectItem>
              <SelectItem value="april">April 2026</SelectItem>
              <SelectItem value="march">March 2026</SelectItem>
            </SelectContent>
          </Select>

          {/* Compare Month Selector */}
          <Select value={compareMonth || "none"} onValueChange={(v) => setCompareMonth(v === "none" ? null : v as MonthKey)}>
            <SelectTrigger className="w-44 bg-secondary border-border">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Compare to..." />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="none">No comparison</SelectItem>
              {selectedMonth !== "may" && <SelectItem value="may">May 2026</SelectItem>}
              {selectedMonth !== "april" && <SelectItem value="april">April 2026</SelectItem>}
              {selectedMonth !== "march" && <SelectItem value="march">March 2026</SelectItem>}
            </SelectContent>
          </Select>

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

        {/* Comparison indicator */}
        {compareMonth && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-2 text-sm"
          >
            <GitCompare className="w-4 h-4 text-amber-500" />
            <span>
              Comparing <strong>{monthLabels[selectedMonth]}</strong> vs <strong>{monthLabels[compareMonth]}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-6 px-2"
              onClick={() => setCompareMonth(null)}
            >
              <X className="w-3 h-3" />
            </Button>
          </motion.div>
        )}

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
                    <th className="text-center p-4 font-medium text-muted-foreground w-24">Trends</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredAndSorted.slice(0, 100).map((pokemon, index) => {
                      const comparePokemon = compareMap.get(pokemon.name)
                      const comparisonData = getComparisonForPokemon(pokemon.name)
                      
                      return (
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
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${pokemon.rank <= 3 ? "text-amber-500" : pokemon.rank <= 10 ? "text-foreground" : "text-muted-foreground"}`}>
                                #{pokemon.rank}
                              </span>
                              {compareMonth && <RankChange current={pokemon.rank} previous={comparePokemon?.rank} />}
                            </div>
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
                              {compareMonth && <StatChange current={pokemon.usageRate} previous={comparePokemon?.usageRate} suffix="%" />}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${pokemon.winRate >= 52 ? "text-emerald-500" : pokemon.winRate <= 48 ? "text-red-500" : "text-foreground"}`}>
                                {pokemon.winRate.toFixed(1)}%
                              </span>
                              {compareMonth && <StatChange current={pokemon.winRate} previous={comparePokemon?.winRate} suffix="%" />}
                            </div>
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
                          <td className="p-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 px-2 ${comparingPokemon === pokemon.name ? "bg-amber-500/20 text-amber-500" : ""}`}
                              onClick={(e) => handleCompareClick(pokemon.name, e)}
                            >
                              <GitCompare className="w-4 h-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      )
                    })}
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
              {filteredAndSorted.slice(0, 50).map((pokemon, index) => {
                const comparePokemon = compareMap.get(pokemon.name)
                
                return (
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
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${pokemon.rank <= 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                          #{pokemon.rank}
                        </span>
                        {compareMonth && <RankChange current={pokemon.rank} previous={comparePokemon?.rank} />}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${pokemon.winRate >= 52 ? "text-emerald-500" : pokemon.winRate <= 48 ? "text-red-500" : "text-foreground"}`}>
                          {pokemon.winRate.toFixed(1)}% WR
                        </span>
                        {compareMonth && <StatChange current={pokemon.winRate} previous={comparePokemon?.winRate} />}
                      </div>
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
                        {compareMonth && <StatChange current={pokemon.usageRate} previous={comparePokemon?.usageRate} />}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 px-2 text-xs ${comparingPokemon === pokemon.name ? "bg-amber-500/20 text-amber-500" : ""}`}
                        onClick={(e) => handleCompareClick(pokemon.name, e)}
                      >
                        <GitCompare className="w-3 h-3 mr-1" />
                        Compare
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Comparison Panel */}
        <AnimatePresence>
          {comparingPokemon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[700px] bg-card border border-amber-500/50 rounded-lg p-4 shadow-xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSpriteUrl(comparingPokemon)}
                    alt={comparingPokemon}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{comparingPokemon}</h3>
                    <p className="text-xs text-muted-foreground">Monthly Trend Comparison</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setComparingPokemon(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground">Month</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">Rank</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">Usage</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">Win Rate</th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground">Wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["march", "april", "may"] as MonthKey[]).map((month) => {
                      const data = monthsData[month].statsList.find(p => p.name === comparingPokemon)
                      const prevMonth = month === "april" ? "march" : month === "may" ? "april" : null
                      const prevData = prevMonth ? monthsData[prevMonth].statsList.find(p => p.name === comparingPokemon) : null
                      
                      if (!data) {
                        return (
                          <tr key={month} className="border-b border-border/50">
                            <td className="py-2 px-3 font-medium">{monthLabels[month]}</td>
                            <td colSpan={4} className="py-2 px-3 text-center text-muted-foreground">Not in tier</td>
                          </tr>
                        )
                      }
                      
                      return (
                        <tr key={month} className={`border-b border-border/50 ${month === selectedMonth ? "bg-amber-500/10" : ""}`}>
                          <td className="py-2 px-3 font-medium">
                            {monthLabels[month]}
                            {month === selectedMonth && <span className="ml-2 text-xs text-amber-500">(current)</span>}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className={data.rank <= 10 ? "text-amber-500 font-bold" : ""}>#{data.rank}</span>
                              {prevData && <RankChange current={data.rank} previous={prevData.rank} />}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span>{data.usageRate.toFixed(1)}%</span>
                              {prevData && <StatChange current={data.usageRate} previous={prevData.usageRate} />}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className={data.winRate >= 52 ? "text-emerald-500" : data.winRate <= 48 ? "text-red-500" : ""}>
                                {data.winRate.toFixed(1)}%
                              </span>
                              {prevData && <StatChange current={data.winRate} previous={prevData.winRate} />}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center text-muted-foreground">
                            {data.wins.toLocaleString()}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedPokemon && !comparingPokemon && (
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
