import React, { useState } from 'react'
import CandidateList from './MRFCandidateList';
import MRFDashboardStatsGrid from './MRFdashboardStatsGrid';
import MRFRingChart from './MRFRingChart';
import MRFDashboardDateCard from './MRFDashboardDateCard';
 
function MRFonedashboard() {
    return (
        <div className='flex flex-col gap-4 h-screen'>
          <div className='flex flex-row gap-4 w-full mt-6'>
             <MRFDashboardDateCard/>
             <MRFDashboardStatsGrid/>
          </div>
          
          <div className='flex flex-row gap-4 w-full'>
            <MRFRingChart/>
          </div>
          <div className="flex flex-row gap-4 w-full">
            <CandidateList />
          </div>
        </div>
      );
}


export default MRFonedashboard;
