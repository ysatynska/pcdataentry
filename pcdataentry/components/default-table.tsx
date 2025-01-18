'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@heroui/react";

type Column = {
  key: string,
  label: string,
}

function getKeyValue (item: any, columnKey: any, page: any, rowsPerPage: any, index: any) {
  if (columnKey == "rowNumber") {
    return index + 1;
  } else {
    return item[columnKey];
  }
}

export default function DefaultTable({ items, columns }: { items: any, columns: Column[] }) {
  const pathname = usePathname();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = pathname === '/' ? 5 : 13;

  const pages = Math.ceil(items.length / rowsPerPage);

  const rowItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [page, items]);

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
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rowItems}>
          {(rowItem: any) => {
            const index = items.indexOf(rowItem);
            return (
              <TableRow key={rowItem.player_id}>
                {(columnKey) => <TableCell>{getKeyValue(rowItem, columnKey, page, rowsPerPage, index)}</TableCell>}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}
