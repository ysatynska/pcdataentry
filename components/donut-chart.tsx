import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);

export function DonutChart ({ labels, chartData, colors, title }: { labels: string[], chartData: number[], colors: string[], title: string}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Marca",
        data: chartData,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18, 
          weight: "bold" as "bold",
        },
        color: "#333",
        padding: {
          bottom: 20,
        },
      },
    },
  };

  return (
    <div className="w-96 h-96 mx-auto">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
