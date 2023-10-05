export default async function Home() {


  return (
    <>
      <section className="container flex flex-wrap flex-row gap-2 p-4 mt-10">
        <div className="flex flex-col w-fit sm:w-2/5 gap-3">
          <h1 className="mb-6 font-bold text-4xl md:text-6xl pb-4">FAQ</h1>
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
          <h1 className="font-extrabold">Hey, why this pokemon doesn&apos;t match the   tier from the game?</h1>
          <div className="[border-left:2px_solid_rgb(201,_253,_2)] mb-4 py-1.5 pl-4">
            <p className="text-sm text-neutral-100">  Sadly PokeMMO doesn&apos;t have a way to get the tier of a pokemon, so I have to manually set the correct tier, this could take a while.</p>
          </div>
        </div>
        <img className="max-w-full h-auto m-auto hidden md:block" src="https://static.pokemonpets.com/images/monsters-images-800-800/20308-Galarian-Mega-Medicham.png" alt="Galar Medicham" width={500} height={500} />
      </section>
      <section className="block mt-12">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="py-12 md:py-16 lg:py-20">
              <div className="flex gap-8 max-[991px]:flex-col grid-cols-1 lg:grid-cols-[1fr_1.25fr]">
                <div className="flex flex-none grid-cols-[auto_auto] items-center justify-start gap-[18px] lg:justify-between">
                  <img className="inline-block max-w-full h-56" src="https://pokemon.gishan.cc/static/i/pokemon/shiny-bidoof.png" alt="bidoof" />
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="mb-4 font-extrabold text-3xl md:text-5xl">Disclaimer</h2>
                  <h3 className="text-2xl font-bold md:text-3xl">Some data may be inacurate. PokeMMO does not provide any help to developers. This page is not afiliated with PokeMMO by any means.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="block w-full h-fit">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="py-16 md:py-24 lg:py-32">
              <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
                <div className="w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial max-[767px]:mr-0">
                  <h2 className="mb-4 font-extrabold text-white text-3xl md:text-5xl">
                    <span className="text-[#c9fd02]">PokeMMO Utilities</span> PVP & PVE
                  </h2>
                </div>
                <div className="max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:ml-0 max-[767px]:mt-8">
                  <div className="mb-4 flex max-w-[272px] items-start justify-start">
                    <img src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28fe_MapPin.svg" alt="location" className="inline-block max-w-full mr-3" />
                    <p className="text-white">Teselia Ch3.</p>
                  </div>
                  <div className="mb-4 flex max-w-[272px] items-start justify-start">
                    <img src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f68133fc5cb4e29ed28ff_sms.svg" alt="email" className="inline-block max-w-full mr-3" />
                    <p className="text-white">briter456@gmail.com</p>
                  </div>
                  <div className="mb-4 flex max-w-[272px] items-start justify-start">
                    <img src="https://dashboard.snapcraft.io/site_media/appmedia/2022/03/icon-small.svg.png" alt="ign" className="inline-block max-w-full mr-3" width={24} height={24} />
                    <p className="text-white">LemonMantis</p>
                  </div>
                </div>
              </div>
              <div className="mb-20 mt-20 w-full border-[0.5px] border-solid border-[#101010]"></div>
              <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
                <div className="font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[479px]:mb-4 max-[991px]:py-1 text-center sm:text-center">
                  <a href="https://lemon-mantis-dev.vercel.app/" target="_blank" className="inline-block font-normal text-[#636262] transition hover:text-white sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pl-0 pr-6">About</a>
                  <a href="https://github.com/LemonMantis5571" target="_blank" className="inline-block font-normal text-[#636262] transition hover:text-white sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pl-0 pr-6">Works</a>
                </div>
                <div className="max-[991px]:flex-none">
                  <p className="text-[#636262]">© Copyright 2023. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
