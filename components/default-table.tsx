'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, Link } from "@heroui/react";
import { useState, useMemo } from 'react';

type Column = {
  key: string,
  label: string,
}

function getKeyValue (item: any, columnKey: any) {
  if (item[columnKey]) {
    if (columnKey == "name") {
      return (
        <Link href={`/${item.id}/overview`} className="text-primary underline">
          {item[columnKey]}
        </Link>
      );
    } else {
      return item[columnKey];
    }
  } else {
    return "-";
  }
}

export default function DefaultTable({ items, columns }: { items: any[], columns: Column[] }) {
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<{ column: string; direction: 'ascending' | 'descending' }>({
    column: columns[0]?.key || '',
    direction: 'ascending',
  });

  const pathname = usePathname();
  const rowsPerPage = 16;

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
              color="primary"
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