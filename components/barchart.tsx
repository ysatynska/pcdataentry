"use client";

import { useEffect } from "react";
import { fetchEvaluationsBySectionID } from "@/app/lib/queries";

export default function BarChart() {
  useEffect(() => {
    const canvas = document.getElementById('barChartCanvas') as HTMLCanvasElement | null;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context');
      }
    } else {
      console.error('Canvas not found');
    }

    const fetchData = async () => {
      try {
        const sections = await fetchEvaluationsBySectionID(); 
        console.log(sections); 
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div>
      {/*jfc*/}
      <canvas id="barChartCanvas"></canvas>
      <p> placeholder </p>
    </div>
  );
}
