'use client'

/* eslint-disable @next/next/no-img-element */
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState, useCallback } from 'react'
import Footer from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  type BattlePokemonState,
  applySetToState,
  calculateMoveResults,
  createDefaultPokemonState,
  defaultFieldState,
  getAbilityOptions,
  getPokemonTypes,
  getSetOptions,
  getSpeciesSprite,
  getSpeciesTier,
  getSuggestedMoves,
  getTypeBadgeClass,
  itemOptions,
  moveOptions,
  natureOptions,
  pokemonOptions,
  statusOptions,
  terrainOptions,
  weatherOptions,
} from '@/lib/damageCalculator'
import { ArrowRightLeft, FlaskConical, Shield, Swords, Zap, Search, ChevronDown } from 'lucide-react'

type DefenseState = {
  reflect: boolean
  lightScreen: boolean
}

type FieldState = ReturnType<typeof defaultFieldState> & {
  left: DefenseState
  right: DefenseState
}

type StatKey = keyof BattlePokemonState['evs']

const EV_LABELS: { key: StatKey; label: string; short: string }[] = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'atk', label: 'Attack', short: 'Atk' },
  { key: 'def', label: 'Defense', short: 'Def' },
  { key: 'spa', label: 'Sp. Atk', short: 'SpA' },
  { key: 'spd', label: 'Sp. Def', short: 'SpD' },
  { key: 'spe', label: 'Speed', short: 'Spe' },
]

const EV_PRESETS = [
  { label: 'Physical Sweeper', evs: { hp: 0, atk: 252, def: 0, spa: 0, spd: 0, spe: 252 }, nature: 'Jolly' },
  { label: 'Special Sweeper', evs: { hp: 0, atk: 0, def: 0, spa: 252, spd: 0, spe: 252 }, nature: 'Timid' },
  { label: 'Physical Tank', evs: { hp: 252, atk: 0, def: 252, spa: 0, spd: 0, spe: 0 }, nature: 'Impish' },
  { label: 'Special Tank', evs: { hp: 252, atk: 0, def: 0, spa: 0, spd: 252, spe: 0 }, nature: 'Calm' },
  { label: 'Mixed Bulk', evs: { hp: 252, atk: 0, def: 128, spa: 0, spd: 128, spe: 0 }, nature: 'Bold' },
]

const createFieldState = (): FieldState => ({
  ...defaultFieldState(),
  left: { reflect: false, lightScreen: false },
  right: { reflect: false, lightScreen: false },
})

export default function DamageCalculatorPage() {
  const [leftPokemon, setLeftPokemon] = useState<BattlePokemonState>(() => createDefaultPokemonState('Gengar'))
  const [rightPokemon, setRightPokemon] = useState<BattlePokemonState>(() => createDefaultPokemonState('Blissey'))
  const [field, setField] = useState<FieldState>(() => createFieldState())

  const leftResults = useMemo(
    () => calculateMoveResults(leftPokemon, rightPokemon, {
      weather: field.weather,
      terrain: field.terrain,
      attackerReflect: field.left.reflect,
      attackerLightScreen: field.left.lightScreen,
      defenderReflect: field.right.reflect,
      defenderLightScreen: field.right.lightScreen,
    }),
    [field, leftPokemon, rightPokemon],
  )

  const rightResults = useMemo(
    () => calculateMoveResults(rightPokemon, leftPokemon, {
      weather: field.weather,
      terrain: field.terrain,
      attackerReflect: field.right.reflect,
      attackerLightScreen: field.right.lightScreen,
      defenderReflect: field.left.reflect,
      defenderLightScreen: field.left.lightScreen,
    }),
    [field, leftPokemon, rightPokemon],
  )

  const leftBest = leftResults.find((result) => result.isBest) ?? leftResults[0]
  const rightBest = rightResults.find((result) => result.isBest) ?? rightResults[0]

  const swapSides = useCallback(() => {
    setLeftPokemon(rightPokemon)
    setRightPokemon(leftPokemon)
    setField((current) => ({
      ...current,
      left: current.right,
      right: current.left,
    }))
  }, [leftPokemon, rightPokemon])

  return (
    <div className="min-h-[100dvh] grid grid-rows-[1fr_auto] bg-background">
      <div className="container mx-auto max-w-[1600px] px-3 py-4 md:px-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FlaskConical className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
              Damage <span className="text-primary">Calculator</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <FieldDropdown field={field} onChange={setField} />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-border bg-card hover:border-primary/50 hover:bg-secondary"
              onClick={swapSides}
              title="Swap sides"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <PokemonPanel
            side="left"
            accentClass="text-red-400"
            pokemon={leftPokemon}
            onChange={setLeftPokemon}
            results={leftResults}
            bestResult={leftBest}
            opponentName={rightPokemon.species}
          />

          {/* Center Summary */}
          <div className="hidden lg:flex flex-col gap-3 w-[280px]">
            <QuickSummary
              attacker={leftPokemon.species}
              defender={rightPokemon.species}
              result={leftBest}
              accentClass="text-red-400"
              icon={<Swords className="h-4 w-4" />}
            />
            <QuickSummary
              attacker={rightPokemon.species}
              defender={leftPokemon.species}
              result={rightBest}
              accentClass="text-cyan-400"
              icon={<Zap className="h-4 w-4" />}
            />
          </div>

          <PokemonPanel
            side="right"
            accentClass="text-cyan-400"
            pokemon={rightPokemon}
            onChange={setRightPokemon}
            results={rightResults}
            bestResult={rightBest}
            opponentName={leftPokemon.species}
          />
        </div>

        {/* Mobile Summary */}
        <div className="lg:hidden mt-4 grid gap-3 sm:grid-cols-2">
          <QuickSummary
            attacker={leftPokemon.species}
            defender={rightPokemon.species}
            result={leftBest}
            accentClass="text-red-400"
            icon={<Swords className="h-4 w-4" />}
          />
          <QuickSummary
            attacker={rightPokemon.species}
            defender={leftPokemon.species}
            result={rightBest}
            accentClass="text-cyan-400"
            icon={<Zap className="h-4 w-4" />}
          />
        </div>
      </div>

      <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
    </div>
  )
}

function QuickSummary({
  attacker,
  defender,
  result,
  accentClass,
  icon,
}: {
  attacker: string
  defender: string
  result: ReturnType<typeof calculateMoveResults>[0] | undefined
  accentClass: string
  icon: React.ReactNode
}) {
  const koLabel = result ? getKoLabel(result.percentage[0], result.percentage[1]) : null
  
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className={accentClass}>{icon}</span>
          <span className="text-xs text-muted-foreground truncate">
            {attacker} vs {defender}
          </span>
        </div>
        {result && result.damage[1] > 0 ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${accentClass}`}>{result.move}</span>
              {koLabel && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getKoBadgeStyle(koLabel)}`}>
                  {koLabel}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getDamageBarColor(result.percentage[1])}`}
                  style={{ width: `${Math.min(result.percentage[1], 100)}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {result.percentage[0]}-{result.percentage[1]}%
              </span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No damaging move</p>
        )}
      </CardContent>
    </Card>
  )
}

function PokemonPanel({
  side,
  accentClass,
  pokemon,
  onChange,
  results,
  bestResult,
  opponentName,
}: {
  side: 'left' | 'right'
  accentClass: string
  pokemon: BattlePokemonState
  onChange: Dispatch<SetStateAction<BattlePokemonState>>
  results: ReturnType<typeof calculateMoveResults>
  bestResult: ReturnType<typeof calculateMoveResults>[0] | undefined
  opponentName: string
}) {
  const sprite = getSpeciesSprite(pokemon.species)
  const types = getPokemonTypes(pokemon.species)
  const abilities = getAbilityOptions(pokemon.species)
  const sets = getSetOptions(pokemon.species)
  const suggestedMoves = getSuggestedMoves(pokemon.species)
  const tier = getSpeciesTier(pokemon.species)

  const updatePokemon = useCallback((updater: (current: BattlePokemonState) => BattlePokemonState) => {
    onChange((current) => updater(current))
  }, [onChange])

  const handleSpeciesChange = useCallback((species: string) => {
    onChange(createDefaultPokemonState(species))
  }, [onChange])

  const applyPreset = useCallback((preset: typeof EV_PRESETS[0]) => {
    updatePokemon((current) => ({
      ...current,
      evs: preset.evs,
      nature: preset.nature,
    }))
  }, [updatePokemon])

  const fillSuggestedMoves = useCallback(() => {
    updatePokemon((current) => ({
      ...current,
      moves: suggestedMoves.slice(0, 4),
    }))
  }, [updatePokemon, suggestedMoves])

  return (
    <Card className="border-border bg-card overflow-hidden">
      {/* Pokemon Header */}
      <CardHeader className="border-b border-border px-4 py-3">
        <div className="flex items-start gap-3">
          {sprite && <img src={sprite} alt={pokemon.species} className="h-16 w-16 shrink-0" />}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {tier}
              </Badge>
              {types.map((type) => (
                <span key={type} className={getTypeBadgeClass(type)} style={{ fontSize: '10px', padding: '2px 6px' }}>
                  {type}
                </span>
              ))}
            </div>
            <PokemonSearchInput value={pokemon.species} onChange={handleSpeciesChange} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Quick Config Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Level</Label>
            <Input
              type="number"
              min={1}
              max={100}
              value={pokemon.level}
              onChange={(e) => updatePokemon((c) => ({ ...c, level: clampNumber(e.target.value, 1, 100) }))}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Nature</Label>
            <Select value={pokemon.nature} onValueChange={(v) => updatePokemon((c) => ({ ...c, nature: v }))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {natureOptions.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Ability</Label>
            <Select value={pokemon.ability} onValueChange={(v) => updatePokemon((c) => ({ ...c, ability: v }))}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {abilities.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Item</Label>
            <ItemSearchInput value={pokemon.item} onChange={(v) => updatePokemon((c) => ({ ...c, item: v }))} />
          </div>
        </div>

        {/* Set & Status Row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Set</Label>
            <Select
              value={pokemon.setName || '__custom__'}
              onValueChange={(v) => updatePokemon((c) => v === '__custom__' ? { ...c, setName: '' } : applySetToState(c, v))}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Custom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__custom__">Custom</SelectItem>
                {sets.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Status</Label>
            <Select
              value={pokemon.status || '__healthy__'}
              onValueChange={(v) => updatePokemon((c) => ({ ...c, status: v === '__healthy__' ? '' : v as BattlePokemonState['status'] }))}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => <SelectItem key={s.label} value={s.value || '__healthy__'}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* HP Slider */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-muted-foreground">Current HP</span>
            <span className="text-sm font-mono text-foreground">{pokemon.currentHpPercent}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={pokemon.currentHpPercent}
            onChange={(e) => updatePokemon((c) => ({ ...c, currentHpPercent: clampNumber(e.target.value, 1, 100) }))}
            className="w-full accent-primary h-2"
          />
        </div>

        {/* EVs Section */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase text-muted-foreground">EVs</span>
            <div className="flex gap-1">
              {EV_PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
                  onClick={() => applyPreset(preset)}
                  title={preset.label}
                >
                  {preset.label.split(' ')[0]}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
                onClick={() => updatePokemon((c) => ({ ...c, evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 } }))}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {EV_LABELS.map((stat) => (
              <div key={stat.key} className="text-center">
                <Label className="text-[9px] text-muted-foreground block mb-1">{stat.short}</Label>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  step={4}
                  value={pokemon.evs[stat.key]}
                  onChange={(e) => updatePokemon((c) => ({ ...c, evs: { ...c.evs, [stat.key]: clampEv(e.target.value) } }))}
                  className="h-7 text-xs text-center px-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Moves Section */}
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase text-muted-foreground">Moves</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
              onClick={fillSuggestedMoves}
            >
              Auto-fill
            </Button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-1 mb-2">
            {suggestedMoves.slice(0, 6).map((move) => (
              <button
                key={move}
                onClick={() => {
                  const emptyIndex = pokemon.moves.findIndex((m) => !m)
                  if (emptyIndex !== -1) {
                    updatePokemon((c) => ({
                      ...c,
                      moves: c.moves.map((m, i) => i === emptyIndex ? move : m),
                    }))
                  }
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-card border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                {move}
              </button>
            ))}
          </div>

          {/* Move Inputs with Results */}
          <div className="space-y-1.5">
            {pokemon.moves.map((move, index) => {
              const result = results[index]
              const koLabel = result ? getKoLabel(result.percentage[0], result.percentage[1]) : null
              const isBest = result?.isBest && result.damage[1] > 0

              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <MoveSearchInput
                      value={move}
                      suggestions={suggestedMoves}
                      placeholder={`Move ${index + 1}`}
                      onChange={(v) => updatePokemon((c) => ({ ...c, moves: c.moves.map((m, i) => i === index ? v : m) }))}
                    />
                  </div>
                  {result && result.damage[1] > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      {isBest && (
                        <span className="text-[9px] px-1 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 font-bold">
                          BEST
                        </span>
                      )}
                      {koLabel && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded border font-bold ${getKoBadgeStyle(koLabel)}`}>
                          {koLabel}
                        </span>
                      )}
                      <span className="text-[10px] tabular-nums text-muted-foreground w-16 text-right">
                        {result.percentage[0]}-{result.percentage[1]}%
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FieldDropdown({
  field,
  onChange,
}: {
  field: FieldState
  onChange: Dispatch<SetStateAction<FieldState>>
}) {
  const [open, setOpen] = useState(false)
  const hasActiveConditions = field.weather || field.terrain || field.left.reflect || field.left.lightScreen || field.right.reflect || field.right.lightScreen

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-9 px-3 border-border bg-card hover:bg-secondary gap-2 ${hasActiveConditions ? 'border-primary/50' : ''}`}
        >
          <Shield className="h-4 w-4" />
          <span className="text-xs">Field</span>
          {hasActiveConditions && <span className="h-2 w-2 rounded-full bg-primary" />}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" align="end">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Weather</Label>
              <Select
                value={field.weather || '__none__'}
                onValueChange={(v) => onChange((c) => ({ ...c, weather: v === '__none__' ? '' : v as FieldState['weather'] }))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weatherOptions.map((w) => <SelectItem key={w.label} value={w.value || '__none__'}>{w.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Terrain</Label>
              <Select
                value={field.terrain || '__none__'}
                onValueChange={(v) => onChange((c) => ({ ...c, terrain: v === '__none__' ? '' : v as FieldState['terrain'] }))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {terrainOptions.map((t) => <SelectItem key={t.label} value={t.value || '__none__'}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-muted-foreground">Left Side</p>
              <label className="flex items-center gap-2 text-xs">
                <Checkbox checked={field.left.reflect} onCheckedChange={(c) => onChange((f) => ({ ...f, left: { ...f.left, reflect: c === true } }))} />
                Reflect
              </label>
              <label className="flex items-center gap-2 text-xs">
                <Checkbox checked={field.left.lightScreen} onCheckedChange={(c) => onChange((f) => ({ ...f, left: { ...f.left, lightScreen: c === true } }))} />
                Light Screen
              </label>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-muted-foreground">Right Side</p>
              <label className="flex items-center gap-2 text-xs">
                <Checkbox checked={field.right.reflect} onCheckedChange={(c) => onChange((f) => ({ ...f, right: { ...f.right, reflect: c === true } }))} />
                Reflect
              </label>
              <label className="flex items-center gap-2 text-xs">
                <Checkbox checked={field.right.lightScreen} onCheckedChange={(c) => onChange((f) => ({ ...f, right: { ...f.right, lightScreen: c === true } }))} />
                Light Screen
              </label>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full h-7 text-xs"
            onClick={() => onChange(createFieldState())}
          >
            Reset Field
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function PokemonSearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return pokemonOptions.slice(0, 50)
    const lower = search.toLowerCase()
    return pokemonOptions.filter((p) => p.name.toLowerCase().includes(lower)).slice(0, 50)
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-9 text-sm font-bold">
          {value}
          <Search className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search Pokemon..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No Pokemon found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((p) => (
                <CommandItem
                  key={p.name}
                  value={p.name}
                  onSelect={() => { onChange(p.name); setOpen(false); setSearch('') }}
                  className="flex items-center gap-2"
                >
                  {getSpeciesSprite(p.name) && <img src={getSpeciesSprite(p.name)!} alt="" className="h-6 w-6" />}
                  <span>{p.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">#{String(p.number).padStart(3, '0')}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function MoveSearchInput({
  value,
  suggestions,
  placeholder,
  onChange,
}: {
  value: string
  suggestions: string[]
  placeholder: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return []
    const lower = search.toLowerCase()
    return moveOptions.filter((m) => m.toLowerCase().includes(lower)).slice(0, 30)
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-8 text-xs font-normal">
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>{value || placeholder}</span>
          <Search className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search move..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>Type to search moves...</CommandEmpty>
            {suggestions.length > 0 && !search && (
              <CommandGroup heading="Suggested">
                {suggestions.slice(0, 6).map((m) => (
                  <CommandItem key={`s-${m}`} value={m} onSelect={() => { onChange(m); setOpen(false); setSearch('') }}>
                    {m}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filtered.length > 0 && (
              <CommandGroup heading="Results">
                {filtered.map((m) => (
                  <CommandItem key={m} value={m} onSelect={() => { onChange(m); setOpen(false); setSearch('') }}>
                    {m}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ItemSearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return itemOptions.slice(0, 30)
    const lower = search.toLowerCase()
    return itemOptions.filter((i) => i.toLowerCase().includes(lower)).slice(0, 30)
  }, [search])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-8 text-xs font-normal">
          <span className={value ? 'text-foreground truncate' : 'text-muted-foreground'}>{value || 'None'}</span>
          <Search className="h-3 w-3 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search item..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="__none__" onSelect={() => { onChange(''); setOpen(false); setSearch('') }}>
                None
              </CommandItem>
              {filtered.map((i) => (
                <CommandItem key={i} value={i} onSelect={() => { onChange(i); setOpen(false); setSearch('') }}>
                  {i}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function getKoLabel(minPercent: number, maxPercent: number): string | null {
  if (minPercent <= 0 && maxPercent <= 0) return null
  if (minPercent >= 100) return 'OHKO'
  if (maxPercent >= 100) return 'pOHKO'
  if (minPercent >= 50) return '2HKO'
  if (maxPercent >= 50) return 'p2HKO'
  if (minPercent >= 34) return '3HKO'
  if (maxPercent >= 34) return 'p3HKO'
  if (minPercent >= 25) return '4HKO'
  return `${Math.ceil(100 / Math.max(maxPercent, 0.1))}HKO`
}

function getKoBadgeStyle(koLabel: string | null): string {
  if (!koLabel) return 'border-border bg-secondary text-muted-foreground'
  if (koLabel === 'OHKO') return 'border-red-500/60 bg-red-500/20 text-red-300'
  if (koLabel === 'pOHKO') return 'border-orange-500/50 bg-orange-500/15 text-orange-300'
  if (koLabel === '2HKO') return 'border-amber-500/50 bg-amber-500/15 text-amber-300'
  if (koLabel === 'p2HKO') return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
  if (koLabel === '3HKO') return 'border-green-500/40 bg-green-500/10 text-green-300'
  return 'border-border bg-secondary text-muted-foreground'
}

function getDamageBarColor(maxPercent: number): string {
  if (maxPercent >= 100) return 'bg-red-500'
  if (maxPercent >= 50) return 'bg-orange-500'
  if (maxPercent >= 25) return 'bg-yellow-500'
  if (maxPercent > 0) return 'bg-emerald-500'
  return 'bg-muted'
}

function clampNumber(value: string, min: number, max: number) {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return min
  return Math.min(max, Math.max(min, Math.round(parsed)))
}

function clampEv(value: string) {
  const parsed = clampNumber(value, 0, 252)
  return parsed - (parsed % 4)
}
