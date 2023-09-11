import { Dex } from '@pkmn/dex';
import { Generations } from '@pkmn/data';

interface MovepoolItem {
  [move: string]: string[];
}
export default async function Home() {

  const gens = new Generations(Dex);
  const pokemon = 'Garchomp'
  const movepool = await gens.get(5).learnsets.learnable(pokemon);
  console.log(movepool);

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <p>Yuca</p>
    </main>
  )
}
