import React from "react";

export interface Column<T> {
  label: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

export interface DataTableProps<T> {
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
  emptyState?: React.ReactNode;
  pagination?: React.ReactNode;
  header?: React.ReactNode;
}
