import axios from "axios";

export const getOfferApprovalByCandidateId = async (candidateId) => {
    try {
        const response = await axios.get(`http://localhost:8080/tap/getOfferApproval/${candidateId}`);
        return response;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}

export const getCandidateById = async (candidateId) => {
    try {
        const response = await axios.get(`http://localhost:8080/candidates/get/${candidateId}`);
        return response;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}

export const getApprovalLevel = async (mrfId) => {
    try {
        const response = await axios.get(`http://localhost:8080/tap/getApproverLevel/${mrfId}`);
        return response;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}