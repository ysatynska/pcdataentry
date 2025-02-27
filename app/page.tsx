import React from "react";
import { fetchAveragesBySectionID, fetchAveragesPerSectionForGrade, fetchGrades, fetchAverageScoresPerStudent } from "./lib/queries";
import { authUser } from '@/auth';
import ChartsToggle from "@/components/partials/ChartsToggle";

interface GradeData {
  id: string;
  name: string;
}

interface SectionAverage {
  section_id: string;
  average_score: number;
}

interface StudentAverage {
  grade: string;
  avg_percent_score: string;
}

export default async function Home() {
  const user = await authUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }

  const sections = await fetchAveragesBySectionID(user.id);
  const grades: GradeData[] = await fetchGrades();
  const avgPerStudent: StudentAverage[] = await fetchAverageScoresPerStudent(user.id);

  const gradesBarData = await Promise.all(
    grades.map(async (grade) => {
      const averages: SectionAverage[] = await fetchAveragesPerSectionForGrade(grade.id, user.id);
      return averages.length > 0 ? { grade, sections: averages } : null;
    })
  );
  const filteredBarData = gradesBarData.filter((item): item is { grade: GradeData; sections: SectionAverage[] } => item !== null);

  const gradesPieData = grades.map((grade) => {
    const averages = avgPerStudent.filter((item) => {
      return item.grade === String(grade.id);
    });
    
    if (averages.length > 0) {
      const gradeCategories = { low: 0, medium: 0, high: 0 };
      
      averages.forEach((student) => {
        const avgScore = parseFloat(student.avg_percent_score);
        
        if (avgScore < 20) {
          gradeCategories.low++;
        } else if (avgScore < 75) {
          gradeCategories.medium++;
        } else {
          gradeCategories.high++;
        }
      });
      
      return { grade, categories: gradeCategories };
    }
    return null;
  }).filter((item) => item !== null);

  return (
    <ChartsToggle sections={sections} filteredBarData={filteredBarData} avgPerStudent={avgPerStudent} filteredPieData={gradesPieData}/>
  );
}
