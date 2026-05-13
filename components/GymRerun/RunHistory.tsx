"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Trash2, ChevronDown, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RunResult } from "./RunTimer"

interface RunHistoryProps {
  history: RunResult[]
  onDelete: (index: number) => void
  onClearAll: () => void
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
}

export default function RunHistory({
  history,
  onDelete,
  onClearAll,
}: RunHistoryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  if (history.length === 0) {
    return (
      <div className="pvp-card p-8 text-center">
        <History className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
        <p className="text-zinc-500 text-sm">
          No run history yet. Complete a run to see it here!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-zinc-400 text-xs uppercase tracking-wider font-bold">
          Past Runs ({history.length})
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="bg-zinc-900 border-zinc-700 hover:bg-red-900/30 hover:border-red-500/50 text-zinc-400 hover:text-red-400 text-xs"
          id="clear-history-btn"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Clear All
        </Button>
      </div>

      <AnimatePresence>
        {history.map((run, index) => {
          const totalIncome = run.trainers.reduce(
            (sum, t) => sum + t.trainer.income,
            0
          )
          const incomePerMin =
            run.totalTime > 0 ? totalIncome / (run.totalTime / 60000) : 0
          const isExpanded = expandedIndex === index

          return (
            <motion.div
              key={`${run.date}-${index}`}
              className="pvp-card overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() =>
                  setExpandedIndex(isExpanded ? null : index)
                }
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white text-sm font-bold truncate">
                      {run.trackName}
                    </p>
                    <span className="text-zinc-600 text-xs">
                      {new Date(run.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(run.totalTime)}
                    </span>
                    <span className="text-emerald-400">
                      ¥{totalIncome.toLocaleString()}
                    </span>
                    <span className="text-purple-400">
                      ¥{Math.round(incomePerMin).toLocaleString()}/min
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(index)
                    }}
                    className="bg-transparent border-zinc-800 hover:bg-red-900/30 hover:border-red-500/50 text-zinc-500 hover:text-red-400 h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="border-t border-zinc-800"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="divide-y divide-zinc-800/50">
                      {run.trainers.map((t, i) => (
                        <div
                          key={`${t.trainer.name}-${i}`}
                          className="px-4 py-2 flex items-center gap-3 text-sm"
                        >
                          <span className="text-zinc-600 text-xs font-mono w-4">
                            {i + 1}
                          </span>
                          <span className="text-white flex-1 truncate">
                            {t.trainer.name}
                          </span>
                          <span className="text-zinc-500 text-xs">
                            {t.trainer.city}
                          </span>
                          <span className="text-white font-mono text-xs">
                            {formatTime(t.time)}
                          </span>
                          <span className="text-emerald-400 font-mono text-xs w-16 text-right">
                            ¥{t.trainer.income.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
