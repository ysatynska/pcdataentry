import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@heroui/react";
import DefaultTable from "@/components/default-table";
import React from "react";
import { fetchStudents } from "@/app/lib/queries";
import { columnsStudent } from "@/app/lib/definitions";
import { authUser, User } from '@/auth';


export default async function Home() {
  const user = await authUser() as User;
  const students = await fetchStudents(user.id);
  
  return (
    <>
      <DefaultTable items={students} columns={columnsStudent}/>
    </>
  );
}
