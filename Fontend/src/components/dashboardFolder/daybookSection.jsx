import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DaybookSection = () => {
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

 
  const calculateDailyBalances = (data) => {
 
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  
    const groupedByDate = sortedData.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry);
      return acc;
    }, {});

   
    let previousClosing = 0;
    const dailySummaries = [];

    for (const date of Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b))) {
      const entries = groupedByDate[date];
      let dayIncome = 0;
      let dayExpense = 0;

      for (const item of entries) {
        const amount = parseFloat(item.amount) || 0;
        if (item.transactionType === "Income") {
          dayIncome += amount;
        } else if (item.transactionType === "Expense") {
          dayExpense += amount;
        }
      }

      const openingBalance = previousClosing;
      const closingBalance = openingBalance + dayIncome - dayExpense;

      dailySummaries.push({
        date,
        openingBalance,
        totalIncome: dayIncome,
        totalExpense: dayExpense,
        closingBalance,
        entries,
      });

      previousClosing = closingBalance;
    }

    setDailySummary(dailySummaries);

    if (dailySummaries.length > 0) {
      const lastDay = dailySummaries[dailySummaries.length - 1];
      setSummary({
        openingBalance: lastDay.openingBalance,
        totalIncome: lastDay.totalIncome,
        totalExpense: lastDay.totalExpense,
        closingBalance: lastDay.closingBalance,
      });
    } else {
      setSummary({
        openingBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        closingBalance: 0,
      });
    }
  };

  const GetData = async () => {
    try {
      const getResponse = await axios.get(`${apiUrl}/user/getdaybook`);
      const data = getResponse.data;
      setFormData(data);
      setFilteredData(data);
      calculateDailyBalances(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredData(formData);
      calculateDailyBalances(formData);
    } else {
      const filtered = formData.filter(item =>
        item.description?.toLowerCase().includes(term.toLowerCase()) ||
        item.category?.toLowerCase().includes(term.toLowerCase()) ||
        item.transactionType?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
      calculateDailyBalances(filtered);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/user/deletedaybook/${id}`);
      const updatedData = formData.filter((item) => item._id !== id);
      setFormData(updatedData);
      setFilteredData(updatedData);
      calculateDailyBalances(updatedData);
      alert("Daybook data deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

 
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Navigation Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 gap-4">
        <a href="/dashboard/daybookform">
          <button
            className="bg-[#1e2939] text-white px-5 py-2 rounded hover:bg-blue-200 transition w-full sm:w-auto text-center"
          >
            ➕ Add New Entry
          </button>
        </a>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by description, category, or type..."
          className="border bg-[white] border-gray-300 rounded-[25px] px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary Section */}
      <div className="p-4 bg-white rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">* Day Summary (Last Date)</h2>
        <div className="flex justify-between">
          <span>Opening Balance:</span>
          <span>₹{summary.openingBalance.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Income:</span>
          <span className="text-green-600 font-semibold">₹{summary.totalIncome.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Expense:</span>
          <span className="text-red-600 font-semibold">₹{summary.totalExpense.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>* Closing Balance:</span>
          <span>₹{summary.closingBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-[#1e2939] text-[white] uppercase">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Transaction Type</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Payment Mode</th>
              <th className="border px-4 py-2">Reference No.</th>
              <th className="border px-4 py-2">Handled By</th>
              <th className="border px-4 py-2">Remarks</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <tr key={data._id || index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{data.date}</td>
                  <td className="border px-4 py-2">{data.transactionType}</td>
                  <td className="border px-4 py-2">{data.category}</td>
                  <td className="border px-4 py-2">{data.description}</td>
                  <td className="border px-4 py-2">₹{data.amount}</td>
                  <td className="border px-4 py-2">{data.paymentMode}</td>
                  <td className="border px-4 py-2">{data.referenceNo}</td>
                  <td className="border px-4 py-2">{data.handledBy}</td>
                  <td className="border px-4 py-2">{data.remarks || '-'}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="bg-[#2c3849] text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaybookSection;

