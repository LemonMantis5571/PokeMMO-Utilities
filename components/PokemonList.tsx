import { FC } from 'react'
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';

interface PokemonListProps {
    ShuffledPokemons: {
        name: string;
        number: string;
        abilities: string[];
        types: string[];
        tier: string;
        items: string;
        moves: [string, string[]][];
        newMoves: [string, { name: string; type: string; }][] | null;
    }[];
}

const PokemonList: FC<PokemonListProps> = ({ ShuffledPokemons }) => {
    return (<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ShuffledPokemons ? ShuffledPokemons.map((pokemon, index) => {
            return (
                <PokemonCard
                    name={pokemon.name}
                    key={index}
                    number={pokemon.number}
                    abilities={pokemon.abilities}
                    types={pokemon.types}
                    tier={pokemon.tier}
                    moves={pokemon.moves}
                    Item={pokemon.items}
                    newMoves={pokemon.newMoves}
                />
            );
        }) : [...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>)
}

export default PokemonList