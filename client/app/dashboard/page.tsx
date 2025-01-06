import React from "react";
import Navbar from "@/components/Navbar";
import LineGraph from "@/components/graphs/Line";
import BarGraph from "@/components/graphs/Bar";
import PieGraph from "@/components/graphs/Pie";

function Dashboard() {
    return (
        <div className="bg-[#14162e] text-white font-gilroy min-h-screen">
            <Navbar />
            <div className="px-8 py-12">
                <h1 className="text-3xl sm:text-5xl font-bold mt-4 sm:mt-8 text-center mb-12">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-[#1b1f3a] p-6 rounded-md shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Line Graph</h2>
                        <LineGraph />
                    </div>
                    
                    <div className="bg-[#1b1f3a] p-6 rounded-md shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Bar Graph</h2>
                        <BarGraph />
                    </div>
                    
                    <div className="bg-[#1b1f3a] p-6 rounded-md shadow-md lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">Pie Graph</h2>
                        <PieGraph />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
