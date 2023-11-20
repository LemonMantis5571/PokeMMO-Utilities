import getTeamById from '@/app/actions/getTeamById'
import { FC } from 'react'

interface IParams {
    teamId?: string;
}

const page = async ({ params }: { params: IParams }) => {
    const team = await getTeamById(params);
    if (!team) return (<><div>Team not found</div></>)
    return (
        <>
            <p>{team.name}</p>
            <p>{team.description}</p>
            <p>{team.members.map((pokemon, index) => {
                return (
                    <>
                        {pokemon.name}
                        {pokemon.item}
                        {pokemon.nature}
                        {pokemon.type}
                        {pokemon.type2}
                    </>
                )
            })}</p>
        </>
    )
}

export default page