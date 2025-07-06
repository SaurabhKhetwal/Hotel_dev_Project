import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const STATUS_COLORS = ["#f97316", "#10b981", "#3b82f6", "#6366f1", "#ec4899"];

const BookingChart = () => {
    const [chartData, setChartData] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${apiUrl}/user/getroominfo`);
                const data = response.data;

             
                const statusCounts = {};
                data.forEach(({ status }) => {
                    const key = status || "Unknown";
                    
                    if (statusCounts[key]) {
                        statusCounts[key] = statusCounts[key] + 1;
                    } else {
                        statusCounts[key] = 1;    
                    }
                });

               
                const formatted = Object.entries(statusCounts).map(([name, value]) => ({
                    name,
                    value,
                }));

                setChartData(formatted);
            } catch (err) {
                console.error("Error fetching chart data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow mb-6 h-[67vh] mt-4 pl-20">
            <h3 className="text-lg font-semibold mb-2 ">Room Status Summary</h3>
            {chartData.length > 0 ? (
                <PieChart width={300} height={250}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="value"
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default BookingChart;