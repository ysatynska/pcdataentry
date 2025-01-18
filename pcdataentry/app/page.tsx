import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@heroui/react";
import DefaultTable from "@/components/default-table";
import React from "react";
import { fetchStudents } from "@/app/lib/queries";
import { columnsStudent } from "@/app/lib/definitions";


export default async function Home() {
  const sections = await fetchStudents();
  
  console.log(sections);
  return (
    <><DefaultTable items={sections} columns={columnsStudent}/></>
  );
}
