import { DataTable } from "./DataTable";
import trainers from "@/data/trainers.mock.data.json";
import { IncomeCheck, columns } from "./columns";


async function getData(): Promise<IncomeCheck[]> {

    // Hard Way to do it with flatMap and inneficent json structure.

    // const regions: Array<keyof typeof trainers.GymLeaders> = ["Kanto", "Hoenn", "Johto", "Sinnoh", "Teselia"];
    // const mappedData: IncomeCheck[] = regions.flatMap((region) => {
    //     return trainers.GymLeaders[region].map((trainer) => {
    //         return {
    //             trainers: {
    //                 name: trainer.name,
    //                 city: trainer.city,
    //                 income: trainer.income,
    //             }
    //         };
    //     });
    // });

    // return mappedData;

    // Easy way

    const data: IncomeCheck[] = trainers.GymLeaders.map((trainer) => {
        return {
            trainers: {
                name: trainer.name,
                city: trainer.city,
                income: trainer.income,
                region: trainer.region,
            },
        };
    });

    return data;
}




export default async function Page() {
    const data = await getData();


    return (
        <div className="container mx-auto py-10">
            <DataTable data={data} columns={columns} />
        </div>
    );
}