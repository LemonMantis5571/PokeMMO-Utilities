"use client"
import Footer from "@/components/Footer"
import LemonMantis5571 from "@/components/imgs/LemonMantis5571.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Zap } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useEffect, useState } from "react"

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)




  // Main scroll progress
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // FAQ items for staggered animation
  const faqItems = [
    {
      question: "What is PokeMMO?",
      answer:
        "PokeMMO is a free to play mmorpg, come join a growing community as you level up and discover new monsters.",
    },
    {
      question: "What is this tool used for?",
      answer:
        "PokeMMO Utilities is a tool to help you to maximize your farming or have fun. You can timestamp your gym runs or use the randomizer to generate a troll team.",
    },
    {
      question: "PokeMMO already has an random pvp mode.",
      answer:
        "Quite right, but it isn't completely random, PokeMMO makes all moves and builds playable, this version truly randomizes and makes it a challenge to win with.",
    },
    {
      question: "Hey, why this pokemon doesn't match the tier from the game?",
      answer:
        "Sadly PokeMMO doesn't have a way to get the tier of a pokemon, so I have to manually set the correct tier, this could take a while.",
    },
  ]


  useEffect(() => {
    setIsLoaded(true)
  }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  }

  const slideInVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <motion.section
            className="container flex flex-wrap flex-row gap-2 p-4 mt-5 md:mt-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ opacity }}
          >
            <motion.div className="flex flex-col w-fit sm:w-2/5 gap-3" variants={containerVariants}>
              <motion.h1
                className="mb-6 text-center font-bold text-4xl md:text-6xl pb-4 md:text-left"
                variants={itemVariants}
              >
                PokeMMO Tools
              </motion.h1>
              <motion.h3 className="text-neutral-100" variants={itemVariants}>
                Compilation of tools to help make your experience on PokeMMO a little bit better with PvP or PvE.
              </motion.h3>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={"secondary"}
                  onClick={() => router.push("/pvp/randomizer")}
                  className="max-w-xs sm:m-0 bg-black rounded group"
                >
                  Try it out!
                  <motion.img
                    src="/favicon.ico"
                    alt="Pokeball"
                    height={"24"}
                    width={"24"}
                    className="ml-2"
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            className="container flex flex-wrap flex-row gap-2 p-4 mt-5 md:mt-16 mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div className="flex flex-col w-fit sm:w-2/5 gap-3" variants={containerVariants}>
              <motion.h1
                className="mb-6 text-center font-bold text-4xl md:text-6xl pb-4 md:text-left"
                variants={itemVariants}
              >
                FAQ
              </motion.h1>

              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.h1 className="font-extrabold">{item.question}</motion.h1>
                  <motion.div
                    className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4"
                    whileHover={{ borderLeftWidth: "4px" }}
                  >
                    <motion.p className="text-sm text-neutral-100">{item.answer}</motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.img
              className="max-w-full h-auto m-auto hidden md:block"
              src="https://static.pokemonpets.com/images/monsters-images-800-800/20308-Galarian-Mega-Medicham.png"
              alt="Galar Medicham"
              width={500}
              height={500}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
          </motion.section>

    
          <motion.section
            className="py-20 bg-zinc-900/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariants}
          >
            <div className="container px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div className="order-2 md:order-1" variants={slideInVariants}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="mb-4 bg-green-500/20 text-green-400 hover:bg-green-500/20">
                      Available for Projects
                    </Badge>
                  </motion.div>

                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Meet the Developer
                  </motion.h2>

                  <motion.h3
                    className="text-xl text-yellow-400 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    LemonMantis5571
                  </motion.h3>

                  <motion.p
                    className="text-zinc-400 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    I'm LemonMantis5571, a developer and avid PokeMMO PvP player. I created these tools to enhance the
                    PokeMMO experience for myself and the community. If you have ideas for specific tools or features,
                    I'm always open to suggestions and collaborations.
                  </motion.p>

                  <motion.p
                    className="text-zinc-400 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    I speak Spanish, English, and some Chinese, so feel free to reach out in any of these languages!
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.a
                      href="https://forums.pokemmo.com/index.php?/profile/485783-lemonmantis5571/"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-neutral-300 hover:bg-zinc-700">
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
                      <Button variant="outline" className="border-zinc-700">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </motion.a>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="order-1 md:order-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg blur opacity-50"
                      animate={{
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                      <Image
                        src={LemonMantis5571.src || "/placeholder.svg"}
                        alt="LemonMantis5571"
                        width={500}
                        height={500}
                        className="w-full h-auto"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

  
          <motion.section
            className="py-12 bg-zinc-950"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInVariants}
          >
            <div className="container px-4">
              <motion.div
                className="flex flex-col md:flex-row items-center gap-6 justify-center"
                variants={containerVariants}
              >
                <motion.div
                  className="relative w-20 h-20"
                  variants={itemVariants}
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

                <motion.div className="text-center md:text-left" variants={itemVariants}>
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Disclaimer
                  </motion.h3>
                  <motion.p
                    className="text-zinc-400 text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Some data may be inaccurate. PokeMMO does not provide any API or help to developers. This page is
                    not affiliated with PokeMMO by any means.
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          <Footer birdMonth={new Date().getMonth()} beastMonth={new Date().getMonth()} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
