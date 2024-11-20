import React, { useEffect, useState } from 'react';
import { getMrfsResponse, getMrfsVendorResponse, getSingleMrf, postMrfsVendorAssign } from '../../services/RecruitingManager/MRFService';

const MRFModal = ({ isOpen, onClose, vendorid, searchTerm, setSearchTerm }) => {
    const [mrfData, setMrfData] = useState([]);
    const [mrfVendorIds, setMrfVendorIds] = useState([]);
    const [searchTermLocal, setSearchTermLocal] = useState(searchTerm);
    const [expandedMrfId, setExpandedMrfId] = useState(null);
    const [hoveredMrfId, setHoveredMrfId] = useState(null);
    const [selectedMrfDetails, setSelectedMrfDetails] = useState(null);
    const rmId = sessionStorage.getItem('employeeId') || 1

    const [mrfAssign, setMrfAssign] = useState({
        vendorId: "",
        mrfId: "",
        recrutingManagerId: rmId
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch MRFs for the Recruiting Manager
                const mrfResponse = await getMrfsResponse(rmId);
                setMrfData(mrfResponse.data);
                console.log(mrfResponse.data);

                // Fetch MRF vendor IDs
                const vendorResponse = await getMrfsVendorResponse();
                const vendorMrfIds = vendorResponse.data.map(vendor => vendor.mrfId);
                setMrfVendorIds(vendorMrfIds);
                console.log(vendorResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // Filter MRFs to exclude those that are in the vendor table
    const filteredMRFs = mrfData.filter((mrf) => {
        const mrfId = mrf.mrf.mrfId; // Make sure this exactly matches the structure returned from the API
        const mrfDepartmentName = mrf.mrf.mrfDepartmentName?.toLowerCase() || '';
        
        // Check if the MRF ID is NOT present in the vendor IDs array
        const isNotAssignedToVendor = !mrfVendorIds.includes(mrfId);
        const isSearchMatch = mrfDepartmentName.includes(searchTermLocal.toLowerCase());

        return isNotAssignedToVendor && isSearchMatch;
    });

    const handleRowClick = async (mrfId) => {
        setMrfAssign((prev) => ({
            ...prev,
            mrfId: mrfId,
            vendorId: vendorid
        }));
        if (expandedMrfId === mrfId) {
            setExpandedMrfId(null);
            setSelectedMrfDetails(null);
        } else {
            try {
                // get api from client partner team, getting individual mrf based on mrf id
                // const response = await axios.get(`http://localhost:8080/api/recruitingManager/allMrfs/${mrfId}`);
                const response = await getSingleMrf(mrfId);
                setSelectedMrfDetails(response.data);
                setExpandedMrfId(mrfId);
            } catch (error) {
                console.error('Error fetching selected MRF details:', error);
            }
        }
    };

    const handleAssign = async (mrfId) => {
        try {
            const response = await postMrfsVendorAssign({
                vendorId: vendorid,
                mrfId: mrfId,
                recrutingManagerId: rmId
            });
            console.log('MRF assigned successfully:', response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error assigning MRF:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full transition-all duration-300 transform hover:scale-105">
                <h2 className="text-xl font-bold mb-4 text-center">Assign MRFs</h2>
                <input
                    type="text"
                    placeholder="Search MRFs"
                    value={searchTermLocal}
                    onChange={(e) => setSearchTermLocal(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 mb-4"
                />
                <div className="max-h-60 overflow-y-auto">
                    {filteredMRFs.length > 0 ? (
                        filteredMRFs.map((mrf) => (
                            <div
                                key={mrf.mrfId}
                                className="relative p-4 border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                                onMouseEnter={() => setHoveredMrfId(mrf.mrf.mrfId)}
                                onMouseLeave={() => setHoveredMrfId(null)}
                                onClick={() => handleRowClick(mrf.mrf.mrfId)}  // Clicking opens the details
                            >
                                <div>
                                    <p className="font-semibold">
                                        {mrf.mrf?.mrfDepartmentName || 'Department Name Not Available'}
                                    </p>

                                    {expandedMrfId === mrf.mrf.mrfId && selectedMrfDetails && (
                                        <div className="mt-2 space-y-1">
                                            <p>
                                                <strong>Required Technology:</strong> {selectedMrfDetails.mrfRequiredTechnology || 'N/A'}
                                            </p>
                                            <p>
                                                {console.log(selectedMrfDetails)}
                                                <strong>Probable Designation:</strong> {selectedMrfDetails.probableDesignation || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Required Skills:</strong> {selectedMrfDetails.requiredSkills || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Created At:</strong> {selectedMrfDetails.createdAt || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Updated At:</strong> {selectedMrfDetails.updatedAt || 'N/A'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Show Assign or Show Less button */}
                                {hoveredMrfId === mrf.mrf.mrfId && (
                                    <div className="absolute left-0 right-0 bottom-2 flex justify-end space-x-2">
                                        {expandedMrfId === mrf.mrf.mrfId ? (
                                            <button
                                                onClick={() => {
                                                    handleAssign(mrf.mrf.mrfId);
                                                    setExpandedMrfId(null);
                                                    setSelectedMrfDetails(null);
                                                }}
                                                className="bg-blue-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-500"
                                            >
                                                Assign MRF
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRowClick(mrf.mrf.mrfId)}  // View more on button click
                                                className="bg-indigo-600 text-white px-4 py-2 rounded transition duration-200 hover:bg-indigo-500"
                                            >
                                                View More
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No MRFs found.</p>
                    )}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-1 rounded transition duration-200 hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MRFModal;