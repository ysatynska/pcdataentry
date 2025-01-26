import { fetchGrades } from "@/app/lib/queries";
import AddStudentForm from "@/components/add-student-form";

export default async function AddStudentPage() {
  const grades = await fetchGrades();
  return (
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
      <AddStudentForm grades={grades}/>
    </div>
  );
}
