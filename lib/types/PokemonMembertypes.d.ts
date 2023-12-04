import { Evs, Moves, Team } from "@prisma/client"

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

export type PokePaste = {
    name: string,
    description?: string | null,
    tier?: string | null,
    members: PokemonMember[]
}


export type PokemonTeam = {
    teams: ({
        members: {
            name: string
        }[]
    } & Team)[] | null;
    count: number;
}