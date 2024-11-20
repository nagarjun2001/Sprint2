import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import ClientNavbar from '../Dashboard/ClientNavbar';
import * as JobRequirementsService from '../../../services/Client/JobRequirementsService';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const JobRequirementsTable = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRequirement, setCurrentRequirement] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const navigate = useNavigate();
  const clientId = sessionStorage.getItem("clientId");

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const data = await JobRequirementsService.fetchRequirements(clientId);
        const formattedData = data.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt).toLocaleDateString('en-GB')
        }));
        setRequirements(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, []);

  const handleViewMore = (requirement) => {
    setCurrentRequirement(requirement);
    setIsViewModalOpen(true);
  };

  const toggleSubRequirements = () => {
    setCurrentRequirement(prev => ({
      ...prev,
      showSubRequirements: !prev.showSubRequirements
    }));
  };

  const columns = [
    { headerName: 'Requirement Id', field: 'requirementId', filter: true },
    { headerName: 'Total Required Resources', field: 'totalRequiredResourceCount', sortable: true },
    { headerName: 'Timeline', field: 'timeline' },
    { headerName: 'Budget', field: 'budget' },
    { headerName: 'Created At', field: 'createdAt' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => handleViewMore(params.data)} className="text-[#27235C]">
            <FontAwesomeIcon icon={faEye} size="sm" />
          </button>
          <button 
            onClick={() => navigate(`/shortlistedcandidatetable/${params.data.requirementId}`)} 
            className="bg-[#27235C] text-white py-1 px-3 text-xs rounded-lg transition duration-200 hover:bg-[#524F7D]"
          >
            Shortlist
          </button>
          <button 
            onClick={() => navigate(`/CandidateTable/${params.data.requirementId}`)} 
            className="bg-[#27235C] text-white px-2 text-xs rounded-lg transition duration-200 hover:bg-[#524F7D]"
          >
            Hired
          </button>
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <ClientNavbar />
      <h1 className="text-2xl font-bold text-center text-[#27235C] mb-6">Job Requirements</h1>
      <div className="ag-theme-alpine w-full max-w-7xl">
        <AgGridReact
          columnDefs={columns}
          rowData={requirements}
          pagination={true}
          paginationPageSize={5}
          domLayout="autoHeight"
        />
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentRequirement && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl relative mt-10">
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="absolute top-3 right-3 text-[#27235C] hover:text-[#27235C] cursor-pointer transition duration-200"
              onClick={() => setIsViewModalOpen(false)}
            />
            <h2 className="text-lg font-semibold mb-4 text-center text-[#27235E]">Job Requirement Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-300 pb-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#27235E]">Requirement Id</label>
                <p className="text-lg font-bold text-gray-800">{currentRequirement.requirementId}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#27235E]">Total Required Resources</label>
                <p className="text-lg font-bold text-gray-800">{currentRequirement.totalRequiredResourceCount}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#27235E]">Timeline</label>
                <p className="text-lg font-bold text-gray-800">{currentRequirement.timeline}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#27235E]">Budget</label>
                <p className="text-lg font-bold text-gray-800">{currentRequirement.budget}</p>
              </div>
            </div>

            {/* Display SubRequirements */}
            <button 
              onClick={toggleSubRequirements} 
              className="mt-4 bg-[#27235C] text-white rounded-lg px-4 py-1"
            >
              {currentRequirement.showSubRequirements ? 'Hide Subrequirements' : 'View Subrequirements'}
            </button>

            {currentRequirement.showSubRequirements && (
              <div className="mt-4">
                <h3 className="font-semibold">Subrequirements:</h3>
                <div className="bg-gray-100 p-2 rounded-lg">
                  {currentRequirement.subrequirement && currentRequirement.subrequirement.length > 0 ? (
                    currentRequirement.subrequirement.map((subReq, index) => (
                      <div key={index} className="flex justify-between py-1">
                        <strong className="text-gray-800">{subReq.role}</strong>
                        <span className="text-gray-600">Resource Count: {subReq.resourceCount}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No subrequirements available.</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRequirementsTable;