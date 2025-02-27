'use client';
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Form, Input, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { addEvaluationAction } from "@/app/lib/actions";
import { Student, Section } from "@/app/lib/definitions";

interface EvaluationFormData {
  user_id: string;
  student_id: string;
  [key: string]: string | number;
}

export default function AddEvaluationForm({
  student,
  sections,
  user_id,
}: {
  student: Student;
  sections: Section[];
  user_id: string;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    const evaluationData: EvaluationFormData = {
      user_id,
      student_id: student.id,
    };

    sections.forEach(section => {
      const scoreKey = `score_${section.id}`;
      evaluationData[scoreKey] = parseInt(formData[scoreKey], 10) || 0;
    });
    console.log(evaluationData);
    const result = await addEvaluationAction(evaluationData);
    console.log(result);
    if (result.success) {
      redirect(`/${student.id}/overview`);
    }
  };

  const maxDescriptionLength = sections.length
    ? Math.max(...sections.map((section) => section.description.length))
    : 10;
  const maxLabelWidth = `${maxDescriptionLength * 9}px`;

  return (
    <Card className="max-w-2xl mx-auto p-6 shadow-lg outline outline-primary">
      <CardBody>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Evaluation Scores for {student.name}
        </h2>
        <Form className="w-full flex flex-col" validationBehavior="native" onSubmit={handleSubmit}>
          <Input isRequired name="user_id" type="hidden" value={user_id} />
          <Input isRequired name="student_id" type="hidden" value={student.id} />

          {sections.map((section) => (
            <div key={section.id} className="flex items-center p-4 border-b border-gray-200">
              <div className="flex-1 min-w-0" style={{ flexBasis: maxLabelWidth, width: maxLabelWidth }}>
                <label htmlFor={`score_${section.id}`} className="block text-sm font-medium text-gray-700 truncate">
                  {section.name} - {section.description}
                </label>
                <p className="text-xs text-gray-500">Max Score: {section.total_score}</p>
              </div>
              <Input
                isRequired
                errorMessage="Please enter a valid score"
                name={`score_${section.id}`}
                placeholder="Enter score"
                type="number"
                className="w-28"
                min="0"
                max={section.total_score}
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-6">
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button type="reset" variant="flat">
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
      <CardFooter className="text-sm text-gray-500 text-center">
        Ensure all scores are accurate before submitting.
      </CardFooter>
    </Card>
  );
}
