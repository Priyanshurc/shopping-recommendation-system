import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
const Chart = ({ data, options, chartWapperStyle, variant, ...props }) => {
    const chartArr = {
        pie: "pie",
        bar: "bar",
    };
    return (
        <div className={`${chartWapperStyle}`}>
            {variant == "pie" && <Pie data={data} options={options} />}
            {variant == "bar" && <Bar options={options} data={data} />}
            {variant == "line" && <Line options={options} data={data} />}
        </div>
    );
};
export default Chart;
