import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { fetchMrfVendors, fetchAllRecruiters, fetchVendorDetails } from '../../../services/ClientPartner/RecruitingManagerwiseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import VendorDetails from './VendorDetails';
import RecruitingManagerDetails from './RecruitingManagerDetails';

function RecruitingManagerwise({ sidebarOpen }) {
    const [vendors, setVendors] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [organizationMap, setOrganizationMap] = useState({});
    const [managerMap, setManagerMap] = useState({});
    const [selectedManager, setSelectedManager] = useState(null);
    const [mrfData, setMrfData] = useState([])

    useEffect(() => {
        const loadVendorsAndManagers = async () => {
            try {
                const vendorData = await fetchMrfVendors();
                setVendors(vendorData);

                const recruiterData = await fetchAllRecruiters();
                setRecruiters(recruiterData);

                const uniqueManagerIds = [...new Set(vendorData.map(vendor => vendor.recrutingManagerId))];
                const managerEmails = await Promise.all(
                    uniqueManagerIds.map(id =>
                        fetch(`http://localhost:8080/tap/getEmployeeById/${id}`)
                            .then(response => response.json())
                    )
                );

                const managerMap = managerEmails.reduce((acc, employeeData) => {
                    acc[employeeData.employeeId] = employeeData;
                    return acc;
                }, {});

                setManagerMap(managerMap);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const loadOrganizations = async () => {
            try {
                const vendorData = await fetchMrfVendors();
                const map = vendorData.reduce((acc, vendor) => {
                    acc[vendor.vendorId] = vendor.organizationName;
                    return acc;
                }, {});
                setOrganizationMap(map);
            } catch (error) {
                console.error('Error fetching organization names:', error);
            }
        };

        const loadMRFs = async () => { 
            try {
                const response = await fetch('http://localhost:8080/tap/mrf/getAllMrf');
                const mrfData = await response.json();
                setMrfData(mrfData);
            } catch (error) {
                console.error('Error fetching MRFs:', error);
            }
        };

        loadVendorsAndManagers();
        loadOrganizations();
        loadMRFs();
    }, []);

    const getMrfStageById = (mrfId) => {
        const mrfDetails = mrfData.find(mrf => mrf.mrfId === mrfId);
        return mrfDetails ? mrfDetails.mrfStatus.mrfStage : 'N/A';
    };

    const colorStatusText = (status) => {
        switch (status) {
            case 'Assigned':
                return 'text-green-600';
            case 'Not Assigned':
                return 'text-red-500';
            case 'Not Started':
                return 'text-yellow-500';
            case 'Pending':
                return 'text-gray-500';
            default:
                return 'text-black';
        }
    };

    const colorRecruiterStatusText = (status) => {
        switch (status) {
            case 'Assigned':
                return 'text-green-500'; 
            case 'Not Assigned':
                return 'text-red-500'; 
            case 'In Progress':
                return 'text-yellow-500';
            case 'Pending':
                return 'text-gray-500';
            default:
                return 'text-black';
        }
    };

    const colorMrfStageText = (stage) => {
        switch (stage) {
            case 'Draft':
                return 'text-blue-500';
            case 'In Progress':
                return 'text-yellow-500'; 
            case 'Completed':
                return 'text-green-500';
            case 'Not Started':
                return 'text-red-500'; 
            default:
                return 'text-black';
        }
    };

    const columnDefs = [
        { headerName: 'MRF ID', field: 'mrfId', sortable: true, filter: true, width: 180 },
        {
            headerName: 'Recruiting Manager Email',
            field: 'recrutingManagerId',
            sortable: true,
            filter: true,
            width: 230,
            cellRenderer: (params) => (
                <div className="flex items-center">
                    <span className="mr-2">{managerMap[params.data.recrutingManagerId]?.employeeEmail || 'N/A'}</span>
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-blue-500 cursor-pointer"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleManagerClick(params.data.recrutingManagerId);
                        }}
                    />
                </div>
            ),
        },
        {
            headerName: 'Vendor Name',
            field: 'vendorId',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params) => (
                <div className="flex items-center">
                    <span className="mr-2">{organizationMap[params.data.vendorId] || 'N/A'}</span>
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-blue-500 cursor-pointer"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleVendorClick(params.data.vendorId);
                        }}
                    />
                </div>
            ),
        },
        {
            headerName: 'Vendor Assigned Status',
            field: 'vendorAssignedStatus',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params) => (
                <span className={colorStatusText(params.data.vendorAssignedStatus)}>
                    {params.data.vendorAssignedStatus}
                </span>
            ),
        },

        {
            headerName: 'Recruiter Email',
            field: 'recruiterId',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params) => {
                
                const recruiterData = recruiters.find(recruiter => recruiter.employeeId === params.data.recruiterId);
                return (
                    <div>
                        <span>{recruiterData?.recruiterId?.employeeEmail || 'N/A'}</span>
                    </div>
                );
            },
        },

        {
            headerName: 'Recruiter Assigned Status', 
            field: 'recruiterId',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params) => {
                const recruiterData = recruiters.find(recruiter => recruiter.employeeId === params.data.recruiterId);
                const status = recruiterData?.recruiterAssignedStatus || 'N/A';
                return (
                    <span className={colorRecruiterStatusText(status)}>
                        {status}
                    </span>
                );
            },
        },
        {
            headerName: 'MRF Stage',
            field: 'mrfId',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params) => {
                const mrfStage = getMrfStageById(params.data.mrfId);
                return (
                    <span className={colorMrfStageText(mrfStage)}>
                        {mrfStage}
                    </span>
                );
            },
        },
    ];

    const filteredVendors = vendors.filter(vendor => {
        if (filter === 'Assigned') {
            return vendor.vendorAssignedStatus === 'Assigned';
        } else if (filter === 'Completed') {
            return vendor.vendorAssignedStatus === 'Completed';
        }
        return true;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleVendorClick = async (id) => {
        try {
            const vendorDetails = await fetchVendorDetails(id);
            setSelectedVendor(vendorDetails);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching vendor details:', error);
        }
    };

    const handleManagerClick = (managerId) => {
        const managerDetails = managerMap[managerId];
        setSelectedManager(managerDetails);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedVendor(null);
        setSelectedManager(null);
    };

    return (
        <div className={`flex justify-center transition-all duration-300 mt-32 ${sidebarOpen ? '' : ''}`}>
            <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-8xl">
                <h2 className="text-lg font-semibold mb-4 text-center">Assigned Vendors / Recruiters</h2>

                <div className="flex items-center mb-4">
                    <label htmlFor="vendorFilter" className="mr-2 font-bold">Filter by Status:</label>
                    <select
                        id="vendorFilter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="border p-2 rounded w-1/3"
                    >
                        <option value="All">All</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="ag-theme-alpine text-left mt-4" style={{ height: '400px', width: '100%' }}>
                    {filteredVendors.length > 0 ? (
                        <AgGridReact
                            rowData={filteredVendors}
                            columnDefs={columnDefs}
                            pagination={true}
                        />
                    ) : (
                        <p>No vendors found.</p>
                    )}
                </div>


                {modalIsOpen && selectedVendor && (
                    <VendorDetails vendor={selectedVendor} closeModal={closeModal} />
                )}


                {selectedManager && (
                    <RecruitingManagerDetails employee={selectedManager} closeModal={closeModal} />
                )}
            </div>
        </div>
    );
}

export default RecruitingManagerwise;