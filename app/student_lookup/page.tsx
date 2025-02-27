import DefaultTable from "@/components/default-table";
import React from "react";
import { fetchStudentsWithAverages } from "@/app/lib/queries";
import { columnsStudent, User, StudentWithAverage } from "@/app/lib/definitions";
import { authUser} from '@/auth';


export default async function Home() {
  const user = await authUser() as User;
  const studentsWithAverages: StudentWithAverage[] = await fetchStudentsWithAverages(user.id);
  return (
    <>
      <DefaultTable items={studentsWithAverages} columns={columnsStudent}/>
    </>
  );
}
