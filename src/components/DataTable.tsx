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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React, { useState } from "react";

interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
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
  title?: string;
  description?: string;
  footer?: React.ReactNode;
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
  title,
  description,
  footer,
}: DataTableProps<T>) {
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(total / pageSize);

  // Paginate data internally
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-muted/30">
              {columns.map((col) => (
                <TableHead
                  key={col.accessor as string}
                  className={`px-4 py-3 text-left font-medium text-foreground ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">No data found</p>
                    <p className="text-xs">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pagedData.map((row, idx) => (
                <TableRow
                  key={getRowId ? getRowId(row, idx) : idx}
                  className={`border-b transition-colors ${
                    onRowClick
                      ? "cursor-pointer hover:bg-muted/50 active:bg-muted"
                      : "hover:bg-muted/30"
                  }`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.accessor as string}
                      className={`px-4 py-3 ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(row)
                        : typeof col.accessor === "string" ||
                          typeof col.accessor === "number"
                        ? ((row as Record<string | number, unknown>)[
                            col.accessor
                          ] as React.ReactNode)
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          {footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>{footer}</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>
                Showing {startItem} to {endItem} of {total} results
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* First Page */}
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(1)}
                disabled={page <= 1}
                aria-label="Go to first page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Previous Page */}
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        page === pageNum
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                aria-label="Go to next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => goToPage(totalPages)}
                disabled={page >= totalPages}
                aria-label="Go to last page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
