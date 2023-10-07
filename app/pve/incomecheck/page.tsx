import { DataTable } from "./DataTable";
import { IncomeCheck, columns } from "./columns";


async function getData(): Promise<IncomeCheck[]> {
    return [
        {
            trainers: { name: 'Brock', city: 'No idea', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Misty', city: 'Cerulean', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Lt. Surge', city: 'Vermilion', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Erika', city: 'Celadon', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Koga', city: 'Fuchsia', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Sabrina', city: 'Saffron', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Blaine', city: 'Cinnabar', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Giovanni', city: 'Viridian', income: 1200, region: 'Kanto' },
            income: 5000
        },
        {
            trainers: { name: 'Falkner', city: 'Violet', income: 1200, region: 'Johto' },
            income: 5000
        },
        {
            trainers: { name: 'Bugsy', city: 'Azalea', income: 1200, region: 'Johto' },
            income: 5000
        },
        {
            trainers: { name: 'Whitney', city: 'Goldenrod', income: 1200, region: 'Johto' },
            income: 5000
        },
        {
            trainers: { name: 'Morty', city: 'Ecruteak', income: 1200, region: 'Johto' },
            income: 5000
        },
        {
            trainers: { name: 'Chuck', city: 'Cianwood', income: 1200, region: 'Johto' },
            income: 5000
        },
        {
            trainers: { name: 'Jasmine', city: 'Olivine', income: 1200, region: 'Johto' },
            income: 5000
        }

    ]
}



export default async function Page() {
    const data = await getData();


    return (
        <div className="container mx-auto py-10">
            <DataTable data={data} columns={columns} />
        </div>
    );
}