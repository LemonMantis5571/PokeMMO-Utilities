'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, TrendingUp, Users, ChevronUp, ChevronDown, Search, CheckSquare, Square } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Footer from '@/components/Footer'
import trainersData from '@/data/trainers.mock.data.json'

const REGIONS = ['All', 'Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Teselia'] as const
type Region = typeof REGIONS[number]

interface Trainer {
  name: string
  city: string
  income: number
  region: string
  isSpecial?: boolean
  isE4?: boolean
}

const trainerKey = (trainer: Trainer) => `${trainer.name}-${trainer.city}-${trainer.region}`

const dedupeTrainers = (trainers: Trainer[]) => Array.from(
  new Map(trainers.map(trainer => [trainerKey(trainer), trainer])).values()
)

// Build flat trainer list: gym leaders + special trainers + E4
const ALL_TRAINERS: Trainer[] = dedupeTrainers([
  ...trainersData.GymLeaders.map(t => ({ ...t, isSpecial: false, isE4: false })),
  ...trainersData.SpecialTrainers.map(t => ({ ...t, isSpecial: true, isE4: false })),
  ...Object.entries(trainersData.E4).map(([region, data]) => ({
    name: `${region} Elite 4`,
    city: region,
    income: data.income,
    region,
    isSpecial: false,
    isE4: true,
  })),
])

const BOOSTERS = [
  { name: 'No Boost', key: 'none', multiplier: 1, defaultCost: 0, color: 'text-zinc-400', bg: 'bg-zinc-800' },
  { name: 'Amulet Coin', key: 'amulet', multiplier: 1.5, defaultCost: 17000, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { name: 'Riches Charm 75%', key: 'charm75', multiplier: 1.75, defaultCost: 64000, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Riches Charm 100%', key: 'charm100', multiplier: 2, defaultCost: 98000, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
] as const

type BoosterKey = typeof BOOSTERS[number]['key']

const fmt = (n: number) => `¥${Math.round(n).toLocaleString()}`

export default function IncomeCheckPage() {
  const [mounted, setMounted] = useState(false)
  const [region, setRegion] = useState<Region>('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [runs, setRuns] = useState([1]) // Slider requires an array
  const [boosterCosts, setBoosterCosts] = useState<Record<BoosterKey, number>>({
    none: 0,
    amulet: 17000,
    charm75: 64000,
    charm100: 98000,
  })
  const [sortCol, setSortCol] = useState<'name' | 'income' | 'region'>('region')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Prevent hydration mismatch — only render interactive parts client-side
  useEffect(() => { setMounted(true) }, [])

  // Filtered trainer list
  const filtered = useMemo(() => {
    let list = ALL_TRAINERS
    if (region !== 'All') list = list.filter(t => t.region === region)
    if (search.trim()) list = list.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.city.toLowerCase().includes(search.toLowerCase())
    )
    return [...list].sort((a, b) => {
      let valA: string | number = a[sortCol]
      let valB: string | number = b[sortCol]
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()
      return sortDir === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1)
    })
  }, [region, search, sortCol, sortDir])

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const toggleTrainer = (key: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const toggleAllFiltered = () => {
    const keys = filtered.map(trainerKey)
    const allSelected = keys.every(k => selected.has(k))
    setSelected(prev => {
      const next = new Set(prev)
      keys.forEach(k => allSelected ? next.delete(k) : next.add(k))
      return next
    })
  }

  const allFilteredSelected = filtered.length > 0 && filtered.every(t => selected.has(trainerKey(t)))

  // Income of selected trainers
  const selectedTrainers = ALL_TRAINERS.filter(t => selected.has(trainerKey(t)))
  const baseIncome = selectedTrainers.reduce((sum, t) => sum + t.income, 0)
  const currentRuns = runs[0]

  const results = BOOSTERS.map(b => {
    const gross = baseIncome * b.multiplier * currentRuns
    const cost = boosterCosts[b.key] * currentRuns
    const profit = gross - cost
    return { ...b, gross, cost, profit }
  })

  const SortIcon = ({ col }: { col: typeof sortCol }) => (
    sortCol === col
      ? (sortDir === 'asc' ? <ChevronUp className="w-4 h-4 inline ml-1" /> : <ChevronDown className="w-4 h-4 inline ml-1" />)
      : <ChevronUp className="w-4 h-4 inline ml-1 opacity-20" />
  )

  return (
    <div className="min-h-[100dvh] grid grid-rows-[1fr_auto]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-subtitle mb-2">PvE Utility</p>
          <h1 className="section-title flex items-center gap-3">
            <Coins className="w-8 h-8 text-yellow-500" />
            <span>Income <span className="text-yellow-500">Check</span></span>
          </h1>
          <p className="text-zinc-500 mt-2">
            Select trainers, apply boosters, and calculate your gym run income.
          </p>
        </motion.div>

        {!mounted ? (
          /* Skeleton shown during SSR / before hydration */
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 animate-pulse">
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 h-24" />
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 h-96" />
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 h-48" />
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 h-32" />
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 h-64" />
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-6">
            {/* Left — Trainer Picker */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              {/* Search + Region Tabs */}
              <Card className="border-zinc-800 bg-zinc-950">
                <CardContent className="p-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      placeholder="Search trainer or city..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-9 bg-zinc-900 border-zinc-800 text-white"
                      id="trainer-search"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map(r => (
                      <Button
                        key={r}
                        onClick={() => setRegion(r)}
                        variant={region === r ? "default" : "outline"}
                        size="sm"
                        className={region === r ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"}
                        id={`region-${r}`}
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Table */}
              <Card className="border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col">
                <CardHeader className="border-b border-zinc-800 bg-zinc-900/50 py-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Trainers</span>
                    <span className="text-sm font-normal text-zinc-500">{filtered.length} visible</span>
                  </CardTitle>
                </CardHeader>
                <div className="max-h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader className="bg-zinc-900/80 sticky top-0 z-10">
                      <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="w-[50px] text-center">
                          <Button variant="ghost" size="icon" onClick={toggleAllFiltered} className="h-8 w-8 hover:bg-zinc-800">
                            {allFilteredSelected
                              ? <CheckSquare className="w-5 h-5 text-yellow-500" />
                              : <Square className="w-5 h-5 text-zinc-500" />}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => toggleSort('name')} className="px-0 hover:bg-transparent text-zinc-400 hover:text-white text-xs uppercase tracking-wider">
                            Trainer <SortIcon col="name" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => toggleSort('income')} className="px-0 hover:bg-transparent text-zinc-400 hover:text-white text-xs uppercase tracking-wider">
                            Income <SortIcon col="income" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-zinc-400 text-xs uppercase tracking-wider">
                          City
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => toggleSort('region')} className="px-0 hover:bg-transparent text-zinc-400 hover:text-white text-xs uppercase tracking-wider">
                            Region <SortIcon col="region" />
                          </Button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filtered.length === 0 ? (
                          <TableRow className="border-none hover:bg-transparent">
                            <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                              No trainers found matching your criteria.
                            </TableCell>
                          </TableRow>
                        ) : filtered.map((trainer, i) => {
                          const key = trainerKey(trainer)
                          const isSelected = selected.has(key)
                          return (
                            <motion.tr
                              key={key}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.01 }}
                              className={`border-zinc-800/50 cursor-pointer transition-colors ${
                                isSelected ? 'bg-yellow-500/10 hover:bg-yellow-500/20' : 'hover:bg-zinc-900'
                              }`}
                              onClick={() => toggleTrainer(key)}
                            >
                              <TableCell className="text-center py-3">
                                <Checkbox
                                  checked={isSelected}
                                  className="pointer-events-none data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                                />
                              </TableCell>
                              <TableCell className="font-medium text-white py-3">
                                {trainer.name}
                                {trainer.isE4 && <Badge variant="outline" className="ml-2 text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/20">E4</Badge>}
                                {trainer.isSpecial && <Badge variant="outline" className="ml-2 text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">Special</Badge>}
                              </TableCell>
                              <TableCell className="text-yellow-400 font-mono py-3">{fmt(trainer.income)}</TableCell>
                              <TableCell className="text-zinc-500 py-3">{trainer.city}</TableCell>
                              <TableCell className="text-zinc-500 py-3">
                                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">{trainer.region}</Badge>
                              </TableCell>
                            </motion.tr>
                          )
                        })}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </motion.div>

            {/* Right — Calculator */}
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              
              {/* Selection Summary */}
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Selection</CardTitle>
                  <CardDescription>Currently selected trainers and base income.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center border border-zinc-800">
                      <Users className="w-5 h-5 text-zinc-500 mb-2" />
                      <p className="text-2xl font-bold text-white">{selected.size}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Trainers</p>
                    </div>
                    <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center border border-zinc-800">
                      <Coins className="w-5 h-5 text-yellow-500 mb-2" />
                      <p className="text-2xl font-bold text-yellow-400">{fmt(baseIncome)}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Base / Run</p>
                    </div>
                  </div>
                  {selected.size > 0 && (
                    <Button
                      variant="destructive"
                      className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
                      onClick={() => setSelected(new Set())}
                    >
                      Clear Selection
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Run Settings */}
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Run Settings</CardTitle>
                  <CardDescription>Adjust number of runs and custom item costs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-zinc-300">Number of Runs</label>
                      <span className="text-lg font-bold text-white">{currentRuns}×</span>
                    </div>
                    <Slider
                      value={runs}
                      onValueChange={setRuns}
                      max={20}
                      min={1}
                      step={1}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300">Custom GTL Costs</label>
                    <div className="space-y-2">
                      {BOOSTERS.slice(1).map(b => (
                        <div key={b.key} className="flex items-center gap-3">
                          <span className={`text-sm w-36 shrink-0 ${b.color}`}>{b.name}</span>
                          <Input
                            type="number"
                            min={0}
                            value={boosterCosts[b.key]}
                            onChange={e => setBoosterCosts(prev => ({ ...prev, [b.key]: Number(e.target.value) }))}
                            className="bg-zinc-900 border-zinc-800 text-white h-8"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income Results */}
              <Card className="border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col">
                <CardHeader className="bg-zinc-900/50 border-b border-zinc-800 py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Income Results
                  </CardTitle>
                  <CardDescription>
                    Total calculated for {currentRuns} run{currentRuns > 1 ? 's' : ''}.
                  </CardDescription>
                </CardHeader>
                <div className="divide-y divide-zinc-800/50">
                  {results.map(item => (
                    <div key={item.key} className={`p-4 transition-colors hover:bg-zinc-900/50`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-semibold ${item.color}`}>{item.name}</span>
                        <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">{item.multiplier}× Multiplier</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div className="bg-zinc-900 rounded-lg p-2 border border-zinc-800/50">
                          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Gross Income</p>
                          <p className="text-white font-mono">{fmt(item.gross)}</p>
                        </div>
                        <div className="bg-zinc-900 rounded-lg p-2 border border-zinc-800/50">
                          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Booster Cost</p>
                          <p className="text-white font-mono">{item.cost > 0 ? fmt(item.cost) : '—'}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <span className="text-zinc-400 font-medium text-sm">Net Profit</span>
                        <span className={`text-xl font-bold font-mono tracking-tight ${
                          item.profit > 0 ? 'text-green-500' : item.profit < 0 ? 'text-red-500' : 'text-zinc-400'
                        }`}>
                          {item.profit >= 0 ? '+' : ''}{fmt(item.profit)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>

      <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
    </div>
  )
}
