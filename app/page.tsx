export default async function Home() {


  return (
    <>
      <section className="container flex flex-col flex-wrap gap-2 p-4 mt-10">
        <h1 className="text-lg">FAQ</h1>
        <div className="flex flex-col w-fit sm:w-2/5 gap-2">
          <h1 className="font-extrabold">What is PokeMMO?</h1>
          <span >
            PokeMMO is a free to play mmorpg, come join a growing community as you level up and discover new monsters.
          </span>
          <h1 className="font-extrabold">What is this tool used for?</h1>
          <span >
            PokeMMO Utilities is a tool to help you to maximize your farming or have fun.
            You can timestamp your gym runs or use the randomizer to generate a troll team.
          </span>
          <h1 className="font-extrabold">PokeMMO already has an random pvp mode.</h1>
          <span >
            Quite right, but it isn&apos;t completely random, PokeMMO makes all moves and builds playable, this version truly randomizes and makes it a challenge to win with.
          </span>
          <h1 className="font-extrabold">Hey, why this pokemon doesn&apos;t match the tier from the game?</h1>
          <span >
            Sadly PokeMM0 doesn&apos;t have a way to get the tier of a pokemon, so I have to manually set the correct tier, this could take a while.
          </span>
        </div>

      </section>
      <section>
      </section>
    </>
  )
}
