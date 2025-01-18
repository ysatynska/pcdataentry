import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@heroui/react";
import DefaultTable from "@/components/table";
import React from "react";
import { fetchSections } from "@/app/lib/queries";


export default async function Home() {
  const sections = await fetchSections();
  console.log("sections: ", sections);

  return (
    <><DefaultTable items={sections}/></>
  );
}
