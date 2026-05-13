"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Square, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TrainerInfo } from "./RunSetup"

interface TrainerTimerState {
  trainer: TrainerInfo
  elapsed: number // ms
  isRunning: boolean
  isDone: boolean
}

export interface RunResult {
  trainers: {
    trainer: TrainerInfo
    time: number // ms
  }[]
  totalTime: number // ms
  trackName: string
  date: string
}

interface RunTimerProps {
  trainers: TrainerInfo[]
  trackName: string
  onFinish: (result: RunResult) => void
  onCancel: () => void
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
}

export default function RunTimer({
  trainers,
  trackName,
  onFinish,
  onCancel,
}: RunTimerProps) {
  const [timerStates, setTimerStates] = useState<TrainerTimerState[]>(
    trainers.map((t) => ({
      trainer: t,
      elapsed: 0,
      isRunning: false,
      isDone: false,
    }))
  )

  const [totalElapsed, setTotalElapsed] = useState(0)
  const [totalRunning, setTotalRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const intervalRefs = useRef<Map<number, NodeJS.Timeout>>(new Map())
  const totalIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRefs = useRef<Map<number, number>>(new Map())
  const totalStartRef = useRef<number>(0)
  const totalAccumulatedRef = useRef<number>(0)

  // Cleanup intervals on unmount
  useEffect(() => {
    const intervals = intervalRefs.current
    const totalInterval = totalIntervalRef.current
    return () => {
      intervals.forEach((interval) => clearInterval(interval))
      if (totalInterval) clearInterval(totalInterval)
    }
  }, [])

  const startTrainerTimer = useCallback(
    (index: number) => {
      // Stop any currently running trainer timer
      timerStates.forEach((state, i) => {
        if (state.isRunning && i !== index) {
          stopTrainerTimer(i)
        }
      })

      // Start total timer if not started
      if (!totalRunning) {
        setTotalRunning(true)
        totalStartRef.current = Date.now()
        totalAccumulatedRef.current = 0
        totalIntervalRef.current = setInterval(() => {
          setTotalElapsed(
            totalAccumulatedRef.current + (Date.now() - totalStartRef.current)
          )
        }, 10)
      }

      // Start this trainer's timer
      startTimeRefs.current.set(index, Date.now())
      const interval = setInterval(() => {
        setTimerStates((prev) => {
          const newStates = [...prev]
          const startTime = startTimeRefs.current.get(index) ?? Date.now()
          newStates[index] = {
            ...newStates[index],
            elapsed:
              newStates[index].elapsed + (Date.now() - startTime),
            isRunning: true,
          }
          startTimeRefs.current.set(index, Date.now())
          return newStates
        })
      }, 10)
      intervalRefs.current.set(index, interval)

      setTimerStates((prev) => {
        const newStates = [...prev]
        newStates[index] = { ...newStates[index], isRunning: true }
        return newStates
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalRunning, timerStates]
  )

  const stopTrainerTimer = useCallback((index: number) => {
    const interval = intervalRefs.current.get(index)
    if (interval) {
      clearInterval(interval)
      intervalRefs.current.delete(index)
    }

    setTimerStates((prev) => {
      const newStates = [...prev]
      newStates[index] = {
        ...newStates[index],
        isRunning: false,
        isDone: true,
      }
      return newStates
    })
  }, [])

  const allDone = timerStates.every((s) => s.isDone)

  // Auto-finish when all trainers are done
  useEffect(() => {
    if (allDone && totalRunning) {
      if (totalIntervalRef.current) {
        clearInterval(totalIntervalRef.current)
      }
      setTotalRunning(false)
    }
  }, [allDone, totalRunning])

  const handleFinish = () => {
    // Stop everything
    intervalRefs.current.forEach((interval) => clearInterval(interval))
    if (totalIntervalRef.current) clearInterval(totalIntervalRef.current)

    const result: RunResult = {
      trainers: timerStates.map((s) => ({
        trainer: s.trainer,
        time: s.elapsed,
      })),
      totalTime: totalElapsed,
      trackName,
      date: new Date().toISOString(),
    }
    onFinish(result)
  }

  const handleReset = () => {
    intervalRefs.current.forEach((interval) => clearInterval(interval))
    intervalRefs.current.clear()
    if (totalIntervalRef.current) clearInterval(totalIntervalRef.current)

    setTimerStates(
      trainers.map((t) => ({
        trainer: t,
        elapsed: 0,
        isRunning: false,
        isDone: false,
      }))
    )
    setTotalElapsed(0)
    setTotalRunning(false)
    setIsPaused(false)
  }

  const totalIncome = timerStates
    .filter((s) => s.isDone)
    .reduce((sum, s) => sum + s.trainer.income, 0)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Total Timer */}
      <div className="pvp-card p-6 text-center">
        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">
          {trackName} — Total Time
        </p>
        <motion.div
          className="text-5xl md:text-6xl font-mono font-black text-white"
          key={Math.floor(totalElapsed / 1000)}
        >
          {formatTime(totalElapsed)}
        </motion.div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-emerald-400 text-lg font-bold">
              ¥{totalIncome.toLocaleString()}
            </p>
            <p className="text-zinc-500 text-xs">Earned</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-bold">
              {timerStates.filter((s) => s.isDone).length}/
              {timerStates.length}
            </p>
            <p className="text-zinc-500 text-xs">Completed</p>
          </div>
        </div>
      </div>

      {/* Trainer Timers */}
      <div className="space-y-2">
        {timerStates.map((state, index) => (
          <motion.div
            key={`${state.trainer.name}-${state.trainer.city}-${index}`}
            className={`pvp-card p-4 flex items-center gap-4 transition-all ${
              state.isRunning
                ? "border-emerald-500/50 bg-emerald-500/5 shadow-lg shadow-emerald-500/10"
                : state.isDone
                  ? "border-zinc-700 opacity-70"
                  : ""
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {/* Index */}
            <span className="text-zinc-600 text-xs font-mono w-6 text-center">
              {index + 1}
            </span>

            {/* Running indicator */}
            {state.isRunning && (
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            )}
            {state.isDone && !state.isRunning && (
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
            )}
            {!state.isRunning && !state.isDone && (
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
            )}

            {/* Trainer Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {state.trainer.name}
              </p>
              <p className="text-zinc-500 text-xs truncate">
                {state.trainer.city} • {state.trainer.region}
              </p>
            </div>

            {/* Timer Display */}
            <div className="text-right">
              <p
                className={`font-mono text-lg font-bold ${
                  state.isRunning
                    ? "text-emerald-400"
                    : state.isDone
                      ? "text-white"
                      : "text-zinc-600"
                }`}
              >
                {formatTime(state.elapsed)}
              </p>
              <p className="text-emerald-400 text-xs font-mono">
                ¥{state.trainer.income.toLocaleString()}
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              {!state.isDone && !state.isRunning && (
                <Button
                  size="sm"
                  onClick={() => startTrainerTimer(index)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 w-8 p-0"
                  id={`start-trainer-${index}`}
                >
                  <Play className="w-3 h-3" />
                </Button>
              )}
              {state.isRunning && (
                <Button
                  size="sm"
                  onClick={() => stopTrainerTimer(index)}
                  className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 p-0"
                  id={`stop-trainer-${index}`}
                >
                  <Square className="w-3 h-3" />
                </Button>
              )}
              {state.isDone && (
                <div className="h-8 w-8 flex items-center justify-center">
                  <span className="text-emerald-500 text-xs font-bold">✓</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white"
          id="cancel-run-btn"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white"
          id="reset-run-btn"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        {allDone && (
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={handleFinish}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              id="finish-run-btn"
            >
              Finish & Save
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
