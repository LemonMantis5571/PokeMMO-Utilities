import prisma from '@/lib/db';

interface Iparams {
    teamId?: string
}

export default async function getTeamById(
    params: Iparams
) {
    try {
        const { teamId } = params;
        const team = await prisma.team.findUnique({
            where: {
                id: teamId
            }
        });

        if (!team) {
            return null;
        }

        return team;

    } catch (error) {
        console.log(error);
    }
}