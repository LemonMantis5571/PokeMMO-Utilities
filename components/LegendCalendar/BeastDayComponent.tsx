/* eslint-disable @next/next/no-img-element */
'use client';
import { getPokemonForDate } from "@/lib/utils";
import { DayContentProps } from "react-day-picker";

const pokemons = ['Entei', 'Suicune', 'Raikou'];

const BeastDayComponent = (props: DayContentProps) => {
    const pokemon = getPokemonForDate(props.date, pokemons);

    return (
        <div className="flex flex-col items-center gap-0.5">
            <img
                className="w-6 h-6 object-contain"
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.pokemonName?.toLowerCase()}.png`}
                alt={pokemon.pokemonName}
            />
            <span className="text-[10px] text-muted-foreground font-medium">{pokemon.day}</span>
        </div>
    );
}

export default BeastDayComponent;
