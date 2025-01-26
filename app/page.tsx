import React from "react";
import { fetchAveragesBySectionID, fetchAveragesForGrade, fetchGrades } from "./lib/queries";
import AverageScoresBarChart from "@/components/average-scores-barchart";

export default async function Home() {
  const sections = await fetchAveragesBySectionID();
  const grades = await fetchGrades();

  const gradesData = await Promise.all(
    grades.map(async (grade) => {
      const averages = await fetchAveragesForGrade(grade.id);
      console.log(grade)
      console.log(averages)
      if (averages.length > 0) {
        return {
          grade: grade,
          sections: averages
        };
      }
      return null;
    })
  );
  const filteredGradesData = gradesData.filter(item => item !== null);

  return (
    <div className="w-full">
      <section>
        <h1 className="text-2xl mb-6 text-primary font-bold">1. Overall Summary</h1>
        <div className="bg-white shadow rounded-lg px-6 pt-6">
          <AverageScoresBarChart sections={sections} grade={null}/>
        </div>
      </section>
      <hr className="border-t-1 border-primary my-10"></hr>
      <section>
        <h1 className="text-2xl mb-6 text-primary font-bold">2. Summary by Grade</h1>
        <div className="grid grid-cols-2 gap-4 flex-wrap justify-center">
          {filteredGradesData.map((gradeData) => (
            <section key={`${gradeData.grade.id}`}>
              <div className="bg-white shadow rounded-lg px-6 pt-6">
                <AverageScoresBarChart sections={gradeData.sections} grade={gradeData.grade}/>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
