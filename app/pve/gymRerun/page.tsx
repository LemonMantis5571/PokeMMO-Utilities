"use client"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Timer, History } from "lucide-react"
import Footer from "@/components/Footer"
import RunSetup from "@/components/GymRerun/RunSetup"
import RunTimer from "@/components/GymRerun/RunTimer"
import RunSummary from "@/components/GymRerun/RunSummary"
import RunHistory from "@/components/GymRerun/RunHistory"
import type { TrainerInfo } from "@/components/GymRerun/RunSetup"
import type { RunResult } from "@/components/GymRerun/RunTimer"

type Phase = "setup" | "running" | "summary"

const STORAGE_KEY = "pokemmo-gym-rerun-history"

export default function GymRerunPage() {
  const [phase, setPhase] = useState<Phase>("setup")
  const [currentTrainers, setCurrentTrainers] = useState<TrainerInfo[]>([])
  const [currentTrackName, setCurrentTrackName] = useState("")
  const [currentResult, setCurrentResult] = useState<RunResult | null>(null)
  const [history, setHistory] = useState<RunResult[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  // Save history to localStorage
  const saveHistory = useCallback(
    (newHistory: RunResult[]) => {
      setHistory(newHistory)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
      } catch {
        // ignore
      }
    },
    []
  )

  const handleStartRun = (trainers: TrainerInfo[], trackName: string) => {
    setCurrentTrainers(trainers)
    setCurrentTrackName(trackName)
    setPhase("running")
  }

  const handleFinishRun = (result: RunResult) => {
    setCurrentResult(result)
    setPhase("summary")
  }

  const handleSaveRun = () => {
    if (currentResult) {
      saveHistory([currentResult, ...history])
    }
    setPhase("setup")
    setCurrentResult(null)
  }

  const handleBack = () => {
    setPhase("setup")
    setCurrentResult(null)
  }

  const handleDeleteHistory = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index)
    saveHistory(newHistory)
  }

  const handleClearHistory = () => {
    saveHistory([])
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-[100dvh] grid grid-rows-[1fr_auto]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="section-subtitle mb-2">PvE Utility</p>
            <div className="flex items-center justify-between">
              <h1 className="section-title flex items-center gap-3">
                <Timer className="w-8 h-8 text-emerald-500" />
                <span>
                  Gym <span className="text-emerald-500">Rerun</span>
                </span>
              </h1>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                  showHistory
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                }`}
                id="toggle-history-btn"
              >
                <History className="w-4 h-4" />
                History
                {history.length > 0 && (
                  <span className="bg-emerald-500 text-black text-xs rounded-full px-1.5 py-0.5 font-bold">
                    {history.length}
                  </span>
                )}
              </button>
            </div>
            <p className="text-zinc-500 mt-2">
              Track your gym rerun times with a stopwatch per trainer. Build
              custom tracks or run the Elite 4.
            </p>
          </motion.div>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <RunHistory
                  history={history}
                  onDelete={handleDeleteHistory}
                  onClearAll={handleClearHistory}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {phase === "setup" && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <RunSetup onStartRun={handleStartRun} />
              </motion.div>
            )}

            {phase === "running" && (
              <motion.div
                key="running"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <RunTimer
                  trainers={currentTrainers}
                  trackName={currentTrackName}
                  onFinish={handleFinishRun}
                  onCancel={handleBack}
                />
              </motion.div>
            )}

            {phase === "summary" && currentResult && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <RunSummary
                  result={currentResult}
                  onSave={handleSaveRun}
                  onBack={handleBack}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
      </motion.div>
    </AnimatePresence>
  )
}
