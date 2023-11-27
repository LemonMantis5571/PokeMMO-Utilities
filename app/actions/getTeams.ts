import prisma from '@/lib/db';

export default async function getTeams() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!teams) {
            return null;
        }

       return teams

    } catch (error) {
        console.log(error);
    }

    return null;
}