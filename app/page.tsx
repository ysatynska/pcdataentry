import React from "react";
import { fetchEvaluationsBySectionID, fetchTop5EvaluationSumsByStudents } from "./lib/queries";
import AverageScoresBarChart from "@/components/average-scores-barchart";
import HeroBanner from "@/components/hero-banner";
import TopPerformersCard from "@/components/top-performers-card";

export default async function Home() {
  const sections = await fetchEvaluationsBySectionID(); 
  // console.log(sections);

  const studentsScores = await fetchTop5EvaluationSumsByStudents();
  //console.log(studentsScores)

  return (
    <div className="min-h-screen bg-gray-50">
          <HeroBanner
            title="Student Gradebook"
            subtitle="cool subtitle goes here"
            image='/pc.webp'
          />
    
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Average Scores Section */}
            <section className="mb-12">
              <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Average Scores Overview</h2>

              <div className="bg-white shadow rounded-lg p-6">
                <AverageScoresBarChart sections={sections}/>
              </div>
            </section>
    

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Top Performers</h3>
                <TopPerformersCard students={studentsScores}/>
              </div>
    

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">idk2</h3>

              </div>
    
              
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">idk</h3>
                <p className="text-gray-600">
                  yes
                </p>
              </div>
            </section>
    

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">cool stuff</h2>
              <p className="text-gray-600 mb-6">
                details of cool stuff
              </p>
              <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
                {/* <StudentProgressTable /> */}
              </div>
            </section>
          </div>

        </div>
  );
}
