'use client';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { InteractionMode } from 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

export default function AverageScoresBarChart({sections, forGrade}: {sections:any[], forGrade: string | null}) {

    const data = {
        labels : sections.map((id: any) => `${id.short_name}`),
        datasets: [
            { 
                label: 'Average Values',
                data: sections.map((section: any) => parseFloat(parseFloat(section.avg).toFixed(2)))
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
                text: `Section Averages ${forGrade ? `for Grade ${forGrade}` : 'Across All Grades'}`,
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
                    text: "Section Name", 
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    display: false, // Disable grid lines on the X-axis
                },
            },
            y: {
                beginAtZero: true, 
                max: 20, // Set the maximum value of the Y-axis
                title: {
                    display: true, 
                    text: "Average Score", 
                    font: {
                        size: 16,
                    },
                },
                grid: {
                    display: false, // Disable grid lines on the Y-axis
                },
            },
        },
        interaction: {
            mode: "index" as InteractionMode,
            intersect: false,
        },
    };

    return (
        <Bar data={data} options={options}/>
    );
};
