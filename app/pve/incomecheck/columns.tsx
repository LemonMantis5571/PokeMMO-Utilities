'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export interface IncomeCheck {
    trainers: Trainers;
    income: number;
}

export interface Trainers {
    name: string;
    city: string;
    income: number;
    region: string;
}


export const columns: ColumnDef<IncomeCheck>[] = [
    {
        id: 'trainers.name',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all rows"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'trainers.name',
        header: 'Trainers',
    },
    {
        accessorKey: 'income',
        header: 'Income',
    },
    {
        accessorKey: 'trainers.city',
        header: 'City',
    },
    {
        accessorKey: 'trainers.region',
        header: 'Region',
    }

]