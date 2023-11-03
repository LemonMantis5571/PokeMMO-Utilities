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
import React, { useState } from "react";
import richesCharm from '@/components/imgs/richesCharm.png';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { trainers: { income: number; }; }, TValue>({
  columns,
  data,

}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [amuletCoin, setAmuletCoin] = useState(0);
  const [richesCharm75, setRichesCharm75] = useState(0);
  const [richesCharm100, setRichesCharm100] = useState(0);

  const checkboxObj = [
    {
      name: 'No-Boost',
      img: '',
      initialValue: 0,
      costValue: 0,
      multiplier: 1
    },
    {
      name: 'Amulet Coin',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png',
      initialValue: 17000,
      costValue: amuletCoin,
      multiplier: 1.5
    },
    {
      name: 'Riches Charm 75%',
      img: richesCharm.src,
      initialValue: 64000,
      costValue: richesCharm75,
      multiplier: 1.75
    },
    {
      name: 'Riches Charm 100%',
      img: richesCharm.src,
      initialValue: 98000,
      costValue: richesCharm100,
      multiplier: 2
    }

  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,

    state: {
      columnFilters,
    },

    initialState: {

      pagination: {
        pageSize: 8,
      }
    }
  });

  const selectedRows = table.getSelectedRowModel().flatRows;
  const calculateIncome = (multiplier: number, initialCost: number, CostValue = 0) => {

    if (selectedRows.length > 0 && CostValue === 0) {
      return table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income).reduce((a, b) => (a + b), 0) * multiplier - initialCost;
    }

    if (selectedRows.length > 0 && CostValue !== 0) {
      return table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income).reduce((a, b) => (a + b), 0) * multiplier - CostValue;
    }

    return 0;
  };


  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter regions"
          value={(table.getColumn("region")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("region")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
          <p>Amulet Coin</p>
          <Input
            placeholder="Booster Cost"
            value={amuletCoin}
            onChange={(event) =>
              setAmuletCoin(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
        </div>
        <div className="flex flex-col gap-5 sm:text-center text-start">
          <p>Charm 75%</p>
          <Input
            placeholder="Booster Cost"
            value={richesCharm75}
            onChange={(event) =>
              setRichesCharm75(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
        </div>
        <div className="flex flex-col gap-5 sm:text-center text-start">
          <p>Charm 100%</p>
          <Input
            placeholder="Booster Cost"
            value={richesCharm100}
            onChange={(event) =>
              setRichesCharm100(Number(event.target.value))
            }
            className="sm:w-[100px] w-[50px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Table>
          <TableCaption>Total Income</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Boost</TableHead>
              <TableHead>Number of Gyms</TableHead>
              <TableHead>Booster Cost</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkboxObj.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{selectedRows.length}</TableCell>
                  <TableCell>{item.costValue === 0 ? item.initialValue : item.costValue}</TableCell>
                  <TableCell className={
                    `text-right ${Math.sign(calculateIncome(item.multiplier, item.initialValue, item.costValue)) === 1
                      ? 'text-green-500'
                      : Math.sign(calculateIncome(item.multiplier, item.initialValue, item.costValue)) === -1
                        ? 'text-red-500'
                        : ''
                    }`
                  }>{calculateIncome(item.multiplier, item.initialValue, item.costValue)}¥</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}