import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const DaybookForm = () => {

    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    date: '',
    transactionType: '',
    category: '',
    description: '',
    amount: '',
    paymentMode: '',
    referenceNo: '',
    handledBy: '',
    remarks: ''
  });

    
function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    }


    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const postdaybookData = async(e)=>{
        e.preventDefault();
        try{

            await axios.post(`${apiUrl}/user/daybookpost`,formData);
            alert('Data sends succesfully')
            navigate("/dashboard/daybook")

        }catch(err){
            console.log(err);
            alert('err....')
        }
    };


  return (
    <form onSubmit={postdaybookData} className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-center">Add Transaction</h2>

      <div>
        <label className="block font-medium mb-1">Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Transaction Type</label>
        <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Adjustment">Adjustment</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Salary">Salary</option>
          <option value="Utilities">Utilities</option>
        
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter description" />
      </div>

      <div>
        <label className="block font-medium mb-1">Amount (₹)</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Payment Mode</label>
        <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Mode</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Bank">Bank</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Reference No.</label>
        <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter reference number" />
      </div>

      <div>
        <label className="block font-medium mb-1">Handled By</label>
        <select name="handledBy" value={formData.handledBy} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Staff</option>
          <option value="Staff1">Staff 1</option>
          <option value="Staff2">Staff 2</option>
         
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Remarks</label>
        <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Optional remarks" />
      </div>

      <button type="submit" className="w-full bg-[#1e2939] text-white py-2 rounded hover:bg-blue-200">Submit</button>
    </form>
  );
};

export default DaybookForm;
