'use client';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { InteractionMode } from 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

export default function AverageScoresBarChart({sections}: {sections:any[]}) {

    const data = {
        labels : sections.map((id: any) => `Section ${id.section_id}`),
        datasets: [
            { 
                label: 'Average Values',
                data: sections.map((section: any) => parseFloat(section.avg)),
            }
            
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
        },
          title: {
            display: true,
            text: 'Section Averages',
            font: {
              size: 20, 
            },
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `Average: ${context.raw}`, 
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true, 
              text: "Sections", 
              font: {
                size: 16,
              },
            },
          },
          y: {
            beginAtZero: true, 
            title: {
              display: true, 
              text: "Average Score", 
              font: {
                size: 16,
              },
            },
          },
        },
        interaction: {
          mode: "index" as InteractionMode,
          intersect: false,
        },
      };

      return (
        <Bar data = {data} options={options}/>
      );
    };


