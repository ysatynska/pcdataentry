import { fetchStudent, fetchAllSections } from "@/app/lib/queries";
import AddEvaluationForm from "@/components/add-evaluation-form";
import { authUser } from "@/auth";
import { Student, Section, User } from "@/app/lib/definitions";

type AddStudentEvalProps = Promise<{ student_id: string; }>

export default async function AddStudentEval({ params }: { params: AddStudentEvalProps }) {
  const user = (await authUser()) as User;
  const { student_id } = await params;
  const student: Student | null = await fetchStudent(student_id, user.id);
  const sections: Section[] = await fetchAllSections();

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <>
      <AddEvaluationForm student={student} sections={sections} user_id={user.id} />
    </>
  );
}
