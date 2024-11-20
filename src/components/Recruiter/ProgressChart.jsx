 
import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import axios from 'axios';
 
function ProgressChart({ id }) {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
 
    const id = sessionStorage.getItem('employeeId');
    const fetchData = async () => {
      try {
        const totalResponse = await axios.get(`http://localhost:8080/tap/api/totalmrfassigned/${id}`);
        const resolvedResponse = await axios.get(`http://localhost:8080/tap/api/resolvedmrf/${id}`);
        const pendingResponse = await axios.get(`http://localhost:8080/tap/api/pendingmrf/${id}`);
        const totalCandidatesResponse = await axios.get(`http://localhost:8080/tap/api/totalrecruitercandidates/${id}`);
        const hiredCandidatesResponse = await axios.get(`http://localhost:8080/tap/api/hiredrecruitercandidates/${id}`);
        const pendingCandidatesResponse = await axios.get(`http://localhost:8080/tap/api/pendingrecruitercandidates/${id}`);
 
        // Assuming you want to format the data as required for your chart:
        const data = [
          { name: 'Total MRFs', MRF: totalResponse.data, hired: hiredCandidatesResponse.data },
          { name: 'Resolved MRFs', MRF: resolvedResponse.data, hired: hiredCandidatesResponse.data },
          { name: 'Pending MRFs', MRF: pendingResponse.data, hired: pendingCandidatesResponse.data },
          { name: 'Total Candidates', MRF: totalCandidatesResponse.data, hired: hiredCandidatesResponse.data },
        ];
 
        setMonthlyData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error fetching data. Please try again.');
      }
    };
 
    fetchData();
  }, [id]);
 
  const options = {
    data: monthlyData,
    title: {
      text: 'Monthly MRF and Hired Data',
      fontSize: 18,
    },
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          rotation: -30
        }
      },
      {
        type: 'number',
        position: 'left',
        title: 'Values',
      }
    ],
    series: [
      {
        type: 'bar',
        xKey: 'name',
        yKey: 'MRF',
        fill: '#0ea5e9',
        tooltip: {
          renderer: (params) => {
            return {
              content: `MRF: ${params.datum.MRF}`
            };
          }
        }
      },
      {
        type: 'bar',
        xKey: 'name',
        yKey: 'hired',
        fill: '#ea580c',
        tooltip: {
          renderer: (params) => {
            return {
              content: `Hired: ${params.datum.hired}`
            };
          }
        }
      }
    ]
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }
 
  return (
    <div className="h-[22rem] bg-white p-4 shadow-lg rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Monthly Progress</strong>
      <div className="mt-3 w-full flex-1">
        <AgCharts options={options} />
      </div>
    </div>
  );
}
 
export default ProgressChart;