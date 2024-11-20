// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setMRFData } from '../../../redux/actions/ClientPartner/mrf/mrfActions';
// import { submitMRFForm } from '../../../services/ClientPartner/requirementService';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ClientNavbar from '../../NavbarComponent/ClientPartnerNavbar';
// import Select from 'react-select';
// import { Toaster, toast } from 'react-hot-toast';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
 
// const steps = [
//   'Basic Information',
//   'Job Details',
//   'Financials',
//   'Preview & Submit',
// ];
 
// const MRFformCreation = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
 
//   const { state } = location;
//   const { clientName = '', orgName = '', requirementDetails = {}, subRequirementDetails = {} } = state || {};
 
//   const [modalOpen, setModalOpen] = useState(false);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     mrfDepartmentName: '',
//     requiredTechnology: '',
//     probableDesignation: subRequirementDetails.role || '',
//     requiredResourceCount: subRequirementDetails.resourceCount || '',
//     requiredSkills: '',
//     employmentMode: '',
//     educationalQualification: '',
//     yearsOfExperience: '',
//     minCTC: '',
//     maxCTC: '',
//     jobLocation: '',
//     contractStartDate: '',
//     closureDate: '',
//     sla: null,
//     billingCycle: '',
//     proposedBudget: '',
//     negotiatedPricePoint: '',
//     approvalStatus: 'Pending',
//     mrfStage: 'Not Assigned',
//     mrfType: '',
//   });
 
//   const employee = sessionStorage.getItem('employeeId');
 
//   const skillOptions = [
//     { value: 'JavaScript', label: 'JavaScript' },
//     { value: 'Python', label: 'Python' },
//     { value: 'Java', label: 'Java' },
//     { value: 'C#', label: 'C#' },
//     { value: 'React', label: 'React' },
//     { value: 'Node.js', label: 'Node.js' },
//     { value: 'Django', label: 'Django' },
//   ];
 
//   const handleSkillChange = (selectedOptions) => {
//     const values = selectedOptions ? selectedOptions.map(option => option.value).join(', ') : '';
//     handleChange("requiredSkills", values);
//   };
 
//   const [activeStep, setActiveStep] = useState(0);
//   const totalSteps = steps.length;
//   const [errors, setErrors] = useState({});
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestedTechnologies, setSuggestedTechnologies] = useState([]);
 
//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };
 
//   const handleTechnologyInputChange = (value) => {
//     setFormData((prev) => ({ ...prev, requiredTechnology: value }));
 
//     if (value) {
//       const filtered = skillOptions.filter(tech =>
//         tech.label.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestedTechnologies(filtered);
//       setShowSuggestions(true);
//     } else {
//       setSuggestedTechnologies([]);
//       setShowSuggestions(false);
//     }
//   };
 
//   const handleTechnologySelect = (technology) => {
//     handleChange("requiredTechnology", technology);
//     setShowSuggestions(false);
//   };
 
//   const handleNext = () => {
//     const newErrors = validateStep(activeStep);
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//     } else {
//       setErrors({});
//       setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
//     }
//   };
 
//   const validateStep = (step) => {
//     const newErrors = {};
//     switch (step) {
//       case 0:
//         if (!formData.mrfDepartmentName) newErrors.mrfDepartmentName = "Department is required.";
//         if (!formData.probableDesignation) newErrors.probableDesignation = "Designation is required.";
//         if (!formData.requiredResourceCount) newErrors.requiredResourceCount = "Resource Count is required.";
//         if (!formData.requiredTechnology) newErrors.requiredTechnology = "Required Technology is required.";
//         break;
//       case 1:
//         if (!formData.educationalQualification) newErrors.educationalQualification = "Educational Qualification is required.";
//         if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Years of Experience is required.";
//         if (!formData.employmentMode) newErrors.employmentMode = "Employment Mode is required.";
//         if (!formData.jobLocation) newErrors.jobLocation = "Job Location is required.";
//         break;
//       case 2:
//         if (!formData.minCTC || isNaN(formData.minCTC) || Number(formData.minCTC) <= 0) {
//           newErrors.minCTC = "Minimum CTC is required and must be a number greater than 0.";
//         }
//         if (!formData.maxCTC || isNaN(formData.maxCTC) || Number(formData.maxCTC) <= 0) {
//           newErrors.maxCTC = "Maximum CTC is required and must be a number greater than 0.";
//         } else if (Number(formData.maxCTC) <= Number(formData.minCTC)) {
//           newErrors.maxCTC = "Maximum CTC must be greater than Minimum CTC.";
//         }
//         if (!formData.proposedBudget || isNaN(formData.proposedBudget) || Number(formData.proposedBudget) <= 0) {
//           newErrors.proposedBudget = "Proposed Budget is required and must be a number greater than 0.";
//         }
//         if (!formData.negotiatedPricePoint || isNaN(formData.negotiatedPricePoint) || Number(formData.negotiatedPricePoint) <= 0) {
//           newErrors.negotiatedPricePoint = "Negotiated Price Point is required and must be a number greater than 0.";
//         }
//         if (!formData.mrfType) newErrors.mrfType = "MRF Type is required.";
//         break;
//       default:
//         break;
//     }
//     return newErrors;
//   };
 
//   const handleSubmit = async () => {
//     const finalErrors = validateStep(activeStep);
//     if (Object.keys(finalErrors).length > 0) {
//       toast.error("Please resolve the errors before submission.");
//       return;
//     }
 
//     const newMRF = {
//       mrfDepartmentName: formData.mrfDepartmentName || null,
//       mrfRequiredTechnology: formData.requiredTechnology || null,
//       probableDesignation: formData.probableDesignation || null,
//       requiredResourceCount: parseInt(formData.requiredResourceCount, 10) || 0,
//       requiredSkills: formData.requiredSkills || null,
//       mrfCriteria: {
//         employmentMode: formData.employmentMode || null,
//         educationalQualification: formData.educationalQualification || null,
//         yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || null,
//         minimumCTC: parseFloat(formData.minCTC) || 0.0,
//         maximumCTC: parseFloat(formData.maxCTC) || 0.0,
//         contractStartDate: formData.contractStartDate || null,
//         closureDate: formData.closureDate || null,
//         jobLocation: formData.jobLocation || null,
//       },
//       mrfStatus: {
//         mrfApprovalStatus: formData.approvalStatus || null,
//         mrfStage: formData.mrfStage || null,
//         mrfType: formData.mrfType || null,
//       },
//       mrfAgreement: {
//         billingCycle: formData.billingCycle || null,
//         proposedBudget: formData.proposedBudget || null,
//         negotiatedPricePoint: formData.negotiatedPricePoint || null,
//       },
//       requirement: {
//         requirementId: requirementDetails.requirementId,
//       },
//       jobDescriptionId: 1,
//       businessUnitHead: {
//         employeeId: 4,
//       },
//       clientPartner: {
//         employeeId: 4,
//       },
//       subRequirements: {
//         subRequirementId: subRequirementDetails.subRequirementId || ''
//       }
//     };

    
 
//     const requestData = new FormData();
//     requestData.append('mrf', JSON.stringify(newMRF));
//     if (formData.sla) {
//       requestData.append('sla', formData.sla);
//     }
 
//     try {
//       const response = await submitMRFForm(requestData);
//       toast.success("MRF submitted successfully!", {
//         icon: <FaCheckCircle className="text-green-500" />
//       });
//       navigate('/viewMrf'); // Moved navigation here
//       dispatch(setMRFData(newMRF));
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting MRF:', error.response?.data || error);
//       toast.error(`Error: ${error.response ? error.response.data.message : error.message}`, {
//         icon: <FaTimesCircle className="text-red-500" />
//       });
//     }
//   };
 
//   const resetForm = () => {
//     setFormData({
//       mrfDepartmentName: '',
//       requiredTechnology: '',
//       probableDesignation: '',
//       requiredResourceCount: '',
//       requiredSkills: '',
//       employmentMode: '',
//       educationalQualification: '',
//       yearsOfExperience: '',
//       minCTC: '',
//       maxCTC: '',
//       jobLocation: '',
//       contractStartDate: '',
//       closureDate: '',
//       sla: null,
//       billingCycle: '',
//       proposedBudget: '',
//       negotiatedPricePoint: '',
//       approvalStatus: 'Pending',
//       mrfStage: 'Not Assigned',
//       mrfType: '',
//     });
//     setActiveStep(0);
//     setShowSuggestions(false);
//     setSuggestedTechnologies([]);
//   };
 
//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <label className="block text-lg font-medium text-gray-700 mb-1">Department</label>
//             <select
//               value={formData.mrfDepartmentName}
//               onChange={(e) => handleChange("mrfDepartmentName", e.target.value)}
//               className={`block p-3 text-lg border rounded-md w-full ${errors.mrfDepartmentName ? 'border-red-500' : 'border-gray-300'}`}
//             >
//               <option value="">Select Department</option>
//               <option value="IT">IT</option>
//               <option value="HR">HR</option>
//               <option value="Finance">Finance</option>
//             </select>
           
//             <div className="mt-4">
//               <label className="block text-lg font-medium text-gray-700 mb-1">Role</label>
//               <div className="block p-3 text-lg border rounded-md w-full border-gray-300 bg-gray-100">
//                 {formData.probableDesignation || 'No Designation Selected'}
//               </div>
//             </div>
//             <div className="mt-4 relative">
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Technology</label>
//               <input
//                 type="text"
//                 value={formData.requiredTechnology}
//                 onChange={(e) => handleTechnologyInputChange(e.target.value)}
//                 placeholder="Type or select technology"
//                 className={`block w-full p-3 text-lg border rounded-md ${errors.requiredTechnology ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {showSuggestions && suggestedTechnologies.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md w-full z-10 max-h-40 overflow-auto">
//                   {suggestedTechnologies.map((technology) => (
//                     <li
//                       key={technology.label}
//                       onClick={() => handleTechnologySelect(technology.label)}
//                       className="p-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {technology.label}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Resource</label>
//               <input
//                 type="number"
//                 value={formData.requiredResourceCount}
//                 onChange={(e) => handleChange("requiredResourceCount", e.target.value)}
//                 placeholder="Required Resource Count"
//                 className={`block p-3 text-lg border rounded-md w-full ${errors.requiredResourceCount ? 'border-red-500' : 'border-gray-300'}`}
//                 disabled
//               />
//             </div>
//           </div>
//         );
 
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Educational Qualification</label>
//               <input
//                 type="text"
//                 value={formData.educationalQualification}
//                 onChange={(e) => handleChange("educationalQualification", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.educationalQualification ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.educationalQualification && <p className="text-red-500 text-sm">{errors.educationalQualification}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Years of Experience</label>
//               <input
//                 type="text"
//                 value={formData.yearsOfExperience}
//                 onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Job Location</label>
//               <input
//                 type="text"
//                 value={formData.jobLocation}
//                 onChange={(e) => handleChange("jobLocation", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.jobLocation ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.jobLocation && <p className="text-red-500 text-sm">{errors.jobLocation}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Employment Mode</label>
//               <select
//                 value={formData.employmentMode}
//                 onChange={(e) => handleChange("employmentMode", e.target.value)}
//                 className={`block p-3 text-lg border rounded-md w-full ${errors.employmentMode ? 'border-red-500' : 'border-gray-300'}`}
//               >
//                 <option value="">Select Employment Mode</option>
//                 <option value="Full Time">Full Time</option>
//                 <option value="Part Time">Part Time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Temporary">Temporary</option>
//               </select>
//               {errors.employmentMode && <p className="text-red-500 text-sm">{errors.employmentMode}</p>}
//             </div>
//           </div>
//         );
 
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Minimum CTC</label>
//               <input
//                 type="text"
//                 value={formData.minCTC}
//                 onChange={(e) => handleChange("minCTC", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.minCTC ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.minCTC && <p className="text-red-500 text-sm">{errors.minCTC}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Maximum CTC</label>
//               <input
//                 type="text"
//                 value={formData.maxCTC}
//                 onChange={(e) => handleChange("maxCTC", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.maxCTC ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.maxCTC && <p className="text-red-500 text-sm">{errors.maxCTC}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Proposed Budget</label>
//               <input
//                 type="text"
//                 value={formData.proposedBudget}
//                 onChange={(e) => handleChange("proposedBudget", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.proposedBudget ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.proposedBudget && <p className="text-red-500 text-sm">{errors.proposedBudget}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Negotiated Price Point</label>
//               <input
//                 type="text"
//                 value={formData.negotiatedPricePoint}
//                 onChange={(e) => handleChange("negotiatedPricePoint", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.negotiatedPricePoint ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.negotiatedPricePoint && <p className="text-red-500 text-sm">{errors.negotiatedPricePoint}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Billing Cycle</label>
//               <select
//                 value={formData.billingCycle}
//                 onChange={(e) => handleChange("billingCycle", e.target.value)}
//                 className={`block w-full p-3 border rounded-md ${errors.billingCycle ? "border-red-500" : "border-gray-300"}`}
//               >
//                 <option value="">Select Billing Cycle</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Quarterly">Quarterly</option>
//               </select>
//               {errors.billingCycle && <p className="text-red-500 text-sm">{errors.billingCycle}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">MRF Type</label>
//               <select
//                 value={formData.mrfType}
//                 onChange={(e) => handleChange("mrfType", e.target.value)}
//                 className={`block w-full p-3 border rounded-md ${errors.mrfType ? "border-red-500" : "border-gray-300"}`}
//               >
//                 <option value="">Select MRF Type</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Exclusive</option>
//               </select>
//               {errors.mrfType && <p className="text-red-500 text-sm">{errors.mrfType}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Skills</label>
//               <Select
//                 isMulti
//                 options={skillOptions}
//                 value={skillOptions.filter(option => formData.requiredSkills.split(', ').includes(option.value))}
//                 onChange={handleSkillChange}
//                 className={`basic-multi-select ${errors.requiredSkills ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Upload SOW Document</label>
//               <input
//                 type="file"
//                 accept=".pdf, .docx"
//                 onChange={(e) => handleChange("sla", e.target.files[0])}
//                 className={`block w-full p-3 text-lg border rounded-md ${errors.sla ? "border-red-500" : "border-gray-300"}`}
//               />
//               {errors.sla && <p className="text-red-500 text-sm">{errors.sla}</p>}
//             </div>
//           </div>
//         );
 
//       case 3:
//         return (
//           <div className="grid grid-cols-2 gap-4">
//             {Object.entries(formData).map(([key, value]) => (
//               <div key={key} className="flex justify-between my-2">
//                 <span className="font-medium">{key.replace(/([A-Z])/g, " $1")}: </span>
//                 <span className="text-right">{key === "sla" && value ? value.name : value || "N/A"}</span>
//               </div>
//             ))}
//           </div>
//         );
 
//       default:
//         return null;
//     }
//   };
 
//   return (
//     <div className="flex min-h-screen bg-[#eeeeee] items-center justify-center">
//         <h3 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800 z-20">
//             Man Power Requirement Form
//         </h3>
       
//         <ClientNavbar />
//         <Toaster position="top-center" reverseOrder={false} />
       
//         {/* Card for Organization and Client Details */}
//         <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md mt-20 ml-20 z-10">
//             <h2 className="text-lg font-semibold">Organization: {orgName || 'N/A'}</h2>
//             <p className="text-sm font-semibold">Client Representative:  {clientName || 'N/A'}</p>
//             <button
//                 onClick={() => setDetailModalOpen(true)}
//                 className="mt-2 text-blue-600 hover:underline"
//             >
//                 View More
//             </button>
//         </div>
 
//         {/* Modal for Detailed Requirement Information */}
//         {detailModalOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 md:w-1/2 lg:w-1/3">
//                     <button
//                         onClick={() => setDetailModalOpen(false)}
//                         className="absolute top-2 right-2 text-lg font-bold text-gray-600 hover:text-red-600"
//                     >
//                         ×
//                     </button>
//                     <h2 className="text-xl font-bold mb-4 text-center">Requirement Details</h2>
//                     <h3 className="mt-2 font-bold">Requirement Details:</h3>
                   
//                     <p><strong>Budget:</strong> ${requirementDetails.budget?.toFixed(2)}</p>
//                     <p><strong>Timeline:</strong> {requirementDetails.timeline}</p>
//                     <h3 className="mt-4 font-bold">Sub-Requirement Details:</h3>
//                     <p><strong>Role:</strong> {subRequirementDetails.role}</p>
//                     <p><strong>Resource Count:</strong> {subRequirementDetails.resourceCount}</p>
//                 </div>
//             </div>
//         )}
 
//         {/* Right Side - Form for MRF Creation */}
//         <div className="flex-grow p-6 pt-20 md:pt-28 ml-40">
//             <div className="w-full max-w-4xl mx-auto mb-6">
//                 <ol className="relative flex items-center justify-between w-full">
//                     {steps.map((label, index) => (
//                         <li key={label} className="flex flex-col items-center w-full">
//                             <div
//                                 className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${activeStep > index ? 'border-[#27235C] bg-[#27235C] text-white' : 'border-gray-300 bg-white text-gray-500'}`}
//                             >
//                                 {activeStep > index ? (
//                                     <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
//                                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
//                                     </svg>
//                                 ) : (
//                                     <span className="text-lg">{index + 1}</span>
//                                 )}
//                             </div>
//                             <span className="mt-2 text-sm text-center">{label}</span>
//                         </li>
//                     ))}
//                 </ol>
//             </div>
 
//             <div className="w-full max-w-4xl p-6 border border-gray-300 rounded-md bg-white shadow-xl mx-auto">
//                 {renderStepContent(activeStep)}
 
//                 <div className="flex justify-between mt-4">
//                     {activeStep > 0 && (
//                         <button
//                             onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
//                             className="px-4 py-2 text-[#27235C] bg-white rounded-md border border-[#27235C] hover:bg-gray-200"
//                         >
//                             Back
//                         </button>
//                     )}
//                     {activeStep < totalSteps - 1 ? (
//                         <button
//                             onClick={handleNext}
//                             className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
//                         >
//                             Next
//                         </button>
//                     ) : (
//                         <button
//                             onClick={handleSubmit}
//                             className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
//                         >
//                             Submit
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// };
 
// export default MRFformCreation;


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setMRFData } from '../../../redux/actions/ClientPartner/mrf/mrfActions';
// import { submitMRFForm } from '../../../services/ClientPartner/requirementService';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ClientNavbar from '../../NavbarComponent/ClientPartnerNavbar';
// import Select from 'react-select';
// import { Toaster, toast } from 'react-hot-toast';
// import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// const steps = [
//   'Basic Information',
//   'Job Details',
//   'Financials',
//   'Preview & Submit',
// ];

// const MRFformCreation = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
  
//   const { state } = location;
//   const { clientName = '', orgName = '', requirementDetails = {}, subRequirementDetails = {} } = state || {};

//   const employee = sessionStorage.getItem('employeeId');
//   const [detailModalOpen, setDetailModalOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     mrfDepartmentName: '',
//     requiredTechnology: '',
//     probableDesignation: subRequirementDetails.role || '',
//     requiredResourceCount: subRequirementDetails.resourceCount || '',
//     requiredSkills: '',
//     employmentMode: '',
//     educationalQualification: '',
//     yearsOfExperience: '',
//     minCTC: '',
//     maxCTC: '',
//     jobLocation: '',
//     contractStartDate: '',
//     closureDate: '',
//     sla: null,
//     billingCycle: '',
//     proposedBudget: '',
//     negotiatedPricePoint: '',
//     approvalStatus: 'Pending',
//     mrfStage: 'Not Assigned',
//     mrfType: '',
//   });

//   const [activeStep, setActiveStep] = useState(0);
//   const totalSteps = steps.length;
//   const [errors, setErrors] = useState({});
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [suggestedTechnologies, setSuggestedTechnologies] = useState([]);

//   const skillOptions = [
//     { value: 'JavaScript', label: 'JavaScript' },
//     { value: 'Python', label: 'Python' },
//     { value: 'Java', label: 'Java' },
//     { value: 'C#', label: 'C#' },
//     { value: 'React', label: 'React' },
//     { value: 'Node.js', label: 'Node.js' },
//     { value: 'Django', label: 'Django' },
//   ];

//   const handleSkillChange = (selectedOptions) => {
//     const values = selectedOptions ? selectedOptions.map(option => option.value).join(', ') : '';
//     setFormData({ ...formData, requiredSkills: values });
//     setErrors((prev) => ({ ...prev, requiredSkills: undefined }));
//   };

//   const handleChange = (name, value) => {
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleTechnologyInputChange = (value) => {
//     setFormData((prev) => ({ ...prev, requiredTechnology: value }));

//     if (value) {
//       const filtered = skillOptions.filter(tech =>
//         tech.label.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestedTechnologies(filtered);
//       setShowSuggestions(true);
//     } else {
//       setSuggestedTechnologies([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleTechnologySelect = (technology) => {
//     handleChange("requiredTechnology", technology);
//     setShowSuggestions(false);
//   };

//   const handleNext = () => {
//     const newErrors = validateStep(activeStep);
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//     } else {
//       setErrors({});
//       setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};
//     switch (step) {
//       case 0:
//         if (!formData.mrfDepartmentName) newErrors.mrfDepartmentName = "Department is required.";
//         if (!formData.probableDesignation) newErrors.probableDesignation = "Designation is required.";
//         if (!formData.requiredResourceCount) newErrors.requiredResourceCount = "Resource Count is required.";
//         if (!formData.requiredTechnology) newErrors.requiredTechnology = "Required Technology is required.";
//         break;
//       case 1:
//         if (!formData.educationalQualification) newErrors.educationalQualification = "Educational Qualification is required.";
//         if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Years of Experience is required.";
//         if (!formData.employmentMode) newErrors.employmentMode = "Employment Mode is required.";
//         if (!formData.jobLocation) newErrors.jobLocation = "Job Location is required.";
//         break;
//       case 2:
//         if (!formData.minCTC || isNaN(formData.minCTC) || Number(formData.minCTC) <= 0) {
//           newErrors.minCTC = "Minimum CTC is required and must be a number greater than 0.";
//         }
//         if (!formData.maxCTC || isNaN(formData.maxCTC) || Number(formData.maxCTC) <= 0) {
//           newErrors.maxCTC = "Maximum CTC is required and must be a number greater than 0.";
//         } else if (Number(formData.maxCTC) <= Number(formData.minCTC)) {
//           newErrors.maxCTC = "Maximum CTC must be greater than Minimum CTC.";
//         }
//         if (!formData.proposedBudget || isNaN(formData.proposedBudget) || Number(formData.proposedBudget) <= 0) {
//           newErrors.proposedBudget = "Proposed Budget is required and must be a number greater than 0.";
//         }
//         if (!formData.negotiatedPricePoint || isNaN(formData.negotiatedPricePoint) || Number(formData.negotiatedPricePoint) <= 0) {
//           newErrors.negotiatedPricePoint = "Negotiated Price Point is required and must be a number greater than 0.";
//         }
//         if (!formData.mrfType) newErrors.mrfType = "MRF Type is required.";
//         break;
//       default:
//         break;
//     }
//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const finalErrors = validateStep(activeStep);
//     if (Object.keys(finalErrors).length > 0) {
//       toast.error("Please resolve the errors before submission.");
//       return;
//     }

//     const newMRF = {
//       mrfDepartmentName: formData.mrfDepartmentName || null,
//       mrfRequiredTechnology: formData.requiredTechnology || null,
//       probableDesignation: formData.probableDesignation || null,
//       requiredResourceCount: parseInt(formData.requiredResourceCount, 10) || 0,
//       requiredSkills: formData.requiredSkills || null,
//       mrfCriteria: {
//         employmentMode: formData.employmentMode || null,
//         educationalQualification: formData.educationalQualification || null,
//         yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || null,
//         minimumCTC: parseFloat(formData.minCTC) || 0.0,
//         maximumCTC: parseFloat(formData.maxCTC) || 0.0,
//         contractStartDate: formData.contractStartDate || null,
//         closureDate: formData.closureDate || null,
//         jobLocation: formData.jobLocation || null,
//       },
//       mrfStatus: {
//         mrfApprovalStatus: formData.approvalStatus || null,
//         mrfStage: formData.mrfStage || null,
//         mrfType: formData.mrfType || null,
//       },
//       mrfAgreement: {
//         billingCycle: formData.billingCycle || null,
//         proposedBudget: formData.proposedBudget || null,
//         negotiatedPricePoint: formData.negotiatedPricePoint || null,
//       },
//       requirement: {
//         requirementId: requirementDetails.requirementId,
//       },
//       jobDescriptionId: 1,
//       businessUnitHead: {
//         employeeId: parseInt(employee, 10), // Ensure correct type
//       // employeeId:employee
//       },
//       clientPartner: {
//         employeeId: parseInt(employee, 10), // Ensure correct type
//        // employeeId:employee
//       },
//       subRequirements: {
//         subRequirementId: subRequirementDetails.subRequirementId || ''
//       }
//     };

//     const requestData = new FormData();
//     requestData.append('mrf', JSON.stringify(newMRF));
//     if (formData.sla) {
//       requestData.append('sla', formData.sla);
//     }
//     console.log(requestData);

//     try {
//       const response = await submitMRFForm(requestData);
//       toast.success("MRF submitted successfully!", {
//         icon: <FaCheckCircle className="text-green-500" />
//       });
//       navigate('/viewMrf'); // Moved navigation here
//       dispatch(setMRFData(newMRF));
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting MRF:', error.response?.data || error);
//       toast.error(`Error: ${error.response ? error.response.data.message : error.message}`, {
//         icon: <FaTimesCircle className="text-red-500" />
//       });
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       mrfDepartmentName: '',
//       requiredTechnology: '',
//       probableDesignation: '',
//       requiredResourceCount: '',
//       requiredSkills: '',
//       employmentMode: '',
//       educationalQualification: '',
//       yearsOfExperience: '',
//       minCTC: '',
//       maxCTC: '',
//       jobLocation: '',
//       contractStartDate: '',
//       closureDate: '',
//       sla: null,
//       billingCycle: '',
//       proposedBudget: '',
//       negotiatedPricePoint: '',
//       approvalStatus: 'Pending',
//       mrfStage: 'Not Assigned',
//       mrfType: '',
//     });
//     setActiveStep(0);
//     setShowSuggestions(false);
//     setSuggestedTechnologies([]);
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <label className="block text-lg font-medium text-gray-700 mb-1">Department</label>
//             <select
//               value={formData.mrfDepartmentName}
//               onChange={(e) => handleChange("mrfDepartmentName", e.target.value)}
//               className={`p-3 text-lg border rounded-md w-full ${errors.mrfDepartmentName ? 'border-red-500' : 'border-gray-300'}`}
//             >
//               <option value="">Select Department</option>
//               <option value="IT">IT</option>
//               <option value="HR">HR</option>
//               <option value="Finance">Finance</option>
//             </select>
//             <div className="mt-4">
//               <label className="block text-lg font-medium text-gray-700 mb-1">Role</label>
//               <div className="block p-3 text-lg border rounded-md w-full border-gray-300 bg-gray-100">
//                 {formData.probableDesignation || 'No Designation Selected'}
//               </div>
//             </div>
//             <div className="mt-4 relative">
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Technology</label>
//               <input
//                 type="text"
//                 value={formData.requiredTechnology}
//                 onChange={(e) => handleTechnologyInputChange(e.target.value)}
//                 placeholder="Type or select technology"
//                 className={`w-full p-3 text-lg border rounded-md ${errors.requiredTechnology ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {showSuggestions && suggestedTechnologies.length > 0 && (
//                 <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md w-full z-10 max-h-40 overflow-auto">
//                   {suggestedTechnologies.map((technology) => (
//                     <li
//                       key={technology.label}
//                       onClick={() => handleTechnologySelect(technology.label)}
//                       className="p-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {technology.label}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Resource</label>
//               <input
//                 type="number"
//                 value={formData.requiredResourceCount}
//                 onChange={(e) => handleChange("requiredResourceCount", e.target.value)}
//                 placeholder="Required Resource Count"
//                 className={`p-3 text-lg border rounded-md w-full ${errors.requiredResourceCount ? 'border-red-500' : 'border-gray-300'}`}
//                 disabled
//               />
//             </div>
//           </div>
//         );
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Educational Qualification</label>
//               <input
//                 type="text"
//                 value={formData.educationalQualification}
//                 onChange={(e) => handleChange("educationalQualification", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.educationalQualification ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.educationalQualification && <p className="text-red-500 text-sm">{errors.educationalQualification}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Years of Experience</label>
//               <input
//                 type="number"
//                 value={formData.yearsOfExperience}
//                 onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Job Location</label>
//               <input
//                 type="text"
//                 value={formData.jobLocation}
//                 onChange={(e) => handleChange("jobLocation", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.jobLocation ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.jobLocation && <p className="text-red-500 text-sm">{errors.jobLocation}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Employment Mode</label>
//               <select
//                 value={formData.employmentMode}
//                 onChange={(e) => handleChange("employmentMode", e.target.value)}
//                 className={`p-3 text-lg border rounded-md w-full ${errors.employmentMode ? 'border-red-500' : 'border-gray-300'}`}
//               >
//                 <option value="">Select Employment Mode</option>
//                 <option value="Full Time">Full Time</option>
//                 <option value="Part Time">Part Time</option>
//                 <option value="Contract">Contract</option>
//                 <option value="Temporary">Temporary</option>
//               </select>
//               {errors.employmentMode && <p className="text-red-500 text-sm">{errors.employmentMode}</p>}
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Minimum CTC</label>
//               <input
//                 type="number"
//                 value={formData.minCTC}
//                 onChange={(e) => handleChange("minCTC", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.minCTC ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.minCTC && <p className="text-red-500 text-sm">{errors.minCTC}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Maximum CTC</label>
//               <input
//                 type="number"
//                 value={formData.maxCTC}
//                 onChange={(e) => handleChange("maxCTC", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.maxCTC ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.maxCTC && <p className="text-red-500 text-sm">{errors.maxCTC}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Proposed Budget</label>
//               <input
//                 type="number"
//                 value={formData.proposedBudget}
//                 onChange={(e) => handleChange("proposedBudget", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.proposedBudget ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.proposedBudget && <p className="text-red-500 text-sm">{errors.proposedBudget}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Negotiated Price Point</label>
//               <input
//                 type="number"
//                 value={formData.negotiatedPricePoint}
//                 onChange={(e) => handleChange("negotiatedPricePoint", e.target.value)}
//                 className={`p-3 w-full text-lg border rounded-md ${errors.negotiatedPricePoint ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.negotiatedPricePoint && <p className="text-red-500 text-sm">{errors.negotiatedPricePoint}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Billing Cycle</label>
//               <select
//                 value={formData.billingCycle}
//                 onChange={(e) => handleChange("billingCycle", e.target.value)}
//                 className={`w-full p-3 text-lg border rounded-md ${errors.billingCycle ? "border-red-500" : "border-gray-300"}`}
//               >
//                 <option value="">Select Billing Cycle</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Quarterly">Quarterly</option>
//               </select>
//               {errors.billingCycle && <p className="text-red-500 text-sm">{errors.billingCycle}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">MRF Type</label>
//               <select
//                 value={formData.mrfType}
//                 onChange={(e) => handleChange("mrfType", e.target.value)}
//                 className={`w-full p-3 border rounded-md ${errors.mrfType ? "border-red-500" : "border-gray-300"}`}
//               >
//                 <option value="">Select MRF Type</option>
//                 <option value="Open">Open</option>
//                 <option value="Closed">Exclusive</option>
//               </select>
//               {errors.mrfType && <p className="text-red-500 text-sm">{errors.mrfType}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Required Skills</label>
//               <Select
//                 isMulti
//                 options={skillOptions}
//                 value={skillOptions.filter(option => formData.requiredSkills.split(', ').includes(option.value))}
//                 onChange={handleSkillChange}
//                 className={`basic-multi-select ${errors.requiredSkills ? 'border-red-500' : 'border-gray-300'}`}
//               />
//               {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}
//             </div>
//             <div>
//               <label className="block text-lg font-medium text-gray-700 mb-1">Upload SOW Document</label>
//               <input
//                 type="file"
//                 accept=".pdf, .docx"
//                 onChange={(e) => handleChange("sla", e.target.files[0])}
//                 className={`w-full p-3 text-lg border rounded-md ${errors.sla ? "border-red-500" : "border-gray-300"}`}
//               />
//               {errors.sla && <p className="text-red-500 text-sm">{errors.sla}</p>}
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="grid grid-cols-2 gap-4">
//             {Object.entries(formData).map(([key, value]) => (
//               <div key={key} className="flex justify-between my-2">
//                 <span className="font-medium">{key.replace(/([A-Z])/g, " $1")}: </span>
//                 <span className="text-right">{key === "sla" && value ? value.name : value || "N/A"}</span>
//               </div>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#eeeeee] items-center justify-center">
//       <h3 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800 z-20">
//         Man Power Requirement Form
//       </h3>
      
//       <ClientNavbar />
//       <Toaster position="top-center" reverseOrder={false} />
      
//       {/* Card for Organization and Client Details */}
//       <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md mt-20 ml-20 z-10">
//         <h2 className="text-lg font-semibold">Organization: {orgName || 'N/A'}</h2>
//         <p className="text-sm font-semibold">Client Representative: {clientName || 'N/A'}</p>
//         <button
//           onClick={() => setDetailModalOpen(true)}
//           className="mt-2 text-blue-600 hover:underline"
//         >
//           View More
//         </button>
//       </div>

//       {/* Right Side - Form for MRF Creation */}
//       <div className="flex-grow p-6 pt-20 md:pt-28 ml-40">
//         <div className="w-full max-w-4xl mx-auto mb-6">
//           <ol className="relative flex items-center justify-between w-full">
//             {steps.map((label, index) => (
//               <li key={label} className="flex flex-col items-center w-full">
//                 <div
//                   className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${activeStep > index ? 'border-[#27235C] bg-[#27235C] text-white' : 'border-gray-300 bg-white text-gray-500'}`}
//                 >
//                   {activeStep > index ? (
//                     <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
//                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
//                     </svg>
//                   ) : (
//                     <span className="text-lg">{index + 1}</span>
//                   )}
//                 </div>
//                 <span className="mt-2 text-sm text-center">{label}</span>
//               </li>
//             ))}
//           </ol>
//         </div>

//         <div className="w-full max-w-4xl p-6 border border-gray-300 rounded-md bg-white shadow-xl mx-auto">
//           {renderStepContent(activeStep)}

//           <div className="flex justify-between mt-4">
//             {activeStep > 0 && (
//               <button
//                 onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
//                 className="px-4 py-2 text-[#27235C] bg-white rounded-md border border-[#27235C] hover:bg-gray-200"
//               >
//                 Back
//               </button>
//             )}
//             {activeStep < totalSteps - 1 ? (
//               <button
//                 onClick={handleNext}
//                 className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MRFformCreation;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMRFData } from '../../../redux/actions/ClientPartner/mrf/mrfActions';
import { submitMRFForm } from '../../../services/ClientPartner/requirementService';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientNavbar from '../../NavbarComponent/ClientPartnerNavbar';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const steps = [
  'Basic Information',
  'Job Details',
  'Financials',
  'Preview & Submit',
];

const MRFformCreation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { state } = location;
  const { clientName = '', orgName = '', requirementDetails = {}, subRequirementDetails = {} } = state || {};

  const employeeId = sessionStorage.getItem('employeeId');
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    mrfDepartmentName: '',
    requiredTechnology: '',
    probableDesignation: subRequirementDetails.role || '',
    requiredResourceCount: subRequirementDetails.resourceCount || '',
    requiredSkills: '',
    employmentMode: '',
    educationalQualification: '',
    yearsOfExperience: '',
    minCTC: '',
    maxCTC: '',
    jobLocation: '',
    contractStartDate: '',
    closureDate: '',
    sla: null,
    billingCycle: '',
    proposedBudget: '',
    negotiatedPricePoint: '',
    approvalStatus: 'Pending',
    mrfStage: 'Not Assigned',
    mrfType: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length;
  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedTechnologies, setSuggestedTechnologies] = useState([]);

  const skillOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C#', label: 'C#' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Django', label: 'Django' },
  ];

  const handleSkillChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value).join(', ') : '';
    setFormData({ ...formData, requiredSkills: values });
    setErrors((prev) => ({ ...prev, requiredSkills: undefined }));
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleTechnologyInputChange = (value) => {
    setFormData((prev) => ({ ...prev, requiredTechnology: value }));

    if (value) {
      const filtered = skillOptions.filter(tech =>
        tech.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedTechnologies(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestedTechnologies([]);
      setShowSuggestions(false);
    }
  };

  const handleTechnologySelect = (technology) => {
    handleChange("requiredTechnology", technology);
    setShowSuggestions(false);
  };

  const handleNext = () => {
    const newErrors = validateStep(activeStep);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 0:
        if (!formData.mrfDepartmentName) newErrors.mrfDepartmentName = "Department is required.";
        if (!formData.probableDesignation) newErrors.probableDesignation = "Designation is required.";
        if (!formData.requiredResourceCount) newErrors.requiredResourceCount = "Resource Count is required.";
        if (!formData.requiredTechnology) newErrors.requiredTechnology = "Required Technology is required.";
        break;
      case 1:
        if (!formData.educationalQualification) newErrors.educationalQualification = "Educational Qualification is required.";
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Years of Experience is required.";
        if (!formData.employmentMode) newErrors.employmentMode = "Employment Mode is required.";
        if (!formData.jobLocation) newErrors.jobLocation = "Job Location is required.";
        break;
      case 2:
        if (!formData.minCTC || isNaN(formData.minCTC) || Number(formData.minCTC) <= 0) {
          newErrors.minCTC = "Minimum CTC is required and must be a number greater than 0.";
        }
        if (!formData.maxCTC || isNaN(formData.maxCTC) || Number(formData.maxCTC) <= 0) {
          newErrors.maxCTC = "Maximum CTC is required and must be a number greater than 0.";
        } else if (Number(formData.maxCTC) <= Number(formData.minCTC)) {
          newErrors.maxCTC = "Maximum CTC must be greater than Minimum CTC.";
        }
        if (!formData.proposedBudget || isNaN(formData.proposedBudget) || Number(formData.proposedBudget) <= 0) {
          newErrors.proposedBudget = "Proposed Budget is required and must be a number greater than 0.";
        }
        if (!formData.negotiatedPricePoint || isNaN(formData.negotiatedPricePoint) || Number(formData.negotiatedPricePoint) <= 0) {
          newErrors.negotiatedPricePoint = "Negotiated Price Point is required and must be a number greater than 0.";
        }
        if (!formData.mrfType) newErrors.mrfType = "MRF Type is required.";
        break;
      default:
        break;
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    if (!employeeId) {
      toast.error("Employee ID not found in session storage.");
      return;
    }

    const finalErrors = validateStep(activeStep);
    if (Object.keys(finalErrors).length > 0) {
      toast.error("Please resolve the errors before submission.");
      return;
    }

    const newMRF = {
      mrfDepartmentName: formData.mrfDepartmentName || null,
      mrfRequiredTechnology: formData.requiredTechnology || null,
      probableDesignation: formData.probableDesignation || null,
      requiredResourceCount: parseInt(formData.requiredResourceCount, 10) || 0,
      requiredSkills: formData.requiredSkills || null,
      mrfCriteria: {
          employmentMode: formData.employmentMode || null,
          educationalQualification: formData.educationalQualification || null,
          yearsOfExperience: parseInt(formData.yearsOfExperience, 10) || null,
          minimumCTC: parseFloat(formData.minCTC) || 0.0,
          maximumCTC: parseFloat(formData.maxCTC) || 0.0,
          contractStartDate: formData.contractStartDate || null,
          closureDate: formData.closureDate || null,
          jobLocation: formData.jobLocation || null,
      },
      mrfStatus: {
          mrfApprovalStatus: formData.approvalStatus || null,
          mrfStage: formData.mrfStage || null,
          mrfType: formData.mrfType || null,
      },
      mrfAgreement: {
          billingCycle: formData.billingCycle || null,
          proposedBudget: formData.proposedBudget || null,
          negotiatedPricePoint: formData.negotiatedPricePoint || null,
      },
      requirement: {
          requirementId: requirementDetails.requirementId,
      },
      jobDescriptionId: 1,
      businessUnitHead: {
          employeeId: parseInt(employeeId, 10), // Ensure correct type
      },
      clientPartner: {
          employeeId: parseInt(employeeId, 10), // Ensure correct type
      },
      subRequirements: {
          subRequirementId: subRequirementDetails.subRequirementId || ''
      }
    };

    const requestData = new FormData();
    requestData.append('mrf', JSON.stringify(newMRF));
    if (formData.sla) {
      requestData.append('sla', formData.sla);
    }

    try {
      const response = await submitMRFForm(requestData);
      toast.success("MRF submitted successfully!", {
        icon: <FaCheckCircle className="text-green-500" />
      });
      navigate('/viewMrf');
      dispatch(setMRFData(newMRF));
      resetForm();
    } catch (error) {
      console.error('Error submitting MRF:', error.response?.data || error);
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`, {
        icon: <FaTimesCircle className="text-red-500" />
      });
    }
  };

  const resetForm = () => {
    setFormData({
      mrfDepartmentName: '',
      requiredTechnology: '',
      probableDesignation: '',
      requiredResourceCount: '',
      requiredSkills: '',
      employmentMode: '',
      educationalQualification: '',
      yearsOfExperience: '',
      minCTC: '',
      maxCTC: '',
      jobLocation: '',
      contractStartDate: '',
      closureDate: '',
      sla: null,
      billingCycle: '',
      proposedBudget: '',
      negotiatedPricePoint: '',
      approvalStatus: 'Pending',
      mrfStage: 'Not Assigned',
      mrfType: '',
    });
    setActiveStep(0);
    setShowSuggestions(false);
    setSuggestedTechnologies([]);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700 mb-1">Department</label>
            <select
              value={formData.mrfDepartmentName}
              onChange={(e) => handleChange("mrfDepartmentName", e.target.value)}
              className={`p-3 text-lg border rounded-md w-full ${errors.mrfDepartmentName ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>
            
            <div className="mt-4">
              <label className="block text-lg font-medium text-gray-700 mb-1">Role</label>
              <div className="block p-3 text-lg border rounded-md w-full border-gray-300 bg-gray-100">
                {formData.probableDesignation || 'No Designation Selected'}
              </div>
            </div>
            
            <div className="mt-4 relative">
              <label className="block text-lg font-medium text-gray-700 mb-1">Required Technology</label>
              <input
                type="text"
                value={formData.requiredTechnology}
                onChange={(e) => handleTechnologyInputChange(e.target.value)}
                placeholder="Type or select technology"
                className={`w-full p-3 text-lg border rounded-md ${errors.requiredTechnology ? 'border-red-500' : 'border-gray-300'}`}
              />
              {showSuggestions && suggestedTechnologies.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md w-full z-10 max-h-40 overflow-auto">
                  {suggestedTechnologies.map((technology) => (
                    <li
                      key={technology.label}
                      onClick={() => handleTechnologySelect(technology.label)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {technology.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Required Resource</label>
              <input
                type="number"
                value={formData.requiredResourceCount}
                onChange={(e) => handleChange("requiredResourceCount", e.target.value)}
                placeholder="Required Resource Count"
                className={`p-3 text-lg border rounded-md w-full ${errors.requiredResourceCount ? 'border-red-500' : 'border-gray-300'}`}
                disabled
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Educational Qualification</label>
              <input
                type="text"
                value={formData.educationalQualification}
                onChange={(e) => handleChange("educationalQualification", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.educationalQualification ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.educationalQualification && <p className="text-red-500 text-sm">{errors.educationalQualification}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Years of Experience</label>
              <input
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Job Location</label>
              <input
                type="text"
                value={formData.jobLocation}
                onChange={(e) => handleChange("jobLocation", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.jobLocation ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.jobLocation && <p className="text-red-500 text-sm">{errors.jobLocation}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Employment Mode</label>
              <select
                value={formData.employmentMode}
                onChange={(e) => handleChange("employmentMode", e.target.value)}
                className={`p-3 text-lg border rounded-md w-full ${errors.employmentMode ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Employment Mode</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.employmentMode && <p className="text-red-500 text-sm">{errors.employmentMode}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Minimum CTC</label>
              <input
                type="number"
                value={formData.minCTC}
                onChange={(e) => handleChange("minCTC", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.minCTC ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.minCTC && <p className="text-red-500 text-sm">{errors.minCTC}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Maximum CTC</label>
              <input
                type="number"
                value={formData.maxCTC}
                onChange={(e) => handleChange("maxCTC", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.maxCTC ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.maxCTC && <p className="text-red-500 text-sm">{errors.maxCTC}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Proposed Budget</label>
              <input
                type="number"
                value={formData.proposedBudget}
                onChange={(e) => handleChange("proposedBudget", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.proposedBudget ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.proposedBudget && <p className="text-red-500 text-sm">{errors.proposedBudget}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Negotiated Price Point</label>
              <input
                type="number"
                value={formData.negotiatedPricePoint}
                onChange={(e) => handleChange("negotiatedPricePoint", e.target.value)}
                className={`p-3 w-full text-lg border rounded-md ${errors.negotiatedPricePoint ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.negotiatedPricePoint && <p className="text-red-500 text-sm">{errors.negotiatedPricePoint}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Billing Cycle</label>
              <select
                value={formData.billingCycle}
                onChange={(e) => handleChange("billingCycle", e.target.value)}
                className={`w-full p-3 text-lg border rounded-md ${errors.billingCycle ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select Billing Cycle</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              {errors.billingCycle && <p className="text-red-500 text-sm">{errors.billingCycle}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">MRF Type</label>
              <select
                value={formData.mrfType}
                onChange={(e) => handleChange("mrfType", e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.mrfType ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select MRF Type</option>
                <option value="Open">Open</option>
                <option value="Closed">Exclusive</option>
              </select>
              {errors.mrfType && <p className="text-red-500 text-sm">{errors.mrfType}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Required Skills</label>
              <Select
                isMulti
                options={skillOptions}
                value={skillOptions.filter(option => formData.requiredSkills.split(', ').includes(option.value))}
                onChange={handleSkillChange}
                className={`basic-multi-select ${errors.requiredSkills ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Upload SOW Document</label>
              <input
                type="file"
                accept=".pdf, .docx"
                onChange={(e) => handleChange("sla", e.target.files[0])}
                className={`w-full p-3 text-lg border rounded-md ${errors.sla ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.sla && <p className="text-red-500 text-sm">{errors.sla}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex justify-between my-2">
                <span className="font-medium">{key.replace(/([A-Z])/g, " $1")}: </span>
                <span className="text-right">{key === "sla" && value ? value.name : value || "N/A"}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#eeeeee] items-center justify-center">
      <h3 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-800 z-20">
        Man Power Requirement Form
      </h3>
      
      <ClientNavbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Card for Organization and Client Details */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md mt-20 ml-20 z-10">
        <h2 className="text-lg font-semibold">Organization: {orgName || 'N/A'}</h2>
        <p className="text-sm font-semibold">Client Representative: {clientName || 'N/A'}</p>
        <button
          onClick={() => setDetailModalOpen(true)}
          className="mt-2 text-blue-600 hover:underline"
        >
          View More
        </button>
      </div>

      {/* Right Side - Form for MRF Creation */}
      <div className="flex-grow p-6 pt-20 md:pt-28 ml-40">
        <div className="w-full max-w-4xl mx-auto mb-6">
          <ol className="relative flex items-center justify-between w-full">
            {steps.map((label, index) => (
              <li key={label} className="flex flex-col items-center w-full">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${activeStep > index ? 'border-[#27235C] bg-[#27235C] text-white' : 'border-gray-300 bg-white text-gray-500'}`}
                >
                  {activeStep > index ? (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                  ) : (
                    <span className="text-lg">{index + 1}</span>
                  )}
                </div>
                <span className="mt-2 text-sm text-center">{label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="w-full max-w-4xl p-6 border border-gray-300 rounded-md bg-white shadow-xl mx-auto">
          {renderStepContent(activeStep)}

          <div className="flex justify-between mt-4">
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2 text-[#27235C] bg-white rounded-md border border-[#27235C] hover:bg-gray-200"
              >
                Back
              </button>
            )}
            {activeStep < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 font-semibold text-white bg-[#27235C] rounded-md hover:bg-[#1E1A4C]"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MRFformCreation;