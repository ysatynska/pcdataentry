'use client'
import AddStudentForm from "@/components/add-student-form";
import {Card, CardBody} from "@heroui/react";

export default function AddStudentPage() {
  return (
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
      <AddStudentForm />
    </div>
  );
}
