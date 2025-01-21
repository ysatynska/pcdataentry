import { fetchStudent, fetchSectionsByEvaluationId, fetchEvaluations } from "@/app/lib/queries";
import AddNewLink from "@/components/add-new-eval-link";
import EvaluationCard from "@/components/evaluation-card";

export default async function StudentOverview({ params }: any) {
  const { student_id } = await params;

  const student = await fetchStudent(student_id);
  const evaluations = await fetchEvaluations(student_id);
  const evaluationsWithSections = await Promise.all(evaluations.map(async (evaluation) => {
    const sections = await fetchSectionsByEvaluationId(evaluation.id);
    return {
      ...evaluation,
      sections: sections,
    };
  }));

  return (
    <div className="text-center">
      <p className="text-xl mb-5">{student.name} (grade {student.grade}, age {student.age})</p>
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {evaluationsWithSections.map((evaluation, index) => (
          <EvaluationCard key={index} evaluation={evaluation} />
        ))}
      </div>
      <AddNewLink student_id={student_id}/>
    </div>
  );
}
