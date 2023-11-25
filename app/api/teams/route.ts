import { NextResponse } from "next/server";
import prisma from '@/lib/db';

export async function POST(
    request: Request
) {
    const body = await request.json();

    const {
        name,
        description,
        members,
        tier
    } = body;


    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const team = await prisma.team.create({
        data: {
            name,
            description,
            members,
            Tier: tier
        }
    });

    return NextResponse.json(team, { status: 200 });
}