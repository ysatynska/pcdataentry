import { fetchStudent, fetchSectionsByEvaluationId, fetchEvaluations } from "@/app/lib/queries";
import AddNewLink from "@/components/add-new-eval-link";
import EvaluationCard from "@/components/evaluation-card";
import { authUser } from '@/auth';
import { Student, Evaluation, SectionByEvalId, EvaluationWithSections, User } from "@/app/lib/definitions";

type StudentOverviewProps = Promise<{ student_id: string; }>

export default async function StudentOverview({ params }: { params: StudentOverviewProps }) {
  const user = await authUser() as User;
  const { student_id } = await params;

  const student: Student = await fetchStudent(student_id, user.id);
  const evaluations: Evaluation[] = await fetchEvaluations(student_id, user.id);
  const evaluationsWithSections: EvaluationWithSections[] = await Promise.all(
    evaluations.map(async (evaluation) => {
      const sections: SectionByEvalId[] = await fetchSectionsByEvaluationId(evaluation.id, user.id);
      return {
        ...evaluation,
        sections,
      } as EvaluationWithSections;
    })
  );

  return (
    <div className="text-center">
      <p className="text-xl mb-5">{student.name} (grade {student.grade})</p>
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {evaluationsWithSections.map((evaluation, index) => (
          <EvaluationCard key={index} evaluation={evaluation} />
        ))}
      </div>
      <AddNewLink student_id={student_id}/>
    </div>
  );
}
