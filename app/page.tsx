'use client';
import Footer from '@/components/Footer';
import LemonMantis5571 from '@/components/imgs/LemonMantis5571.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className='container flex flex-wrap flex-row gap-2 p-4 mt-5 md:mt-24'>
        <div className="flex flex-col w-fit sm:w-2/5 gap-3">
          <h1 className="mb-6 text-center font-bold text-4xl md:text-6xl pb-4 md:text-left ">PokeMMO Tools</h1>
          <h3 className='text-neutral-100'>Compilation of tools to help make your experience on PokeMMO a little bit better with PvP or PvE.</h3>
          <Button variant={'secondary'} onClick={() => router.push('/pvp/randomizer')} className='max-w-xs sm:m-0 bg-black rounded'>Try it out!
            <img src='/favicon.ico' alt='Pokeball' height={'24'} width={'24'} />
          </Button>
        </div>

      </section>
      <section className="container flex flex-wrap flex-row gap-2 p-4 mt-5 md:mt-24">
        <div className="flex flex-col w-fit sm:w-2/5 gap-3">
          <h1 className="mb-6 text-center font-bold text-4xl md:text-6xl pb-4 md:text-left ">FAQ</h1>
          <h1 className="font-extrabold">What is PokeMMO?</h1>
          <div className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4">
            <p className="text-sm text-neutral-100">  PokeMMO is a free to play mmorpg, come join a growing community as you level up and discover new monsters.</p>
          </div>
          <h1 className="font-extrabold">What is this tool used for?</h1>
          <div className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4">
            <p className="text-sm text-neutral-100">  PokeMMO Utilities is a tool to help you to maximize your farming or have fun.
              You can timestamp your gym runs or use the randomizer to generate a troll team.</p>
          </div>
          <h1 className="font-extrabold">PokeMMO already has an random pvp mode.</h1>
          <div className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4">
            <p className="text-sm text-neutral-100">  Quite right, but it isn&apos;t completely random, PokeMMO makes all moves and builds playable, this version truly randomizes and makes it a challenge to win with.</p>
          </div>
          <h1 className="font-extrabold">Hey, why this pokemon doesn&apos;t match the tier from the game?</h1>
          <div className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4">
            <p className="text-sm text-neutral-100">  Sadly PokeMMO doesn&apos;t have a way to get the tier of a pokemon, so I have to manually set the correct tier, this could take a while.</p>
          </div>
        </div>
        <img className="max-w-full h-auto m-auto hidden md:block" src="https://static.pokemonpets.com/images/monsters-images-800-800/20308-Galarian-Mega-Medicham.png" alt="Galar Medicham" width={500} height={500} />
      </section>

      <section className="mt-20">
        <div className="mx-auto w-full max-w-7xl px-5 py-2  md:px-10 md:py-16 lg:py-20">
          <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center rounded-md bg-[#c4c4c4] px-3 py-1">
                <div className="mr-1 h-2 w-2 rounded-full bg-black"></div>
                <p className="text-sm text-black">Available for anything</p>
              </div>
              <p className="text-sm text-[#808080] sm:text-xl">Developer &amp; Pokemon PVP player</p>
              <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:mb-8">LemonMantis5571</h1>
              <p className="text-sm text-[#808080] sm:text-xl">I&apos;m LemonMantis5571, and I often play PokeMMO PvP. If you want me to make a specific tool for you, I&apos;m gladly open to help you. I do speak spanish, english and somewhat chinese.</p>
              <div className="mb-8 mt-8 h-px w-full bg-black"></div>
              <div className="flex flex-col gap-4 font-semibold sm:flex-row">
                <a href="https://forums.pokemmo.com/index.php?/profile/485783-lemonmantis5571/" target="_blank" className="flex items-center gap-4 rounded-md bg-black px-6 py-3 text-white">
                  <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/64b147043fe6ab404e65635e_Envelope.svg" alt="" className="inline-block" />
                  <p>MSG Me in PokeMMO</p>
                </a>
              </div>
            </div>
            <div className="min-h-[530px] overflow-hidden rounded-md">
              <img src={LemonMantis5571.src} alt="lemon" />
            </div>
          </div>
        </div>
      </section>
      <section className="block mt-5 md:mt-20">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="py-12 md:py-16 lg:py-20">
              <div className="flex gap-8 max-[991px]:flex-col grid-cols-1 lg:grid-cols-[1fr_1.25fr]">
                <div className="flex flex-none grid-cols-[auto_auto] items-center justify-start gap-[18px] lg:justify-between">
                  <img className="inline-block md:max-w-full md:h-56 " src="https://pokemon.gishan.cc/static/i/pokemon/shiny-bidoof.png" alt="bidoof" />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="mb-4 font-extrabold text-3xl md:text-5xl">Disclaimer</h2>
                  <h3 className="text-xl font-bold md:text-3xl">Some data may be inacurate. PokeMMO does not provide any help to developers. This page is not afiliated with PokeMMO by any means.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  )
}
