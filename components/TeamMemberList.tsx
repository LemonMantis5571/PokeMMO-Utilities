import { PokemonMember } from '@/lib/types/PokemonMembertypes'
import { FC } from 'react'
import TeamMemberCard from './TeamMemberCard'

interface TeamMemberListProps {
    team: {
        name: string,
        description?: string | null,
        tier?: string | null,
        members: PokemonMember[]
    }
}

const TeamMemberList: FC<TeamMemberListProps> = ({ team }) => {
    return (
        team.members.map((pokemon, index) => {
            return (
                <TeamMemberCard pokemon={pokemon} key={index} />
            )
        })
    )
}

export default TeamMemberList