const fs = require('fs');
const path = require('path');

const catchRatesPath = path.join(__dirname, '..', 'data', 'catchRates.json');
const catchRates = JSON.parse(fs.readFileSync(catchRatesPath, 'utf-8'));

async function fetchBaseHp(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.stats[0].base_stat; // HP is always the first stat
  } catch {
    return null;
  }
}

async function main() {
  console.log(`Processing ${catchRates.length} Pokémon...`);
  
  // Process in batches of 20 to avoid rate limiting
  const batchSize = 20;
  for (let i = 0; i < catchRates.length; i += batchSize) {
    const batch = catchRates.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (entry) => {
        const hp = await fetchBaseHp(entry.id);
        if (hp !== null) {
          entry.hp = hp;
          process.stdout.write('.');
        } else {
          console.log(`\nFailed to fetch HP for ID ${entry.id}`);
        }
      })
    );
    // Small delay between batches
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(catchRatesPath, JSON.stringify(catchRates, null, 2));
  console.log(`\nDone! Updated ${catchRates.length} entries.`);
}

main();
