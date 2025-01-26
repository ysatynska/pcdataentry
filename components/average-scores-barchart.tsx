'use client';

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { InteractionMode } from 'chart.js/auto';

const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false,
});

export default function AverageScoresBarChart({sections, grade}: {sections:any[], grade: any}) {

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
                text: `${grade ? `${grade.name}` : 'Promedios por sección entre cursos'}`,
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
                max: Math.max(...sections.map((section: any) => section.total_score)), // Set the maximum value of the Y-axis
                title: {
                    display: true, 
                    text: "Puntuación promedio", 
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
