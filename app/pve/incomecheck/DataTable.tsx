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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
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
      name: 'Amulet Coin',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/amulet-coin.png'
    },
    {
      name: 'Riches Charm 75%',
      img: richesCharm.src
    },
    {
      name: 'Riches Charm 100%',
      img: richesCharm.src
    }

  ]

  const [checkList, setCheckList] = useState(checkboxObj);

  const [checked, setChecked] = useState<number[]>([]);

  const checkChange = (value: number) => {
    if (checked.indexOf(value) !== -1) {
      setChecked(checked.filter((checkBox) => checkBox !== value));
    } else {
      setChecked([...checked, value]);
    }
  };


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
  

  console.log(table.getSelectedRowModel().flatRows.map((row) => {
    console.log(row.original.trainers.income);
  }));



  
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
        {checkList.map((item, index) => (
          <div key={index} className="flex items-center justify-start gap-2 ">
            <Checkbox
              key={index}
              id={item.name}
              name={item.name}
              onCheckedChange={() => checkChange(index)}
            />
            <img src={item.img} alt={item.name} width={50} height={50}/>
            <Label htmlFor={item.name}>{item.name}</Label>
          </div>
        ))}
      </div>
      {table.getSelectedRowModel().flatRows.map((row) => {
        return (
          <div key={row.id}>
            <p>{row.original.trainers.income}</p>
          </div>
        )
      })}
    </div>
  )
}