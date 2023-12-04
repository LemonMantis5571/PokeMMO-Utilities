import { FC } from 'react'
import CompendiumClient from './CompendiumClient'
import getTeams from '@/app/actions/getTeams'
import { parse } from 'path'

export const dynamic = 'force-dynamic'

interface IParams {
  searchParams: {
    page: string
  }

}

const page: FC<IParams> = async ({ searchParams }) => {

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 4;

  const data = await getTeams(perPage, page);

  if (!data) {
    return <div>No Teams to show yet</div>
  }

  const { teams, count } = data;

  return (
    <>
      <CompendiumClient teams={teams} count={count} perPage={perPage} page={page} />
    </>

  )
}

export default page