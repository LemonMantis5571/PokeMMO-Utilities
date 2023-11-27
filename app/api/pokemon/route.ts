import { NextResponse } from "next/server";
import prisma from '@/lib/db';

export async function POST(
    request: Request
) {
    const body = await request.json();

    const {
        name,
        item,
        nature,
        type,
        type2,
        ability
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    try {
        const pokemon = await prisma.pokemon.create({
            data: {
                name,
                item,
                nature,
                type,
                type2,
                ability
            }
        });

        return NextResponse.json(pokemon, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}