import { ActionTypes } from '../../../contants/ActionTypes';
import BulkEmployeeDataUploadService from '../../../../services/Admin/Employee/CreateBulkEmployeeService';
 
export const uploadEmployeeData = (formData) => {
    return async (dispatch) => {
        try {
            const response = await BulkEmployeeDataUploadService.uploadCSV(formData);
            dispatch({
                type: ActionTypes.UPLOAD_EMPLOYEE_DATA,
                payload: response.data,
            });
            // Handle success message or redirection if needed
        } catch (error) {
            console.error('Error uploading employee data:', error);
            // Optionally handle error
        }
    };
};