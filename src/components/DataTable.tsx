"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize: number;
  total: number;
  getRowId?: (row: T, idx: number) => string | number;
  onRowClick?: (row: T) => void;
  className?: string;
  initialPage?: number;
}

export function DataTable<T>({
  columns,
  data,
  pageSize,
  total,
  getRowId,
  onRowClick,
  className,
  initialPage = 1,
}: DataTableProps<T>) {
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(total / pageSize);

  // Paginate data internally
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.accessor as string} className={col.className}>
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            pagedData.map((row, idx) => (
              <TableRow
                key={getRowId ? getRowId(row, idx) : idx}
                className={
                  onRowClick ? "cursor-pointer hover:bg-accent" : undefined
                }
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor as string}
                    className={col.className}
                  >
                    {col.render ? col.render(row) : (row as any)[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="flex items-center justify-between py-2">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded border bg-muted text-foreground disabled:opacity-50"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 rounded border bg-muted text-foreground disabled:opacity-50"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default DataTable;
