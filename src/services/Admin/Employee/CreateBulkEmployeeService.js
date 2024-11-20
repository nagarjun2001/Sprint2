// import axios from 'axios';
 
// const BASE_API_URL = 'http://localhost:8080/tap';
 
// const UPLOAD_URL = `${BASE_API_URL}/createbulkemployee`; // Endpoint for uploading employee data
 
// const uploadCSV = async (formData) => {
//     try {
//         const response = await axios.post(UPLOAD_URL, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(' Error uploading CSV:', error);
//         throw error; // Rethrow the error for handling in the component
//     }
// };
 
// export default {
//     uploadCSV,
// };
 
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/tap';
const UPLOAD_URL = `${BASE_API_URL}/createbulkemployee`; // Endpoint for uploading employee data

const uploadCSV = async (data) => {
    try {
        const response = await axios.post(UPLOAD_URL, data, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading employee data:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export default {
    uploadCSV,
};
