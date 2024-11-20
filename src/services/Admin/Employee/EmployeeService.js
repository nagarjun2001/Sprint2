import axios from "axios";

const BASE_URL = "http://localhost:8080/tap";

// Fetch all employees
export const getEmployees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getallemployee`);
        return response.data;  // Return the response data
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;  // Rethrow the error for handling in the component
    }
};

// Update an existing employee
export const updateEmployee = async (employeeId, employeeData) => {
    try {
        const response = await axios.put(`${BASE_URL}/updateemployee/${employeeId}`, employeeData);
        return response.data;  // Assuming the API returns the updated employee data
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
};
// Add a new employee
export const addEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${BASE_URL}/createemployee`, employeeData);
        return response.data;  // Return the created employee data
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;  // Rethrow the error to handle it in the calling code
    }
};
