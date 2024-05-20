/* eslint-disable @next/next/no-img-element */
'use client';
import { getPokemonForDate } from "@/lib/utils";
import { DayContentProps,  } from "react-day-picker";

const pokemons = ['Zapdos', 'Moltres', 'Articuno'];

const BirdDayComponent = (props: DayContentProps) => {
    const pokemon = getPokemonForDate(props.date, pokemons);
    const getPokemonIcon = (pokemonName: string, day: number) => (
        <>
            <img
                className='object-contain'
                width={25}
                height={25}
                src={`https://img.pokemondb.net/sprites/home/normal/${pokemonName.toLowerCase()}.png`}
                alt='pokemon'
            />
            <span className="text-xs">{day}</span>
        </>
    );


    return (
        <span style={{ position: "relative", overflow: "visible" }}>
            {getPokemonIcon(pokemon.pokemonName, pokemon.day)}
        </span>
    );

}

export default BirdDayComponent