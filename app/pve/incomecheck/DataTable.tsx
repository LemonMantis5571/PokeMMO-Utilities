/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
  getSortedRowModel,
  SortingState,
  getFacetedUniqueValues,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import richesCharm from '@/components/imgs/richesCharm.png';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { trainers: { income: number; }; }, TValue>({
  columns,
  data,

}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [initialRegion, setIniiialRegion] = useState('All Regions');

  const [amuletCoin, setAmuletCoin] = useState(0);
  const [richesCharm75, setRichesCharm75] = useState(0);
  const [richesCharm100, setRichesCharm100] = useState(0);
  const [numberOfAmuletCoin, setNumberOfAmuletCoin] = useState(1);
  const [numberOfRichesCharm75, setNumberOfRichesCharm75] = useState(1);
  const [numberOfRichesCharm100, setNumberOfRichesCharm100] = useState(1);

  const regionsObj = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Teselia"
  ]

  const checkboxObj = useMemo(() => [
    {
      name: 'No-Boost',
      amountOfItems: 0,
      img: 'https://marriland.com/wp-content/plugins/marriland-core/images/pokemon/sprites/home/full/unown.png',
      initialValue: 0,
      costValue: 0,
      multiplier: 1,
    },
    {
      name: 'Amulet Coin',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png',
      initialValue: 17000,
      amountOfItems: numberOfAmuletCoin,
      costValue: amuletCoin,
      multiplier: 1.5,
    },
    {
      name: 'Riches Charm 75%',
      img: richesCharm.src,
      initialValue: 64000,
      amountOfItems: numberOfRichesCharm75,
      costValue: richesCharm75,
      multiplier: 1.75,
    },
    {
      name: 'Riches Charm 100%',
      img: richesCharm.src,
      initialValue: 98000,
      amountOfItems: numberOfRichesCharm100,
      costValue: richesCharm100,
      multiplier: 2,
    }
  ], [
    numberOfAmuletCoin,
    amuletCoin,
    numberOfRichesCharm75,
    richesCharm75,
    numberOfRichesCharm100,
    richesCharm100,
    richesCharm.src
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    onSortingChange: setSorting,
    state: {
      columnFilters,
    },
    initialState: {

      pagination: {
        pageSize: 8,
      }
    },
  });

  // Calcuate income of every selected row

  const selectedRows = table.getSelectedRowModel().flatRows;
  const selectedRowsBaseIncome = table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income);
  const calculateIncome = (multiplier: number, initialCost: number, CostValue = 0, amountOfItems: number) => {

    // if theres no initial value just calculate based of the default GTL cost

    if (selectedRows.length > 0 && CostValue === 0) {
      return table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income).reduce((a, b) => (a + b), 0) * multiplier - initialCost * amountOfItems;
    }

    // if user inputed a GTL cost calculate based of that

    if (selectedRows.length > 0 && CostValue !== 0) {
      return table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income).reduce((a, b) => (a + b), 0) * multiplier - CostValue * amountOfItems;
    }

    return 0;
  };


  return (
    <div>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search by Trainer"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {initialRegion}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {regionsObj.map((region, index) => {
              return (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={table.getColumn("region")?.getFilterValue() === region}
                  onCheckedChange={(checked) => {
                    table.getColumn("region")?.setFilterValue(checked ? region : undefined);
                    setIniiialRegion(checked ? region : 'All Regions');
                  }}
                >
                  {region}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <h1 className="bold text-start mb-5 mt-5">Input GTL Cost</h1>
      <div className="flex gap-5 mb-5 items-center justify-start">
        <div className="flex flex-col gap-5 sm:text-center text-start">

          <p className="text-xs">Amulet Coin</p>
          <Input
            placeholder="Booster Cost"
            value={amuletCoin}
            onChange={(event) =>
              setAmuletCoin(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
          <p className="text-xs">Number of Coins</p>
          <Input type="number" min={1} placeholder="Number of Coins" value={numberOfAmuletCoin} onChange={(event) => setNumberOfAmuletCoin(Number(event.target.value))} className="sm:w-[100px] w-[50px]" />

        </div>
        <div className="flex flex-col gap-5 sm:text-center text-start">
          <p className="text-xs">Charm 75%</p>
          <Input
            placeholder="Booster Cost"
            value={richesCharm75}
            onChange={(event) =>
              setRichesCharm75(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
          <p className="text-xs">Number of Booster</p>
          <Input type="number" min={1} placeholder="Number of Booster" value={numberOfRichesCharm75} onChange={(event) => setNumberOfRichesCharm75(Number(event.target.value))} className="sm:w-[100px] w-[50px]" />
        </div>
        <div className="flex flex-col gap-5 sm:text-center text-start">
          <p className="text-xs">Charm 100%</p>
          <Input
            placeholder="Booster Cost"
            value={richesCharm100}
            onChange={(event) =>
              setRichesCharm100(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
          <p className="text-xs">Number of Booster</p>
          <Input type="number" min={1} placeholder="Number of Booster" value={numberOfRichesCharm100} onChange={(event) => setNumberOfRichesCharm100(Number(event.target.value))} className="sm:w-[100px] w-[50px]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Table>
          <TableCaption>Total Income</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Boost</TableHead>
              <TableHead>Multiplier</TableHead>
              <TableHead>Amount Used</TableHead>
              <TableHead>Number of Gyms</TableHead>
              <TableHead>Gym Base Income * Multiplier </TableHead>
              <TableHead>Booster Cost</TableHead>
              <TableHead className="text-right">Profit Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkboxObj.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <img src={item.img} alt={item.name} width={50} height={50} />
                    {item.name}
                  </TableCell>
                  <TableCell>{item.multiplier}</TableCell>
                  <TableCell>{item.amountOfItems}</TableCell>
                  <TableCell>{selectedRows.length}</TableCell>
                  <TableCell>{selectedRowsBaseIncome.reduce((a, b) => (a + b), 0) * item.multiplier}</TableCell>
                  <TableCell>{item.costValue === 0 ? item.initialValue * item.amountOfItems : item.costValue * item.amountOfItems}</TableCell>
                  <TableCell className={
                    `text-right ${Math.sign(calculateIncome(item.multiplier, item.initialValue, item.costValue, item.amountOfItems)) === 1
                      ? 'text-green-500'
                      : Math.sign(calculateIncome(item.multiplier, item.initialValue, item.costValue, item.amountOfItems)) === -1
                        ? 'text-red-500'
                        : ''
                    }`
                  }>{calculateIncome(item.multiplier, item.initialValue, item.costValue, item.amountOfItems)}¥</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}