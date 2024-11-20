import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getShortListedCandidatesData } from '../../../services/Client/ShortlistedCandidateService';
import ClientNavbar from '../Dashboard/ClientNavbar';

const ShortCandidate = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { requirementId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getShortListedCandidatesData(requirementId)
        setCandidatesData(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching the candidates data:', error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    { headerName: 'Name', field: 'firstName', filter: true, flex: 1, minWidth: 200 },
    { headerName: 'Location', field: 'location', filter: true, flex: 1, minWidth: 250 },
    { headerName: 'Skills', field: 'skill', filter: true, flex: 1, minWidth: 200 },
   
  ];

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4 mt-20">
      <ClientNavbar />
      {/* Search Bar */}
      <b><h1>Shortlisted candidate</h1></b>
      <div className="flex items-center mb-6 w-full max-w-4xl">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full pl-10 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Ag-Grid Table */}
      <div className="ag-theme-alpine w-full max-w-4xl h-96">
        <AgGridReact
          rowData={candidatesData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          enableSorting={true}
          domLayout='autoHeight'
          suppressRowHoverHighlight={true}
        />
      </div>
    </div>
  );
};

export default ShortCandidate;
