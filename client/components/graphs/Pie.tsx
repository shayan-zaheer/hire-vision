"use client";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import {options, pieData} from "@/utils/fake-data"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieGraph() {
    return <Pie options={options} data={pieData} />;
}

export default PieGraph;
