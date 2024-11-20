import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editEmployee } from '../../../redux/actions/Admin/Employee/EmployeeActions'; // Action to edit employee
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Select from 'react-select'; // Import Select component for dropdowns

const AdminEditEmployee = ({ isOpen, onClose, employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    employeeEmail: '',
    employeeName: '',
    workLocation: '',
    role: '',
    manager: '',
  });

  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch roles, employees, and locations
  useEffect(() => {
    const fetchRolesAndEmployees = async () => {
      try {
        // Fetch roles from API
        const roleResponse = await fetch("http://localhost:8080/tap/getallrole");
        const roleData = await roleResponse.json();
        console.log("Roles fetched: ", roleData); // Log to check data structure
        setRoles(roleData);  // Assuming roleData is an array with {roleId, roleName}

        // Fetch employees for manager selection
        const employeeResponse = await fetch("http://localhost:8080/tap/getallemployee");
        const employeeData = await employeeResponse.json();
        const formattedEmployees = employeeData.map(emp => ({
          value: emp.employeeId,
          label: `${emp.employeeName} - ${emp.role?.roleName} - ${emp.workLocation}`,
        }));
        setEmployees(formattedEmployees);

        // Fetch locations for work location selection
        const locationResponse = await fetch("http://localhost:8080/tap/getorganizationlocations");
        const locationData = await locationResponse.json();
        setLocations(locationData.map(loc => ({ value: loc.locationName, label: loc.locationName })));
      } catch (error) {
        console.error('Error fetching roles or employees:', error);
      }
    };

    fetchRolesAndEmployees();
  }, []);

  // Initialize form data when employee is provided
  useEffect(() => {
    if (isOpen && employee) {
      setEmployeeData({
        employeeEmail: employee.employeeEmail,
        employeeName: employee.employeeName,
        workLocation: employee.workLocation,
        role: employee.role?.roleId || '', // Set the roleId for editing
        manager: employee.manager?.employeeId || '', // Set managerId for editing
      });
    }
  }, [isOpen, employee]);

  // Validate fields
  const validateFields = () => {
    const newErrors = {};
    if (!employeeData.employeeEmail.trim()) newErrors.employeeEmail = 'Email is required';
    if (!employeeData.employeeName.trim()) newErrors.employeeName = 'Employee Name is required';
    if (!employeeData.workLocation.trim()) newErrors.workLocation = 'Work Location is required';
    if (!employeeData.role) newErrors.role = 'Role is required';
    if (!employeeData.manager) newErrors.manager = 'Manager is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsLoading(true);

    const updatedEmployee = {
      employeeEmail: employeeData.employeeEmail.trim(),
      employeeName: employeeData.employeeName.trim(),
      workLocation: employeeData.workLocation.trim(),
      role: { roleId: employeeData.role },
      manager: { employeeId: employeeData.manager },
    };

    try {
      // Dispatch editEmployee action
      await dispatch(editEmployee(employee.employeeId, updatedEmployee));
      setIsLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Employee updated successfully.',
        confirmButtonText: 'Okay',
      }).then(() => {
        onClose();
        navigate('/admindash'); // Navigate to the view employee page
      });
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update employee. Please try again.',
        confirmButtonText: 'Okay',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee Email */}
          <label className="block">
            <span className="text-gray-700">Employee Email</span>
            <input
              type="email"
              value={employeeData.employeeEmail}
              onChange={(e) => setEmployeeData({ ...employeeData, employeeEmail: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.employeeEmail && <p className="text-red-600 text-sm mt-1">{errors.employeeEmail}</p>}
          </label>

          {/* Employee Name */}
          <label className="block">
            <span className="text-gray-700">Employee Name</span>
            <input
              type="text"
              value={employeeData.employeeName}
              onChange={(e) => setEmployeeData({ ...employeeData, employeeName: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.employeeName && <p className="text-red-600 text-sm mt-1">{errors.employeeName}</p>}
          </label>

          {/* Work Location */}
          <label className="block">
            <span className="text-gray-700">Work Location</span>
            <Select
              value={locations.find(loc => loc.value === employeeData.workLocation) || null}
              onChange={(selectedOption) => setEmployeeData({ ...employeeData, workLocation: selectedOption?.value })}
              options={locations}
              placeholder="Select Work Location"
              required
              className="w-full"
            />
            {errors.workLocation && <p className="text-red-600 text-sm mt-1">{errors.workLocation}</p>}
          </label>

          {/* Role */}
          <label className="block">
            <span className="text-gray-700">Role</span>
            <Select
              value={roles.find(role => role.roleId === employeeData.role) || null} // Correct role selection by roleId
              onChange={(selectedOption) => setEmployeeData({ ...employeeData, role: selectedOption?.value })} // Save roleId
              options={roles.map(role => ({
                value: role.roleId, // Correctly pass roleId as value
                label: role.roleName, // Show roleName as label
              }))}
              placeholder="Select Role"
              required
              className="w-full"
            />
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
          </label>

          {/* Manager */}
          <label className="block">
            <span className="text-gray-700">Manager</span>
            <Select
              value={employees.find(emp => emp.value === employeeData.manager) || null}
              onChange={(selectedOption) => setEmployeeData({ ...employeeData, manager: selectedOption?.value })}
              options={employees}
              placeholder="Select Manager"
              required
              className="w-full"
            />
            {errors.manager && <p className="text-red-600 text-sm mt-1">{errors.manager}</p>}
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 text-white rounded hover:bg-[#1E1A4D] transition duration-200"
            style={{
              background: "linear-gradient(to right, rgb(151, 36, 126), rgb(224, 25, 80))",
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditEmployee;
