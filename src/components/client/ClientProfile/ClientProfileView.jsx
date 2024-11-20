import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClientNavbar from '../Dashboard/ClientNavbar';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the arrow icon
import avatar from "../../../assets/forum.png";

const ClientProfileView = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [organizationLogoURL, setOrganizationLogoURL] = useState('');
  const navigate = useNavigate();
  const clientId = sessionStorage.getItem("clientId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/client/client-profile-by-id/${clientId}`);
        setProfileData(response.data);
        
        // Handle Blob to URL for organization logo if it's present
        const organizationLogo = response.data.clientOrganization?.organizationLogo;
        if (organizationLogo instanceof Blob) {
          const url = URL.createObjectURL(organizationLogo);
          setOrganizationLogoURL(url);
        }
      } catch (error) {
        setError('Error fetching data, please try again.');
        toast.error(error.response?.data?.message || 'Error fetching data');
      }
    };

    fetchData();

    // Cleanup function to revoke the object URL when the component unmounts
    return () => {
      if (organizationLogoURL) {
        URL.revokeObjectURL(organizationLogoURL);
      }
    };
  }, [clientId, organizationLogoURL]);

  const handleEditProfile = () => {
    navigate('/clientProfileUpdate');
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  if (!profileData) return <div>Loading...</div>;

  // Safely accessing the organization data
  const clientOrganization = profileData.clientOrganization || {}; // Default to an empty object if null
  const organizationLogoBase64 = clientOrganization.organizationLogo
                                    ? `data:image/jpeg;base64,${clientOrganization.organizationLogo}`
                                    : avatar;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <ClientNavbar />
      <Toaster />

      <div className="max-w-5xl w-full p-6 bg-white rounded-lg shadow-lg mt-16 mb-5">
        {/* Header with Go Back Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleGoBack}
            className="text-[#27235C] hover:text-[#1C1A4E] transition duration-200"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-[#27235C] text-center flex-grow">Client Profile</h1>
        </div>

        {/* User Icon (Logo) */}
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-[#27235C] flex justify-center items-center overflow-hidden">
              <img
                src={organizationLogoBase64} // Use the Blob URL or fallback to avatar
                alt="Organization Logo"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          {/* Organization Name and Client Name */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-[#27235C]">
              {clientOrganization.organizationName || "Organization Name Not Available"}
            </h2>
            <h3 className="text-xl text-gray-400">{profileData.clientName || "Client Name Not Available"}</h3>
          </div>
        </div>

        {/* Display Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileField label="Organization Industry" value={clientOrganization.organizationIndustry || "N/A"} />
          <ProfileField label="Client Position" value={profileData.clientPosition || "N/A"} />
          <ProfileField label="Organization Address" value={clientOrganization.organizationAddress || "N/A"} />
          <ProfileField label="Organization Contact Number" value={clientOrganization.organizationContactNumber || "N/A"} />
          <ProfileField label="Client Mobile" value={profileData.clientMobile || "N/A"} />
          <ProfileField label="Client Email" value={profileData.clientEmail || "N/A"} />
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-[#27235C] text-white rounded-lg px-4 py-2 hover:bg-[#1C1A4E] transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="block font-semibold text-[#27235C]">{label}:</span>
    <span className="block text-[#27235C]">{value}</span>
  </div>
);

export default ClientProfileView;