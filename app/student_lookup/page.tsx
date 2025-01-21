import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@heroui/react";
import DefaultTable from "@/components/default-table";
import React from "react";
import { fetchStudents } from "@/app/lib/queries";
import { columnsStudent } from "@/app/lib/definitions";


export default async function Home() {
  const students = await fetchStudents();
  
  return (
    <>
      <DefaultTable items={students} columns={columnsStudent}/>
    </>
  );
}
