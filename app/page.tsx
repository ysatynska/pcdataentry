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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="bg-white outline outline-primary shadow rounded-lg p-6">
            <AverageScoresBarChart sections={sections} forGrade={null}/>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-row flex-wrap justify-center">
            {filteredGradesData.map((gradeData) => (
              <section key={`${gradeData.grade.grade}`} className="mb-12 size-full">
                <div className="bg-white outline outline-primary shadow rounded-lg p-6">
                  <AverageScoresBarChart sections={gradeData.sections} forGrade={gradeData.grade.grade}/>
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
