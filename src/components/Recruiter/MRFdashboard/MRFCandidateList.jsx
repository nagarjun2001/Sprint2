import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const getMRFStatus = (status) => {
    const statusMap = {
        'Applied': 'Applied',
        'Screened': 'Screened',
        'Completed': 'Completed',
        'Document Verified': 'Document Verified',
        'Selected': 'Selected',
        'Rejected': 'Rejected',
        'On Hold': 'On Hold',
        'Joined': 'Joined',
    };
    return statusMap[status] || 'Unknown';
};



function CandidateList({ mrfId }) {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MRFId=sessionStorage.getItem("mrfid");

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tap/getCandidateByMrfId/${MRFId}`);
                setCandidates(response.data);
            } catch (err) {
                setError('Error fetching candidates');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, [mrfId]);

    const columnDefs = [
        { headerName: 'S.No', valueGetter: 'node.rowIndex + 1', width: 100 },
        { field: 'firstName', headerName: 'Candidate Name', sortable: true, filter: true },
        { field: 'email', headerName: 'Candidate Email', sortable: true, filter: true },
        { field: 'mobileNumber', headerName: 'Mobile Number', sortable: true, filter: true },
        { field: 'experience', headerName: 'Experience (Years)', sortable: true, filter: true },
        { field: 'location', headerName: 'Location', sortable: true, filter: true },
        { field: 'skill', headerName: 'Skill', sortable: true, filter: true },
        { field: 'status', headerName: 'Status', valueGetter: (params) => getMRFStatus(params.data.status), sortable: true, filter: true }
    ];

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
            <h2 className="text-gray-700 text-lg font-semibold mb-4">CANDIDATE LIST</h2>
            <AgGridReact
                rowData={candidates}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                animateRows={true}
                filter={true}
                sortable={true}
            />
        </div>
    );
}

export default CandidateList;