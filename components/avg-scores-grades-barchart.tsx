'use client';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { InteractionMode } from 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

export default function AvgScoresGradeBarChart({ gradeData }: { gradeData: any }) {
    const data = {
        labels: gradeData.sections.map((section: any) => `${section.short_name}`),
        datasets: [
            { 
                label: 'Average Scores',
                data: gradeData.sections.map((section: any) => parseFloat(parseFloat(section.avg_score).toFixed(2)))
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
                text: `Average Scores for Grade ${gradeData.grade}`,
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
        <Bar data={data} options={options} />
    );
};