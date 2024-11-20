import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateAdminLocation } from '../../../redux/actions/Admin/Location/AdminLocationActions'; // Action to update location
import { useNavigate } from 'react-router-dom';
 
const AdminEditLocation = ({ isOpen, onClose, location, onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Local state for the location fields
  const [organizationName, setOrganizationName] = useState('Relevantz Technology');
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
 
  // Error state for field validation
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  // Load the existing location data into the form when the modal opens
  useEffect(() => {
    if (location) {
      setLocationName(location.locationName);
      setLocationAddress(location.locationAddress);
    }
  }, [location]);
 
  // Validate fields before submission
  const validateFields = () => {
    const newErrors = {};
 
    if (!locationName) newErrors.locationName = 'Location Name is required';
    if (!locationAddress) newErrors.locationAddress = 'Location Address is required';
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
 
    // Validate fields before submission
    if (!validateFields()) return;
 
    const updatedLocation = {
      locationId: location.locationId,  // Ensure we send the location ID to update the right location
      organizationName,  // Still send the organization name even though it may not change
      locationName,
      locationAddress
    };
 
    // Dispatch action to update the location
    dispatch(updateAdminLocation(updatedLocation.locationId, updatedLocation));
   
    // Close the modal and reload the locations (or navigate to the location view page)
    onSave(updatedLocation);
    onClose();
    navigate("/admindash");
  };
 
  // Function to restrict input to only alphabets and spaces
  const handleTextInput = (e, setter) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;  // Only letters and spaces
    if (regex.test(value) || value === '') {
      setter(value);
    }
  };
 
  // Handle focus event to remove the error when focusing on the field
  const handleFocus = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldName]; // Remove the error for the field
        return newErrors;
      });
    }
  };
 
  // Only render the modal if isOpen is true
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative transform transition-all duration-500"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.8)', // Minimized to full size on open
          opacity: isOpen ? 1 : 0, // Fade in/out effect
        }}
      >
        <h2 className="text-2xl font-semibold text-[#27235C] text-center mb-4">Edit Location</h2>
 
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl font-bold text-red-600 hover:text-red-800 transition-all"
        >
          &times;
        </button>
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organization Name Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#27235E]">Organization Name</label>
            <input
              type="text"
              value={organizationName} readOnly
              placeholder="Enter organization name"
              className={`border p-2 rounded-lg focus:outline-none h-10 mt-1 text-sm transition-colors duration-300`}
            />
          </div>
 
          {/* Location Name Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#27235E]">Location Name</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => handleTextInput(e, setLocationName)}
              onFocus={() => handleFocus('locationName')}
              placeholder="Enter location name"
              className={`border p-2 rounded-lg focus:outline-none h-10 mt-1 text-sm transition-colors duration-300 ${errors.locationName && isSubmitted ? 'border-red-600' : 'border-[#ddd]'} focus:ring-2 focus:ring-[#27235E]`}
            />
            {errors.locationName && isSubmitted && <span className="text-red-600 text-xs mt-1">{errors.locationName}</span>}
          </div>
 
          {/* Location Address Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#27235E]">Location Address</label>
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              onFocus={() => handleFocus('locationAddress')}
              placeholder="Enter location address"
              className={`border p-2 rounded-lg focus:outline-none h-10 mt-1 text-sm transition-colors duration-300 ${errors.locationAddress && isSubmitted ? 'border-red-600' : 'border-[#ddd]'} focus:ring-2 focus:ring-[#27235E]`}
            />
            {errors.locationAddress && isSubmitted && <span className="text-red-600 text-xs mt-1">{errors.locationAddress}</span>}
          </div>
 
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full p-2 text-white rounded-lg text-sm transition duration-200"
              style={{
                background: "linear-gradient(to right, rgb(151, 36, 126), rgb(224, 25, 80))",
              }} >
              Update Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AdminEditLocation;
 
