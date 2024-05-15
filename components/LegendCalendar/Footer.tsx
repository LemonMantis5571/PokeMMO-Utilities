/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

interface FooterProps {
    birdMonth: number | undefined;
    beastMonth: number | undefined;
}

const Footer: FC<FooterProps> = ({ birdMonth, beastMonth }) => {
    const legendaryBeasts = ['Entei', 'Suicune', 'Raikou'];
    const legendaryBirds = ['Zapdos', 'Moltres', 'Articuno'];
    const currenBeast = legendaryBeasts[beastMonth as number % legendaryBeasts.length]
    const currentBird = legendaryBirds[birdMonth as number % legendaryBirds.length];


    return (<div className='m-auto mt-12'>
        <div className='flex justify-center gap-4'>
            <div className='flex flex-col font-bold'>
                <h3>{currentBird}</h3>
                <img className='transition ease-in-out delay-150' src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currentBird.toLowerCase()}.png`} alt="legendaryBird" />
            </div>
            <div className='flex flex-col font-bold'>
                <h3>{currenBeast}</h3>
                <img className='transition ease-in-out delay-150' src={`https://img.pokemondb.net/sprites/diamond-pearl/normal/${currenBeast.toLowerCase()}.png`} alt="legendaryBeast" />
            </div>

        </div>
    </div>)
}

export default Footer