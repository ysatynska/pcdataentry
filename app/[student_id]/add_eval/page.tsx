import { fetchStudent, fetchEvaluationsWithSections, fetchAllSections } from "@/app/lib/queries";
import AddEvalutionForm from "@/components/add-evaluation-form";

export default async function AddStudentEval({params}: any) {
  const { student_id } = await params;
  const student = await fetchStudent(student_id);
  const sections = await fetchAllSections();

  return (
      <>
         <AddEvalutionForm student={student} sections={sections}/>
      </>
  );
}

