import { fetchStudent, fetchAllSections } from "@/app/lib/queries";
import AddEvalutionForm from "@/components/add-evaluation-form";
import { authUser, User } from '@/auth';

export default async function AddStudentEval({params}: any) {
  const user = await authUser() as User;
  const { student_id } = await params;
  const student = await fetchStudent(student_id, user.id);
  const sections = await fetchAllSections();

  return (
      <>
         <AddEvalutionForm student={student} sections={sections} user_id={user.id}/>
      </>
  );
}

