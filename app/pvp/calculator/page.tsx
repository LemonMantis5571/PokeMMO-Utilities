'use client'

/* eslint-disable @next/next/no-img-element */
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState } from 'react'
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
import { ArrowRightLeft, Crosshair, Shield, Swords, Zap } from 'lucide-react'

type DefenseState = {
  reflect: boolean
  lightScreen: boolean
}

type FieldState = ReturnType<typeof defaultFieldState> & {
  left: DefenseState
  right: DefenseState
}

type StatKey = keyof BattlePokemonState['evs']

const EV_LABELS: { key: StatKey; label: string }[] = [
  { key: 'hp', label: 'HP' },
  { key: 'atk', label: 'Atk' },
  { key: 'def', label: 'Def' },
  { key: 'spa', label: 'SpA' },
  { key: 'spd', label: 'SpD' },
  { key: 'spe', label: 'Spe' },
]

const createFieldState = (): FieldState => ({
  ...defaultFieldState(),
  left: {
    reflect: false,
    lightScreen: false,
  },
  right: {
    reflect: false,
    lightScreen: false,
  },
})

export default function DamageCalculatorPage() {
  const [leftPokemon, setLeftPokemon] = useState<BattlePokemonState>(() =>
    createDefaultPokemonState('Gengar'),
  )
  const [rightPokemon, setRightPokemon] = useState<BattlePokemonState>(() =>
    createDefaultPokemonState('Blissey'),
  )
  const [field, setField] = useState<FieldState>(() => createFieldState())

  const leftResults = useMemo(
    () =>
      calculateMoveResults(leftPokemon, rightPokemon, {
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
    () =>
      calculateMoveResults(rightPokemon, leftPokemon, {
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

  const swapSides = () => {
    setLeftPokemon(rightPokemon)
    setRightPokemon(leftPokemon)
    setField((current) => ({
      ...current,
      left: current.right,
      right: current.left,
    }))
  }

  return (
    <div className="min-h-[100dvh] grid grid-rows-[1fr_auto]">
      <div className="container mx-auto max-w-[1500px] px-3 py-4 md:px-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Crosshair className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-black uppercase tracking-tight text-white md:text-2xl">
              Damage <span className="text-red-500">Calculator</span>
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-zinc-700 bg-zinc-950 hover:border-red-500/50 hover:bg-zinc-900"
            onClick={swapSides}
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Damage Results - Now at the top for faster access */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <DamageSummaryPanel
            title={`${leftPokemon.species} vs ${rightPokemon.species}`}
            iconClass="text-red-400"
            icon={<Swords className="h-4 w-4 text-red-400" />}
            summary={leftBest?.description ?? 'No result'}
            results={leftResults}
          />
          <DamageSummaryPanel
            title={`${rightPokemon.species} vs ${leftPokemon.species}`}
            iconClass="text-cyan-400"
            icon={<Zap className="h-4 w-4 text-cyan-400" />}
            summary={rightBest?.description ?? 'No result'}
            results={rightResults}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)]">
          <PokemonPanel title="Left" accentClass="text-red-400" pokemon={leftPokemon} onChange={setLeftPokemon} />

          <div className="grid gap-4 content-start">
            <CompactFieldPanel field={field} onChange={setField} />
          </div>

          <PokemonPanel title="Right" accentClass="text-cyan-400" pokemon={rightPokemon} onChange={setRightPokemon} />
        </div>
      </div>

      <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
    </div>
  )
}

function PokemonPanel({
  title,
  accentClass,
  pokemon,
  onChange,
}: {
  title: string
  accentClass: string
  pokemon: BattlePokemonState
  onChange: Dispatch<SetStateAction<BattlePokemonState>>
}) {
  const sprite = getSpeciesSprite(pokemon.species)
  const types = getPokemonTypes(pokemon.species)
  const abilities = getAbilityOptions(pokemon.species)
  const sets = getSetOptions(pokemon.species)
  const suggestedMoves = getSuggestedMoves(pokemon.species)
  const tier = getSpeciesTier(pokemon.species)

  const updatePokemon = (updater: (current: BattlePokemonState) => BattlePokemonState) => {
    onChange((current) => updater(current))
  }

  const handleSpeciesChange = (species: string) => {
    onChange(createDefaultPokemonState(species))
  }

  return (
    <Card className="pvp-card overflow-hidden">
      <CardHeader className="border-b border-zinc-800 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">{title}</p>
            <CardTitle className={`mt-1 truncate text-lg ${accentClass}`}>{pokemon.species}</CardTitle>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge className="border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300 hover:bg-zinc-900">
                {tier}
              </Badge>
              {types.map((type) => (
                <span key={type} className={getTypeBadgeClass(type)}>
                  {type}
                </span>
              ))}
            </div>
          </div>
          {sprite ? <img src={sprite} alt={pokemon.species} className="h-14 w-14 shrink-0" /> : null}
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 px-4 py-4">
        <div className="grid gap-3 md:grid-cols-2">
          <CompactField label="Pokemon">
            <PokemonCombobox value={pokemon.species} onChange={handleSpeciesChange} />
          </CompactField>

          <CompactField label="Set">
            <Select
              value={pokemon.setName || '__custom__'}
              onValueChange={(value) =>
                updatePokemon((current) =>
                  value === '__custom__' ? { ...current, setName: '' } : applySetToState(current, value),
                )
              }
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue placeholder="Custom" />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                <SelectItem value="__custom__">Custom</SelectItem>
                {sets.map((setName) => (
                  <SelectItem key={setName} value={setName}>
                    {setName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <CompactField label="Level">
            <Input
              type="number"
              min={1}
              max={100}
              value={pokemon.level}
              onChange={(event) =>
                updatePokemon((current) => ({
                  ...current,
                  level: clampNumber(event.target.value, 1, 100),
                }))
              }
              className="h-8 border-zinc-700 bg-zinc-950 px-2 text-xs"
            />
          </CompactField>

          <CompactField label="Ability">
            <Select
              value={pokemon.ability}
              onValueChange={(value) => updatePokemon((current) => ({ ...current, ability: value }))}
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                {abilities.map((ability) => (
                  <SelectItem key={ability} value={ability}>
                    {ability}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>

          <CompactField label="Nature">
            <Select
              value={pokemon.nature}
              onValueChange={(value) => updatePokemon((current) => ({ ...current, nature: value }))}
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                {natureOptions.map((nature) => (
                  <SelectItem key={nature} value={nature}>
                    {nature}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>

          <CompactField label="Status">
            <Select
              value={pokemon.status || '__healthy__'}
              onValueChange={(value) =>
                updatePokemon((current) => ({
                  ...current,
                  status: value === '__healthy__' ? '' : (value as BattlePokemonState['status']),
                }))
              }
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                {statusOptions.map((status) => (
                  <SelectItem key={status.label} value={status.value || '__healthy__'}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>
        </div>

        <CompactField label="Item">
          <StringCombobox
            value={pokemon.item}
            placeholder="Item"
            emptyLabel="No item found."
            options={itemOptions}
            onChange={(value) => updatePokemon((current) => ({ ...current, item: value }))}
          />
        </CompactField>

        <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            <span>Current HP</span>
            <span className="text-zinc-300">{pokemon.currentHpPercent}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={pokemon.currentHpPercent}
            onChange={(event) =>
              updatePokemon((current) => ({
                ...current,
                currentHpPercent: clampNumber(event.target.value, 1, 100),
              }))
            }
            className="w-full accent-red-500"
          />
        </div>

        <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">EVs</p>
            <Button
              variant="ghost"
              className="h-7 px-2 text-[11px] text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() =>
                updatePokemon((current) => ({
                  ...current,
                  evs: {
                    hp: 0,
                    atk: 0,
                    def: 0,
                    spa: 0,
                    spd: 0,
                    spe: 0,
                  },
                }))
              }
            >
              Reset
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {EV_LABELS.map((stat) => (
              <div key={stat.key} className="space-y-1">
                <Label className="text-[10px] text-zinc-500">{stat.label}</Label>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  step={4}
                  value={pokemon.evs[stat.key]}
                  onChange={(event) =>
                    updatePokemon((current) => ({
                      ...current,
                      evs: {
                        ...current.evs,
                        [stat.key]: clampEv(event.target.value),
                      },
                    }))
                  }
                  className="h-8 border-zinc-700 bg-black px-2 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <p className="mr-auto text-[11px] uppercase tracking-[0.18em] text-zinc-500">Moves</p>
            {suggestedMoves.slice(0, 4).map((move) => (
              <Badge
                key={move}
                className="border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-300 hover:bg-zinc-900"
              >
                {move}
              </Badge>
            ))}
          </div>
          <div className="grid gap-2">
            {pokemon.moves.map((move, index) => (
              <MoveCombobox
                key={`${pokemon.species}-${index}`}
                index={index}
                value={move}
                suggestions={suggestedMoves}
                onChange={(value) =>
                  updatePokemon((current) => ({
                    ...current,
                    moves: current.moves.map((currentMove, moveIndex) =>
                      moveIndex === index ? value : currentMove,
                    ),
                  }))
                }
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CompactField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</Label>
      {children}
    </div>
  )
}

function CompactFieldPanel({
  field,
  onChange,
}: {
  field: FieldState
  onChange: Dispatch<SetStateAction<FieldState>>
}) {
  return (
    <Card className="pvp-card">
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-white">
          <Shield className="h-4 w-4 text-zinc-400" />
          Field
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-4 pb-4 pt-0">
        <div className="grid gap-3">
          <CompactField label="Weather">
            <Select
              value={field.weather || '__none__'}
              onValueChange={(value) =>
                onChange((current) => ({
                  ...current,
                  weather: value === '__none__' ? '' : (value as FieldState['weather']),
                }))
              }
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                {weatherOptions.map((weather) => (
                  <SelectItem key={weather.label} value={weather.value || '__none__'}>
                    {weather.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>

          <CompactField label="Terrain">
            <Select
              value={field.terrain || '__none__'}
              onValueChange={(value) =>
                onChange((current) => ({
                  ...current,
                  terrain: value === '__none__' ? '' : (value as FieldState['terrain']),
                }))
              }
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-950 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-800 bg-black text-white">
                {terrainOptions.map((terrain) => (
                  <SelectItem key={terrain.label} value={terrain.value || '__none__'}>
                    {terrain.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CompactField>
        </div>

        <div className="grid gap-3">
          <DefenseBlock
            title="Left Side"
            state={field.left}
            onChange={(next) => onChange((current) => ({ ...current, left: next }))}
          />
          <DefenseBlock
            title="Right Side"
            state={field.right}
            onChange={(next) => onChange((current) => ({ ...current, right: next }))}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function DefenseBlock({
  title,
  state,
  onChange,
}: {
  title: string
  state: DefenseState
  onChange: (state: DefenseState) => void
}) {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-3">
      <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">{title}</p>
      <div className="grid gap-2">
        <label className="flex items-center gap-2 text-xs text-zinc-300">
          <Checkbox checked={state.reflect} onCheckedChange={(checked) => onChange({ ...state, reflect: checked === true })} />
          Reflect
        </label>
        <label className="flex items-center gap-2 text-xs text-zinc-300">
          <Checkbox checked={state.lightScreen} onCheckedChange={(checked) => onChange({ ...state, lightScreen: checked === true })} />
          Light Screen
        </label>
      </div>
    </div>
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
  if (!koLabel) return 'border-zinc-700 bg-zinc-800/50 text-zinc-500'
  if (koLabel === 'OHKO') return 'border-red-500/60 bg-red-500/20 text-red-300 font-bold'
  if (koLabel === 'pOHKO') return 'border-orange-500/50 bg-orange-500/15 text-orange-300'
  if (koLabel === '2HKO') return 'border-amber-500/50 bg-amber-500/15 text-amber-300'
  if (koLabel === 'p2HKO') return 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
  if (koLabel === '3HKO') return 'border-green-500/40 bg-green-500/10 text-green-300'
  return 'border-zinc-600 bg-zinc-800/50 text-zinc-400'
}

function getDamageBarColor(maxPercent: number): string {
  if (maxPercent >= 100) return 'bg-red-500'
  if (maxPercent >= 50) return 'bg-orange-500'
  if (maxPercent >= 25) return 'bg-yellow-500'
  if (maxPercent > 0) return 'bg-emerald-500'
  return 'bg-zinc-700'
}

function DamageSummaryPanel({
  title,
  icon,
  iconClass,
  summary,
  results,
}: {
  title: string
  iconClass: string
  icon: React.ReactNode
  summary: string
  results: ReturnType<typeof calculateMoveResults>
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const activeIndex = useMemo(() => {
    if (selectedIndex !== null) return selectedIndex
    return results.findIndex((r) => r.isBest)
  }, [selectedIndex, results])

  const displayedResult = results[activeIndex] ?? results[0]
  const displayedDescription = displayedResult?.description || summary

  const maxDamageInSet = useMemo(
    () => Math.max(...results.map((r) => r.damage[1]), 1),
    [results],
  )

  return (
    <Card className="pvp-card">
      <CardHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-white">
            {icon}
            {title}
          </CardTitle>
          <span className="text-[10px] text-zinc-600">Click a move for details</span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 px-4 pb-4 pt-0">
        {/* Description box */}
        <div className={`rounded-md border p-3 transition-colors ${
          activeIndex !== -1 ? `border-zinc-700 bg-zinc-950/80` : 'border-zinc-800 bg-zinc-950/70'
        }`}>
          {displayedResult && (
            <div className="mb-1.5 flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wide ${iconClass}`}>
                {displayedResult.move}
              </span>
              {(() => {
                const ko = getKoLabel(displayedResult.percentage[0], displayedResult.percentage[1])
                return ko ? (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold border ${getKoBadgeStyle(ko)}`}>
                    {ko}
                  </span>
                ) : null
              })()}
            </div>
          )}
          <p className="text-[13px] leading-relaxed text-zinc-300">{displayedDescription}</p>
        </div>

        {/* Move rows */}
        <div className="grid gap-1.5">
          {results.map((result, index) => {
            const active = index === activeIndex
            const barWidth = maxDamageInSet > 0 ? Math.min((result.damage[1] / maxDamageInSet) * 100, 100) : 0
            const koLabel = getKoLabel(result.percentage[0], result.percentage[1])

            return (
              <button
                type="button"
                key={`${result.move}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`group relative w-full cursor-pointer rounded-md border px-3 py-2.5 text-left transition-all ${
                  active
                    ? `border-zinc-600 bg-zinc-900/80 shadow-sm`
                    : 'border-zinc-800/60 bg-zinc-950/50 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                {/* Active indicator bar on left edge */}
                {active && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r ${iconClass.includes('cyan') ? 'bg-cyan-400' : 'bg-red-400'}`} />
                )}

                <div className="flex items-center gap-2">
                  <span className={`min-w-0 flex-1 truncate text-sm font-semibold ${active ? 'text-white' : 'text-zinc-200'}`}>
                    {result.move}
                  </span>
                  {result.isBest && result.damage[1] > 0 && (
                    <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-red-400 border border-red-500/30">
                      Best
                    </span>
                  )}
                  {koLabel && (
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${getKoBadgeStyle(koLabel)}`}>
                      {koLabel}
                    </span>
                  )}
                  <span className={getTypeBadgeClass(result.type)} style={{ fontSize: '9px', padding: '2px 6px' }}>
                    {result.type}
                  </span>
                  <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] text-zinc-400">
                    {result.category}
                  </span>
                </div>

                {/* Damage bar + numbers */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800/80">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getDamageBarColor(result.percentage[1])}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="shrink-0 text-[11px] tabular-nums text-zinc-400">
                    {result.percentage[1] > 0 ? `${result.percentage[0]}–${result.percentage[1]}%` : '0%'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function PokemonCombobox({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 w-full justify-between border-zinc-700 bg-zinc-950 px-2 text-xs hover:bg-zinc-900">
          <span className="truncate">{value}</span>
          <span className="text-[10px] text-zinc-500">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] border-zinc-800 bg-black p-0 text-white" align="start">
        <Command>
          <CommandInput placeholder="Search Pokemon..." />
          <CommandList>
            <CommandEmpty>No Pokemon found.</CommandEmpty>
            <CommandGroup>
              {pokemonOptions.map((pokemon) => (
                <CommandItem
                  key={pokemon.name}
                  value={pokemon.name}
                  onSelect={() => {
                    onChange(pokemon.name)
                    setOpen(false)
                  }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {getSpeciesSprite(pokemon.name) ? (
                      <img src={getSpeciesSprite(pokemon.name)!} alt={pokemon.name} className="h-8 w-8" />
                    ) : null}
                    <div className="flex flex-col">
                      <span>{pokemon.name}</span>
                      <span className="text-xs text-zinc-500">#{String(pokemon.number).padStart(3, '0')}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function MoveCombobox({
  index,
  value,
  suggestions,
  onChange,
}: {
  index: number
  value: string
  suggestions: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 w-full justify-between border-zinc-700 bg-black px-2 text-xs hover:bg-zinc-900">
          <span className="truncate">{value || `Move ${index + 1}`}</span>
          <span className="text-[10px] text-zinc-500">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] border-zinc-800 bg-black p-0 text-white" align="start">
        <Command>
          <CommandInput placeholder="Search move..." />
          <CommandList>
            <CommandEmpty>No move found.</CommandEmpty>
            {suggestions.length ? (
              <CommandGroup heading="Suggested">
                {suggestions.map((move) => (
                  <CommandItem
                    key={`suggested-${move}`}
                    value={move}
                    onSelect={() => {
                      onChange(move)
                      setOpen(false)
                    }}
                  >
                    {move}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            <CommandGroup heading="All moves">
              {moveOptions.map((move) => (
                <CommandItem
                  key={move}
                  value={move}
                  onSelect={() => {
                    onChange(move)
                    setOpen(false)
                  }}
                >
                  {move}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function StringCombobox({
  value,
  placeholder,
  emptyLabel,
  options,
  onChange,
}: {
  value: string
  placeholder: string
  emptyLabel: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 w-full justify-between border-zinc-700 bg-zinc-950 px-2 text-xs hover:bg-zinc-900">
          <span className="truncate">{value || placeholder}</span>
          <span className="text-[10px] text-zinc-500">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] border-zinc-800 bg-black p-0 text-white" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyLabel}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="__none__"
                onSelect={() => {
                  onChange('')
                  setOpen(false)
                }}
              >
                None
              </CommandItem>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
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
