import getTeamById from '@/app/actions/getTeamById'
import { FC } from 'react'

interface IParams {
    teamId?: string;
}

const page = async ({ params }: { params: IParams }) => {
    const team = await getTeamById(params);
    if (!team) return (<><div>Team not found</div></>)
    return (
        <div>
            <p>{team.name}</p>
            <p>{team.description}</p>
            <div>{team.members.map((pokemon, index) => {
                return (
                    <>
                        {pokemon.name}
                        {pokemon.item}
                        {pokemon.nature}
                        {pokemon.type}
                        {pokemon.type2}
                        {pokemon.ability}
                        {pokemon.moves.map((move, index) => {
                            return (
                                <div key={index}>
                                    {move.name}
                                    {move.type}
                                </div>
                            )
                        })}
                    </>
                )
            })}</div>
        </div>
    )
}

export default page