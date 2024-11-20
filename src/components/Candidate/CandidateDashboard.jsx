// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/CandidateDashboard/RelevantzLogo.png";
// import CandidateNavbar from "./CandidateNavbar";
// import { FaCheckCircle, FaDotCircle, FaEdit, FaLinkedin, FaLocationArrow } from "react-icons/fa";
// import axios from "axios";
// import { getAppliedJobsCount, getAssessmentCount, getInterviewCount } from "../../services/Candidate/CandidateDashboardService";

// function CandidateDashboard() {
//     const [welcomeMsg, setWelcomeMsg] = useState("");
//     const [totalInterviews, setTotalInterviews] = useState(0);
//     const [totalAssessments, setTotalAssessments] = useState(0);
//     const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);

//     const [currentStage, setCurrentStage] = useState(3);
//     const date = new Date().toLocaleDateString();
//     const meetlink = "http://www.google.com";

//     const candidateId = 45;
//     // const candidateId = sessionStorage.getItem("candidateId");

//     useEffect(() => {
//         const generateWelcomeMsg = () => {
//             const now = new Date().getHours();
//             if (now >= 5 && now < 12) {
//                 return "Good Morning";
//             } else if (now >= 12 && now < 18) {
//                 return "Good Afternoon";
//             } else {
//                 return "Good Evening";
//             }
//         };
//         setWelcomeMsg(generateWelcomeMsg());
//     }, []);

//     useEffect(() => {
//         const assessmentCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalAssessments = await getAssessmentCount(candidateId);
//                     setTotalAssessments(totalAssessments);
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         assessmentCountData();
//     }, []);

//     useEffect(() => {
//         const appliedJobsCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalAppliedJobs = await getAppliedJobsCount(candidateId);
//                     setTotalAppliedJobs(totalAppliedJobs || "NA");
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         appliedJobsCountData();
//     }, []);

//     useEffect(() => {
//         const interviewCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalInterviews = await getInterviewCount(candidateId);
//                     setTotalInterviews(totalInterviews || "NA");
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         interviewCountData();
//     }, []);

//     const [isEditing, setIsEditing] = useState(false);
//     const [profileData, setProfileData] = useState({
//         name: "John Doe",
//         city: "Pune",
//         mobile: "123-456-7890",
//         candidateId: "12345",
//         sourcedFrom: "LinkedIn",
//         skills: "Java, React, Node.js",
//         education: "B.Tech Computer Science",
//         experience: "3 years",
//         salary: "₹10,00,000 - ₹12,00,000",
//         joiningDate: "Can join in 13 days",
//     });

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         setIsEditing(false);
//     };

//     const handleInputChange = (e, field) => {
//         setProfileData({ ...profileData, [field]: e.target.value });
//     };

//     return (
//         <>
//             <CandidateNavbar />
//             <div className="flex m-4 p-8">
//                 {/* Content Section */}
//                 <div className="w-2/3 p-8">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Interviews</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalInterviews}</p>
//                         </div>
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Assessments</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalAssessments}</p>
//                         </div>
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Applied Jobs</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalAppliedJobs}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Profile Section */}
//                 <div className="w-1/3 p-4 border rounded-lg shadow-lg bg-white ">
//                     <div className="flex items-start mb-4">
//                         <img src={logo} alt="Profile" className="w-16 h-16 items-center flex rounded-full mr-4" />
//                         <div>
//                             <h2 className="text-xl font-bold">{profileData.name}</h2>
//                             <div className="flex items-center text-gray-700 mb-1">
//                                 <FaLocationArrow className="mr-1" /> {profileData.city} <span className="mx-2">|</span> {profileData.mobile}
//                             </div>
//                             <div className="flex items-center text-gray-700">
//                                 <p className="mr-2">{profileData.candidateId}</p>
//                                 <span className="mx-2">|</span>
//                                 <p className="mr-2">Sourced from: {profileData.sourcedFrom}</p>
//                                 <FaLinkedin className="text-blue-700" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded lg">
//                         {["skills", "education", "experience", "salary", "joiningDate"].map((field, index) => (
//                             <div key={field} className="mb-4">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-semibold capitalize">{field}:</h3>
//                                     {isEditing ? (
//                                         <input
//                                             type="text"
//                                             value={profileData[field]}
//                                             onChange={(e) => handleInputChange(e, field)}
//                                             className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                                         />
//                                     ) : (
//                                         <p className="border-b-2 border-transparent w-2/3">{profileData[field]}</p>
//                                     )}
//                                 </div>
//                                 {index < 4 && <hr className="border-t-2 border-gray-300 my-2" />}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex justify-between mt-4">
//                         {isEditing ? (
//                             <button className="bg-[#27235c] text-white px-4 py-2 rounded" onClick={handleSaveClick}>
//                                 Save
//                             </button>
//                         ) : (
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded" onClick={handleEditClick}>
//                                 Edit
//                             </button>
//                         )}
//                     </div>
//                     <div className="border-t pt-4 mt-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-lg font-semibold">Documents</h3>
//                             <span className="text-blue-500 cursor-pointer">Click to download</span>
//                         </div>
//                         <div className="flex space-x-4 mb-4">
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Resume</button>
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Cover Letter</button>
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Attachments</button>
//                         </div>
//                         <button className="bg-[#27235c] text-white px-4 py-2 rounded">Download All</button>
//                     </div>
//                 </div>

//             </div>
//         </>
//     );
// }

// export default CandidateDashboard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/CandidateDashboard/RelevantzLogo.png";
// import CandidateNavbar from "./CandidateNavbar";
// import { FaCheckCircle, FaDotCircle, FaEdit, FaLinkedin, FaLocationArrow } from "react-icons/fa";
// import axios from "axios";
// import { getAppliedJobsCount, getAssessmentCount, getInterviewCount } from "../../services/Candidate/CandidateDashboardService";

// function CandidateDashboard() {
//     const [welcomeMsg, setWelcomeMsg] = useState("");
//     const [totalInterviews, setTotalInterviews] = useState(0);
//     const [totalAssessments, setTotalAssessments] = useState(0);
//     const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);

//     const [currentStage, setCurrentStage] = useState(3);
//     const date = new Date().toLocaleDateString();
//     const meetlink = "http://www.google.com";

//     const candidateId = 45;
//     // const candidateId = sessionStorage.getItem("candidateId");

//     const [isEditing, setIsEditing] = useState(false);
//     const [profileData, setProfileData] = useState({
//         name: "John Doe",
//         city: "Pune",
//         mobile: "123-456-7890",
//         candidateId: "12345",
//         sourcedFrom: "LinkedIn",
//         skills: "Java, React, Node.js",
//         education: "B.Tech Computer Science",
//         experience: "3 years",
//         salary: "₹10,00,000 - ₹12,00,000",
//         joiningDate: "Can join in 13 days",
//         profileImage: null,
//     });

//     useEffect(() => {
//         const generateWelcomeMsg = () => {
//             const now = new Date().getHours();
//             if (now >= 5 && now < 12) {
//                 return "Good Morning";
//             } else if (now >= 12 && now < 18) {
//                 return "Good Afternoon";
//             } else {
//                 return "Good Evening";
//             }
//         };
//         setWelcomeMsg(generateWelcomeMsg());
//     }, []);

//     useEffect(() => {
//         const assessmentCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalAssessments = await getAssessmentCount(candidateId);
//                     setTotalAssessments(totalAssessments);
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         assessmentCountData();
//     }, []);

//     useEffect(() => {
//         const appliedJobsCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalAppliedJobs = await getAppliedJobsCount(candidateId);
//                     setTotalAppliedJobs(totalAppliedJobs || "NA");
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         appliedJobsCountData();
//     }, []);

//     useEffect(() => {
//         const interviewCountData = async () => {
//             if (candidateId) {
//                 try {
//                     const totalInterviews = await getInterviewCount(candidateId);
//                     setTotalInterviews(totalInterviews || "NA");
//                 } catch (error) {
//                     console.error(error.message);
//                 }
//             }
//         };

//         interviewCountData();
//     }, []);

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleSaveClick = () => {
//         setIsEditing(false);
//         // Add save profile changes logic if needed
//     };

//     const handleInputChange = (e, field) => {
//         setProfileData({ ...profileData, [field]: e.target.value });
//     };

//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append('candidateId', candidateId);
//         formData.append('profileImage', file);

//         try {
//             const response = await axios.post('/your-api-endpoint/upload-image', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Image uploaded successfully', response.data);
//             setProfileData({ ...profileData, profileImage: URL.createObjectURL(file) });
//         } catch (error) {
//             console.error('Error uploading image', error);
//         }
//     };

//     return (
//         <>
//             <CandidateNavbar />
//             <div className="flex flex-col md:flex-row m-4 p-8">
//                 {/* Content Section */}
//                 <div className="w-full md:w-2/3 p-8">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Interviews</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalInterviews}</p>
//                         </div>
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Assessments</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalAssessments}</p>
//                         </div>
//                         <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                             <h2 className="text-lg font-semibold text-white">Total Applied Jobs</h2>
//                             <p className="text-3xl font-bold text-white mt-2">{totalAppliedJobs}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Profile Section */}
//                 <div className="w-full md:w-1/3 p-4 border rounded-lg shadow-lg bg-white">
//                     <div className="flex flex-col items-center mb-4">
//                         {profileData.profileImage ? (
//                             <img src={profileData.profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
//                         ) : (
//                             <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-gray-200 cursor-pointer">
//                                 <FaEdit className="text-gray-500" />
//                                 <input type="file" onChange={handleImageChange} className="absolute opacity-0 cursor-pointer w-24 h-24" />
//                             </div>
//                         )}
//                         <div>
//                             <h2 className="text-xl font-bold">{profileData.name}</h2>
//                             <div className="flex items-center text-gray-700 mb-1">
//                                 <FaLocationArrow className="mr-1" /> {profileData.city} <span className="mx-2">|</span> {profileData.mobile}
//                             </div>
//                             <div className="flex items-center text-gray-700">
//                                 <p className="mr-2">{profileData.candidateId}</p>
//                                 <span className="mx-2">|</span>
//                                 <p className="mr-2">Sourced from: {profileData.sourcedFrom}</p>
//                                 <FaLinkedin className="text-blue-700" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-100 p-4 rounded lg">
//                         {["skills", "education", "experience", "salary", "joiningDate"].map((field, index) => (
//                             <div key={field} className="mb-4">
//                                 <div className="flex justify-between items-center">
//                                     <h3 className="font-semibold capitalize">{field}:</h3>
//                                     {isEditing ? (
//                                         <input
//                                             type="text"
//                                             value={profileData[field]}
//                                             onChange={(e) => handleInputChange(e, field)}
//                                             className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                                         />
//                                     ) : (
//                                         <p className="border-b-2 border-transparent w-2/3">{profileData[field]}</p>
//                                     )}
//                                 </div>
//                                 {index < 4 && <hr className="border-t-2 border-gray-300 my-2" />}
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex justify-between mt-4">
//                         {isEditing ? (
//                             <button className="bg-[#27235c] text-white px-2 py-2 rounded" onClick={handleSaveClick}>
//                                 Save
//                             </button>
//                         ) : (
//                             <button className="bg-[#27235c] text-white px-2 py-2 rounded" onClick={handleEditClick}>
//                                 Edit
//                             </button>
//                         )}
//                     </div>
//                     <div className="border-t pt-4 mt-4">
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-lg font-semibold">Documents</h3>
//                             <span className="text-blue-500 cursor-pointer">Click to download</span>
//                         </div>
//                         <div className="flex space-x-4 mb-4">
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Resume</button>
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Cover Letter</button>
//                             <button className="bg-[#27235c] text-white px-3 py-1 rounded">Attachments</button>
//                         </div>
//                         <button className="bg-[#27235c] text-white px-4 py-2 rounded">Download All</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CandidateDashboard;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/CandidateDashboard/RelevantzLogo.png";
// import CandidateNavbar from "./CandidateNavbar";
// import {
//   FaCheckCircle,
//   FaDotCircle,
//   FaEdit,
//   FaLinkedin,
//   FaLocationArrow,
// } from "react-icons/fa";
// import axios from "axios";
// import {
//   getAppliedJobsCount,
//   getAssessmentCount,
//   getInterviewCount,
//   getAppliedJobs,
// } from "../../services/Candidate/CandidateDashboardService";
// import CandidateProfile from "./CandidateProfile";

// function CandidateDashboard() {
//   const [welcomeMsg, setWelcomeMsg] = useState("");
//   const [totalInterviews, setTotalInterviews] = useState(0);
//   const [totalAssessments, setTotalAssessments] = useState(0);
//   const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const navigate = useNavigate();

//   const [currentStage, setCurrentStage] = useState(3);
//   const date = new Date().toLocaleDateString();
//   const meetlink = "http://www.google.com";

//   const candidateId = 45;
//   // const candidateId = sessionStorage.getItem("candidateId");

//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     city: "Pune",
//     mobile: "123-456-7890",
//     candidateId: "12345",
//     sourcedFrom: "LinkedIn",
//     skills: "Java, React, Node.js",
//     education: "B.Tech Computer Science",
//     experience: "3 years",
//     salary: "₹10,00,000 - ₹12,00,000",
//     joiningDate: "Can join in 13 days",
//     profileImage: null,
//   });

//   useEffect(() => {
//     const generateWelcomeMsg = () => {
//       const now = new Date().getHours();
//       if (now >= 5 && now < 12) {
//         return "Good Morning";
//       } else if (now >= 12 && now < 18) {
//         return "Good Afternoon";
//       } else {
//         return "Good Evening";
//       }
//     };
//     setWelcomeMsg(generateWelcomeMsg());
//   }, []);

//   useEffect(() => {
//     const assessmentCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAssessments = await getAssessmentCount(candidateId);
//           setTotalAssessments(totalAssessments);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     assessmentCountData();
//   }, []);

//   useEffect(() => {
//     const appliedJobsCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAppliedJobs = await getAppliedJobsCount(candidateId);
//           setTotalAppliedJobs(totalAppliedJobs || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     appliedJobsCountData();
//   }, []);

//   useEffect(() => {
//     const interviewCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalInterviews = await getInterviewCount(candidateId);
//           setTotalInterviews(totalInterviews || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     interviewCountData();
//   }, []);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       if (candidateId) {
//         try {
//           const jobs = await getAppliedJobs(candidateId);
//           setAppliedJobs(jobs);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//   };

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("candidateId", candidateId);
//     formData.append("profileImage", file);

//     try {
//       const response = await axios.post(
//         "/your-api-endpoint/upload-image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Image uploaded successfully", response.data);
//       setProfileData({
//         ...profileData,
//         profileImage: URL.createObjectURL(file),
//       });
//     } catch (error) {
//       console.error("Error uploading image", error);
//     }
//   };

//   return (
//     <>
//       <CandidateNavbar />
//       <div className="flex flex-col md:flex-row m-4 p-8">
//         {/* Content Section */}
//         <div className="w-full md:w-2/3 p-6">
//         <h1 className="text-xl font-bold text-[#27235c] mb-2">{welcomeMsg}!  </h1>
//           <div className="mb-4">
//             <h2 className="text-xl font-bold text-[#27235c] mb-2">
//               Your Progress Overview
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Interviews
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalInterviews}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Assessments
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAssessments}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Applied Jobs
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAppliedJobs}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Applied Jobs Section */}
//           <div className="bg-[#f4f4fa] rounded-lg p-6 mt-8 shadow-inner">
//             <h3 className="text-2xl font-semibold text-[#27235c] mb-4">
//               Your Applied Jobs
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {appliedJobs.map((job) => (
//                 <div
//                   key={job.mrfJdId}
//                   className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate(`/job-detail/${job.mrfJdId}`)}
//                 >
//                   <h4 className="text-xl font-bold text-[#27235c]">
//                     {job.jobTitle}
//                   </h4>
//                   <p className="text-gray-600">Parameter: {job.jobParameter}</p>{" "}
//                   {job.rolesAndResponsibilities && (
//                     <p className="text-gray-600">
//                       Roles: {job.rolesAndResponsibilities}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <CandidateProfile
//           profileData={profileData}
//           isEditing={isEditing}
//           handleInputChange={handleInputChange}
//           handleImageChange={handleImageChange}
//           handleEditClick={handleEditClick}
//           handleSaveClick={handleSaveClick}
//         />
//       </div>
//     </>
//   );
// }

// export default CandidateDashboard;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../../assets/CandidateDashboard/RelevantzLogo.png";
// import CandidateNavbar from "./CandidateNavbar";
// import {
//   FaCheckCircle,
//   FaDotCircle,
//   FaEdit,
//   FaLinkedin,
//   FaLocationArrow,
// } from "react-icons/fa";
// import axios from "axios";
// import {
//   getAppliedJobsCount,
//   getAssessmentCount,
//   getInterviewCount,
//   getAppliedJobs,
// } from "../../services/Candidate/CandidateDashboardService";
// import CandidateProfile from "./CandidateProfile";

// function CandidateDashboard() {
//   const [welcomeMsg, setWelcomeMsg] = useState("");
//   const [totalInterviews, setTotalInterviews] = useState(0);
//   const [totalAssessments, setTotalAssessments] = useState(0);
//   const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const navigate = useNavigate();

//   const [currentStage, setCurrentStage] = useState(3);
//   const date = new Date().toLocaleDateString();
//   const meetlink = "http://www.google.com";

//   const candidateId = 45;
//   // const candidateId = sessionStorage.getItem("candidateId");

//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     city: "Pune",
//     mobile: "123-456-7890",
//     candidateId: "12345",
//     sourcedFrom: "LinkedIn",
//     skills: "Java, React, Node.js",
//     education: "B.Tech Computer Science",
//     experience: "3 years",
//     salary: "₹10,00,000 - ₹12,00,000",
//     joiningDate: "Can join in 13 days",
//     profileImage: null,
//   });

//   useEffect(() => {
//     const generateWelcomeMsg = () => {
//       const now = new Date().getHours();
//       if (now >= 5 && now < 12) {
//         return "Good Morning";
//       } else if (now >= 12 && now < 18) {
//         return "Good Afternoon";
//       } else {
//         return "Good Evening";
//       }
//     };
//     setWelcomeMsg(generateWelcomeMsg());
//   }, []);

//   useEffect(() => {
//     const assessmentCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAssessments = await getAssessmentCount(candidateId);
//           setTotalAssessments(totalAssessments);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     assessmentCountData();
//   }, []);

//   useEffect(() => {
//     const appliedJobsCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAppliedJobs = await getAppliedJobsCount(candidateId);
//           setTotalAppliedJobs(totalAppliedJobs || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     appliedJobsCountData();
//   }, []);

//   useEffect(() => {
//     const interviewCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalInterviews = await getInterviewCount(candidateId);
//           setTotalInterviews(totalInterviews || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     interviewCountData();
//   }, []);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       if (candidateId) {
//         try {
//           const jobs = await getAppliedJobs(candidateId);
//           setAppliedJobs(jobs);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//   };

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("candidateId", candidateId);
//     formData.append("profileImage", file);

//     try {
//       const response = await axios.post(
//         "/your-api-endpoint/upload-image",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Image uploaded successfully", response.data);
//       setProfileData({
//         ...profileData,
//         profileImage: URL.createObjectURL(file),
//       });
//     } catch (error) {
//       console.error("Error uploading image", error);
//     }
//   };

//   return (
//     <>
//       <CandidateNavbar />
//       <div className="flex flex-col md:flex-row m-4 p-8">
//         {/* Content Section */}
//         <div className="w-full md:w-3/4 lg:w-3/4 p-6">
//           <h1 className="text-xl font-bold text-[#27235c] mb-2">{welcomeMsg}!</h1>
//           <div className="mb-4">
//             <h2 className="text-xl font-bold text-[#27235c] mb-2">
//               Your Progress Overview
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Interviews
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalInterviews}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Assessments
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAssessments}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Applied Jobs
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAppliedJobs}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Applied Jobs Section */}
//           <div className="bg-[#f4f4fa] rounded-lg p-6 mt-8 shadow-inner">
//             <h3 className="text-2xl font-semibold text-[#27235c] mb-4">
//               Your Applied Jobs
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {appliedJobs.map((job) => (
//                 <div
//                   key={job.mrfJdId}
//                   className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate(`/job-detail/${job.mrfJdId}`)}
//                 >
//                   <h4 className="text-xl font-bold text-[#27235c]">
//                     {job.jobTitle}
//                   </h4>
//                   <p className="text-gray-600">Parameter: {job.jobParameter}</p>{" "}
//                   {job.rolesAndResponsibilities && (
//                     <p className="text-gray-600">
//                       Roles: {job.rolesAndResponsibilities}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Profile Section */}
//         <div className="w-full md:w-1/3 lg:w-1/3 p-6">
//           <CandidateProfile
//             profileData={profileData}
//             isEditing={isEditing}
//             handleInputChange={handleInputChange}
//             handleImageChange={handleImageChange}
//             handleEditClick={handleEditClick}
//             handleSaveClick={handleSaveClick}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default CandidateDashboard;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import CandidateNavbar from "./CandidateNavbar";
// import { getAppliedJobsCount, getAssessmentCount, getInterviewCount, getAppliedJobs } from "../../services/Candidate/CandidateDashboardService";
// import CandidateProfile from "./CandidateProfile";
// import interviewlogo from '../../assets/CandidateDashboard/interview.png';
// import appliedlogo from '../../assets/CandidateDashboard/apply.png';
// import assessmentlogo from '../../assets/CandidateDashboard/assessment.png';

// function CandidateDashboard() {
//   const [welcomeMsg, setWelcomeMsg] = useState("");
//   const [totalInterviews, setTotalInterviews] = useState(0);
//   const [totalAssessments, setTotalAssessments] = useState(0);
//   const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const navigate = useNavigate();

//   const candidateId = 45; // This should be dynamically fetched or set.
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     experience: '',
//     skill: '',
//     location: '',
//     candidateProfileImage: null,
//   });

//   useEffect(() => {
//     const generateWelcomeMsg = () => {
//       const now = new Date().getHours();
//       if (now >= 5 && now < 12) {
//         return "Good Morning";
//       } else if (now >= 12 && now < 18) {
//         return "Good Afternoon";
//       } else {
//         return "Good Evening";
//       }
//     };
//     setWelcomeMsg(generateWelcomeMsg());
//   }, []);

//   useEffect(() => {
//     const assessmentCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAssessments = await getAssessmentCount(candidateId);
//           setTotalAssessments(totalAssessments);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     assessmentCountData();
//   }, []);

//   useEffect(() => {
//     const appliedJobsCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalAppliedJobs = await getAppliedJobsCount(candidateId);
//           setTotalAppliedJobs(totalAppliedJobs || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     appliedJobsCountData();
//   }, []);

//   useEffect(() => {
//     const interviewCountData = async () => {
//       if (candidateId) {
//         try {
//           const totalInterviews = await getInterviewCount(candidateId);
//           setTotalInterviews(totalInterviews || "NA");
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     interviewCountData();
//   }, []);

//   useEffect(() => {
//     const fetchAppliedJobs = async () => {
//       if (candidateId) {
//         try {
//           const jobs = await getAppliedJobs(candidateId);
//           setAppliedJobs(jobs);
//         } catch (error) {
//           console.error(error.message);
//         }
//       }
//     };

//     fetchAppliedJobs();
//   }, []);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(`/get/${candidateId}`);
//         setProfileData(response.data);
//       } catch (error) {
//         console.error("Error fetching profile data", error);
//       }
//     };

//     fetchProfileData();
//   }, [candidateId]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("candidateId", candidateId);
//       formData.append("firstName", profileData.firstName);
//       formData.append("lastName", profileData.lastName);
//       formData.append("experience", profileData.experience);
//       formData.append("skill", profileData.skill);
//       formData.append("location", profileData.location);
//       if (profileData.candidateProfileImage) {
//         formData.append("candidateProfileImage", profileData.candidateProfileImage);
//       }

//       await axios.patch(`/profileupdate/${candidateId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile data", error);
//     }
//   };

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileData({ ...profileData, candidateProfileImage: file });
//   };

//   return (
//     <>
//       <div className="flex flex-col md:flex-row m-4">
//         {/* Content Section */}
//         <div className="w-full md:w-full">
//           <h1 className="text-xl font-bold text-[#27235c] mb-2">{welcomeMsg}!</h1>
//           <div className="mb-4">
//             <h2 className="text-xl font-bold text-[#27235c] mb-2">
//               Your Progress Overview
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//                 <img src={interviewlogo} alt="" />
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Interviews
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalInterviews}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//               <img src={assessmentlogo} alt="" />
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Assessments
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAssessments}
//                 </p>
//               </div>
//               <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
//               <img src={appliedlogo} alt="" />
//                 <h3 className="text-lg font-semibold text-white">
//                   Total Applied Jobs
//                 </h3>
//                 <p className="text-3xl font-bold text-white mt-2">
//                   {totalAppliedJobs}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Applied Jobs Section */}
//           <div className="bg-[#f4f4fa] rounded-lg p-6 mt-8 shadow-inner">
//             <h3 className="text-2xl font-semibold text-[#27235c] mb-4">
//               Your Applied Jobs
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//               {appliedJobs.map((job) => (
//                 <div
//                   key={job.mrfJdId}
//                   className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
//                   onClick={() => navigate(`/job-detail/${job.mrfJdId}`)}
//                 >
//                   <h4 className="text-xl font-bold text-[#27235c]">
//                     {job.jobTitle}
//                   </h4>
//                   <p className="text-gray-600">Parameter: {job.jobParameter}</p>{" "}
//                   {job.rolesAndResponsibilities && (
//                     <p className="text-gray-600">
//                       Roles: {job.rolesAndResponsibilities}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CandidateDashboard;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CandidateNavbar from "./CandidateNavbar";
import { getAppliedJobsCount, getAssessmentCount, getInterviewCount, getAppliedJobs } from "../../services/Candidate/CandidateDashboardService";
import interviewlogo from '../../assets/CandidateDashboard/interview.png';
import appliedlogo from '../../assets/CandidateDashboard/apply.png';
import assessmentlogo from '../../assets/CandidateDashboard/assessment.png';

function CandidateDashboard() {
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [totalAppliedJobs, setTotalAppliedJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  const candidateId = sessionStorage.getItem("candidateId"); // This should be dynamically fetched or set.
  sessionStorage.setItem("candidateId",candidateId);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    experience: '',
    skill: '',
    location: '',
    candidateProfileImage: null,
  });

  useEffect(() => {
    const generateWelcomeMsg = () => {
      const now = new Date().getHours();
      if (now >= 5 && now < 12) {
        return "Good Morning";
      } else if (now >= 12 && now < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };
    setWelcomeMsg(generateWelcomeMsg());
  }, []);

  useEffect(() => {
    const assessmentCountData = async () => {
      if (candidateId) {
        try {
          const totalAssessments = await getAssessmentCount(candidateId);
          setTotalAssessments(totalAssessments || 0);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    assessmentCountData();
  }, []);

  useEffect(() => {
    const appliedJobsCountData = async () => {
      if (candidateId) {
        try {
          const totalAppliedJobs = await getAppliedJobsCount(candidateId);
          setTotalAppliedJobs(totalAppliedJobs || 0);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    appliedJobsCountData();
  }, []);

  useEffect(() => {
    const interviewCountData = async () => {
      if (candidateId) {
        try {
          const totalInterviews = await getInterviewCount(candidateId);
          setTotalInterviews(totalInterviews || 0);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    interviewCountData();
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      if (candidateId) {
        try {
          const jobs = await getAppliedJobs(candidateId);
          setAppliedJobs(jobs || 0);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`/get/${candidateId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [candidateId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("candidateId", candidateId);
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("experience", profileData.experience);
      formData.append("skill", profileData.skill);
      formData.append("location", profileData.location);
      if (profileData.candidateProfileImage) {
        formData.append("candidateProfileImage", profileData.candidateProfileImage);
      }

      await axios.patch(`/profileupdate/${candidateId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data", error);
    }
  };

  const handleInputChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, candidateProfileImage: file });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row m-4">
        {/* Content Section */}
        <div className="w-full md:w-full">
          <h1 className="text-xl font-bold text-[#27235c] mb-2">{welcomeMsg}!</h1>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#27235c] mb-2">
              Your Progress Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex items-center justify-between">
                <img src={interviewlogo} alt="Interviews" className="h-12 w-12 mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    Total Interviews
                  </h3>
                  <p className="text-3xl ml-14 font-bold text-white mt-2">
                    {totalInterviews}
                  </p>
                </div>
              </div>
              <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex items-center justify-between">
                <img src={assessmentlogo} alt="Assessments" className="h-12 w-12 mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    Total Assessments
                  </h3>
                  <p className="text-3xl ml-14 font-bold text-white mt-2">
                    {totalAssessments}
                  </p>
                </div>
              </div>
              <div className="bg-[#27235c] shadow-lg rounded-lg p-6 flex items-center justify-between">
                <img src={appliedlogo} alt="Applied Jobs" className="h-12 w-12 mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    Total Applied Jobs
                  </h3>
                  <p className="text-3xl ml-14 font-bold text-white mt-2">
                    {totalAppliedJobs}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Applied Jobs Section */}
          <div className="bg-[#f4f4fa] rounded-lg p-6 mt-8 shadow-inner">
            <h3 className="text-2xl font-semibold text-[#27235c] mb-4">
              Your Applied Jobs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {appliedJobs.map((job) => (
                <div
                  key={job.mrfJdId}
                  className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/job-detail/${job.mrfJdId}`)}
                >
                  <h4 className="text-xl font-bold text-[#27235c]">
                    {job.jobTitle}
                  </h4>
                  <p className="text-gray-600">Parameter: {job.jobParameter}</p>{" "}
                  {job.rolesAndResponsibilities && (
                    <p className="text-gray-600">
                      Roles: {job.rolesAndResponsibilities}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateDashboard;