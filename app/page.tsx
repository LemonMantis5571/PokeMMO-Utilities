"use client"
import Footer from "@/components/Footer"
import LemonMantis5571 from "@/components/imgs/LemonMantis5571.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Zap, Dices, BookOpen, Target, Timer, Crosshair, Swords, Shield, Sparkles, ArrowRight, Calculator } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  const pvpTools = [
    {
      icon: Dices,
      title: "ELO RIP",
      description: "Generate completely random competitive teams for fun challenges",
      href: "/pvp/randomizer",
      featured: true,
    },
    {
      icon: BookOpen,
      title: "Team Compendium",
      description: "Browse and discover community-created teams",
      href: "/pvp/compendium?page=1",
    },
    {
      icon: Crosshair,
      title: "Damage Calculator",
      description: "Run quick battle damage calculations",
      href: "/pvp/calculator",
    },
  ]

  const pveTools = [
    {
      icon: Target,
      title: "Catch Calculator",
      description: "Calculate catch probability for any Pokemon",
      href: "/pve/catchCalculator",
    },
    {
      icon: Timer,
      title: "Gym Rerun",
      description: "Track and optimize your gym rerun times",
      href: "/pve/gymRerun",
    },
    {
      icon: Calculator,
      title: "Income Check",
      description: "Track your farming income and efficiency",
      href: "/pve/incomecheck",
    },
  ]

  const faqItems = [
    {
      question: "What is PokeMMO?",
      answer: "PokeMMO is a free to play MMORPG where you can join a growing community, level up, and discover new monsters.",
    },
    {
      question: "What are these tools for?",
      answer: "These utilities help maximize your farming efficiency or add fun challenges to your gameplay, like randomized team battles.",
    },
    {
      question: "Why doesn&apos;t the randomizer match PokeMMO&apos;s?",
      answer: "PokeMMO&apos;s random PvP mode isn&apos;t completely random. Our version truly randomizes everything for maximum challenge.",
    },
    {
      question: "Why do some tiers seem incorrect?",
      answer: "PokeMMO doesn&apos;t provide an API for tier data, so tiers are manually set and may take time to update.",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="min-h-[100dvh] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            {/* Background gradient accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-4 py-20 md:py-28 relative">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-zinc-400">Community Tools for PokeMMO Players</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                  <span className="text-foreground">PokeMMO</span>
                  <br />
                  <span className="text-red-500">Utilities</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
                  A collection of tools to enhance your PokeMMO experience, from competitive PvP team building to PvE optimization.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => router.push("/pvp/randomizer")}
                      className="btn-pvp h-12 px-8 text-base gap-2"
                    >
                      <Dices className="w-5 h-5" />
                      Try ELO RIP
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/pvp/compendium?page=1")}
                      className="h-12 px-8 text-base bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 gap-2"
                    >
                      <BookOpen className="w-5 h-5" />
                      View Teams
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Tools Grid Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              {/* PvP Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <Swords className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">PvP Tools</h2>
                    <p className="text-sm text-muted-foreground">Competitive battle utilities</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {pvpTools.map((tool, index) => (
                    <motion.div
                      key={tool.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => router.push(tool.href)}
                      className={`group cursor-pointer rounded-xl border transition-all duration-300 ${
                        tool.featured
                          ? "bg-gradient-to-br from-red-950/30 to-zinc-900 border-red-500/30 hover:border-red-500/50 md:row-span-2"
                          : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                      } p-6`}
                    >
                      <div className={`inline-flex p-3 rounded-lg mb-4 ${
                        tool.featured
                          ? "bg-red-500/20"
                          : "bg-zinc-800"
                      }`}>
                        <tool.icon className={`w-6 h-6 ${tool.featured ? "text-red-500" : "text-zinc-400 group-hover:text-red-500 transition-colors"}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-red-500 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      <div className="flex items-center text-sm text-zinc-500 group-hover:text-red-500 transition-colors">
                        <span>Open tool</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* PvE Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">PvE Tools</h2>
                    <p className="text-sm text-muted-foreground">Farming and adventure utilities</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {pveTools.map((tool, index) => (
                    <motion.div
                      key={tool.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => router.push(tool.href)}
                      className="group cursor-pointer rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 p-6 transition-all duration-300"
                    >
                      <div className="inline-flex p-3 rounded-lg bg-zinc-800 mb-4">
                        <tool.icon className="w-6 h-6 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-emerald-500 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                      <div className="flex items-center text-sm text-zinc-500 group-hover:text-emerald-500 transition-colors">
                        <span>Open tool</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-zinc-950/50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">Common questions about the tools and PokeMMO</p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl bg-zinc-900 border border-zinc-800 p-5"
                    >
                      <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Developer Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge className="mb-4 bg-emerald-950/50 text-emerald-400 border-emerald-800 hover:bg-emerald-900/50">
                      Available for Projects
                    </Badge>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Meet the Developer</h2>
                    <h3 className="text-xl text-red-500 font-bold mb-4">LemonMantis5571</h3>
                    <p className="text-muted-foreground mb-4">
                      I&apos;m a developer and avid PokeMMO PvP player. I created these tools to enhance the
                      experience for myself and the community.
                    </p>
                    <p className="text-sm text-zinc-600 mb-6">
                      I speak Spanish, English, and some Chinese, so feel free to reach out in any of these languages!
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        href="https://forums.pokemmo.com/index.php?/profile/485783-lemonmantis5571/"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="btn-pvp gap-2">
                          <Zap className="h-4 w-4" />
                          PokeMMO Profile
                        </Button>
                      </motion.a>
                      <motion.a
                        href="https://github.com/LemonMantis5571"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 gap-2">
                          <Github className="h-4 w-4" />
                          GitHub
                        </Button>
                      </motion.a>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                      <Image
                        src={LemonMantis5571.src || "/placeholder.svg"}
                        alt="LemonMantis5571"
                        width={500}
                        height={500}
                        className="w-full h-auto"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-4 justify-center rounded-xl bg-zinc-900 border border-zinc-800 p-5 max-w-2xl mx-auto"
              >
                <motion.div
                  className="relative w-12 h-12 flex-shrink-0"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="https://pokemon.gishan.cc/static/i/pokemon/shiny-bidoof.png"
                    alt="Shiny Bidoof"
                    fill
                    className="object-contain"
                  />
                </motion.div>
                <div className="text-center md:text-left">
                  <h3 className="font-semibold text-foreground mb-1">Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    Some data may be inaccurate. PokeMMO does not provide any API or help to developers. This page is
                    not affiliated with PokeMMO by any means.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
