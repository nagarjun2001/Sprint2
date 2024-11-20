import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 
const MRFDashboardViewMRF = () => {
  const { mrfId } = useParams(); 
  const [mrfData, setMrfData] = useState(null);
  const [mrfCriteriaData, setMrfCriteriaData] = useState(null); 
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
   
    axios.get(`http://localhost:8080/tap/mrf/getMrf/1`)
      .then((response) => {
        console.log(response.data);
        setMrfData(response.data);
        setMrfCriteriaData(response.data.mrfCriteria); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching MRF data:', error);
        setLoading(false);
      });
  }, [mrfId]);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
 
  if (!mrfData) {
    return <div className="text-center text-red-500 text-xl py-4">No MRF found with ID {mrfId}</div>;
  }
 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6 transition-all duration-300 ease-in-out">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 transition-colors duration-300 hover:text-blue-600 cursor-pointer">
        MRF Details
      </h2>
 
      {/* Main MRF Details */}
      <div className="space-y-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h3 className="text-2xl text-blue-600 font-bold">MRF ID: {mrfData.mrfId}</h3>
          <div className="space-y-4">
            <p className="text-lg text-gray-700"><strong>Department:</strong> {mrfData.mrfDepartmentName}</p>
            <p className="text-lg text-gray-700"><strong>Technology Required:</strong> {mrfData.mrfRequiredTechnology}</p>
            <p className="text-lg text-gray-700"><strong>Probable Designation:</strong> {mrfData.probableDesignation}</p>
            <p className="text-lg text-gray-700"><strong>Required Resource Count:</strong> {mrfData.requiredResourceCount}</p>
            <p className="text-lg text-gray-700"><strong>Required Skills:</strong> {mrfData.requiredSkills}</p>
            <p className="text-lg text-gray-700"><strong>Created At:</strong> {new Date(mrfData.createdAt).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700"><strong>Updated At:</strong> {new Date(mrfData.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
 
      {/* MRFCriteria Section */}
      {mrfCriteriaData && (
        <div className="border-t pt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 transition-all hover:text-blue-600">
            MRF Criteria
          </h4>
          <div className="space-y-6">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <p className="text-lg text-gray-600"><strong>Employment Mode:</strong> {mrfCriteriaData.employmentMode}</p>
              <p className="text-lg text-gray-600"><strong>Educational Qualification:</strong> {mrfCriteriaData.educationalQualification}</p>
              <p className="text-lg text-gray-600"><strong>Years of Experience:</strong> {mrfCriteriaData.yearsOfExperience}</p>
              <p className="text-lg text-gray-600"><strong>Minimum CTC:</strong> ₹{mrfCriteriaData.minimumCTC.toLocaleString()}</p>
              <p className="text-lg text-gray-600"><strong>Maximum CTC:</strong> ₹{mrfCriteriaData.maximumCTC.toLocaleString()}</p>
              <p className="text-lg text-gray-600"><strong>Contract Start Date:</strong> {new Date(mrfCriteriaData.contractStartDate).toLocaleDateString()}</p>
              <p className="text-lg text-gray-600"><strong>Closure Date:</strong> {new Date(mrfCriteriaData.closureDate).toLocaleDateString()}</p>
              <p className="text-lg text-gray-600"><strong>Job Location:</strong> {mrfCriteriaData.jobLocation}</p>
            </div>
          </div>
        </div>
      )}
 
   
    </div>
  );
};
 
export default MRFDashboardViewMRF;