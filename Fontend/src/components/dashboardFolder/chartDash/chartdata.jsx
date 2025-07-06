import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DaybookSectionchart = () => {
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dailySummary, setDailySummary] = useState([]);
  const [summary, setSummary] = useState({
    openingBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    closingBalance: 0,
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const GetData = async () => {
    try {
      const getResponse = await axios.get(`${apiUrl}/user/getdaybook`);
      const data = getResponse.data;
      setFormData(data);
      setFilteredData(data);
      calculate(data);
      calculateDailyBalances(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const calculate = (data) => {
    let totalIncome = 0;
    let totalExpense = 0;

    for (let item of data) {
      const amount = parseFloat(item.amount) || 0;
      if (item.transactionType === "Income") {
        totalIncome += amount;
      } else if (item.transactionType === "Expense") {
        totalExpense += amount;
      }
    }

    const openingBalance = summary.closingBalance || 0;
    const closingBalance = openingBalance + totalIncome - totalExpense;

    setSummary({
      openingBalance,
      totalIncome,
      totalExpense,
      closingBalance,
    });
  };

  const calculateDailyBalances = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const date = item.date;
      if (!grouped[date]) grouped[date] = { date, Income: 0, Expense: 0 };
      if (item.transactionType === 'Income') grouped[date].Income += parseFloat(item.amount);
      if (item.transactionType === 'Expense') grouped[date].Expense += parseFloat(item.amount);
    });

    const result = Object.values(grouped);
    setDailySummary(result);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredData(formData);
    } else {
      const filtered = formData.filter(item =>
        item.description?.toLowerCase().includes(term.toLowerCase()) ||
        item.category?.toLowerCase().includes(term.toLowerCase()) ||
        item.transactionType?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/user/deletedaybook/${id}`);
      const updatedData = formData.filter((item) => item._id !== id);
      setFormData(updatedData);
      setFilteredData(updatedData);
      calculate(updatedData);
      calculateDailyBalances(updatedData);
      alert("Daybook data deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto w-[90vh]">
      {/* Chart Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">📈 Day-wise Income & Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailySummary} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#4ade80" />
            <Bar dataKey="Expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
};

export default DaybookSectionchart;