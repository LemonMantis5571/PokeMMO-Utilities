"use client"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Clock, Coins, BarChart3, Copy, ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RunResult } from "./RunTimer"

interface RunSummaryProps {
  result: RunResult
  onSave: () => void
  onBack: () => void
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((ms % 1000) / 10)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`
}

export default function RunSummary({ result, onSave, onBack }: RunSummaryProps) {
  const totalIncome = useMemo(
    () => result.trainers.reduce((sum, t) => sum + t.trainer.income, 0),
    [result.trainers]
  )

  const avgTime = useMemo(
    () =>
      result.trainers.length > 0
        ? result.totalTime / result.trainers.length
        : 0,
    [result]
  )

  const incomePerMinute = useMemo(() => {
    const minutes = result.totalTime / 60000
    return minutes > 0 ? totalIncome / minutes : 0
  }, [result.totalTime, totalIncome])

  const handleCopy = () => {
    const text = [
      `🏆 ${result.trackName} — Run Summary`,
      `📅 ${new Date(result.date).toLocaleDateString()}`,
      `⏱️ Total Time: ${formatTime(result.totalTime)}`,
      `💰 Total Income: ¥${totalIncome.toLocaleString()}`,
      `📊 Income/min: ¥${Math.round(incomePerMinute).toLocaleString()}`,
      ``,
      `Trainer Details:`,
      ...result.trainers.map(
        (t, i) =>
          `${i + 1}. ${t.trainer.name} (${t.trainer.city}) — ${formatTime(t.time)} — ¥${t.trainer.income.toLocaleString()}`
      ),
    ].join("\n")

    navigator.clipboard.writeText(text)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="pvp-card p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="text-5xl mb-3"
        >
          🏆
        </motion.div>
        <h2 className="text-2xl font-black text-white mb-1">Run Complete!</h2>
        <p className="text-zinc-500 text-sm">{result.trackName}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div
          className="pvp-card p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
          <p className="text-white text-xl font-bold font-mono">
            {formatTime(result.totalTime)}
          </p>
          <p className="text-zinc-500 text-xs">Total Time</p>
        </motion.div>

        <motion.div
          className="pvp-card p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Coins className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
          <p className="text-white text-xl font-bold">
            ¥{totalIncome.toLocaleString()}
          </p>
          <p className="text-zinc-500 text-xs">Total Income</p>
        </motion.div>

        <motion.div
          className="pvp-card p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BarChart3 className="w-5 h-5 text-purple-500 mx-auto mb-2" />
          <p className="text-white text-xl font-bold">
            ¥{Math.round(incomePerMinute).toLocaleString()}
          </p>
          <p className="text-zinc-500 text-xs">Income / min</p>
        </motion.div>

        <motion.div
          className="pvp-card p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Clock className="w-5 h-5 text-blue-500 mx-auto mb-2" />
          <p className="text-white text-xl font-bold font-mono">
            {formatTime(avgTime)}
          </p>
          <p className="text-zinc-500 text-xs">Avg / Trainer</p>
        </motion.div>
      </div>

      {/* Trainer Breakdown Table */}
      <div className="pvp-card overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800">
          <p className="text-zinc-400 text-xs uppercase tracking-wider font-bold">
            Trainer Breakdown
          </p>
        </div>
        <div className="divide-y divide-zinc-800/50">
          {result.trainers.map((t, i) => {
            const pct =
              result.totalTime > 0
                ? (t.time / result.totalTime) * 100
                : 0
            return (
              <motion.div
                key={`${t.trainer.name}-${t.trainer.city}-${i}`}
                className="px-4 py-3 flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <span className="text-zinc-600 text-xs font-mono w-6 text-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {t.trainer.name}
                  </p>
                  <p className="text-zinc-500 text-xs truncate">
                    {t.trainer.city} • {t.trainer.region}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-mono font-bold">
                    {formatTime(t.time)}
                  </p>
                  <p className="text-zinc-500 text-xs">
                    {pct.toFixed(1)}% of total
                  </p>
                </div>
                <span className="text-emerald-400 text-xs font-mono w-20 text-right">
                  ¥{t.trainer.income.toLocaleString()}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white"
          id="back-to-setup-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Run
        </Button>
        <Button
          variant="outline"
          onClick={handleCopy}
          className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white"
          id="copy-results-btn"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button
          onClick={onSave}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          id="save-run-btn"
        >
          <Save className="w-4 h-4 mr-2" />
          Save to History
        </Button>
      </div>
    </motion.div>
  )
}
