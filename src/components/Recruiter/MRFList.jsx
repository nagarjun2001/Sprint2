import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function MRFList() {
    const [mrfList, setMrfList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMRFs = async () => {
            const employeeId = sessionStorage.getItem('employeeId');
            try {
                const response = await axios.get(`http://localhost:8080/tap/api/mrfassignedtorecruiter/${employeeId}`);
                setMrfList(response.data);
            } catch (err) {
                setError('Error fetching MRFs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMRFs();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    // Filter MRF List based on search term
    const filteredMRFs = mrfList.filter(mrf =>
        mrf.mrfId.toString().includes(searchTerm) ||
        mrf.mrfDepartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mrf.probableDesignation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columnDefs = [
        { headerName: "S.No", valueGetter: "node.rowIndex + 1", sortable: true, filter: false },
        { headerName: "MRF ID", field: "mrfId", sortable: true, filter: true },
        { headerName: "Department Name", field: "mrfDepartmentName", sortable: true, filter: true },
        { headerName: "Probable Designation", field: "probableDesignation", sortable: true, filter: true },
        { headerName: "Required Technology", field: "mrfRequiredTechnology", sortable: true, filter: true },
            { headerName: "Created At", field: "createdAt", sortable: true, filter: true },
        { headerName: "Required Resource Count", field: "requiredResourceCount", sortable: true, filter: true }
    ];

    const rowClickHandler = (event) => {
        sessionStorage.setItem('mrfid', event.data.mrfId);
        navigate(`/mrfDashboard/${event.data.mrfId}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
            <h2 className="text-gray-700 font-semibold mb-4">MRF List</h2>

            {/* Search Box */}
            <input
                type="text"
                placeholder="Search by MRF ID, Department, or Designation"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />

            {/* AG Grid */}
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact
                    rowData={filteredMRFs}
                    columnDefs={columnDefs}
                    onRowClicked={rowClickHandler}
                    pagination={true} // Optional: Enable pagination
                    paginationPageSize={10} // Optional: Set pagination page size
                    filter={true} // Optional: Enable global filtering
                />
            </div>
        </div>
    );
}

export default MRFList;