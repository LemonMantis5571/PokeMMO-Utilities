import prisma from '@/lib/db';
import { PokemonTeam } from '@/lib/types/PokemonMembertypes';

export default async function getTeams(Perpage: number, Page: number) {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    select: {
                        name: true
                    }
                }
            },
            take: Perpage,
            skip: (Page - 1) * Perpage
        });

        const count = await prisma.team.count();

        if (!teams) {
            return null;
        }

        if (teams) {
            return {
                teams,
                count
            }
        }

    } catch (error) {
        console.log(error);
    }

    return null;
}