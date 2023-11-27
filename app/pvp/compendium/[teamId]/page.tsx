import getTeamById from '@/app/actions/getTeamById'
import PokemonTeamCard from './PokemonTeamCard';


interface IParams {
    teamId?: string;
}

const page = async ({ params }: { params: IParams }) => {
    const team = await getTeamById(params);
    if (!team) return (<><div>Team not found</div></>)
    return (
       <PokemonTeamCard team={team} />
    )
}

export default page