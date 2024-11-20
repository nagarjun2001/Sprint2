import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecruitementProcessLevels = () => {
    const navigate = useNavigate();
    const [mrfid, setMrfid] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [pendingMessage, setPendingMessage] = useState('');
    const [workflowEnabled, setWorkflowEnabled] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    const fetchMrfId = async () => {
        const storedValue = sessionStorage.getItem('mrfid');
        if (storedValue) {
            setMrfid(storedValue);
        }
    };

    const [rpls, setRpls] = useState({
        recruiterManagerId: 2,
        recruitmentProcesses: [],
    });

    const [employees, setEmployees] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [assessmentType, setAssessmentType] = useState('');
    const [interviewName, setInterviewName] = useState('');
    const [interviewers, setInterviewers] = useState([]);
    const [editLevelNumber, setEditLevelNumber] = useState(null);
    const [workflowStatus, setWorkflowStatus] = useState('');

    const fetchWorkflowStatus = async () => {
        try {
            const mrfid = sessionStorage.getItem('mrfid');
            const response = await axios.get(`http://localhost:8080/tap/getWorkflowByMrfIdForRecruitmentProcess/${mrfid}`);
            const status = response.data ? response.data.status : '';
            setWorkflowStatus(status);
            if (status === 'Pending') {
                setIsPending(true);
                setWorkflowEnabled(false);
                setPendingMessage("Can't add, edit, or delete levels because the workflow status is pending.");
            } else {
                setIsPending(false);
                setPendingMessage('');
                setWorkflowEnabled(true);
            }
        } catch (error) {
            console.error("Failed to fetch workflow status:", error);
        }
    };

    const fetchRecruitmentProcesses = async () => {
        const mrfid = sessionStorage.getItem('mrfid');
        try {
            const response = await axios.get(`http://localhost:8080/tap/getRecruitmentProcessLevels/${mrfid}`);
            if (response.data) {
                setRpls(prevRpls => ({ ...prevRpls, recruitmentProcesses: response.data }));
            }
        } catch (error) {
            console.error("Failed to fetch recruitment processes:", error);
        }
    };

    const fetchAllEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tap/getallemployee');
            if (response.data) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch employee details", error);
        }
    };

    useEffect(() => {
        fetchMrfId();
        fetchWorkflowStatus();
        fetchRecruitmentProcesses();
        fetchAllEmployees();
    }, []);

    const addLevel = () => {
        setOpenModal(true);
        resetModalFields();
    };

    const resetModalFields = () => {
        setSelectedType('');
        setAssessmentType('');
        setInterviewName('');
        setInterviewers([]);
    };

    const handleEdit = (level) => {
        setEditLevelNumber(level.level);
        setSelectedType(level.recruitmentProcessType);
        if (level.recruitmentProcessType === 'Assessment') {
            setAssessmentType(level.recruitmentProcessName);
            setInterviewName('');
            setInterviewers([]);
        } else {
            setInterviewName(level.recruitmentProcessName);
            setAssessmentType('');
            setInterviewers(level.interviewer.map(emp => emp.employee.employeeId));
        }
        setOpenEditModal(true);
    };

    const handleDelete = async (level) => {
        if (isSaving) {
            toast.warn('Please wait until the current operation is finished.');
            return;
        }

        if (workflowStatus === 'Approved') {
            if (level.recruitmentProcessId) {
                await handleApprovedDeleteDetails(level);
            } else {
                const updatedLevels = rpls.recruitmentProcesses.filter(l => l.level !== level.level);
                const adjustedLevels = updatedLevels.map((lvl, index) => ({
                    ...lvl,
                    level: index + 1,
                }));

                setRpls(prevState => ({
                    ...prevState,
                    recruitmentProcesses: adjustedLevels,
                }));

                toast.success('Level deleted successfully!');
            }
        } else {
            const updatedLevels = rpls.recruitmentProcesses.filter(l => l.level !== level.level);
            const adjustedLevels = updatedLevels.map((lvl, index) => ({
                ...lvl,
                level: index + 1,
            }));

            setRpls(prevState => ({
                ...prevState,
                recruitmentProcesses: adjustedLevels,
            }));

            toast.success('Level deleted successfully!');
        }
    };

    const handleApprovedNewSaveLevel = async () => {
        setIsSaving(true);
        try {
            const mrfid = sessionStorage.getItem('mrfid');
            const newLevel = {
                level: rpls.recruitmentProcesses.length + 1,
                mrf: { mrfId: mrfid },
                recruitmentProcessType: selectedType,
                recruitmentProcessName: selectedType === 'Assessment' ? assessmentType : interviewName,
                interviewer: selectedType === 'Interview'
                    ? interviewers.map(emp => ({ employee: { employeeId: emp }, status: 'Pending' }))
                    : [],
                completedStatus: 'Pending',
                interviewerNames: selectedType === 'Interview'
                    ? interviewers.map(empId => {
                        const selectedEmployee = employees.find(emp => emp.employeeId === empId);
                        return selectedEmployee ? selectedEmployee.employeeEmail : '';
                    }).filter(name => name)
                    : []
            };

            const response = await axios.post('http://localhost:8080/tap/insertRecruitmentProcessLevel', newLevel);

            if (response.status === 200) {
                setRpls(prevRpls => ({
                    ...prevRpls,
                    recruitmentProcesses: [...prevRpls.recruitmentProcesses, newLevel],
                }));

                toast.success('Level saved successfully!');
                setOpenModal(false);
            } else {
                toast.error('Failed to save level details.');
            }
        } catch (error) {
            console.error("Failed to save level details:", error);
            toast.error('Failed to save level details.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleBeforeUpdateDetails = async () => {
        const updatedLevel = {
            level: editLevelNumber,
            recruitmentProcessType: selectedType,
            recruitmentProcessName: selectedType === 'Assessment' ? assessmentType : interviewName,
            interviewer: selectedType === 'Interview'
                ? interviewers.map(emp => ({ employee: { employeeId: emp }, status: 'Pending' }))
                : [],
            completedStatus: 'Pending',
            interviewerNames: selectedType === 'Interview'
                ? interviewers.map(empId => {
                    const selectedEmployee = employees.find(emp => emp.employeeId === empId);
                    return selectedEmployee ? selectedEmployee.employeeEmail : '';
                }).filter(name => name)
                : [],
        };

        setRpls(prevRpls => ({
            ...prevRpls,
            recruitmentProcesses: prevRpls.recruitmentProcesses.map(level =>
                (level.level === editLevelNumber ? { ...level, ...updatedLevel } : level)
            )
        }));

        toast.success('Level details updated successfully!');
        setOpenEditModal(false);
    };

    const handleUpdateDetails = async () => {
        if (!validateInputs()) return;

        if (workflowStatus === 'Rejected' || workflowStatus === 'Approved') {
            await handleApprovedUpdateDetails();
        } else if (workflowStatus === 'Pending') {
            toast.warning('Levels cannot be updated in the current workflow status.');
        } else {
            handleBeforeUpdateDetails();
        }
    };

    const handleApprovedUpdateDetails = async () => {
        setIsSaving(true);
        const existingLevel = rpls.recruitmentProcesses.find(level => level.level === editLevelNumber);

        if (!existingLevel || !existingLevel.recruitmentProcessId) {
            toast.error('Unable to find the level to update.');
            setIsSaving(false);
            return;
        }

        const updatedLevel = {
            recruitmentProcessId: existingLevel.recruitmentProcessId,
            level: existingLevel.level,
            mrf: existingLevel.mrf,
            recruitmentProcessType: selectedType,
            recruitmentProcessName: selectedType === 'Assessment' ? assessmentType : interviewName,
            interviewer: selectedType === 'Interview'
                ? interviewers.map(emp => ({ employee: { employeeId: emp }, status: 'Pending' }))
                : [],
            completedStatus: 'Pending'
        };

        try {
            const response = await axios.put('http://localhost:8080/tap/updateRecruitmentProcessLevel', updatedLevel);

            if (response.status === 200) {
                setRpls(prevRpls => ({
                    ...prevRpls,
                    recruitmentProcesses: prevRpls.recruitmentProcesses.map(level =>
                        (level.recruitmentProcessId === updatedLevel.recruitmentProcessId ? updatedLevel : level)
                    )
                }));
                toast.success('Level updated successfully!');
            } else {
                toast.error('Failed to update the level.');
            }
        } catch (error) {
            console.error("Failed to update recruitment process:", error);
            toast.error(`Failed to update the level. ${error.response ? error.response.data : 'Please verify the API.'}`);
        } finally {
            setIsSaving(false);
            setOpenEditModal(false);
        }
    };

    const handleSaveDetails = async () => {
        if (!validateInputs()) return;

        if (workflowStatus === 'Approved') {
            await handleApprovedNewSaveLevel();
        } else {
            setIsSaving(true);
            try {
                const mrfid = sessionStorage.getItem('mrfid');
                const newLevel = {
                    level: rpls.recruitmentProcesses.length + 1,
                    mrf: { mrfId: mrfid },
                    recruitmentProcessType: selectedType,
                    recruitmentProcessName: selectedType === 'Assessment' ? assessmentType : interviewName,
                    interviewer: selectedType === 'Interview'
                        ? interviewers.map(emp => ({ employee: { employeeId: emp }, status: 'Pending' }))
                        : [],
                    completedStatus: 'Pending',
                    interviewerNames: selectedType === 'Interview'
                        ? interviewers.map(empId => {
                            const selectedEmployee = employees.find(emp => emp.employeeId === empId);
                            return selectedEmployee ? selectedEmployee.employeeEmail : '';
                        }).filter(name => name)
                        : []
                };

                setRpls(prevRpls => ({
                    ...prevRpls,
                    recruitmentProcesses: [...prevRpls.recruitmentProcesses, newLevel],
                }));

                toast.success('Level saved successfully!');
                setOpenModal(false);
            } catch (error) {
                console.error("Failed to save level details:", error);
                toast.error('Failed to save level details.');
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleApprovedDeleteDetails = async (level) => {
        const levelToDelete = rpls.recruitmentProcesses.find(l => l.level === level.level);

        if (!levelToDelete) {
            toast.error('Unable to find the level to delete.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/tap/deleteRecruitmentProcessLevel/${levelToDelete.recruitmentProcessId}`);

            if (response.status === 200) {
                setRpls(prevRpls => ({
                    ...prevRpls,
                    recruitmentProcesses: prevRpls.recruitmentProcesses.filter(l => l.recruitmentProcessId !== levelToDelete.recruitmentProcessId)
                }));
                toast.success('Level deleted successfully!');
                setOpenEditModal(false);
            } else {
                toast.error('Failed to delete the level.');
            }
        } catch (error) {
            console.error("Failed to delete recruitment process:", error);
            toast.error('Failed to delete the level. Please verify the API.');
        }
    };

    const handleAddEmployee = () => {
        setInterviewers([...interviewers, '']);
    };

    const handleEmployeeChange = (index, employeeId) => {
        const updatedInterviewers = [...interviewers];
        updatedInterviewers[index] = employeeId;
        setInterviewers(updatedInterviewers);
    };

    const handleRemoveEmployee = (index) => {
        const updatedEmployees = [...interviewers];
        updatedEmployees.splice(index, 1);
        setInterviewers(updatedEmployees);
    };

    const sendForApproval = async () => {
        try {
            await axios.post('http://localhost:8080/tap/addRecruitmentProcess', rpls);
            toast.success('Levels sent for approval successfully!');
            await fetchWorkflowStatus();
        } catch (error) {
            console.error("Failed to send for approval:", error);
            toast.error('Failed to send for approval.');
        }
    };

    const handleCardClick = (level) => {
        if (level.recruitmentProcessType === 'Assessment') {
            sessionStorage.setItem('rpId', level.recruitmentProcessId);
            navigate(`/mrfone/assessmentschedulingpage/${level.recruitmentProcessId}`);
        }
    };

    const handleRadioChange = (event) => {
        setSelectedType(event.target.value);
    };

    const validateInputs = () => {
        // Validate Assessment Name
        if (selectedType === 'Assessment' && !assessmentType) {
            toast.error('Invalid assessment name. Assessment name cannot be empty.');
            return false;
        }

        // Validate Interview Name
        if (selectedType === 'Interview') {
            const invalidInterviewName = /^[0-9]+$/.test(interviewName) || /^[^a-zA-Z0-9]+$/.test(interviewName);
            if (invalidInterviewName || !interviewName) {
                toast.error('Invalid interview name. It must contain letters and numbers and cannot consist of only numbers or symbols.');
                return false;
            }
        }

        // Validate Interviewers
        if (selectedType === 'Interview' && interviewers.filter(emp => emp !== '').length === 0) {
            toast.error('Please select at least one interviewer.');
            return false;
        }

        return true;
    };

    return (
        <div className="w-full p-6 min-h-screen">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            {isPending && (
                <div className="mb-4 p-4 bg-yellow-300 text-yellow-800 rounded-lg shadow-md">
                    <p>{pendingMessage}</p>
                </div>
            )}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-center text-gray-800">RECRUITMENT PROCESS LEVEL</h1>
                <button
                    className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={addLevel}
                    disabled={workflowStatus === 'Pending'}>
                    Add Level
                </button>
            </div>

            {rpls.recruitmentProcesses.length === 0 && (
                <div className="mb-4 p-4 bg-gray-200 text-gray-600 italic rounded-lg text-center">
                    Not yet updated: No levels have been added.
                </div>
            )}

            <div className="overflow-x-auto mb-4">
                <div className="flex items-center justify-start flex-nowrap" style={{ maxWidth: '100%' }}>
                    {rpls.recruitmentProcesses.map((level, index) => (
                        <div key={level.level} className="m-2 w-full sm:w-1/2 md:w-1/3 flex items-center" onClick={() => handleCardClick(level)}>
                            {index > 0 && <span className="text-2xl text-blue-600 mx-2">→</span>}
                            <div className="bg-white p-6 border rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 w-full">
                                <h2 className="font-bold text-lg text-black">Level {level.level}</h2>
                                <p className="font-normal text-black-600">Type: {level.recruitmentProcessType}</p>

                                {level.recruitmentProcessType === 'Interview' && (
                                    <div>
                                        <p className="font-normal text-black-600">Interview Name: {level.recruitmentProcessName}</p>
                                        {Array.isArray(level.interviewer) && level.interviewer.length > 0 && (
                                            <p className="font-normal text-black-600">Interviewers: {level.interviewer.map(interviewer => interviewer.employee.employeeEmail).join(', ')}</p>
                                        )}
                                    </div>
                                )}

                                {level.recruitmentProcessType === 'Assessment' && (
                                    <p className="font-normal text-black-600">Assessment Name: {level.recruitmentProcessName}</p>
                                )}
                                <div className="flex justify-between mt-4">
                                    <button
                                        className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${isSaving || workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handleEdit(level); }}
                                        disabled={isSaving || workflowStatus === 'Pending'}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${isSaving || workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); handleDelete(level); }}
                                        disabled={isSaving || workflowStatus === 'Pending'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {rpls.recruitmentProcesses.length > 0 && workflowStatus !== 'Approved' && (
                <button
                    className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${isSaving || workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={sendForApproval}
                >
                    Send for Approval
                </button>
            )}

            {/* Add Level Modal */}
            <div className={`fixed inset-0 flex items-center justify-center ${openModal ? 'block' : 'hidden'}`}>
                <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">Select Assessment or Interview</h2>
                    <div>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Assessment"
                                checked={selectedType === 'Assessment'}
                                onChange={handleRadioChange}
                                className="mr-2"
                                disabled={workflowStatus === 'Pending'}
                            />
                            Assessment
                        </label>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Interview"
                                checked={selectedType === 'Interview'}
                                onChange={handleRadioChange}
                                className="mr-2"
                                disabled={workflowStatus === 'Pending'}
                            />
                            Interview
                        </label>
                    </div>

                    {selectedType === 'Assessment' && (
                        <input
                            type="text"
                            placeholder="Assessment Name"
                            value={assessmentType}
                            onChange={(e) => setAssessmentType(e.target.value)}
                            className="mb-4 w-full p-2 border border-gray-300 rounded"
                            disabled={workflowStatus === 'Pending'}
                        />
                    )}

                    {selectedType === 'Interview' && (
                        <>
                            <input
                                type="text"
                                placeholder="Interview Name"
                                value={interviewName}
                                onChange={(e) => setInterviewName(e.target.value)}
                                className="mb-4 w-full p-2 border border-gray-300 rounded"
                                disabled={workflowStatus === 'Pending'}
                            />
                            <p className="font-semibold mb-2 text-gray-700">Interviewers:</p>
                            {interviewers.map((empId, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <select
                                        value={empId}
                                        onChange={(e) => handleEmployeeChange(index, e.target.value)}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                        disabled={workflowStatus === 'Pending'}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map(employee => (
                                            <option key={employee.employeeId} value={employee.employeeId}>
                                                {employee.employeeEmail}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleRemoveEmployee(index)}
                                        className="ml-2 bg-red-500 text-white rounded px-2 py-1"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleAddEmployee}
                                className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={workflowStatus === 'Pending'}>
                                Add Employee
                            </button>
                        </>
                    )}
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSaveDetails}
                            className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={workflowStatus === 'Pending'}>
                            Save
                        </button>
                        <button
                            onClick={() => setOpenModal(false)}
                            className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ml-2 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={workflowStatus === 'Pending'}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Level Modal */}
            <div className={`fixed inset-0 flex items-center justify-center ${openEditModal ? 'block' : 'hidden'}`}>
                <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">Edit Level Details</h2>
                    <div>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Assessment"
                                checked={selectedType === 'Assessment'}
                                onChange={handleRadioChange}
                                className="mr-2"
                                disabled={workflowStatus === 'Pending'}
                            />
                            Assessment
                        </label>
                        <label className="block mb-2">
                            <input
                                type="radio"
                                value="Interview"
                                checked={selectedType === 'Interview'}
                                onChange={handleRadioChange}
                                className="mr-2"
                                disabled={workflowStatus === 'Pending'}
                            />
                            Interview
                        </label>
                    </div>

                    {selectedType === 'Assessment' && (
                        <input
                            type="text"
                            placeholder="Assessment Name"
                            value={assessmentType}
                            onChange={(e) => setAssessmentType(e.target.value)}
                            className="mb-4 w-full p-2 border border-gray-300 rounded"
                            disabled={workflowStatus === 'Pending'}
                        />
                    )}

                    {selectedType === 'Interview' && (
                        <>
                            <input
                                type="text"
                                placeholder="Interview Name"
                                value={interviewName}
                                onChange={(e) => setInterviewName(e.target.value)}
                                className="mb-4 w-full p-2 border border-gray-300 rounded"
                                disabled={workflowStatus === 'Pending'}
                            />
                            <p className="font-semibold mb-2 text-gray-700">Interviewers:</p>
                            {interviewers.map((empId, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    <select
                                        value={empId}
                                        onChange={(e) => handleEmployeeChange(index, e.target.value)}
                                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                                        disabled={workflowStatus === 'Pending'}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map(employee => (
                                            <option key={employee.employeeId} value={employee.employeeId}>
                                                {employee.employeeEmail}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleRemoveEmployee(index)}
                                        className="ml-2 bg-red-500 text-white rounded px-2 py-1"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleAddEmployee}
                                className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={workflowStatus === 'Pending'}
                            >
                                Add Employee
                            </button>
                        </>
                    )}
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handleUpdateDetails}
                            className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSaving}>
                            Update
                        </button>
                         
                        <button
                            onClick={() => setOpenEditModal(false)}
                            className={`bg-[#27235c] text-white border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#27235c] hover:text-white hover:border-gray-200 ${workflowStatus === 'Pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={workflowStatus === 'Pending'}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruitementProcessLevels;