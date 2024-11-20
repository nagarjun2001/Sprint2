import React, { useEffect, useState } from 'react';
import { deleteMRF, fetchAllMRFs } from '../../../services/ClientPartner/requirementService'; // Adjust the path as necessary
import { AiOutlineSearch } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; // Import arrow icons
import ClientNavbar from '../../NavbarComponent/ClientPartnerNavbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import toast for notifications
 
const ViewMrf = () => {
    const [mrfs, setMrfs] = useState([]);
    const [filteredMrfs, setFilteredMrfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMrf, setSelectedMrf] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [slaDocumentUrl, setSlaDocumentUrl] = useState(null);
    const [slaModalOpen, setSlaModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeAccordionIndex, setActiveAccordionIndex] = useState(null); // Track the active accordion index
 
    const navigate = useNavigate();
 
    useEffect(() => {
        const getAllMRFs = async () => {
            try {
                const data = await fetchAllMRFs();
                setMrfs(data);
                setFilteredMrfs(data);
            } catch (err) {
                setError("Failed to fetch MRFs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
 
        getAllMRFs();
    }, []);
 
    useEffect(() => {
        const filtered = mrfs.filter(mrf => {
            const matchesStatus = statusFilter ? mrf?.mrfStatus?.mrfApprovalStatus === statusFilter : true;
            const matchesSearch =
                mrf?.probableDesignation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                mrf?.mrfDepartmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                mrf?.requiredSkills?.toLowerCase().includes(searchQuery.toLowerCase());
 
            return matchesStatus && matchesSearch;
        });
 
        setFilteredMrfs(filtered);
    }, [statusFilter, searchQuery, mrfs]);
 
    const handleOpenModal = (mrf) => {
        setSelectedMrf(mrf);
        setModalOpen(true);
    };
 
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedMrf(null);
        setSlaDocumentUrl(null);
        setActiveAccordionIndex(null);
    };
 
    const handleAccordionToggle = (index) => {
        setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
    };
 
    const handleViewBlobDocument = async () => {
        const base64 = selectedMrf?.mrfAgreement?.serviceLevelAgreement;
        if (base64) {
            const byteCharacters = atob(base64);
            const byteNumbers = new Uint8Array(byteCharacters.length);
 
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
 
            const blob = new Blob([byteNumbers], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setSlaDocumentUrl(url);
            setSlaModalOpen(true);
        } else {
            console.error('No SOW document available.');
        }
    };
 
    const handleCloseSlaModal = () => {
        setSlaModalOpen(false);
        setSlaDocumentUrl(null);
    };
 
    const handleEdit = (mrf) => {
        navigate('/updateMrf', { state: { requirementDetails: mrf } });
    };
 
    const handleDelete = (mrfId) => {
        const confirmDelete = toast.custom((t) => (
            <div className={`bg-white p-4 rounded shadow-lg ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
                <p className="text-lg">Are you sure you want to delete this MRF?</p>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            deleteMRF(mrfId)
                                .then(() => {
                                    setMrfs((prev) => prev.filter(mrf => mrf.requirement?.requirementId !== mrfId));
                                    setFilteredMrfs((prev) => prev.filter(mrf => mrf.requirement?.requirementId !== mrfId));
                                    toast.success('MRF deleted successfully.');
                                })
                                .catch((error) => {
                                    console.error('Error deleting MRF:', error);
                                    toast.error('Failed to delete MRF.');
                                });
                                window.location.reload();
                        }}
                        className="text-red-500 hover:text-red-700 mr-2"
                    >
                        OK
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };
 
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
 
    if (error) {
        return <div className="text-center mt-10">{error}</div>;
    }
 
    return (
        <>
            <ClientNavbar />
 
            <div className="flex flex-grow p-4 mt-18">
                <div className="w-full max-w-screen-lg mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800">MRF Summary</h1>
                    <br />
 
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-2 md:mb-0">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border rounded p-2 text-gray-500">
                                <option value="">Filter by Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Declined">Declined</option>
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by designation, department, or skills"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border rounded p-2 pl-10 w-full md:w-3/4 lg:w-2/3 xl:w-2/5"
                                style={{ minWidth: '400px' }}
                            />
                            <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-500" />
                        </div>
                    </div>
 
                    {filteredMrfs.length === 0 ? (
                        <div className="text-center text-red-500 mt-4">
                            No data found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredMrfs.map((mrf) => (
                                <div key={mrf.requirement?.requirementId} className="relative border rounded-lg shadow-lg p-6 bg-white transition-transform transform hover:scale-105 flex flex-col justify-between">
 
                                    {/* Info Icon Button */}
                                    <button
                                        onClick={() => handleOpenModal(mrf)}
                                        className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 transition duration-200 flex items-center"
                                    >
                                        {/* Info icon */}
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.478 22 2 17.522 2 12S6.478 2 12 2s10 4.478 10 10-4.478 10-10 10zm-1-15h2v2h-2zm0 4h2v8h-2z" />
                                        </svg>
                                    </button>
 
                                    <div>
                                        <h3 className="font-bold text-xl">Department: {mrf.mrfDepartmentName}</h3>
                                        <br />
                                        <p><strong>Required Technology:</strong> {mrf.mrfRequiredTechnology}</p>
                                        <p><strong>Probable Designation:</strong> {mrf.probableDesignation}</p>
                                        <p><strong>Required Resource Count:</strong> {mrf.requiredResourceCount}</p>
                                        <p><strong>Required Skills:</strong> {mrf.requiredSkills}</p>
                                        <br />
                                    </div>
 
                                    <hr className="my-4 border-gray-300" /> {/* Horizontal line above buttons */}
 
                                    {/* Action Buttons - Positioned at the bottom right */}
                                    <div className="flex justify-end space-x-4">
                                        <button onClick={() => handleEdit(mrf)} className="text-green-600 hover:text-green-700 transition duration-200 flex items-center">
                                            {/* Edit icon */}
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 17.25V21h3.75l12.75-12.75-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.42l-3.29-3.29a1 1 0 00-1.42 0l-1.41 1.41 4.7 4.7 1.42-1.42z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(mrf.mrfId)} className="text-red-600 hover:text-red-800 transition duration-200 flex items-center">
                                            {/* Delete icon */}
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 6h18l-1.5 12H4.5L3 6zm2-4h12a1 1 0 011 1v1H4V3a1 1 0 011-1z" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
 
            {modalOpen && selectedMrf && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-lg transition-all transform hover:scale-105">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            <FaTimes size={20} />
                        </button>
 
                        <h2 className="font-bold text-xl text-center mb-2">Department : {selectedMrf.mrfDepartmentName}</h2>
 
                        {/* Accordion for MRF Details */}
                        <div className="mt-4">
                            {/* MRF Criteria Accordion */}
                            <div className="border-b">
                                <button
                                    className="w-full text-left p-3 flex items-center justify-between rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                    onClick={() => handleAccordionToggle(0)}
                                >
                                    <h3 className="font-bold">MRF Criteria</h3>
                                    {activeAccordionIndex === 0 ? (
                                        <IoIosArrowUp className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-600" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeAccordionIndex === 0 ? 'max-h-screen' : 'max-h-0'}`}>
                                    <div className="p-3">
                                        <p><strong>Employment Mode:</strong> {selectedMrf.mrfCriteria?.employmentMode ?? 'N/A'}</p>
                                        <p><strong>Educational Qualification:</strong> {selectedMrf.mrfCriteria?.educationalQualification ?? 'N/A'}</p>
                                        <p><strong>Years of Experience:</strong> {selectedMrf.mrfCriteria?.yearsOfExperience ?? 'N/A'}</p>
                                        <p><strong>Minimum CTC:</strong> {selectedMrf.mrfCriteria?.minimumCTC ?? 'N/A'}</p>
                                        <p><strong>Maximum CTC:</strong> {selectedMrf.mrfCriteria?.maximumCTC ?? 'N/A'}</p>
                                        <p><strong>Contract Start Date:</strong> {selectedMrf.mrfCriteria?.contractStartDate ?? 'N/A'}</p>
                                        <p><strong>Closure Date:</strong> {selectedMrf.mrfCriteria?.closureDate ?? 'N/A'}</p>
                                        <p><strong>Job Location:</strong> {selectedMrf.mrfCriteria?.jobLocation ?? 'N/A'}</p>                                    
                                    </div>
                                </div>
                            </div>
 
                            {/* MRF Agreement Accordion */}
                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left p-3 flex items-center justify-between rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                    onClick={() => handleAccordionToggle(1)}
                                >
                                    <h3 className="font-bold">MRF Agreement</h3>
                                    {activeAccordionIndex === 1 ? (
                                        <IoIosArrowUp className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-600" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeAccordionIndex === 1 ? 'max-h-screen' : 'max-h-0'}`}>
                                    <div className="p-3">
                                        <p><strong>Billing Cycle:</strong> {selectedMrf.mrfAgreement?.billingCycle ?? 'N/A'}</p>
                                        <p><strong>Proposed Budget:</strong> {selectedMrf.mrfAgreement?.proposedBudget ?? 'N/A'}</p>
                                        <p><strong>Negotiated Price Point:</strong> {selectedMrf.mrfAgreement?.negotiatedPricePoint ?? 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
 
                            {/* MRF Status Accordion */}
                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left p-3 flex items-center justify-between rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                    onClick={() => handleAccordionToggle(2)}
                                >
                                    <h3 className="font-bold">MRF Status</h3>
                                    {activeAccordionIndex === 2 ? (
                                        <IoIosArrowUp className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-600" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeAccordionIndex === 2 ? 'max-h-screen' : 'max-h-0'}`}>
                                    <div className="p-3">
                                        <p><strong>Approval Status:</strong> {selectedMrf.mrfStatus?.mrfApprovalStatus ?? 'N/A'}</p>
                                        <p><strong>Description for Changes:</strong> {selectedMrf.mrfStatus?.descriptionForChanges ?? 'N/A'}</p>
                                        <p><strong>Requirements Filled:</strong> {selectedMrf.mrfStatus?.requirementFilled ?? 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
 
                            {/* Organization Details Accordion */}
                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left p-3 flex items-center justify-between rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                    onClick={() => handleAccordionToggle(3)}
                                >
                                    <h3 className="font-bold">Organization Details</h3>
                                    {activeAccordionIndex === 3 ? (
                                        <IoIosArrowUp className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-600" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeAccordionIndex === 3 ? 'max-h-screen' : 'max-h-0'}`}>
                                    <div className="p-3">
                                        <p><strong>Organization Name:</strong> {selectedMrf.requirement?.client.clientOrganization.organizationName ?? 'N/A'}</p>
                                        <p><strong>Organization Industry:</strong> {selectedMrf.requirement?.client.clientOrganization.organizationIndustry ?? 'N/A'}</p>
                                        <p><strong>Organization Email:</strong> {selectedMrf.requirement?.client.clientOrganization.organizationEmail ?? 'N/A'}</p>
                                        <p><strong>Organization ContactNumber:</strong> {selectedMrf.requirement?.client.clientOrganization.organizationContactNumber ?? 'N/A'}</p>
                                        <p><strong>Organization Address:</strong> {selectedMrf.requirement?.client.clientOrganization.organizationAddress ?? 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
 
                            {/* Client Details Accordion */}
                            <div className="border-b mt-2">
                                <button
                                    className="w-full text-left p-3 flex items-center justify-between rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                    onClick={() => handleAccordionToggle(4)}
                                >
                                    <h3 className="font-bold">Client Details</h3>
                                    {activeAccordionIndex === 4 ? (
                                        <IoIosArrowUp className="text-gray-600" />
                                    ) : (
                                        <IoIosArrowDown className="text-gray-600" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeAccordionIndex === 4 ? 'max-h-screen' : 'max-h-0'}`}>
                                    <div className="p-3">
                                        <p><strong>Client Name:</strong> {selectedMrf.requirement?.client?.clientName ?? 'N/A'}</p>
                                        <p><strong>Client Position:</strong> {selectedMrf.requirement?.client?.clientPosition ?? 'N/A'}</p>
                                        <p><strong>Client Mobile:</strong> {selectedMrf.requirement?.client?.clientMobile ?? 'N/A'}</p>
                                        <p><strong>Client Email:</strong> {selectedMrf.requirement?.client?.clientEmail ?? 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        {selectedMrf.mrfAgreement?.serviceLevelAgreement && (
                            <button
                                onClick={handleViewBlobDocument}
                                className="mt-4 bg-[#27235c] text-white rounded px-4 py-2 hover:bg-[#1E1A4D]"
                            >
                                View SOW Document
                            </button>
                        )}
                    </div>
                </div>
            )}
 
            {slaModalOpen && slaDocumentUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg max-w-4xl w-full mt-10 p-6 relative shadow-lg">
                        <button
                            onClick={handleCloseSlaModal}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            <FaTimes size={20} />
                        </button>
 
                        <h2 className="font-bold text-xl mb-4 text-center">SOW Document</h2>
                        <iframe
                            title={`SLA Document for ${selectedMrf.mrfDepartmentName}`}
                            src={slaDocumentUrl}
                            className="w-full h-[450px] border-0 shadow-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
 
export default ViewMrf;