import { FC } from 'react'
import CompendiumClient from './CompendiumClient'
import getTeams from '@/app/actions/getTeams'


const page: FC = async () => {
  const teams = await getTeams();

  return (
    <>
      <CompendiumClient teams={teams} />
    </>

  )
}

export default page