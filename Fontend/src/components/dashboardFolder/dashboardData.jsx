import React from "react";
import BookingChart from "./chartDash/chartBooking";
import DaybookSectionchart from "./chartDash/chartdata";

const DashboardData = () => {
 return(
  <>

   <div className="h-21 w-full flex justify-between mb-5">

    <div className="h-28 bg-[white] w-60 rounded-[15px] pl-3 pt-3 [box-shadow:rgba(99,_99,_99,_0.2)_0px_2px_8px_0px]">
      <h1 className="font-bold text-[2vw]">Current <br></br> Occupancy </h1>
    </div>
    <div className="h-28 bg-[white] w-60 rounded-[15px] pl-3 pt-3 [box-shadow:rgba(99,_99,_99,_0.2)_0px_2px_8px_0px]">
      <h1  className="font-bold text-[2vw]">Today's Revenue <br></br> 28000</h1>
    </div>
    <div className="h-28 w-60 bg-[white] rounded-[15px] pl-3 pt-3 [box-shadow:rgba(99,_99,_99,_0.2)_0px_2px_8px_0px]">
      <h1 className="font-bold text-[2vw]">Active Guests</h1>
    </div>
    <div className="h-28 w-60 bg-[white] rounded-[15px] pl-3 pt-3 [box-shadow:rgba(99,_99,_99,_0.2)_0px_2px_8px_0px]">
      <h1 className="font-bold text-[2vw]">Avg. Rating</h1>
    </div>
  
  </div> 
 <div className="flex">
  <BookingChart />
  
  <DaybookSectionchart/>
  </div>
  </>
 )
};

export default DashboardData;
