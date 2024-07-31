/* eslint-disable @next/next/no-img-element */
import { getLegendaryPokemonForMonth } from '@/lib/utils';
import { FC } from 'react'

interface FooterProps {
    birdMonth: number | undefined;
    beastMonth: number | undefined;
}

const Footer: FC<FooterProps> = ({ birdMonth, beastMonth }) => {
    const legendary = getLegendaryPokemonForMonth(['Entei', 'Suicune', 'Raikou'], ['Zapdos', 'Moltres', 'Articuno'], beastMonth, birdMonth);
    const { currenBeast, currentBird } = legendary;


    return (<div className='m-auto mt-12'>
        <div className='flex justify-evenly gap-4'>
            <div className='flex flex-col font-bold gap-4'>
                <h3>{currentBird}</h3>
                <img className='transition ease-in-out delay-150 hover:-translate-y-4 duration-300' src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currentBird?.toLowerCase()}.png`} alt="legendaryBird" />
            </div>
            <div className='flex flex-col font-bold gap-4'>
                <h3>{currenBeast}</h3>
                <img className='transition ease-in-out delay-150 hover:-translate-y-4 duration-300' src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currenBeast?.toLowerCase()}.png`} alt="legendaryBeast" />
            </div>

        </div>
    </div>)
}

export default Footer