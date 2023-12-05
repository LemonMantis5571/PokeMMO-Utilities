import prisma from '@/lib/db';

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
            skip: (Page - 1) * Perpage,
            orderBy: {
                createdAt: 'desc'
            }
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