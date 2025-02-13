"use client"
import React, { useState } from "react";
import AverageScoresBarChart from "@/components/average-scores-barchart";
import DonutChart from "@/components/donut-chart";

export default function ChartsToggle ({ sections, filteredBarData, avgPerStudent, filteredPieData }: { sections: any, filteredBarData: any, avgPerStudent: any, filteredPieData: any}) {
  const [activeTab, setActiveTab] = useState("bar");
  const categories = {
    low: 0,
    medium: 0,
    high: 0
  };
  avgPerStudent.forEach((student: any) => {
    const avgScore = parseFloat(student.avg_percent_score);

    if (avgScore < 20) {
        categories.low++;
    } else if (avgScore < 75) {
        categories.medium++;
    } else {
        categories.high++;
    }
  });

  return (
    <div className="w-full">
      {sections.length > 0 ? (
        <>
          <div className="flex space-x-4 mb-6">
            <button className={`px-4 py-2 rounded-xl ${activeTab === "bar" ? "bg-secondary text-white outline outline-primary" : "bg-white outline outline-primary"}`} onClick={() => setActiveTab("bar")}>
              Bar Chart
            </button>
            <button className={`px-4 py-2 rounded-xl ${activeTab === "pie" ? "bg-secondary text-white outline outline-primary" : "bg-white outline outline-primary"}`} onClick={() => setActiveTab("pie")}>
              Pie Chart
            </button>
          </div>
          {activeTab === "bar" ? (
            <>
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
                  {filteredBarData.map((gradeData:any) => (
                    <section key={`${gradeData.grade.id}`}>
                      <div className="bg-white shadow rounded-lg px-6 pt-6">
                        <AverageScoresBarChart sections={gradeData.sections} grade={gradeData.grade}/>
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h1 className="text-2xl mb-6 text-primary font-bold">1. Overall Summary</h1>
                <div className="mx-auto">
                  <DonutChart labels={["Inicio", "En progreso", "Logrado"]} chartData={[categories.low, categories.medium, categories.high]} colors={["rgb(255, 99, 132)", "rgb(255, 205, 86)", "rgb(50, 168, 80)"]} title="Promedio"/>
                </div>
              </section>
              <hr className="border-t-1 border-primary my-10"></hr>
              <section>
                <h1 className="text-2xl mb-6 text-primary font-bold">2. Summary by Grade</h1>
                <div className="grid grid-cols-2 gap-4 flex-wrap justify-center">
                  {filteredPieData.map((gradeData: any) => (
                    <section key={`${gradeData.grade.id}`}>
                      <h2 className="text-xl text-center font-semibold mb-4">{gradeData.grade.name}</h2>
                      <div className="w-96 h-96 mx-auto">
                        <DonutChart
                          labels={["Inicio", "En progreso", "Logrado"]}
                          chartData={[
                            gradeData.categories.low, 
                            gradeData.categories.medium, 
                            gradeData.categories.high
                          ]}
                          colors={["rgb(255, 99, 132)", "rgb(255, 205, 86)", "rgb(50, 168, 80)"]}
                          title={`Grade: ${gradeData.grade.name}`}
                        />
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <h2 className="text-2xl text-center">
          Here you will see summary of students' performance once records are added.
        </h2>
      )}
    </div>
  )
}