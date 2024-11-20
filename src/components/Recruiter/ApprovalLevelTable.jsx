import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
 
const ApprovalTable = () => {
    const [approvers, setApprovers] = useState([]);
    const [employeeContacts, setEmployeeContacts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For Edit Modal
    const [selectedApprover, setSelectedApprover] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [workflowStatus, setWorkflowStatus] = useState('');
    const [editedRowIndex, setEditedRowIndex] = useState(null);
    const [approverId, setApproverId] = useState(null); // Store the approverId for updates
 
    useEffect(() => {
        fetchApprovers();
        fetchEmployees();
        fetchWorkflowStatus();
    }, []);
 
    // Fetch approvers from backend
    const fetchApprovers = async () => {
        const mrfid = sessionStorage.getItem('mrfid');
        try {
            const response = await axios.get(`http://localhost:8080/tap/getApproverLevel/${mrfid}`);
            setApprovers(response.data);
        } catch (error) {
            console.error('Error fetching approvers:', error);
        }
    };
 
    // Fetch workflow status from backend
    const fetchWorkflowStatus = async () => {
        try {
            const mrfid = sessionStorage.getItem('mrfid');
            const response = await axios.get(`http://localhost:8080/tap/getWorkflow/${mrfid}`);
            if (response.data && response.data.status) {
                setWorkflowStatus(response.data.status);
            }
        } catch (error) {
            console.error('Failed to fetch workflow status:', error);
        }
    };
 
    // Fetch employee contacts
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tap/getallemployee');
            setEmployeeContacts(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };
 
    // Handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
 
    // Open modal for adding a new approver
    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };
 
    // Open modal for editing an existing approver
    const handleEditClick = (index) => {
        const approver = approvers[index];
        setApproverId(approver.approverId);
        setEditedRowIndex(index);
        setSelectedApprover(approver.employee.employeeId);
        setIsEditModalOpen(true);
    };
 
    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedApprover('');
        setSearchTerm('');
        setEditedRowIndex(null);
    };
 
    // Submit new approver to the list
    const handleSubmit = async () => {
        const mrfid = sessionStorage.getItem('mrfid');
        if (!selectedApprover || !mrfid) {
            alert("Please select an approver and ensure MRF ID is available.");
            return;
        }
 
        const selectedEmployee = employeeContacts.find(emp => emp.employeeId === selectedApprover);
        if (!selectedEmployee) {
            alert("Selected approver does not exist.");
            return;
        }
 
        const newRow = {
            level: approvers.length + 1,
            mrf: { mrfId: mrfid },
            employee: { employeeId: selectedApprover, role: selectedEmployee.role }
        };
 
        if (workflowStatus === "Approved" || workflowStatus === "Rejected") {
            await axios.post(`http://localhost:8080/tap/addSingleApproverLevel`, newRow);
        } else {
            setApprovers(prevApprovers => [...prevApprovers, newRow]);
        }
 
        handleCloseModal();
    };
 
    // Update an existing approver
    const handleUpdate = async () => {
        const approverDetails = employeeContacts.find(emp => emp.employeeId === selectedApprover);
        if (!approverDetails) {
            alert('Please select a valid approver.');
            return;
        }
 
        if (workflowStatus === 'Pending') {
            alert('Cannot update approver when workflow status is pending.');
            return;
        }
 
        const mrfid = sessionStorage.getItem('mrfid');
        const approverToUpdate = approvers[editedRowIndex];
        const updatedApprover = {
            approverId: approverId,
            mrf: { mrfId: mrfid },
            employee: { employeeId: selectedApprover },
            level: approverToUpdate.level,
        };
 
        if (workflowStatus === 'Approved' || workflowStatus === 'Rejected') {
            try {
                const response = await axios.put(`http://localhost:8080/tap/updateApproverLevel`, updatedApprover);
 
                if (response.status === 200) {
                    const updatedRows = [...approvers];
                    updatedRows[editedRowIndex] = updatedApprover;
 
                    setApprovers(updatedRows);
                    alert('Approver updated successfully.');
                    handleCloseModal();
                } else {
                    alert('Failed to update approver.');
                }
            } catch (error) {
                console.error('Error updating approver:', error);
                alert('Failed to update approver.');
            }
        } else {
            const updatedRows = [...approvers];
            updatedRows[editedRowIndex] = {
                ...updatedRows[editedRowIndex],
                employee: { employeeId: selectedApprover },
            };
 
            setApprovers(updatedRows);
            handleCloseModal();
        }
    };
 
    // Delete approver
    const handleDelete = async (index) => {
        const approverToDelete = approvers[index];
        const approverLevelId = approverToDelete.approverId;
 
        if (workflowStatus === "Approved" || workflowStatus === "Rejected") {
            try {
                const response = await axios.delete(`http://localhost:8080/tap/deleteApproverLevel/${approverLevelId}`);
                if (response.status === 200) {
                    setApprovers(prevApprovers => prevApprovers.filter((_, idx) => idx !== index));
                    alert('Approver deleted successfully.');
                }
            } catch (error) {
                console.error('Error deleting approver:', error);
                alert('Failed to delete approver.');
            }
        } else {
            setApprovers(prevApprovers => prevApprovers.filter((_, idx) => idx !== index));
            alert('Approver deleted successfully.');
        }
    };
 
    // Send approval request (Send for approval button)
    const handleSendForApproval = async () => {
        if (workflowStatus === 'Approved') {
            alert('Approval process already completed.');
            return;
        }
 
        try {
            const mrfid = sessionStorage.getItem('mrfid');
            const dataToSend = approvers.map(row => ({
                mrf: { mrfId: mrfid },
                employee: { employeeId: row.employee.employeeId },
                level: row.level,
                role: row.employee.role
            }));
 
            const response = await axios.post('http://localhost:8080/tap/addApproverLevel', dataToSend);
 
            if (response.status === 200) {
                alert('All approvers have been sent for approval!');
                setWorkflowStatus('Pending');
            }
        } catch (error) {
            console.error('Error sending for approval:', error);
            alert('There was an error sending for approval.');
        }
    };
 
    // Filter employee list based on search term
    const filteredEmployees = employeeContacts.filter(employee =>
        employee.employeeEmail && employee.employeeEmail.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
 
    // Get role name of an employee based on employeeId
    const getRoleName = (employeeId) => {
        const employee = employeeContacts.find(emp => emp.employeeId === employeeId);
        return employee ? employee.role?.roleName || 'No Role' : 'No Role';
    };
 
    return (
        <div className="p-6 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Approval Table</h2>
                {workflowStatus && (
                    <div className="bg-yellow-300 text-black px-4 py-2 rounded-lg">
                        <strong>Status:</strong> {workflowStatus}
                    </div>
                )}
 
                <button
                    onClick={handleAddClick}
                    disabled={workflowStatus === 'Pending'}
                    className={`flex items-center ${workflowStatus === 'Pending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-950 hover:bg-blue-900'} text-white px-4 py-2 rounded-lg transition-all`}>
                    <FaPlus className="mr-2" /> Add Approver
                </button>
            </div>
 
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="py-2 px-4 border-b">Level</th>
                        <th className="py-2 px-4 border-b">Approver Name</th>
                        <th className="py-2 px-4 border-b">Contact</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {approvers.length > 0 ? (
                        approvers.map((row, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{row.level}</td>
                                <td className="py-2 px-4 border-b">
                                    {employeeContacts.find(emp => emp.employeeId === row.employee.employeeId)?.employeeEmail} ({getRoleName(row.employee.employeeId)})
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {employeeContacts.find(emp => emp.employeeId === row.employee.employeeId)?.employeeEmail}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => handleEditClick(index)} className="text-blue-500 mr-2" disabled={workflowStatus === 'Pending'}>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="text-red-500" disabled={workflowStatus === 'Pending'}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">No approvers added yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
 
            {/* Send for Approval Button */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSendForApproval}
                    disabled={workflowStatus}
                    className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded-lg">
                    Send for Approval
                </button>
            </div>
 
            {/* Add Approver Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Add Approver</h3>
                       
                        {/* Add Approver Form Fields */}
                        <div className="mb-4">
                            <label className="block mb-2">Approval Level</label>
                            <input
                                type="text"
                                value={approvers.length + 1} // Automatically incrementing level
                                readOnly
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full bg-gray-100"
                            />
                        </div>
 
                        <div className="mb-4">
                            <label className="block mb-2">Search Approver</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by email"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                            />
 
                            {/* Display Suggestions Based on Search Term */}
                            {searchTerm && (
                                <div className="mt-2 bg-white shadow-md rounded-lg max-h-60 overflow-auto">
                                    {filteredEmployees.map((employee) => (
                                        <div
                                            key={employee.employeeId}
                                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedApprover(employee.employeeId);
                                                setSearchTerm(employee.employeeEmail);
                                            }}
                                        >
                                            <img
                                                src={employee.profilePicture || 'default-avatar.png'}
                                                alt={employee.employeeEmail}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <div className="flex flex-col">
                                                <span>{employee.employeeEmail}</span>
                                                <span className="text-sm text-gray-500">{employee.role?.roleName}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
 
                        {selectedApprover && (
                            <div className="mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                                <h4 className="font-semibold">Selected Approver:</h4>
                                <div className="flex items-center mt-2">
                                    <img
                                        src={employeeContacts.find(emp => emp.employeeId === selectedApprover)?.profilePicture || 'default-avatar.png'}
                                        alt="Selected Approver"
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span>{employeeContacts.find(emp => emp.employeeId === selectedApprover)?.employeeEmail}</span>
                                </div>
                            </div>
                        )}
 
                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Add
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
            {/* Edit Approver Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Edit Approver</h3>
 
                        {/* Edit Approver Form Fields */}
                        <div className="mb-4">
                            <label className="block mb-2">Approval Level</label>
                            <input
                                type="text"
                                value={approvers[editedRowIndex]?.level}
                                readOnly
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full bg-gray-100"
                            />
                        </div>
 
                        <div className="mb-4">
                            <label className="block mb-2">Search Approver</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by email"
                                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                            />
 
                            {/* Display Suggestions Based on Search Term */}
                            {searchTerm && (
                                <div className="mt-2 bg-white shadow-md rounded-lg max-h-60 overflow-auto">
                                    {filteredEmployees.map((employee) => (
                                        <div
                                            key={employee.employeeId}
                                            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedApprover(employee.employeeId);
                                                setSearchTerm(employee.employeeEmail);
                                            }}
                                        >
                                            <img
                                                src={employee.profilePicture || 'default-avatar.png'}
                                                alt={employee.employeeEmail}
                                                className="w-8 h-8 rounded-full mr-2"
                                            />
                                            <div className="flex flex-col">
                                                <span>{employee.employeeEmail}</span>
                                                <span className="text-sm text-gray-500">{employee.role?.roleName}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
 
                        {selectedApprover && (
                            <div className="mb-4 p-2 border border-gray-300 rounded-lg bg-gray-50">
                                <h4 className="font-semibold">Selected Approver:</h4>
                                <div className="flex items-center mt-2">
                                    <img
                                        src={employeeContacts.find(emp => emp.employeeId === selectedApprover)?.profilePicture || 'default-avatar.png'}
                                        alt="Selected Approver"
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span>{employeeContacts.find(emp => emp.employeeId === selectedApprover)?.employeeEmail}</span>
                                </div>
                            </div>
                        )}
 
                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default ApprovalTable;
