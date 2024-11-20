import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaFileAlt, FaMapMarkerAlt, FaBriefcase, FaRegCreditCard, FaCheckCircle, FaHourglassHalf, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getApprovalLevel, getCandidateById, getOfferApprovalByCandidateId } from '../../../services/Recruiter/Candidate/CandidateInfoService';
 
const fetchApprovalLevels = async () => {
  const mrfid = sessionStorage.getItem('mrfid');
  try {
    const response = await getApprovalLevel(mrfid);
    return response.data;
  } catch (error) {
    console.error("Error fetching approval levels:", error);
    return [];
  }
};
 
const fetchOfferApproval = async (candidateId) => {
  try {
    const response = await getOfferApprovalByCandidateId(candidateId);
    return response.data;
  } catch (error) {
    console.error("Error fetching offer approval:", error);
    return [];
  }
};
 
const fetchCandidate = async (candidateId) => {
  try {
    const response = await getCandidateById(candidateId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Candidate:", error);
    return {};
  }
};
 
function CandidateInfo() {
  const [approvalLevels, setApprovalLevels] = useState([]);
  const [offerApproval, setOfferApproval] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [candidate, setCandidate] = useState(null);
  const { candidateId } = useParams();
 
  useEffect(() => {
    const fetchData = async () => {
      const levels = await fetchApprovalLevels();
      const offerApprovalData = await fetchOfferApproval(candidateId);
      const candidateData = await fetchCandidate(candidateId);
 
      setApprovalLevels(levels);
      setOfferApproval(offerApprovalData);
      setCurrentLevel(offerApprovalData.length);
      setCandidate(candidateData);
    };
 
    fetchData();
  }, [candidateId]);
 
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8">
      <h2 className="text-4xl font-semibold text-blue-950 text-transparent bg-clip-text">Candidate Details</h2>
 
      {candidate && (
        <div className="space-y-6 bg-white rounded-lg p-6">
          <div className="space-y-4">
            <h3 className="text-3xl text-gradient bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-transparent bg-clip-text">{`${candidate.firstName} ${candidate.lastName}`}</h3>
            <p className="text-lg text-gray-600">{candidate.skill}</p>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-xl text-indigo-600 transition-transform transform hover:scale-110" />
                <span>{candidate.mobileNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-xl text-indigo-600 transition-transform transform hover:scale-110" />
                <span>{candidate.email}</span>
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-xl text-gray-600" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBriefcase className="text-xl text-gray-600" />
              <span>{candidate.experience} Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRegCreditCard className="text-xl text-gray-600" />
              <span>{candidate.panNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaFileAlt className="text-xl text-gray-600" />
              <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline transition-all transform hover:scale-105">
                Resume
              </a>
            </div>
          </div>
 
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700">Status: <span className="text-green-500">{candidate.status}</span></h3>
          </div>
        </div>
      )}
 
      {offerApproval.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-950 text-transparent bg-clip-text">Offer Letter Process</h2>
          <div className="flex items-center space-x-6 mt-8">
            {approvalLevels.map((level, index) => {
              const isCompleted = currentLevel > level.level;
              const isCurrent = currentLevel === level.level;
              const rejectionStatus = offerApproval[level.level - 1] && offerApproval[level.level - 1].status === 'Rejected';
 
              const stepClass = rejectionStatus ? 'bg-red-500 text-white' :
                                isCompleted ? 'bg-green-500 text-white' :
                                isCurrent ? 'bg-blue-500 text-white' :
                                'bg-gray-300 text-gray-500';
 
              return (
                <div key={level.id} className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform ${stepClass}`}>
                    {rejectionStatus ? (
                      <FaTimes className="text-xl" />
                    ) : isCompleted ? (
                      <FaCheckCircle className="text-xl" />
                    ) : isCurrent ? (
                      <FaHourglassHalf className="text-xl animate-pulse" />
                    ) : (
                      <FaTimes className="text-xl" />
                    )}
                  </div>
 
                  <div className="text-center">
                    <div className={`font-semibold ${rejectionStatus ? 'text-red-500' : isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-500'}`}>
                      {level.employee ? level.employee.employeeEmail : 'Unknown'}
                    </div>
                    <div className={`text-xs ${rejectionStatus ? 'text-red-500' : isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-500'}`}>
                      {level.employee.role.roleName}
                    </div>
                    <div className={`text-xs ${rejectionStatus ? 'text-red-500' : isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-500'}`}>
                      {offerApproval[level.level - 1] && offerApproval[level.level - 1].status}
                    </div>
                  </div>
 
                  {index < approvalLevels.length - 1 && (
                    <div className="mx-2 text-gray-400 text-2xl">
                      <span>{'-->'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
 
export default CandidateInfo;