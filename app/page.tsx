import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';

interface MovepoolItem {
  [move: string]: string[];
}
export default async function Home() {

  const gens = new Generations(Dex);
  const pokemon = 'Garchomp'
  const movepool = await gens.get(5).learnsets.learnable(pokemon);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">

      <ul>
        {Object.entries(movepool as MovepoolItem).map(([move, learnable], index) => {
          return (
            <li key={index}>
              {move}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
