import React from "react";
import { fetchAveragesBySectionID, fetchAveragesPerSectionForGrade, fetchGrades, fetchAverageScoresPerStudent } from "./lib/queries";
import { authUser, User } from '@/auth';
import ChartsToggle from "@/components/partials/ChartsToggle";

export default async function Home() {
  const user = await authUser() as User;
  const sections = await fetchAveragesBySectionID(user.id);
  const grades = await fetchGrades();
  const avgPerStudent = await fetchAverageScoresPerStudent(user.id);

  const gradesBarData = await Promise.all(
    grades.map(async (grade) => {
      const averages = await fetchAveragesPerSectionForGrade(grade.id, user.id);
      if (averages.length > 0) {
        return {
          grade: grade,
          sections: averages
        };
      }
      return null;
    })
  );
  const filteredBarData = gradesBarData.filter(item => item !== null);

  const gradesPieData = await Promise.all(
    grades.map(async (grade) => {
      console.log(grade);
      const averages = avgPerStudent.filter((item) => item.grade == grade.id);
      if (averages.length > 0) {
        const gradeCategories = { low: 0, medium: 0, high: 0 };
  
        averages.forEach((student: any) => {
          const avgScore = parseFloat(student.avg_percent_score);
  
          if (avgScore < 20) {
            gradeCategories.low++;
          } else if (avgScore < 75) {
            gradeCategories.medium++;
          } else {
            gradeCategories.high++;
          }
        });
  
        return {
          grade: grade,
          categories: gradeCategories
        };
      }
      return null;
    })
  );
  
  const filteredPieData = gradesPieData.filter(item => item !== null);
  console.log(filteredPieData);

  return (
    <ChartsToggle sections={sections} filteredBarData={filteredBarData} avgPerStudent={avgPerStudent} filteredPieData={filteredPieData}/>
  );
}
