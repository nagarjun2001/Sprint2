
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeData } from "../../../redux/actions/Admin/Employee/EmployeeActions";
import EmployeeModal from "./EmployeeModal";
import { FaPlus, FaSearch, FaTimes, FaChevronRight, FaChevronLeft, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa"; // Icons
 
const ViewEmployee = () => {
  const dispatch = useDispatch();
 
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
 
  const employees = useSelector((state) => state.employee.employees || []);
 
  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);
 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  const filteredData = employees.filter((employee) => {
    if (!employee || typeof employee.employeeEmail !== "string") return false;
    const searchMatch =
      employee.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.employeeName &&
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()));
    return searchMatch;
  });
 
  // Pagination logic
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredData.slice(indexOfFirstEmployee, indexOfLastEmployee);
 
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
 
  const handlePageSizeChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
 
  const handleStatusToggle = async (employeeId, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"; // Toggle status
 
    try {
      const response = await fetch(
        `http://localhost:8080/tap/updateEmployeeStatus/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeStatus: newStatus,
          }),
        }
      );
 
      if (response.ok) {
        dispatch(fetchEmployeeData()); // Re-fetch employee data to reflect changes
      } else {
        const errorData = await response.json();
        throw new Error(
          "Failed to update employee status: " + errorData.message || errorData
        );
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };
 
  const handleSaveEditedEmployee = async () => {
    if (!employeeToEdit) return;
 
    try {
      const response = await fetch(`/api/updateEmployee/${employeeToEdit.employeeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeToEdit),
      });
 
      const updatedEmployee = await response.json();
 
      if (response.ok) {
        dispatch(fetchEmployeeData());
        setIsModalOpen(false);
      } else {
        alert("Failed to save employee data");
      }
    } catch (error) {
      console.error("Error saving employee data:", error);
      alert("An error occurred while saving the employee data");
    }
  };
 
  return (
    <div className="bg-[#f0f4f8] min-h-screen flex flex-col items-center py-8">
      <div className="w-full max-w-6xl p-10 bg-white rounded-lg shadow-xl">
        {/* Title Section */}
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-semibold text-[#27235C]">Employee List</h2>
        </div>
 
        {/* Search Bar, Create Button, and Entries per Page */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            {/* Entries per Page Dropdown */}
            <label htmlFor="entries-count" className="text-sm text-gray-700">Entries per page:</label>
            <select
              id="entries-count"
              value={itemsPerPage}
              onChange={handlePageSizeChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
 
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search by Name or Email"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-72 bg-white"
              />
              {searchTerm && (
                <button className="absolute right-3 text-gray-500 hover:text-gray-700" onClick={() => setSearchTerm('')}>
                  <FaTimes />
                </button>
              )}
            </div>
 
            {/* Add Employee Button */}
            <button
              className="flex items-center p-2 bg-gradient-to-r from-[#971A7E] to-[#E01950] text-white rounded hover:bg-[#1E1A4D] transition duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" /> Add Employee
            </button>
          </div>
        </div>
 
        {/* Employee Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#27235C] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Manager</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Position</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Work Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.employeeId} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-sm">{employee.employeeName}</td>
                <td className="px-6 py-4 text-sm">{employee.employeeEmail}</td>
                <td className="px-6 py-4 text-sm">
                  {employee.manager ? employee.manager.employeeName : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm">{employee.role?.roleName}</td>
                <td className="px-6 py-4 text-sm">{employee.workLocation}</td>
                <td className="px-6 py-4 text-sm">
  {/* Status Toggle */}
  <label className="inline-flex items-center cursor-pointer relative">
    <input
      type="checkbox"
      checked={employee.employeeStatus === "ACTIVE"}
      onChange={() => handleStatusToggle(employee.employeeId, employee.employeeStatus)}
      className="sr-only"
    />
    <span
      className={`${
        employee.employeeStatus === "ACTIVE" ? "bg-green-500" : "bg-red-500"
      } w-11 h-6 rounded-full transition-colors duration-200`}
    ></span>
    {/* Circle for the white round */}
    <span
      className={`${
        employee.employeeStatus === "ACTIVE" ? "translate-x-5 bg-white" : "translate-x-0 bg-white"
      } absolute left-0 top-0 bottom-0 w-6 h-6 rounded-full transition-transform duration-200`}
    ></span>
  </label>
</td>
 
              </tr>
             
              ))}
            </tbody>
          </table>
        </div>
 
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Left side: Page count */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
 
          {/* Right side: Pagination buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`p-2 bg-gray-200 rounded-l ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''}`}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 bg-gray-200 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : ''}`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 bg-gray-200 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : ''}`}
            >
              <FaChevronRight />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 bg-gray-200 rounded-r ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : ''}`}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </div>
 
      {/* Modal */}
      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {/* Modal content */}
        </EmployeeModal>
      )}
    </div>
  );
};
 
export default ViewEmployee;
 