import { fetchGrades } from "@/app/lib/queries";
import AddStudentForm from "@/components/add-student-form";
import { authUser } from '@/auth';
import { Grade, User } from "@/app/lib/definitions";

export default async function AddStudentPage() {
  const grades: Grade[] = await fetchGrades();
  const user = await authUser() as User;
  return (
    <div className="relative mx-auto flex w-full max-w-[400px] flex-col shadow-2xl rounded-lg outline outline-primary p-8 items-center bg-white">
      <AddStudentForm grades={grades} user_id={user.id}/>
    </div>
  );
}
