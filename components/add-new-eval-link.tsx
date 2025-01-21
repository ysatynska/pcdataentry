'use client'
import { Link } from "@heroui/react";

export default function AddNewLink ({ student_id }: { student_id: string }) {
    
    return (
      <Link href={`/${student_id}/add_eval`} className="mt-5 text-xl">
        Add New Evaluation
      </Link>
    )
}