import DonutChart from "@/components/donut-chart";

export default async function PieChartView () {
  return (
    <div className="w-96 h-96 mx-auto">
      <DonutChart labels={["One", "Two", "Three"]} chartData={[3, 5, 10]} colors={["rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"]} />
    </div>
  )
}