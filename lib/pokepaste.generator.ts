
import { PokePaste } from "./types/PokemonMembertypes";

export const convertToPokepaste = (team: PokePaste) => {
    let pokepaste = '';


    team.members.forEach((pokemon) => {
        pokepaste += `${pokemon.name} @ ${pokemon.item}\n`;
        pokepaste += `Ability: ${pokemon.ability}\n`;
        pokepaste += `Level: 50\n`;
        pokepaste += `EVs: `;
        pokepaste +=
            `${pokemon.evs[0].hp ? `${pokemon.evs[0].hp} HP / ` : ''}${pokemon.evs[0].atk ? `${pokemon.evs[0].atk} Atk / ` : ''}${pokemon.evs[0].def ? `${pokemon.evs[0].def} Def / ` : ''}${pokemon.evs[0].spaatk ? `${pokemon.evs[0].spaatk} SpA / ` : ''}${pokemon.evs[0].spd ? `${pokemon.evs[0].spd} SpD / ` : ''}${pokemon.evs[0].spe ? `${pokemon.evs[0].spe} Spe` : ''}\n`;
        pokepaste += `${pokemon.nature} Nature\n`;
        pokepaste += `- ${pokemon.moves[0].name}\n`;
        pokepaste += `- ${pokemon.moves[1].name}\n`;
        pokepaste += `- ${pokemon.moves[2].name}\n`;
        pokepaste += `- ${pokemon.moves[3].name}\n\n`;
    });

    return pokepaste;

};