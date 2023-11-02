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

  const checkboxObj = [
    {
      name: 'No-Boost',
      img: '',
      value: 0,
      multiplier: 1
    },
    {
      name: 'Amulet Coin',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png',
      value: 17000,
      multiplier: 1.5
    },
    {
      name: 'Riches Charm 75%',
      img: richesCharm.src,
      value: 64000,
      multiplier: 1.75
    },
    {
      name: 'Riches Charm 100%',
      img: richesCharm.src,
      value: 98000,
      multiplier: 2
    }

  ]

  const [checkList, setCheckList] = useState(checkboxObj);

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


  const calculateIncome = (multiplier: number, initialCost: number) => {

    if (selectedRows.length > 0) {
      return table.getSelectedRowModel().flatRows.map((row) => row.original.trainers.income).reduce((a, b) => (a + b), 0) * multiplier - initialCost;
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
                  <TableCell>Paid</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell className={
                    `text-right ${Math.sign(calculateIncome(item.multiplier, item.value)) === 1
                      ? 'text-green-500'
                      : Math.sign(calculateIncome(item.multiplier, item.value)) === -1
                        ? 'text-red-500'
                        : ''
                    }`
                  }>{calculateIncome(item.multiplier, item.value)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}