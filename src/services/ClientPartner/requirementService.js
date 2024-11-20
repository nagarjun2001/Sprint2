// import axios from "axios";

// const API_URL = "http://localhost:8080/tap"; // Ensure this is the correct base URL for your backend API

// export const submitMRFForm = async (formData) => {
//   try {
//     const response = await axios.post(`http://localhost:8080/tap/mrf/addMrf`, formData); // Ensure this endpoint exists
//     return response.data; // Return the response data or handle errors as required
//   } catch (error) {
//     // Handle errors here if necessary
//     console.error('Error submitting MRF form:', error);
//     throw error; // Rethrow or handle as needed
//   }
// };

// export const fetchAllMRFs = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/mrf/getAllMrf`); // Ensure this path matches your backend
//     return response.data; // Return the fetched MRF data
//   } catch (error) {
//     console.error('Error fetching MRFs:', error);
//     throw error; 
//   }
// };

// export const fetchRequirements = async () => {
//   const response = await axios.get(`${API_URL}/api/requirements`); // Update with your endpoint
//   return response.data;
// };

// export const fetchRequirementById = async (id) => {
//   const response = await axios.get(`${API_URL}/api/requirements/${id}`); // Update with your endpoint
//   return response.data;
// };


import axios from "axios";
 
const API_URL = "http://localhost:8080/tap"; // Ensure this is the correct base URL for your backend API
 
export const submitMRFForm = async (formData) => {
  console.log("submit");
  console.log(formData.get('mrf'));
  try {
    const response = await axios.post(`http://localhost:8080/tap/mrf/addMrf`, formData); // Ensure this endpoint exists
    return response.data; // Return the response data or handle errors as required
  } catch (error) {
    // Handle errors here if necessary
    console.error('Error submitting MRF form:', error);
    throw error; // Rethrow or handle as needed
  }
};
 
export const updateMRFForm = async (mrfId, formData) => {
  console.log(mrfId);
 
  try {
    const response = await axios.put(`http://localhost:8080/tap/mrf/updateMrf/${mrfId}`, formData); // Updated URL with mrfId
    return response.data; // Return the response data or handle errors as required
  } catch (error) {
    console.error('Error updating MRF form:', error);
    throw error; // Rethrow or handle as needed
  }
};
 
export const deleteMRF = async (mrfId) => {
  console.log(mrfId);
  try {
    const response = await axios.delete(`http://localhost:8080/tap/mrf/deleteMrf/${mrfId}`); // Adjust the URL as necessary
    return response.data;
  } catch (error) {
    console.error('Error deleting MRF:', error);
    throw error; // Rethrow or handle the error as needed
  }
};
 
export const fetchAllMRFs = async () => {
  try {
    const response = await axios.get(`${API_URL}/mrf/getAllMrf`); // Ensure this path matches your backend
    return response.data; // Return the fetched MRF data
  } catch (error) {
    console.error('Error fetching MRFs:', error);
    throw error;
  }
};
 
export const fetchRequirements = async () => {
  const response = await axios.get(`${API_URL}/api/requirements`); // Update with your endpoint
  return response.data;
};
 
export const fetchRequirementById = async (id) => {
  const response = await axios.get(`${API_URL}/api/requirements/${id}`); // Update with your endpoint
  return response.data;
};
 
 
 
export const fetchAllSubRequirementIds = async () => {
  try {
    const response = await axios.get(`${API_URL}/mrf/getAllMrfSubRequirementId`);
    return response.data; // Return the fetched IDs
  } catch (error) {
    console.error('Error fetching Sub Requirement IDs:', error);
    throw error;
  }
};