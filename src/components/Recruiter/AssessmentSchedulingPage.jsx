 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaLink, FaCalendarAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Modal from './AssessmentModal';
 
const AssessmentSchedulingPage = () => {
    const { rpId } = useParams();
    const [assessments, setAssessments] = useState([]);
    const [mrfCandidates, setMrfCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [selectedAssessedCandidates, setSelectedAssessedCandidates] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllAssessed, setSelectAllAssessed] = useState(false);
    const [showAllAssessments, setShowAllAssessments] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentAssessment, setCurrentAssessment] = useState(null);
    const [activeTab, setActiveTab] = useState('available');
    const [scheduleDetails, setScheduleDetails] = useState({
        assessmentName: '',
        assessmentLink: '',
        assessmentType: '',
        assessmentStartDate: '',
        recruitmentProcess: '',
        assessmentEndDate: '',
        assessmentStartTime: '',
        assessmentEndTime: ''
    });
   
    const [scores, setScores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [linkError, setLinkError] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            // setIsLoading(true);
            try {
                const mrfid = sessionStorage.getItem('mrfid');
                const [assessmentsResponse, mrfCandidatesResponse, scoresResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/tap/recruiter/assessment/getassessment/${mrfid}`),
                    axios.get(`http://localhost:8080/mrfCandidates/remainingcandidate/${mrfid}`),
                    axios.get(`http://localhost:8080/scores/getcandidates/${mrfid}`)
                ]);
                setAssessments(assessmentsResponse.data);
                setMrfCandidates(mrfCandidatesResponse.data);
                setScores(scoresResponse.data);
            } catch (error) {
                console.error('Error fetching data!', error);
            }
             finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
   
    const handleCheckboxChange = (candidateId) => {
        setSelectedCandidates(prevSelected => {
            if (prevSelected.includes(candidateId)) {
                return prevSelected.filter(id => id !== candidateId);
            } else {
                return [...prevSelected, candidateId];
            }
        });
    };
 
    const handleCheckboxChangeScore = (scoreId) => {
        setSelectedAssessedCandidates(prevSelected => {
            if (prevSelected.includes(scoreId)) {
                return prevSelected.filter(id => id !== scoreId);
            } else {
                return [...prevSelected, scoreId];
            }
        });
    };
   
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedCandidates([]);
        } else {
            setSelectedCandidates(mrfCandidates.map(mrfCandidate => mrfCandidate.candidateId));
        }
        setSelectAll(!selectAll);
    };
   
    const handleSelectAllAssessed = () => {
        if (selectAllAssessed) {
            setSelectedAssessedCandidates([]);
        } else {
            setSelectedAssessedCandidates(scores.map(score => score.scoreId));
        }
        setSelectAllAssessed(!selectAllAssessed);
    };
   
    const validateLink = (link) => {
        const regex = /^(http|https):\/\/[^ "]+$/;
        return regex.test(link);
    }
 
    const validateDuration = (startDate, endDate) => {
        const start = new Date(`${startDate}T${scheduleDetails.assessmentStartTime}`);
        const end = new Date(`${endDate}T${scheduleDetails.assessmentEndTime}`);
        const diffInHours = (end - start) / (1000 * 60 * 60);
        return diffInHours <= 48 && diffInHours > 0;
    };
   
    const handleShowScheduleModal = () => {
        const rpId = sessionStorage.getItem('rpId');
        if (assessments.length === 0) {
            setScheduleDetails({
                recruitmentProcess: {
                    recruitmentProcessId: rpId
                }
            });
        } else {
            const assessment = assessments[0];
            setScheduleDetails({
                recruitmentProcess: assessment.recruitmentProcess,
                assessmentName: assessment.assessmentName,
                assessmentLink: assessment.assessmentLink,
                assessmentType: assessment.assessmentType,
                assessmentStartDate: assessment.assessmentStartDate,
                assessmentEndDate: assessment.assessmentEndDate,
                assessmentStartTime: assessment.assessmentStartTime,
                assessmentEndTime: assessment.assessmentEndTime
            });
        }
        setShowScheduleModal(true);
    };
   
    const handleSaveAndSchedule = async () => {
        setIsLoading(true);
        setLinkError(false);
       
        if (!validateLink(scheduleDetails.assessmentLink)) {
            setLinkError(true);
            setIsLoading(false);
            return;
        }
 
        if (!validateDuration(scheduleDetails.assessmentStartDate, scheduleDetails.assessmentEndDate)){
            setErrorMessage('Assessment duration should be within 48 hours.');
            setShowErrorModal(true);
            setIsLoading(false);
            return;
        }
 
        try {
            const assessmentResponse = await axios.post(`http://localhost:8080/tap/recruiter/assessment/save`, scheduleDetails);
            const assessmentId = assessmentResponse.data.assessmentId;
 
            const requests = selectedCandidates.map(candidateId => {
                return axios.post(`http://localhost:8080/scores/post`, {
                    assessment: { assessmentId: assessmentId },
                    candidateId: { candidateId: candidateId },
                    status: "Pending"
                });
            });
 
            await Promise.all(requests);
 
            const selectedCandidateEmails = mrfCandidates
                .filter(candidate => selectedCandidates.includes(candidate.candidateId))
                .map(candidate => candidate.email);
 
            await axios.post(`http://localhost:8080/schedule/post`, {
                assessmentName: assessmentResponse.data.assessmentName,
                assessmentLink: assessmentResponse.data.assessmentLink,
                assessmentType: assessmentResponse.data.assessmentType,
                candidateEmails: selectedCandidateEmails,
                assessmentStartDate: assessmentResponse.data.assessmentStartDate,
                assessmentEndDate: assessmentResponse.data.assessmentEndDate,
                assessmentStartTime: assessmentResponse.data.assessmentStartTime,
                assessmentEndTime: assessmentResponse.data.assessmentEndTime
            });
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage('Error scheduling the assessment and saving scores!');
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
            setShowScheduleModal(false);
        }
    };
   
    const handleUpdateClick = (assessment) => {
        setCurrentAssessment(assessment);
        setShowUpdateModal(true);
    };
   
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:8080/tap/recruiter/assessment/update/${currentAssessment.assessmentId}`, currentAssessment);
            setShowSuccessModal(true);
            setShowUpdateModal(false);
        } catch (error) {
            setErrorMessage('Error updating the assessment!');
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAssessment(prev => ({ ...prev, [name]: value }));
    };
   
    const renderAvailableCandidates = () => (
        <div className="overflow-x-auto">
             <button
                onClick={handleShowScheduleModal}
                disabled={selectedCandidates.length === 0}
                className={`mt-4 bg-blue-950 text-white px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-blue-950 float-right mb-4
                ${selectedCandidates.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <FaCheckCircle className="inline-block mr-1" /> Schedule
            </button>
            <div className="mt-4">
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="mr-2"
                />
                <label className="font-semibold">Select All</label>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-blue-950 text-white">
                        <th className="py-2 px-4 text-left">Select</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Skills</th>
                        <th className="py-2 px-4">Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {mrfCandidates.map(cand => (
                        <tr key={cand.candidateId} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    checked={selectedCandidates.includes(cand.candidateId)}
                                    onChange={() => handleCheckboxChange(cand.candidateId)}
                                    className="mr-2"
                                />
                            </td>
                            <td className="py-2 px-4">{cand.firstName} {cand.lastName}</td>
                            <td className="py-2 px-4">{cand.email}</td>
                            <td className="py-2 px-4">{cand.skill}</td>
                            <td className="py-2 px-4">{cand.experience} years</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    );
   
    const renderAssessedCandidates = () => (
        <div className="overflow-x-auto">
             <button
                onClick={() => console.log('Moving to next step.')}
                disabled={selectedAssessedCandidates.length === 0}
                className={`mt-4 bg-blue-950 text-white px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-blue-950 float-right mb-4
                ${selectedAssessedCandidates.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Move Next
            </button>
            <div className="mt-4">
                <input
                    type="checkbox"
                    checked={selectAllAssessed}
                    onChange={handleSelectAllAssessed}
                    className="mr-2"
                />
                <label className="font-semibold">Select All Assessed</label>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-blue-950 text-white">
                        <th className="py-2 px-4 text-left">Select</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Score</th>
                        <th className="py-2 px-4">Remarks</th>
                        <th className="py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(score => (
                        <tr key={score.scoreId} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    checked={selectedAssessedCandidates.includes(score.scoreId)}
                                    onChange={() => handleCheckboxChangeScore(score.scoreId)}
                                    className="mr-2"
                                />
                            </td>
                            <td className="py-2 px-4">{score.candidateId.firstName} {score.candidateId.lastName}</td>
                            <td className="py-2 px-4">{score.score}</td>
                            <td className="py-2 px-4">{score.remarks}</td>
                            <td className="py-2 px-4">{score.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    );
   
    const renderTabContent = () => {
        if (activeTab === 'available') {
            return renderAvailableCandidates();
        } else {
            return renderAssessedCandidates();
        }
    };
   
    const today = new Date().toISOString().split('T')[0]; // Get today's date as YYYY-MM-DD
   
    return (
        <div className="bg-gray-50 w-full mt-14 p-6 min-h-screen ">
            <div className="container mx-auto p-8">
                {isLoading && <div className="flex justify-center"><FaSpinner className="animate-spin text-blue-950" size={40} /></div>}
                {assessments.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-t-4 border-blue-950 animate-fade-in">
                        <h2 className="text-2xl font-bold text-blue-950">Level: {assessments[0].recruitmentProcess.level}</h2>
                        <p className="text-gray-700"><FaLink className="inline-block mr-1" /> Link: <a href={assessments[0].assessmentLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{assessments[0].assessmentLink}</a></p>
                        <p className="text-gray-700"><FaCalendarAlt className="inline-block mr-1" /> Name: {assessments[0].assessmentName}</p>
                        <p className="text-gray-700">Start Date: {assessments[0].assessmentStartDate}</p>
                        <p className="text-gray-700">End Date: {assessments[0].assessmentEndDate}</p>
                        <p className="text-gray-700">Start Time: {assessments[0].assessmentStartTime}</p>
                        <button className="bg-blue-950 text-white px-4 py-2 rounded mt-2 transition duration-200 ease-in-out hover:bg-blue-700"
                            onClick={() => handleUpdateClick(assessments[0])}><FaCheckCircle className="inline-block" /> Update</button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2 transition duration-200 ease-in-out hover:bg-gray-600"
                            onClick={() => setShowAllAssessments(!showAllAssessments)}>
                            {showAllAssessments ? <FaTimesCircle className="inline-block" /> : 'Show All Assessments'}
                        </button>
                    </div>
                )}
                {showAllAssessments && assessments.slice(1).map(assessment => (
                    <div key={assessment.assessmentId} className="bg-white rounded-lg shadow-lg p-6 mb-4 border-t-4 border-blue-950 animate-fade-in">
                        <h2 className="text-xl font-bold text-blue-950">Level: {assessment.recruitmentProcess.level}</h2>
                        <p className="text-gray-700"><FaLink className="inline-block mr-1" /> Link: {assessment.assessmentLink}</p>
                        <p className="text-gray-700">Name: {assessment.assessmentName}</p>
                        <p className="text-gray-700">Start Date: {assessment.assessmentStartDate}</p>
                        <p className="text-gray-700">End Date: {assessment.assessmentEndDate}</p>
                        <p className="text-gray-700">Start Time: {assessment.assessmentStartTime}</p>
                    </div>
                ))}
            </div>
            <div className="container mx-auto p-6">
                <div className="flex space-x-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded transition duration-200 ease-in-out ${activeTab === 'available' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('available')}
                    >
                        Available Screened Candidates
                    </button>
                    <button
                        className={`px-4 py-2 rounded transition duration-200 ease-in-out ${activeTab === 'assessed' ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('assessed')}
                    >
                        Assessment Scheduled Candidates
                    </button>
                </div>
                {renderTabContent()}
            </div>
   
            {/* Schedule Modal */}
            {showScheduleModal && (
                <Modal onClose={() => setShowScheduleModal(false)} width="max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Schedule Assessment</h2>
                    <form onSubmit={handleSaveAndSchedule}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['assessmentName', 'assessmentLink', 'assessmentType', 'assessmentStartDate', 'assessmentEndDate', 'assessmentStartTime', 'assessmentEndTime'].map((field, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="mb-1">{field.replace(/([A-Z])/g, ' $1')}: </label>
                                    <input
                                        type={field.includes('Date') ? 'date' : field.includes('Time') ? 'time' : 'text'}
                                        name={field}
                                        value={scheduleDetails[field]}
                                        onChange={(e) => setScheduleDetails({ ...scheduleDetails, [field]: e.target.value })}
                                        className="border rounded p-2"
                                        min={field.includes('Date') ? today : undefined} // Disable past dates for date inputs
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        {linkError && <div className="mt-2 text-red-600">Please enter a valid URL for the assessment link!</div>}
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded mr-2 transition duration-200 ease-in-out hover:bg-blue-700">
                                <FaCheckCircle className="inline-block" /> Save & Schedule
                            </button>
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-gray-600" onClick={() => setShowScheduleModal(false)}>
                                <FaTimesCircle className="inline-block" /> Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
   
            {/* Update Modal */}
            {showUpdateModal && (
                <Modal onClose={() => setShowUpdateModal(false)} width="max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Update Assessment</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['assessmentName', 'assessmentLink', 'assessmentType', 'assessmentStartDate', 'assessmentEndDate', 'assessmentStartTime', 'assessmentEndTime'].map((field, index) => (
                                <div key={index} className="flex flex-col">
                                    <label className="mb-1">{field.replace(/([A-Z])/g, ' $1')}: </label>
                                    <input
                                        type={field.includes('Date') ? 'date' : field.includes('Time') ? 'time' : 'text'}
                                        name={field}
                                        value={currentAssessment[field]}
                                        onChange={handleInputChange}
                                        className="border rounded p-2"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-950 text-white px-4 py-2 rounded mr-2 transition duration-200 ease-in-out hover:bg-blue-700">
                                <FaCheckCircle className="inline-block" /> Save
                            </button>
                            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-gray-600" onClick={() => setShowUpdateModal(false)}>
                                <FaTimesCircle className="inline-block" /> Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
   
            {/* Success and Error Modals */}
            {showSuccessModal && (
                <Modal onClose={() => setShowSuccessModal(false)} success width="max-w-md">
                    <h2 className="text-xl font-bold mb-4">Success</h2>
                    <p>Action completed successfully!</p>
                    <div className="flex justify-end mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowSuccessModal(false)}>Close</button>
                    </div>
                </Modal>
            )}
            {showErrorModal && (
                <Modal onClose={() => setShowErrorModal(false)} error width="max-w-md">
                    <h2 className="text-xl font-bold mb-4">Error</h2>
                    <p>{errorMessage}</p>
                    <div className="flex justify-end mt-4">
                        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setShowErrorModal(false)}>Close</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
 
export default AssessmentSchedulingPage;
 
 
