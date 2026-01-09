"use client"
import Footer from "@/components/Footer"
import LemonMantis5571 from "@/components/imgs/LemonMantis5571.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Zap, Dices, BookOpen } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  const faqItems = [
    {
      question: "What is PokeMMO?",
      answer: "PokeMMO is a free to play mmorpg, come join a growing community as you level up and discover new monsters.",
    },
    {
      question: "What is this tool used for?",
      answer: "PokeMMO Utilities is a tool to help you to maximize your farming or have fun. You can timestamp your gym runs or use the randomizer to generate a troll team.",
    },
    {
      question: "PokeMMO already has an random pvp mode.",
      answer: "Quite right, but it isn't completely random, PokeMMO makes all moves and builds playable, this version truly randomizes and makes it a challenge to win with.",
    },
    {
      question: "Hey, why this pokemon doesn't match the tier from the game?",
      answer: "Sadly PokeMMO doesn't have a way to get the tier of a pokemon, so I have to manually set the correct tier, this could take a while.",
    },
  ]

  const toolCards = [
    {
      icon: Dices,
      title: "ELO RIP",
      description: "Generate random competitive teams",
      href: "/pvp/randomizer",
      color: "text-red-500"
    },
    {
      icon: BookOpen,
      title: "Team Compendium",
      description: "Browse community-created teams",
      href: "/pvp/compendium?page=1",
      color: "text-yellow-500"
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Hero Section */}
          <motion.section
            className="container mx-auto px-4 py-16 md:py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="flex flex-col gap-6 lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="section-subtitle">Pokemon MMO Utilities</p>
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
                  <span className="text-white">PokeMMO</span>
                  <br />
                  <span className="text-red-500">Tools</span>
                </h1>
                <p className="text-zinc-500 max-w-lg">
                  Compilation of tools to help make your experience on PokeMMO a little bit better with PvP or PvE.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => router.push("/pvp/randomizer")}
                      className="btn-pvp hover:bg-red-500"
                    >
                      Try ELO RIP
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/pvp/compendium?page=1")}
                      className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                    >
                      View Teams
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tool Cards */}
              <motion.div
                className="grid sm:grid-cols-2 gap-4 lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {toolCards.map((card, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    onClick={() => router.push(card.href)}
                    className="pvp-card pvp-card-hover p-6 cursor-pointer"
                  >
                    <card.icon className={`w-10 h-10 ${card.color} mb-4`} />
                    <h3 className="font-bold text-lg mb-2 text-white">{card.title}</h3>
                    <p className="text-sm text-zinc-500">{card.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            className="container mx-auto px-4 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-12">
              <motion.div className="lg:w-1/2">
                <p className="section-subtitle mb-2">Common Questions</p>
                <h2 className="section-title text-red-500 mb-8">FAQ</h2>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="pvp-card p-5"
                    >
                      <h3 className="font-bold text-white mb-2">{item.question}</h3>
                      <p className="text-sm text-zinc-500">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="lg:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <motion.img
                  className="max-w-sm h-auto hidden lg:block"
                  src="https://static.pokemonpets.com/images/monsters-images-800-800/20308-Galarian-Mega-Medicham.png"
                  alt="Galar Medicham"
                  width={350}
                  height={350}
                  whileHover={{ scale: 1.05 }}
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Developer Section */}
          <motion.section
            className="py-16 bg-zinc-900/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Badge className="mb-4 bg-green-900/50 text-green-400 border-green-800 hover:bg-green-900/70">
                    Available for Projects
                  </Badge>
                  <p className="section-subtitle mb-2">About</p>
                  <h2 className="section-title mb-4">Meet the Developer</h2>
                  <h3 className="text-xl text-red-500 font-bold mb-4">LemonMantis5571</h3>
                  <p className="text-zinc-500 mb-6">
                    I&apos;m LemonMantis5571, a developer and avid PokeMMO PvP player. I created these tools to enhance the
                    PokeMMO experience for myself and the community.
                  </p>
                  <p className="text-zinc-600 mb-8 text-sm">
                    I speak Spanish, English, and some Chinese, so feel free to reach out in any of these languages!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href="https://forums.pokemmo.com/index.php?/profile/485783-lemonmantis5571/"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="btn-pvp hover:bg-red-500">
                        <Zap className="mr-2 h-4 w-4" />
                        PokeMMO Profile
                      </Button>
                    </motion.a>
                    <motion.a
                      href="https://github.com/LemonMantis5571"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="pvp-card overflow-hidden">
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
            </div>
          </motion.section>

          {/* Disclaimer */}
          <motion.section
            className="py-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <motion.div className="flex flex-col md:flex-row items-center gap-6 justify-center pvp-card p-6 max-w-2xl mx-auto">
                <motion.div
                  className="relative w-14 h-14"
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
                  <h3 className="text-base font-bold mb-1 text-white">Disclaimer</h3>
                  <p className="text-zinc-500 text-sm">
                    Some data may be inaccurate. PokeMMO does not provide any API or help to developers. This page is
                    not affiliated with PokeMMO by any means.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
