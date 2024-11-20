import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GiPerson, GiCheckMark, GiHourglass, GiHumanPyramid } from "react-icons/gi";  // Updated icon import

 
function DashboardStatsGrid() {
  const [totalCount, setTotalCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [hiredcandidateCount, setHiredcandidateCount] = useState(0);
  const [pendingcandidateCount, setPendingcandidateCount] = useState(0);
 
 
  useEffect(() => {
    const id = sessionStorage.getItem('employeeId');
   
    const fetchCounts = async () => {
      if (id) {
        try {
          const totalResponse = await axios.get(`http://localhost:8080/tap/api/totalmrfassigned/${id}`);
          setTotalCount(totalResponse.data);
 
          const resolvedResponse = await axios.get(`http://localhost:8080/tap/api/resolvedmrf/${id}`);
          setResolvedCount(resolvedResponse.data);
 
          const pendingResponse = await axios.get(`http://localhost:8080/tap/api/pendingmrf/${id}`);
          setPendingCount(pendingResponse.data);
 
          const totalcandidatesResponse = await axios.get(`http://localhost:8080/tap/api/totalrecruitercandidates/${id}`);
          setCandidateCount(totalcandidatesResponse.data);
 
          const hiredcandidatesResponse = await axios.get(`http://localhost:8080/tap/api/hiredrecruitercandidates/${id}`);
          setHiredcandidateCount(hiredcandidatesResponse.data);
 
          const pendingcandidatesResponse = await axios.get(`http://localhost:8080/tap/api/pendingrecruitercandidates/${id}`);
          setPendingcandidateCount(pendingcandidatesResponse.data);
 
        } catch (error) {
          console.error('Error fetching counts:', error);
        }
      }
    };
 
    fetchCounts();
  }, []);
 
  return (
    <div className='w-full'>
    <div className='flex gap-4 mb-4 '>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
          <GiHumanPyramid className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Total MRF</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{totalCount}</strong>
          </div>
        </div>
      </BoxWrapper>
 
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
          <GiHumanPyramid className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Resolved MRF</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{resolvedCount}</strong>
          </div>
        </div>
      </BoxWrapper>
 
      <BoxWrapper>
        <div className='rounded-full h-12 w-14 flex items-center justify-center bg-pink-700'>
          <GiHumanPyramid className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Pending MRF</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{pendingCount}</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
 
    <div className='flex gap-4'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
        <GiHumanPyramid className="text-2xl text-white" />
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Total Candidates</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{candidateCount}</strong>
          </div>
        </div>
      </BoxWrapper>
 
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
        <GiCheckMark className="text-2xl text-white" /> {/* Hired Employee Icon */}
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Hired Candidates</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{hiredcandidateCount}</strong>
          </div>
        </div>
      </BoxWrapper>
 
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
        <GiHourglass className="text-2xl text-white" /> {/* Pending Employee Icon */}
        </div>
        <div className='pl-4'>
          <span className='text-gray-500 text-lg font-normal'>Pending Candidates</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>{pendingcandidateCount}</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
 
 
    </div>
 
  );
}
 
export default DashboardStatsGrid;
 
function BoxWrapper({ children }) {
  return <div className="bg-white rounded-lg shadow-lg p-4 w-full flex-3 border border-gray-200 flex items-center">{children}</div>;
}