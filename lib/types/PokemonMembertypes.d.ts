import { Evs, Moves } from "@prisma/client"

export type PokemonMember = {
    id: number,
    name: string,
    item: string | null,
    ability: string,
    nature: string,
    type: string,
    type2?: string | null,
    evs: Evs[],
    moves: Moves[],
}