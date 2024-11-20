import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Chart from 'react-apexcharts';
import moment from 'moment';
import ClientNavbar from './ClientNavbar';
import { getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/Client/ClientDashboardService';
import axios from 'axios'; // Make sure to import axios
import gif1 from '../../../assets/ClientDashboardgif/process.gif'
import gif2 from '../../../assets/ClientDashboardgif/human-resources.gif'
import gif3 from '../../../assets/ClientDashboardgif/curriculum-vitae.gif'


const ClientDashboard = ({ isSidebarOpen }) => { 
  const [userName, setUserName] = useState('John Doe');
  const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
  const [jobPosts, setJobPosts] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [chartSeries, setChartSeries] = useState([0, 0, 0]);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
 
  const columnDefs = [
    { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
    { headerName: 'Resource required', field: 'resourceNeeded', sortable: true, filter: true },
    { headerName: 'Hired count', field: 'resourceAssigned', sortable: true, filter: true },
  ];
 
  useEffect(() => {
    const clientId = sessionStorage.getItem("clientId")// Update as needed
    const fetchData = async () => {
      try {
        // Fetch job posts
        const jobPostCount = await getJobRequirements(clientId);
        setJobPosts(jobPostCount);
 
        const totalApplicantsCount = await getCandidates(clientId);
        setTotalApplicants(totalApplicantsCount.length); // Assuming this is an array
        const hiringCountValue = await getShortlistedCount(clientId);
        setHiringCount(hiringCountValue);
 
        // Fetch requirements data for the grid
        const requirementsResponse = await axios.get(`http://localhost:8080/tap/api/requirement-by-client/${clientId}`);
        const requirementsData = requirementsResponse.data;
        console.log(requirementsData);
 
        // Transform received data and fetch assigned resource counts
        const transformedData = await Promise.all(requirementsData.map(async (requirement) => {
          const resourceNeeded = requirement.totalRequiredResourceCount; // Assuming this is the field in response
          const assignedResponse = await axios.get(`http://localhost:8080/tap/api/hired/${requirement.requirementId}`); // Modify 'id' as necessary
          console.log(assignedResponse);
 
 
          return {
            requirement: requirement.requirementId,
            resourceNeeded,
            resourceAssigned:assignedResponse.data,
          };
        }));
       
        setRowData(transformedData);
 
        // Set chart data based on fetched counts
        setChartSeries([totalApplicantsCount.length, hiringCountValue, jobPostCount]);
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  const chartOptions = {
    chart: {
      type: 'pie',
      height: '350',
    },
    labels: ['Total Applicants', 'Hiring Count', 'Job Posts'],
    colors: ['#008FFB', '#00E396', '#FEB019'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };
 
  const handleViewMore = () => {
    navigate('/JobRequirementsTable'); 
  };
 
  return (
    // <div className="flex flex-row mt-8">
     <div className={`flex transition-all p-6 duration-300 h-screen bg-[#eeeeee] ${isSidebarOpen ? 'ml-64' : 'ml-12'}`}>
      {/* <div className="flex-grow p-6 ml-32"> */}
        <ClientNavbar />
            <div className='flex flex-col flex-grow mt-10 bg-[#eeeeee] -ml-12'>
    <div className={`flex-grow p-6 transition-all duration-300`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
            <p className="text-gray-600 text-center">{currentTime}</p>
          </div>
          {/* <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Requirements Posted</h3>
            <p className="text-2xl">{jobPosts}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Hiring Count</h3>
            <p className="text-2xl">{totalApplicants}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold"> Shortlisted Count</h3>
            <p className="text-2xl">{hiringCount}</p>
          </div> */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
  <div className="flex items-center">
    <div className="w-12 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 overflow-hidden">
      <img src={gif1} alt="Requirements Posted" className="object-cover w-full h-full" />
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Requirements Posted</h3>
      <p className="text-2xl">{jobPosts}</p>
    </div>
  </div>
</div>

<div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
  <div className="flex items-center">
    <div className="w-12 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4 overflow-hidden">
      <img src={gif2} alt="Hiring Count" className="object-cover w-full h-full" />
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Hiring Count</h3>
      <p className="text-2xl">{totalApplicants}</p>
    </div>
  </div>
</div>

<div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
  <div className="flex items-center">
    <div className="w-12 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-4 overflow-hidden">
      <img src={gif3} alt="Shortlisted Count" className="object-cover w-full h-full" />
    </div>
    <div className="flex flex-col">
      <h3 className="text-lg font-bold">Shortlisted Count</h3>
      <p className="text-2xl">{hiringCount}</p>
    </div>
  </div>
</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              height={350}
            />
          </div>
          <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold">Applicants List</p>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize}
            />
          </div>
        </div>
      </div>
     </div>
     </div>  
  );
};

 
export default ClientDashboard;
 

