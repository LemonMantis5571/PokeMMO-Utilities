import { NextResponse } from "next/server";
import prisma from '@/lib/db';


export default async function getTeams(

) {
    try {

        const teams = await prisma.team.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });

        if (!teams) {
            return NextResponse.json("Error, no teams found", { status: 404 });
        }

        return teams;

    } catch (error) {
        console.log(error);
    }
}