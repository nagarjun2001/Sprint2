import React, { useState, useEffect } from 'react';
import axios from 'axios';
import role from '../../../assets/pngtre.png';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from 'react-icons/fa'; 

function MRFDashboardDateCard() {
  const [remainingDays, setRemainingDays] = useState(null);
  const [MRFDates, setMRFDates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mrfId=sessionStorage.getItem("mrfid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [daysResponse, mrfResponse] = await Promise.all([
          axios.get(`http://localhost:8080/tap/remainingDaysForMrf/${mrfId}`),
          axios.get(`http://localhost:8080/tap/mrf/getMrf/${mrfId}`),
        ]);
        setRemainingDays(daysResponse.data);
        setMRFDates(mrfResponse.data);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const navigate = useNavigate();
  const handleViewMRF = () => {
    navigate("/recruiterViewMrf");
  };

  return (
    <div className="m-3 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-xl p-4 w-full md:w-1/2 lg:w-1/2 mb-2 md:mb-0">
      <div>
        <h2 className="text-xl font-semibold">MRF Details</h2>

        {loading ? (
          <p className="mt-2">Loading MRF Dates and Remaining Days...</p>
        ) : error ? (
          <p className="mt-2 text-red-500">{error}</p>
        ) : (
          <div>
            <p className="mt-2 text-lg flex items-center">
              <FaCalendarAlt className="mr-2" />
              Start Date: {formatDate(MRFDates?.mrfCriteria?.contractStartDate)}
            </p>
            <p className="mt-2 text-lg flex items-center">
              <FaCalendarAlt className="mr-2" />
              Closure Date: {formatDate(MRFDates?.mrfCriteria?.closureDate)}
            </p>
            <p className="mt-2 text-lg flex items-center">
              <FaClock className="mr-2" />
              Days Remaining to Close: {remainingDays}
            </p>
          </div>
        )}
        <button
          onClick={handleViewMRF}
          className="mt-2 bg-gray-200 text-[#23275c] border border-[#23275c] py-1 px-4 rounded-lg shadow hover:bg-[#23275c] hover:text-gray-200 hover:border-gray-200"
        >
          View MRF
        </button>
      </div>
      <img
        src={role}
        alt="Profile"
        className="rounded-md ml-4 bounce"
        style={{ width: '100%', maxWidth: '170.9px', height: 'auto' }}
      />
    </div>
  );
}

export default MRFDashboardDateCard;
