// import React, { useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { FaUpload, FaPlusCircle, FaDownload, FaEye } from 'react-icons/fa';
// import VendorNavbar from '../../NavbarComponent/VendorNavbar';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import Modal from 'react-modal';

// // Set the modal meta-data for accessibility
// Modal.setAppElement('#root');

// const AddCandidateByVendor = () => {
//   const [addType, setAddType] = useState('single');
//   const [candidateData, setCandidateData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     experience: '',
//     candidateResume: null,
//     skill: '',
//     location: '',
//     panNumber: '',
//     // isPasswordChanged: false,
//     // source: "VENDOR",
//     // sourceId:5
//   });

//   const [file, setFile] = useState(null);
//   const [source] = useState('VENDOR');
//   const [sourceId] = useState(2);
//   const [mrfId] = useState(1);

//   const [errors, setErrors] = useState({});
//   const [bulkFile, setBulkFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [previewFile, setPreviewFile] = useState(null);

//   const handleAddTypeChange = (event) => {
//     setAddType(event.target.value);
//     setErrors({});
//     if (event.target.value === 'single') {
//       setBulkFile(null);
//       setCandidateData({ ...candidateData, candidateResume: null });
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setCandidateData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };
//     switch (name) {
//       case 'firstName':
//         newErrors.firstName = value.length < 2 ? 'First Name must be at least 2 characters' : '';
//         break;
//       case 'lastName':
//         newErrors.lastName = value.length < 2 ? 'Last Name must be at least 2 characters' : '';
//         break;
//       case 'mobileNumber':
//         newErrors.mobileNumber =
//           value.length < 10 || !/^\d+$/.test(value) ? 'Mobile Number must be at least 10 digits' : '';
//         break;
//       case 'email':
//         newErrors.email = !/.+@.+\..+/.test(value) ? 'Email is not valid' : '';
//         break;
//       case 'experience':
//         newErrors.experience = value < 0 || !/^\d+$/.test(value) ? 'Experience must be a positive number' : '';
//         break;
//       case 'skill':
//         newErrors.skill = value.length < 2 ? 'Skills must be at least 2 characters' : '';
//         break;
//       case 'location':
//         newErrors.location = value.length < 2 ? 'Location must be at least 2 characters' : '';
//         break;
//       case 'panNumber':
//         newErrors.panNumber = value.length < 10 ? 'PAN Number must be at least 10 characters' : '';
//         break;
//       default:
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type === 'application/pdf') {
//       setFile(selectedFile);
//       setCandidateData((prev) => ({
//         ...prev,
//         candidateResume: selectedFile
//       }));
//       setErrors((prev) => ({ ...prev, resume: '' }));
//     } else {
//       setFile(null);
//       setCandidateData((prev) => ({
//         ...prev,
//         candidateResume: null
//       }));
//       toast.error('Please upload a valid PDF file for the resume.');
//       setErrors((prev) => ({ ...prev, resume: 'Invalid file type, PDF only' }));
//     }
//   };

//   const handleBulkFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setBulkFile(selectedFile);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const selectedFile = event.dataTransfer.files[0];
//     if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'text/csv')) {
//       setBulkFile(selectedFile);
//     } else {
//       toast.error('Please drop a valid CSV or Excel file.');
//     }
//   };

//   const handleSingleAddSubmit = async (event) => {
//     event.preventDefault();

//     const isValid =
//       Object.values(errors).every((error) => !error) && Object.values(candidateData).every((field) => field);

//     if (!isValid || !file) {
//       toast.error('Please fix the errors in the form.');
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(candidateData).forEach((key) => {
//       if (key === 'candidateResume') {
//         formData.append(key, file);
//       } else {
//         formData.append(key, candidateData[key]);
//       }
//     });

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/vendors/add-candidate-by-vendor",
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         toast.success('Single Candidate Added Successfully!');
//         setCandidateData({
//           firstName: '',
//           lastName: '',
//           mobileNumber: '',
//           email: '',
//           experience: '',
//           candidateResume: null,
//           skill: '',
//           location: '',
//           panNumber: '',
//           isPasswordChanged: false,
//           source: "VENDOR",
//           sourceId:5
//         });
//         setFile(null);
//         setErrors({});
//       } else {
//         toast.error('Error adding candidate. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error adding candidate. Please check your network.');
//     }
//   };

//   const handleBulkAddSubmit = async (event) => {
//     event.preventDefault();
//     if (!bulkFile) {
//       toast.error('Please upload a valid CSV or Excel file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', bulkFile);
//     formData.append('vendorId',5)

//     try {
//       const response = await axios.post("http://localhost:8080/candidates/uploadd", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         toast.success('Bulk Candidates Added Successfully!');
//         setBulkFile(null);
//       } else {
//         toast.error('Error adding candidates in bulk. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error adding candidates in bulk. Please check your network.');
//     }
//   };

//   const downloadTemplate = () => {
//     const templateData = [
//       ["First Name", "Last Name", "Mobile Number", "Email", "Experience (Years)", "Resume", "Skills (comma-separated)", "Location", "PAN Number"],
//       ["John", "Doe", "9876543210", "john.doe@example.com", "5", null, "JavaScript, React", "Mumbai", "ABCDE1234F"],
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(templateData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
//     XLSX.writeFile(workbook, "CandidateTemplate.xlsx");
//   };

//   const openPreview = () => {
//     setIsModalOpen(true);
//   };

//   const closePreview = () => {
//     setIsModalOpen(false);
//     setPreviewFile(null); // Reset the preview file when modal is closed
//   };

//   return (
//     <div className="container mx-auto px-4 py-0 -mt-10">
//       <Toaster />
//       {/* <VendorNavbar /> */}
//       <h2 className="text-2xl font-semibold text-[#27235C] mb-6 mt-20 text-center">Add Candidates</h2>

//       <div className="flex justify-center mb-4">
//         <label className="mr-4">
//           <input
//             type="radio"
//             value="single"
//             checked={addType === 'single'}
//             onChange={handleAddTypeChange}
//             className="mr-2"
//           />
//           Single Add
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="bulk"
//             checked={addType === 'bulk'}
//             onChange={handleAddTypeChange}
//             className="mr-2"
//           />
//           Bulk Add
//         </label>
//       </div>

//       {/* Single Add Form */}
//       {addType === 'single' && (
//         <div className="flex justify-center items-center">
//           <form onSubmit={handleSingleAddSubmit} className="bg-white p-6 w-3/5 rounded-lg shadow-lg">
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={candidateData.firstName}
//                     onChange={handleInputChange}
//                     id="firstName"
//                     placeholder="First Name"
//                     className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : ''}`}
//                   />
//                   {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
//                 </div>
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={candidateData.lastName}
//                     onChange={handleInputChange}
//                     id="lastName"
//                     placeholder="Last Name"
//                     className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : ''}`}
//                   />
//                   {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   value={candidateData.mobileNumber}
//                   onChange={handleInputChange}
//                   id="mobileNumber"
//                   placeholder="Mobile Number"
//                   className={`w-full p-2 border rounded-lg ${errors.mobileNumber ? 'border-red-500' : ''}`}
//                 />
//                 {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber}</span>}
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={candidateData.email}
//                   onChange={handleInputChange}
//                   id="email"
//                   placeholder="Email"
//                   className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
//                 />
//                 {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
//               </div>

//               <div>
//                 <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
//                 <input
//                   type="number"
//                   name="experience"
//                   value={candidateData.experience}
//                   onChange={handleInputChange}
//                   id="experience"
//                   placeholder="Experience (Years)"
//                   className={`w-full p-2 border rounded-lg ${errors.experience ? 'border-red-500' : ''}`}
//                 />
//                 {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
//               </div>

//               <div>
//                 <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
//                 <input
//                   type="text"
//                   name="skill"
//                   value={candidateData.skill}
//                   onChange={handleInputChange}
//                   id="skill"
//                   placeholder="Skills (comma-separated)"
//                   className={`w-full p-2 border rounded-lg ${errors.skill ? 'border-red-500' : ''}`}
//                 />
//                 {errors.skill && <span className="text-red-500 text-sm">{errors.skill}</span>}
//               </div>

//               <div>
//                 <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={candidateData.location}
//                   onChange={handleInputChange}
//                   id="location"
//                   placeholder="Location"
//                   className={`w-full p-2 border rounded-lg ${errors.location ? 'border-red-500' : ''}`}
//                 />
//                 {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
//               </div>

//               <div>
//                 <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
//                 <input
//                   type="text"
//                   name="panNumber"
//                   value={candidateData.panNumber}
//                   onChange={handleInputChange}
//                   id="panNumber"
//                   placeholder="PAN Number"
//                   className={`w-full p-2 border rounded-lg ${errors.panNumber ? 'border-red-500' : ''}`}
//                 />
//                 {errors.panNumber && <span className="text-red-500 text-sm">{errors.panNumber}</span>}
//               </div>

//               <div className="mb-4">
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="resume-upload"
//                 />
//                 <label htmlFor="resume-upload" className="flex items-center bg-[#27235C] text-white px-4 py-2 rounded-lg cursor-pointer">
//                   <FaUpload className="mr-2" />
//                   Upload Resume (PDF only)
//                 </label>
//               </div>

//               {errors.resume && <span className="text-red-500 text-sm">{errors.resume}</span>}

//               {file && (
//                 <div className="mt-4 text-center">
//                   <span className="font-medium text-[#27235C]">File Selected: </span>
//                   <span>{file.name}</span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="bg-[#27235C] text-white px-6 py-2 rounded-lg hover:bg-[#1C1A4E] mt-4"
//               >
//                 <FaPlusCircle className="mr-2" />
//                 Add Candidate
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Bulk Add Form */}
//       {addType === 'bulk' && (
//         <form onSubmit={handleBulkAddSubmit} className="bg-white p-6 rounded-lg shadow-lg">
//           <div className="flex flex-col justify-center items-center border-2 border-dashed p-6 rounded-lg cursor-pointer hover:bg-gray-100"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}>
//             <div className="text-lg font-semibold text-[#27235C] mb-4">Drag and Drop CSV/Excel File</div>
//             <div className="mb-4">
//               <input
//                 type="file"
//                 accept=".csv, .xls, .xlsx"
//                 onChange={handleBulkFileChange}
//                 className="hidden"
//                 id="bulk-upload"
//               />
//               <button
//                 type="button"
//                 className="bg-[#27235C] text-white px-4 py-2 rounded-lg"
//                 onClick={() => document.getElementById('bulk-upload').click()}
//               >
//                 <FaUpload className="mr-2" />
//                 Upload File
//               </button>
//             </div>
//             <div className="text-sm text-gray-600">
//               Only .CSV or .XLS/.XLSX files are allowed
//             </div>
//             {bulkFile && (
//               <div className="mt-4 text-center">
//                 <span className="font-medium text-[#27235C]">File Selected: </span>
//                 <span className="cursor-pointer text-blue-500" onClick={openPreview}>{bulkFile.name}</span>
//                 <FaEye className="inline ml-2 cursor-pointer" onClick={openPreview} />
//               </div>
//             )}
//             <button
//               type="button"
//               className="mt-4 bg-green-500 text-white rounded px-4 py-2 flex items-center"
//               onClick={downloadTemplate}
//             >
//               <FaDownload className="mr-2" />
//               Download Template
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="bg-[#27235C] text-white px-6 py-2 rounded-lg hover:bg-[#1C1A4E] mt-4"
//           >
//             Add Bulk Candidates
//           </button>
//         </form>
//       )}

//       {/* Preview Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closePreview}
//         contentLabel="File Preview"
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2 className="text-xl font-semibold">Preview File</h2>
//         {bulkFile && (
//           <iframe
//             src={URL.createObjectURL(bulkFile)}
//             style={{ width: '100%', height: '500px', border: 'none' }}
//             title="File Preview"
//           />
//         )}
//         <button onClick={closePreview} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//           Close
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default AddCandidateByVendor;

// import React, { useState } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { FaUpload, FaPlusCircle, FaDownload, FaEye } from 'react-icons/fa';
// import VendorNavbar from '../../NavbarComponent/VendorNavbar';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import Modal from 'react-modal';

// // Set the modal meta-data for accessibility
// Modal.setAppElement('#root');

// const AddCandidateByVendor = () => {
//   const [addType, setAddType] = useState('single');
//   const [candidateData, setCandidateData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     experience: '',
//     candidateResume: null,
//     skill: '',
//     location: '',
//     panNumber: '',
//   });

//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [source] = useState('VENDOR');
//   const [sourceId] = useState(2);
//   const [mrfId] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [bulkFile, setBulkFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [previewFile, setPreviewFile] = useState(null);

//   const handleAddTypeChange = (event) => {
//     setAddType(event.target.value);
//     setErrors({});
//     if (event.target.value === 'single') {
//       setBulkFile(null);
//       setCandidateData({ ...candidateData, candidateResume: null });
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setCandidateData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };
//     switch (name) {
//       case 'firstName':
//         newErrors.firstName = value.length < 2 ? 'First Name must be at least 2 characters' : '';
//         break;
//       case 'lastName':
//         newErrors.lastName = value.length < 2 ? 'Last Name must be at least 2 characters' : '';
//         break;
//       case 'mobileNumber':
//         newErrors.mobileNumber = value.length < 10 || !/^\d+$/.test(value) ? 'Mobile Number must be at least 10 digits' : '';
//         break;
//       case 'email':
//         newErrors.email = !/.+@.+\..+/.test(value) ? 'Email is not valid' : '';
//         break;
//       case 'experience':
//         newErrors.experience = value < 0 || !/^\d+$/.test(value) ? 'Experience must be a positive number' : '';
//         break;
//       case 'skill':
//         newErrors.skill = value.length < 2 ? 'Skills must be at least 2 characters' : '';
//         break;
//       case 'location':
//         newErrors.location = value.length < 2 ? 'Location must be at least 2 characters' : '';
//         break;
//       case 'panNumber':
//         newErrors.panNumber = value.length < 10 ? 'PAN Number must be at least 10 characters' : '';
//         break;
//       default:
//         break;
//     }

//     setErrors(newErrors);
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && selectedFile.type === 'application/pdf') {
//       setFile(selectedFile);
//       setCandidateData((prev) => ({
//         ...prev,
//         candidateResume: selectedFile
//       }));
//       setErrors((prev) => ({ ...prev, resume: '' }));
//     } else {
//       setFile(null);
//       setCandidateData((prev) => ({
//         ...prev,
//         candidateResume: null
//       }));
//       toast.error('Please upload a valid PDF file for the resume.');
//       setErrors((prev) => ({ ...prev, resume: 'Invalid file type, PDF only' }));
//     }
//   };

//   const handleBulkFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setBulkFile(selectedFile);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const selectedFile = event.dataTransfer.files[0];
//     if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'text/csv')) {
//       setBulkFile(selectedFile);
//     } else {
//       toast.error('Please drop a valid CSV or Excel file.');
//     }
//   };

//   const handleSingleAddSubmit = async (event) => {
//     event.preventDefault();

//     const isValid =
//       Object.values(errors).every((error) => !error) && Object.values(candidateData).every((field) => field);

//     if (!isValid || !file) {
//       toast.error('Please fix the errors in the form.');
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(candidateData).forEach((key) => {
//       if (key === 'candidateResume') {
//         formData.append(key, file);
//       } else {
//         formData.append(key, candidateData[key]);
//       }
//     });

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/vendors/add-candidate-by-vendor",
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         toast.success('Single Candidate Added Successfully!');
//         setCandidateData({
//           firstName: '',
//           lastName: '',
//           mobileNumber: '',
//           email: '',
//           experience: '',
//           candidateResume: null,
//           skill: '',
//           location: '',
//           panNumber: '',
//           isPasswordChanged: false,
//           source: "VENDOR",
//           sourceId: 5
//         });
//         setFile(null);
//         setErrors({});
//       } else {
//         toast.error('Error adding candidate. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error adding candidate. Please check your network.');
//     }
//   };

//   const handleBulkAddSubmit = async (event) => {
//     event.preventDefault();
//     if (!bulkFile) {
//       toast.error('Please upload a valid CSV or Excel file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', bulkFile);
//     formData.append('vendorId', 5);

//     try {
//       const response = await axios.post("http://localhost:8080/candidates/uploadd", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         toast.success('Bulk Candidates Added Successfully!');
//         setBulkFile(null);
//       } else {
//         toast.error('Error adding candidates in bulk. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Error adding candidates in bulk. Please check your network.');
//     }
//   };

//   const downloadTemplate = () => {
//     const templateData = [
//       ["First Name", "Last Name", "Mobile Number", "Email", "Experience (Years)", "Resume", "Skills (comma-separated)", "Location", "PAN Number"],
//       ["John", "Doe", "9876543210", "john.doe@example.com", "5", null, "JavaScript, React", "Mumbai", "ABCDE1234F"],
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet(templateData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
//     XLSX.writeFile(workbook, "CandidateTemplate.xlsx");
//   };

//   const openPreview = () => {
//     setIsModalOpen(true);
//   };

//   const closePreview = () => {
//     setIsModalOpen(false);
//     setPreviewFile(null); // Reset the preview file when modal is closed
//   };

//   return (
//     <div className="container mx-auto px-4 py-0 -mt-10">
//       <Toaster />
//       <h2 className="text-2xl font-semibold text-[#27235C] mb-6 mt-20 text-center">Add Candidates</h2>

//       <div className="flex justify-center mb-4">
//         <label className="mr-4">
//           <input
//             type="radio"
//             value="single"
//             checked={addType === 'single'}
//             onChange={handleAddTypeChange}
//             className="mr-2"
//           />
//           Single Add
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="bulk"
//             checked={addType === 'bulk'}
//             onChange={handleAddTypeChange}
//             className="mr-2"
//           />
//           Bulk Add
//         </label>
//       </div>

//       {/* Single Add Form */}
//       {addType === 'single' && (
//         <div className="flex justify-center items-center">
//           <form onSubmit={handleSingleAddSubmit} className="bg-white p-6 w-3/5 rounded-lg shadow-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={candidateData.firstName}
//                   onChange={handleInputChange}
//                   id="firstName"
//                   placeholder="First Name"
//                   className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : ''}`}
//                 />
//                 {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={candidateData.lastName}
//                   onChange={handleInputChange}
//                   id="lastName"
//                   placeholder="Last Name"
//                   className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : ''}`}
//                 />
//                 {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
//               </div>
//               <div>
//                 <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   value={candidateData.mobileNumber}
//                   onChange={handleInputChange}
//                   id="mobileNumber"
//                   placeholder="Mobile Number"
//                   className={`w-full p-2 border rounded-lg ${errors.mobileNumber ? 'border-red-500' : ''}`}
//                 />
//                 {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber}</span>}
//               </div>
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={candidateData.email}
//                   onChange={handleInputChange}
//                   id="email"
//                   placeholder="Email"
//                   className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
//                 />
//                 {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
//               </div>
//               <div>
//                 <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
//                 <input
//                   type="number"
//                   name="experience"
//                   value={candidateData.experience}
//                   onChange={handleInputChange}
//                   id="experience"
//                   placeholder="Experience (Years)"
//                   className={`w-full p-2 border rounded-lg ${errors.experience ? 'border-red-500' : ''}`}
//                 />
//                 {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
//               </div>
//               <div>
//                 <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
//                 <input
//                   type="text"
//                   name="skill"
//                   value={candidateData.skill}
//                   onChange={handleInputChange}
//                   id="skill"
//                   placeholder="Skills (comma-separated)"
//                   className={`w-full p-2 border rounded-lg ${errors.skill ? 'border-red-500' : ''}`}
//                 />
//                 {errors.skill && <span className="text-red-500 text-sm">{errors.skill}</span>}
//               </div>
//               <div>
//                 <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={candidateData.location}
//                   onChange={handleInputChange}
//                   id="location"
//                   placeholder="Location"
//                   className={`w-full p-2 border rounded-lg ${errors.location ? 'border-red-500' : ''}`}
//                 />
//                 {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
//               </div>
//               <div>
//                 <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
//                 <input
//                   type="text"
//                   name="panNumber"
//                   value={candidateData.panNumber}
//                   onChange={handleInputChange}
//                   id="panNumber"
//                   placeholder="PAN Number"
//                   className={`w-full p-2 border rounded-lg ${errors.panNumber ? 'border-red-500' : ''}`}
//                 />
//                 {errors.panNumber && <span className="text-red-500 text-sm">{errors.panNumber}</span>}
//               </div>
//             </div>

           

// <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
//                   Upload Resume (PDF only)
//                 </label>
//                 <div className="relative w-64">
//                   <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileChange}
//                     id="resume-upload"
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <div className="flex items-center justify-center py-2 border-2 border-dashed border-[#27235C] rounded-md bg-gray-50 cursor-pointer transition duration-300 hover:border-blue-500">
//                     {fileName ? (
//                       <span className="text-gray-600">{fileName}</span>
//                     ) : (
//                       <span className="text-gray-400">No file chosen</span>
//                     )}
//                     <FaUpload className="ml-2 text-[#27235C]" />
//                   </div>
//                   {errors.resume && <span className="text-red-500 text-sm">{errors.resume}</span>}
//                   {file && (
//                     <div className="mt-2 text-center">
//                       <span className="font-medium text-[#27235C]">File Selected: </span>
//                       <span>{file.name}</span>
//                     </div>
//                   )}
//                 </div>
//                 </div>

//             <button
//               type="submit"
//               className="bg-[#27235C] text-white px-6 py-2 justify-center rounded-lg hover:bg-[#1C1A4E] mt-4"
//             >
//               Add Candidate
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Bulk Add Form */}
//       {addType === 'bulk' && (
//         <form onSubmit={handleBulkAddSubmit} className="bg-white p-6 rounded-lg shadow-lg">
//           <div className="flex flex-col justify-center items-center border-2 border-dashed p-6 rounded-lg cursor-pointer hover:bg-gray-100"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}>
//             <div className="text-lg font-semibold text-[#27235C] mb-4">Drag and Drop CSV/Excel File</div>
//             <div className="mb-4">
//               <input
//                 type="file"
//                 accept=".csv, .xls, .xlsx"
//                 onChange={handleBulkFileChange}
//                 className="hidden"
//                 id="bulk-upload"
//               />
//               <button
//                 type="button"
//                 className="bg-[#27235C] text-white px-4 py-2 rounded-lg"
//                 onClick={() => document.getElementById('bulk-upload').click()}
//               >
//                 <FaUpload className="mr-2" />
//                 Upload File
//               </button>
//             </div>
//             <div className="text-sm text-gray-600">
//               Only .CSV or .XLS/.XLSX files are allowed
//             </div>
//             {bulkFile && (
//               <div className="mt-4 text-center">
//                 <span className="font-medium text-[#27235C]">File Selected: </span>
//                 <span className="cursor-pointer text-blue-500" onClick={openPreview}>{bulkFile.name}</span>
//                 <FaEye className="inline ml-2 cursor-pointer" onClick={openPreview} />
//               </div>
//             )}
//             <button
//               type="button"
//               className="mt-4 bg-green-500 text-white rounded px-4 py-2 flex items-center"
//               onClick={downloadTemplate}
//             >
//               <FaDownload className="mr-2" />
//               Download Template
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="bg-[#27235C] text-white px-6 py-2 rounded-lg hover:bg-[#1C1A4E] mt-4"
//           >
//             Add Bulk Candidates
//           </button>
//         </form>
//       )}

//       {/* Preview Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closePreview}
//         contentLabel="File Preview"
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2 className="text-xl font-semibold">Preview File</h2>
//         {bulkFile && (
//           <iframe
//             src={URL.createObjectURL(bulkFile)}
//             style={{ width: '100%', height: '500px', border: 'none' }}
//             title="File Preview"
//           />
//         )}
//         <button onClick={closePreview} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
//           Close
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default AddCandidateByVendor;





import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaUpload, FaDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Modal from 'react-modal';

// Set the modal meta-data for accessibility
Modal.setAppElement('#root');

const AddCandidateByVendor = () => {
  const [addType, setAddType] = useState('single');
  const [candidateData, setCandidateData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    experience: '',
    candidateResume: null,
    skill: '',
    location: '',
    panNumber: '',
    status:'SCREENED'
  });

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [bulkFile, setBulkFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTypeChange = () => {
    setAddType((prev) => (prev === 'single' ? 'bulk' : 'single'));
    setErrors({});
    if (addType === 'single') {
      setBulkFile(null);
      setCandidateData((prev) => ({ ...prev, candidateResume: null }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCandidateData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Validation function to handle error messages
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case 'firstName':
        newErrors.firstName = value.length < 2 ? 'First Name must be at least 2 characters' : '';
        break;
      case 'lastName':
        newErrors.lastName = value.length < 2 ? 'Last Name must be at least 2 characters' : '';
        break;
      case 'mobileNumber':
        newErrors.mobileNumber = value.length < 10 || !/^\d+$/.test(value) ? 'Mobile Number must be at least 10 digits' : '';
        break;
      case 'email':
        newErrors.email = !/.+@.+\..+/.test(value) ? 'Email is not valid' : '';
        break;
      case 'experience':
        newErrors.experience = value < 0 || !/^\d+$/.test(value) ? 'Experience must be a positive number' : '';
        break;
      case 'skill':
        newErrors.skill = value.length < 2 ? 'Skills must be at least 2 characters' : '';
        break;
      case 'location':
        newErrors.location = value.length < 2 ? 'Location must be at least 2 characters' : '';
        break;
      case 'panNumber':
        newErrors.panNumber = value.length < 10 ? 'PAN Number must be at least 10 characters' : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle file changes
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setCandidateData((prev) => ({
        ...prev,
        candidateResume: selectedFile
      }));
      setErrors((prev) => ({ ...prev, resume: '' }));
    } else {
      setFile(null);
      setCandidateData((prev) => ({
        ...prev,
        candidateResume: null
      }));
      toast.error('Please upload a valid PDF file for the resume.');
      setErrors((prev) => ({ ...prev, resume: 'Invalid file type, PDF only' }));
    }
  };

  const handleBulkFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setBulkFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'text/csv')) {
      setBulkFile(selectedFile);
    } else {
      toast.error('Please drop a valid CSV or Excel file.');
    }
  };

  const handleSingleAddSubmit = async (event) => {
    event.preventDefault();

    const isValid =
      Object.values(errors).every((error) => !error) && Object.values(candidateData).every((field) => field);

    if (!isValid || !file) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    const formData = new FormData();
    Object.keys(candidateData).forEach((key) => {
      if (key === 'candidateResume') {
        formData.append(key, file);
      } else {
        formData.append(key, candidateData[key]);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:8080/api/vendors/add-candidate-by-vendor",
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('Single Candidate Added Successfully!');
        resetSingleAddForm();
      } else {
        toast.error('Error adding candidate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding candidate. Please check your network.');
    }
  };

  const sourceId = sessionStorage.getItem('vendorId')
  const resetSingleAddForm = () => {
    setCandidateData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      experience: '',
      candidateResume: null,
      skill: '',
      location: '',
      panNumber: '',
      status: 'SCREENED',
      isPasswordChanged: false,
      source: "VENDOR",
      sourceId: sourceId
    });
    setFile(null);
    setErrors({});
  };

  const handleBulkAddSubmit = async (event) => {
    event.preventDefault();
    if (!bulkFile) {
      toast.error('Please upload a valid CSV or Excel file.');
      return;
    }

    const vendorId = sessionStorage.getItem("vendorId")

    const formData = new FormData();
    formData.append('file', bulkFile);
    formData.append('vendorId', vendorId);

    try {
      const response = await axios.post("http://localhost:8080/candidates/uploadd", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Bulk Candidates Added Successfully!');
        setBulkFile(null);
      } else {
        toast.error('Error adding candidates in bulk. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding candidates in bulk. Please check your network.');
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      ["First Name", "Last Name", "Mobile Number", "Email", "Experience (Years)", "Resume", "Skills (comma-separated)", "Location", "PAN Number"],
      ["John", "Doe", "9876543210", "john.doe@example.com", "5", null, "JavaScript, React", "Mumbai", "ABCDE1234F"],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, "CandidateTemplate.xlsx");
  };

  const openPreview = () => {
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-0 -mt-10">
      <Toaster />
      <h2 className="text-2xl font-semibold text-[#27235C] mb-6 mt-20 text-center">Add Candidates</h2>

      {/* Toggle Switch for Selecting Add Type */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center">
          <label className={`cursor-pointer mr-5 ${addType === 'single' ? 'text-[#27235C] font-bold' : ''}`} onClick={handleAddTypeChange}>
            Single Add
          </label>
          <div className="relative">
            <input
              type="checkbox"
              checked={addType === 'bulk'}
              onChange={handleAddTypeChange}
              className="sr-only"
            />
            <div
              className="toggle-wrapper w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
              onClick={handleAddTypeChange}
            >
              <div
                className={`bg-[#27235C] w-5 h-5 rounded-full shadow transform transition-transform duration-300 ${addType === 'bulk' ? 'translate-x-6' : ''}`}
              />
            </div>
          </div>
          <label className={`cursor-pointer ml-5 ${addType === 'bulk' ? 'text-[#27235C] font-bold' : ''}`} onClick={handleAddTypeChange}>
            Bulk Add
          </label>
        </div>
      </div>

      {/* Single Add Form */}
      {addType === 'single' && (
        <div className="flex justify-center items-center">
          <form onSubmit={handleSingleAddSubmit} className="bg-white p-6 w-3/5 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field Definitions */}
              {['firstName', 'lastName', 'mobileNumber', 'email', 'experience', 'skill', 'location', 'panNumber'].map(field => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === 'experience' ? 'number' : 'text'}
                    name={field}
                    value={candidateData[field]}
                    onChange={handleInputChange}
                    id={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className={`w-full p-2 border rounded-lg ${errors[field] ? 'border-red-500' : ''}`}
                  />
                  {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">Upload Resume (PDF only)</label>
              <div className="relative w-64">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  id="resume-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center justify-center py-2 border-2 border-dashed border-[#27235C] rounded-md bg-gray-50 cursor-pointer transition duration-300 hover:border-blue-500">
                  {fileName ? (
                    <span className="text-gray-600">{fileName}</span>
                  ) : (
                    <span className="text-gray-400">No file chosen</span>
                  )}
                  <FaUpload className="ml-2 text-[#27235C]" />
                </div>
                {errors.resume && <span className="text-red-500 text-sm">{errors.resume}</span>}
                {file && (
                  <div className="mt-2 text-center">
                    <span className="font-medium text-[#27235C]">File Selected: </span>
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#27235C] text-white px-6 py-2 justify-center rounded-lg hover:bg-[#1C1A4E] mt-4"
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Add Form */}
      {addType === 'bulk' && (
        <form onSubmit={handleBulkAddSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center border-2 border-dashed p-6 rounded-lg cursor-pointer hover:bg-gray-100"
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <div className="text-lg font-semibold text-[#27235C] mb-4">Drag and Drop CSV/Excel File</div>
            <div className="mb-4">
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleBulkFileChange}
                className="hidden"
                id="bulk-upload"
              />
              <button
                type="button"
                className="bg-[#27235C] text-white px-4 py-2 rounded-lg"
                onClick={() => document.getElementById('bulk-upload').click()}
              >
                <FaUpload className="mr-2" />
                Upload File
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Only .CSV or .XLS/.XLSX files are allowed
            </div>
            {bulkFile && (
              <div className="mt-4 text-center">
                <span className="font-medium text-[#27235C]">File Selected: </span>
                <span className="cursor-pointer text-blue-500" onClick={openPreview}>{bulkFile.name}</span>
              </div>
            )}
            <button
              type="button"
              className="mt-4 bg-green-500 text-white rounded px-4 py-2 flex items-center"
              onClick={downloadTemplate}
            >
              <FaDownload className="mr-2" />
              Download Template
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#27235C] text-white px-6 py-2 rounded-lg hover:bg-[#1C1A4E] mt-4"
            >
              Add Bulk Candidates
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddCandidateByVendor;