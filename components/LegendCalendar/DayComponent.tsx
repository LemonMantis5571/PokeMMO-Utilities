/* eslint-disable @next/next/no-img-element */
'use client';
import { CaptionProps, DayContent, DayContentProps, type MonthsProps } from "react-day-picker";

const pokemons = ['Zapdos', 'Moltres', 'Articuno'];

const DayComponent = (props: DayContentProps) => {
    const day = props.date.getDate();
    const month = props.date.getMonth();
    const pokemonIndex = month % pokemons.length;
    const pokemonName = pokemons[pokemonIndex];

    const getPokemonIcon = (pokemonName: string) => {

        return (
            <>
                <img
                    className='object-contain'
                    width={25}
                    height={25}
                    src={`https://img.pokemondb.net/sprites/home/normal/${pokemonName.toLowerCase()}.png`} alt='pokemon'>

                </img>
                <span className="text-xs">{day}</span>
            </>

        )

    }

    return (
        <span style={{ position: "relative", overflow: "visible" }}>
            {getPokemonIcon(pokemonName)}
        </span>
    );

}

export default DayComponent