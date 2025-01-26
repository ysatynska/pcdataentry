import React from "react";
import { fetchAveragesBySectionID, fetchAveragesForGrade, fetchAllGrades } from "./lib/queries";
import AverageScoresBarChart from "@/components/average-scores-barchart";
import AvgScoresGradeBarChart from "@/components/avg-scores-grades-barchart";

export default async function Home() {
  const sections = await fetchAveragesBySectionID();
  const grades = await fetchAllGrades();

  const gradesData = await Promise.all(
    grades.map(async (grade) => {
      const averages = await fetchAveragesForGrade(grade.grade);
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
        <div className="bg-white shadow rounded-lg p-6">
          <AverageScoresBarChart sections={sections} forGrade={null}/>
        </div>
      </section>
      <hr className="border-t-1 border-primary my-10"></hr>
      <section>
        <h1 className="text-2xl mb-6 text-primary font-bold">2. Summary by Grade</h1>
        <div className="grid grid-cols-2 gap-4 flex-wrap justify-center">
          {filteredGradesData.map((gradeData) => (
            <section key={`${gradeData.grade.grade}`}>
              <div className="bg-white shadow rounded-lg p-6">
                <AverageScoresBarChart sections={gradeData.sections} forGrade={gradeData.grade.grade}/>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
