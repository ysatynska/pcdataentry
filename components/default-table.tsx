'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue } from "@heroui/react";
import {useAsyncList} from "@react-stately/data";
import { useState, useMemo } from 'react';

type Column = {
  key: string,
  label: string,
}

// function getKeyValue (item: any, columnKey: any, page: any, rowsPerPage: any, index: any) {
//   if (columnKey == "rowNumber") {
//     return index + 1;
//   } else {
//     return item[columnKey];
//   }
// }

export default function DefaultTable({ items, columns }: { items: any[], columns: Column[] }) {
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
    column: columns[0]?.key || '',
    direction: 'ascending',
  });

  const pathname = usePathname();
  const rowsPerPage = pathname === '/' ? 5 : 13;

  const pages = Math.ceil(items.length / rowsPerPage);

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];

      // Handle sorting for numbers
      if (typeof first === 'number' && typeof second === 'number') {
        return sortDescriptor.direction === 'ascending' ? first - second : second - first;
      }

      // Handle sorting for strings
      if (typeof first === 'string' && typeof second === 'string') {
        return sortDescriptor.direction === 'ascending'
          ? first.localeCompare(second)
          : second.localeCompare(first);
      }

      return 0;
    });

    return sorted;
  }, [items, sortDescriptor]);

  const rowItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [page, rowsPerPage, sortedItems]);

  const handleSort = (columnKey: string) => {
    console.log("in handle sort");
    setSortDescriptor((prev) => {
      if (prev.column === columnKey) {
        return {
          column: columnKey,
          direction: prev.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: columnKey,
        direction: 'ascending',
      };
    });
  };

  return (
    <>
      <Table
        aria-label="Ranks Table"
        shadow="md"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              allowsSorting
              onClick={() => handleSort(column.key)}
              className="cursor-pointer"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {rowItems.map((rowItem: any) => (
            <TableRow key={rowItem.id}>
              {(columnKey) => <TableCell>{getKeyValue(rowItem, columnKey)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}