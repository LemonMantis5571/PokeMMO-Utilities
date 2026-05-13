"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Check, X, GripVertical, Trophy, Swords, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import trainersData from "@/data/trainers.mock.data.json"

export interface TrainerInfo {
  name: string
  city: string
  income: number
  region: string
}

interface RunSetupProps {
  onStartRun: (trainers: TrainerInfo[], trackName: string) => void
}

type TrackMode = "e4" | "gym" | "custom"

const REGIONS = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Teselia"]

export default function RunSetup({ onStartRun }: RunSetupProps) {
  const [mode, setMode] = useState<TrackMode>("e4")
  const [selectedRegion, setSelectedRegion] = useState("Kanto")
  const [customSelected, setCustomSelected] = useState<Set<string>>(new Set())

  // Get all trainers
  const allTrainers: TrainerInfo[] = useMemo(() => {
    return [
      ...trainersData.GymLeaders,
      ...trainersData.SpecialTrainers,
    ]
  }, [])

  // Get trainers based on mode
  const selectedTrainers = useMemo(() => {
    if (mode === "e4") {
      // E4 is region-specific income data
      const e4Data = trainersData.E4 as Record<string, { income: number }>
      const regionE4 = e4Data[selectedRegion]
      if (regionE4) {
        return [
          {
            name: `${selectedRegion} Elite Four`,
            city: selectedRegion,
            income: regionE4.income,
            region: selectedRegion,
          },
        ]
      }
      return []
    }

    if (mode === "gym") {
      return trainersData.GymLeaders.filter(
        (t) => t.region === selectedRegion
      )
    }

    // Custom mode
    return allTrainers.filter((t) =>
      customSelected.has(`${t.name}-${t.city}`)
    )
  }, [mode, selectedRegion, customSelected, allTrainers])

  // Total estimated income
  const totalIncome = useMemo(
    () => selectedTrainers.reduce((sum, t) => sum + t.income, 0),
    [selectedTrainers]
  )

  const toggleCustomTrainer = (trainer: TrainerInfo) => {
    const key = `${trainer.name}-${trainer.city}`
    const newSet = new Set(customSelected)
    if (newSet.has(key)) {
      newSet.delete(key)
    } else {
      newSet.add(key)
    }
    setCustomSelected(newSet)
  }

  const handleStart = () => {
    if (selectedTrainers.length === 0) return
    const trackName =
      mode === "e4"
        ? `${selectedRegion} Elite 4`
        : mode === "gym"
          ? `${selectedRegion} Gym Run`
          : "Custom Track"
    onStartRun(selectedTrainers, trackName)
  }

  // Group trainers by region for custom mode
  const trainersByRegion = useMemo(() => {
    const groups: Record<string, TrainerInfo[]> = {}
    allTrainers.forEach((t) => {
      if (!groups[t.region]) groups[t.region] = []
      groups[t.region].push(t)
    })
    return groups
  }, [allTrainers])

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "e4" as TrackMode, label: "Elite 4", icon: Trophy, color: "text-yellow-500" },
          { value: "gym" as TrackMode, label: "Gym Leaders", icon: Swords, color: "text-emerald-500" },
          { value: "custom" as TrackMode, label: "Custom", icon: Sparkles, color: "text-purple-500" },
        ].map((opt) => (
          <motion.button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`pvp-card p-4 text-center cursor-pointer transition-all ${
              mode === opt.value
                ? "border-zinc-500 bg-zinc-900/80"
                : "hover:border-zinc-700"
            }`}
            id={`mode-${opt.value}`}
          >
            <opt.icon
              className={`w-8 h-8 mx-auto mb-2 ${
                mode === opt.value ? opt.color : "text-zinc-600"
              }`}
            />
            <span
              className={`text-sm font-bold ${
                mode === opt.value ? "text-white" : "text-zinc-500"
              }`}
            >
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Region Selector (for E4 and Gym modes) */}
      {(mode === "e4" || mode === "gym") && (
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs uppercase tracking-wider">
            Region
          </label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white" id="region-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              {REGIONS.map((r) => (
                <SelectItem
                  key={r}
                  value={r}
                  className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                >
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Custom Trainer Selector */}
      {mode === "custom" && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {REGIONS.map((region) => (
            <div key={region} className="space-y-2">
              <h3 className="text-zinc-400 text-xs uppercase tracking-wider font-bold sticky top-0 bg-black py-1 z-10">
                {region}
              </h3>
              <div className="space-y-1">
                {(trainersByRegion[region] || []).map((trainer) => {
                  const key = `${trainer.name}-${trainer.city}`
                  const isSelected = customSelected.has(key)
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCustomTrainer(trainer)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-left ${
                        isSelected
                          ? "bg-zinc-800 border border-emerald-500/30"
                          : "hover:bg-zinc-900 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-zinc-600"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-black" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-white text-sm font-medium">
                          {trainer.name}
                        </span>
                        <span className="text-zinc-500 text-xs ml-2">
                          {trainer.city}
                        </span>
                      </div>
                      <span className="text-emerald-400 text-xs font-mono">
                        ¥{trainer.income.toLocaleString()}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Trainers Preview */}
      <div className="pvp-card p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-zinc-400 text-xs uppercase tracking-wider">
            Selected Track
          </span>
          <span className="text-emerald-400 text-sm font-bold">
            ¥{totalIncome.toLocaleString()} estimated
          </span>
        </div>

        {selectedTrainers.length === 0 ? (
          <p className="text-zinc-600 text-sm text-center py-4">
            No trainers selected
          </p>
        ) : (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {selectedTrainers.map((t, i) => (
              <div
                key={`${t.name}-${t.city}-${i}`}
                className="flex items-center gap-3 px-3 py-2 rounded bg-zinc-900/50"
              >
                <span className="text-zinc-600 text-xs font-mono w-4">
                  {i + 1}
                </span>
                <GripVertical className="w-3 h-3 text-zinc-700" />
                <span className="text-white text-sm flex-1">{t.name}</span>
                <span className="text-zinc-500 text-xs">{t.city}</span>
                <span className="text-emerald-400 text-xs font-mono">
                  ¥{t.income.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Start Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleStart}
          disabled={selectedTrainers.length === 0}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          id="start-run-btn"
        >
          Start Run ({selectedTrainers.length} trainer
          {selectedTrainers.length !== 1 ? "s" : ""})
        </Button>
      </motion.div>
    </motion.div>
  )
}
