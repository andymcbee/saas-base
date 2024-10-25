import { Table as TableData } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import React from "react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

// TODO add a 'get options' function that accepts an options key.
// this will fetch the relevant options from the backend, based
// on the shared key.

// Define the enum
export enum TaskStatusEnum {
  Success = "success",
  Processing = "processing",
  Pending = "pending",
}

// Constant object with enum values organized as requested
export const TASK_CONSTANTS = {
  tasks: {
    status: {
      enumValues: Object.values(TaskStatusEnum), // Array of enum values
    },
  },
};

interface DataTableProps<TData> {
  table: TableData<TData>;
}

//temp
const options = TASK_CONSTANTS.tasks.status.enumValues.map((status) => ({
  label: status,
  value: status,
}));

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div>
      <DataTableFacetedFilter
        key="status"
        column={table.getColumn("status")}
        title={"status".toUpperCase()}
        options={options}
      />
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
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
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
    </div>
  );
}
