// import React, { useState } from 'react';
// import { FaLocationArrow, FaLinkedin, FaEdit, FaSave } from 'react-icons/fa';

// const CandidateProfile = () => {
//   const [isEditing, setIsEditing] = useState({
//     skills: false,
//     education: false,
//     experience: false,
//     salary: false,
//     joiningDate: false,
//   });

//   const [profileData, setProfileData] = useState({
//     name: 'John Doe',
//     city: 'Pune',
//     mobile: '123-456-7890',
//     candidateId: '12345',
//     sourcedFrom: 'LinkedIn',
//     skills: 'Java, React, Node.js',
//     education: 'B.Tech Computer Science',
//     experience: '3 years',
//     salary: '₹10,00,000 - ₹12,00,000',
//     joiningDate: 'Can join in 13 days',
//   });

//   const handleEditClick = (field) => {
//     setIsEditing({ ...isEditing, [field]: true });
//   };

//   const handleSaveClick = (field) => {
//     setIsEditing({ ...isEditing, [field]: false });
//   };

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   return (
//     <div className="w-1/3 p-4 border rounded-lg shadow-lg bg-white">
//       <div className="flex items-start mb-4">
//         <img src="path/to/profile-pic.jpg" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
//         <div>
//           <h2 className="text-xl font-bold">{profileData.name}</h2>
//           <div className="flex items-center text-gray-700 mb-1">
//             <FaLocationArrow className="mr-1" />
//             {profileData.city}
//             <span className="mx-2">|</span>
//             {profileData.mobile}
//           </div>
//           <div className="flex items-center text-gray-700">
//             <p className="mr-2">Candidate ID: {profileData.candidateId}</p>
//             <p className="mr-2">Sourced from: {profileData.sourcedFrom}</p>
//             <FaLinkedin className="text-blue-700" />
//           </div>
//         </div>
//       </div>

//       {['skills', 'education', 'experience', 'salary', 'joiningDate'].map((field) => (
//         <div key={field} className="mb-4">
//           <h3 className="font-semibold capitalize">{field}:</h3>
//           {isEditing[field] ? (
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={profileData[field]}
//                 onChange={(e) => handleInputChange(e, field)}
//                 className="border p-1 rounded mr-2"
//               />
//               <FaSave className="cursor-pointer text-green-500" onClick={() => handleSaveClick(field)} />
//             </div>
//           ) : (
//             <div className="flex items-center justify-between">
//               <span>{profileData[field]}</span>
//               <FaEdit className="cursor-pointer text-blue-500" onClick={() => handleEditClick(field)} />
//             </div>
//           )}
//         </div>
//       ))}

//       <div className="border-t pt-4 mt-4">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-lg font-semibold">Documents</h3>
//           <span className="text-blue-500 cursor-pointer">Click to download</span>
//         </div>
//         <ul className="list-disc ml-4 mb-4">
//           <li className="flex justify-between">
//             <span>Resume</span>
//             <button className="text-green-500">Download</button>
//           </li>
//           <li className="flex justify-between">
//             <span>Cover Letter</span>
//             <button className="text-green-500">Download</button>
//           </li>
//           <li className="flex justify-between">
//             <span>Attachments</span>
//             <button className="text-green-500">Download</button>
//           </li>
//         </ul>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Download All</button>
//       </div>
//     </div>
//   );
// };

// export default CandidateProfile;


// import React from 'react';
// import { FaEdit, FaLinkedin, FaLocationArrow } from 'react-icons/fa';

// const CandidateProfile = ({
//   profileData,
//   isEditing,
//   handleInputChange,
//   handleImageChange,
//   handleEditClick,
//   handleSaveClick
// }) => {
//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white w-full">
//       <div className="flex flex-col items-center mb-4">
//         {profileData.profileImage ? (
//           <img
//             src={profileData.profileImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full mb-4"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-gray-200 cursor-pointer">
//             <FaEdit className="text-gray-500" />
//             <input
//               type="file"
//               onChange={handleImageChange}
//               className="absolute opacity-0 cursor-pointer w-24 h-24"
//             />
//           </div>
//         )}
//         <div>
//           <h2 className="text-xl font-bold">{profileData.name}</h2>
//           <div className="flex items-center text-gray-700 mb-1">
//             <FaLocationArrow className="mr-1" /> {profileData.city}{" "}
//             <span className="mx-2">|</span> {profileData.mobile}
//           </div>
//           <div className="flex items-center text-gray-700">
//             <p className="mr-2">{profileData.candidateId}</p>
//             <span className="mx-2">|</span>
//             <p className="mr-2">Sourced from: {profileData.sourcedFrom}</p>
//             <FaLinkedin className="text-blue-700" />
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-100 p-4 rounded lg">
//         {["skills", "education", "experience", "salary", "joiningDate"].map(
//           (field, index) => (
//             <div key={field} className="mb-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold capitalize">{field}:</h3>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={profileData[field]}
//                     onChange={(e) => handleInputChange(e, field)}
//                     className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                   />
//                 ) : (
//                   <p className="border-b-2 border-transparent w-2/3">
//                     {profileData[field]}
//                   </p>
//                 )}
//               </div>
//               {index < 4 && (
//                 <hr className="border-t-2 border-gray-300 my-2" />
//               )}
//             </div>
//           )
//         )}
//       </div>
//       <div className="flex justify-between mt-4">
//         {isEditing ? (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={handleSaveClick}
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={handleEditClick}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//       <div className="border-t pt-4 mt-4">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-lg font-semibold">Documents</h3>
//           <span className="text-blue-500 cursor-pointer">Click to download</span>
//         </div>
//         <div className="flex space-x-4 mb-4">
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Resume</button>
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Cover Letter</button>
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Attachments</button>
//         </div>
//         <button className="bg-[#27235c] text-white px-4 py-2 rounded">Download All</button>
//       </div>
//     </div>
//   );
// };

// export default CandidateProfile;

// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaLinkedin, FaLocationArrow, FaUser } from 'react-icons/fa';
// import { getCandidateById, updateCandidateProfile } from '../../services/Candidate/CandidateDashboardService';

// const CandidateProfile = ({ candidateId, isEditing, handleEditClick, handleSaveClick }) => {
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     experience: '',
//     resume: '',
//     source: '',
//     skill: '',
//     location: '',
//     panNumber: '',
//     candidateProfileImage: '',
//   });

//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const data = await getCandidateById(candidateId);
//         setProfileData(data);
//       } catch (error) {
//         console.error('Error fetching candidate data', error);
//       }
//     };

//     fetchCandidate();
//   }, [candidateId]);

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProfileData({ ...profileData, candidateProfileImage: file });
//   };

//   const handleSaveClickInternal = async () => {
//     try {
//       await updateCandidateProfile(candidateId, profileData);
//       handleSaveClick();
//     } catch (error) {
//       console.error('Error updating candidate profile', error);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white w-full">
//       <div className="flex flex-col items-center mb-4">
//         {profileData.candidateProfileImage ? (
//           typeof profileData.candidateProfileImage === 'string' ? (
//             <img
//               src={profileData.candidateProfileImage}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mb-4"
//             />
//           ) : (
//             <img
//               src={URL.createObjectURL(profileData.candidateProfileImage)}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mb-4"
//             />
//           )
//         ) : (
//           <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-gray-200 cursor-pointer">
//             <FaEdit className="text-gray-500" />
//             <input
//               type="file"
//               onChange={handleImageChange}
//               className="absolute opacity-0 cursor-pointer w-24 h-24"
//             />
//           </div>
//         )}
//         <div>
//           <h2 className="text-xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h2>
//           <div className="flex items-center text-gray-700 mb-1">
//             <FaLocationArrow className="mr-1" /> {profileData.location}
//             <span className="mx-2">|</span> {profileData.mobileNumber}
//           </div>
//           <div className="flex items-center text-gray-700">
//             <FaUser className="mr-1" /> {profileData.email}
//           </div>
//           <div className="flex items-center text-gray-700 mt-2">
//             <p className="mr-2">Sourced from: {profileData.source}</p>
//             {profileData.source === 'LinkedIn' ? (
//               <FaLinkedin className="text-blue-700" />
//             ) : (
//               <FaUser className="text-gray-500" />
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-100 p-4 rounded lg">
//         {["experience", "skill", "panNumber"].map((field, index) => (
//           <div key={field} className="mb-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold capitalize">{field}:</h3>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profileData[field]}
//                   onChange={(e) => handleInputChange(e, field)}
//                   className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                 />
//               ) : (
//                 <p className="border-b-2 border-transparent w-2/3">
//                   {profileData[field]}
//                 </p>
//               )}
//             </div>
//             {index < 2 && (
//               <hr className="border-t-2 border-gray-300 my-2" />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between mt-4">
//         {isEditing ? (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={handleSaveClickInternal}
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={handleEditClick}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//       <div className="border-t pt-4 mt-4">
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="text-lg font-semibold">Documents</h3>
//           <span className="text-blue-500 cursor-pointer">Click to download</span>
//         </div>
//         <div className="flex space-x-4 mb-4">
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Resume</button>
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Cover Letter</button>
//           <button className="bg-[#27235c] text-white px-3 py-1 rounded">Attachments</button>
//         </div>
//         <button className="bg-[#27235c] text-white px-4 py-2 rounded">Download All</button>
//       </div>
//     </div>
//   );
// };

// export default CandidateProfile;

// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaLinkedin, FaLocationArrow, FaUser } from 'react-icons/fa';
// import { getCandidateById, updateCandidateProfile } from '../../services/Candidate/CandidateDashboardService';

// const CandidateProfile = ({ candidateId }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     experience: '',
//     resume: '',
//     source: '',
//     skill: '',
//     location: '',
//     panNumber: '',
//     candidateProfileImage: '',
//   });

//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const data = await getCandidateById(candidateId);
//         setProfileData(data);
//       } catch (error) {
//         console.error('Error fetching candidate data', error);
//       }
//     };

//     fetchCandidate();
//   }, [candidateId]);

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfileData({ ...profileData, candidateProfileImage: reader.result.split(',')[1] }); // Extract the Base64 string
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSaveClick = async () => {
//     try {
//       await updateCandidateProfile(candidateId, profileData);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating candidate profile', error);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white w-full">
//       <div className="flex flex-col items-center mb-4">
//         <label htmlFor="image-upload" className={`cursor-pointer relative ${isEditing ? '' : 'pointer-events-none'}`}>
//           {profileData.candidateProfileImage ? (
//             <img
//               src={`data:image/png;base64,${profileData.candidateProfileImage}`}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mb-4"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-gray-200">
//               <FaEdit className="text-gray-500" />
//             </div>
//           )}
//           {isEditing && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//               <FaEdit className="text-white" />
//             </div>
//           )}
//           <input
//             type="file"
//             id="image-upload"
//             onChange={handleImageChange}
//             className="hidden"
//           />
//         </label>
//         <div>
//           <h2 className="text-xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h2>
//           <div className="flex items-center text-gray-700 mb-1">
//             <FaLocationArrow className="mr-1" /> {profileData.location}
//             <span className="mx-2">|</span> {profileData.mobileNumber}
//           </div>
//           <div className="flex items-center text-gray-700">
//             <FaUser className="mr-1" /> {profileData.email}
//           </div>
//           <div className="flex items-center text-gray-700 mt-2">
//             <p className="mr-2">Sourced from: {profileData.source}</p>
//             {profileData.source === 'LinkedIn' ? (
//               <FaLinkedin className="text-blue-700" />
//             ) : (
//               <FaUser className="text-gray-500" />
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-100 p-4 rounded lg">
//         {["experience", "skill", "panNumber"].map((field, index) => (
//           <div key={field} className="mb-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold capitalize">{field}:</h3>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profileData[field]}
//                   onChange={(e) => handleInputChange(e, field)}
//                   className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                 />
//               ) : (
//                 <p className="border-b-2 border-transparent w-2/3">
//                   {profileData[field]}
//                 </p>
//               )}
//             </div>
//             {index < 2 && (
//               <hr className="border-t-2 border-gray-300 my-2" />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between mt-4">
//         {isEditing ? (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={handleSaveClick}
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateProfile;


//best one
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { FaEdit } from 'react-icons/fa';
// import { getCandidateById, updateCandidateProfile } from '../../services/Candidate/CandidateDashboardService';

// const CandidateProfile = ({ candidateId }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileData, setProfileData] = useState({
//     firstName: '',
//     lastName: '',
//     mobileNumber: '',
//     email: '',
//     experience: '',
//     resume: '',
//     source: '',
//     skill: '',
//     location: '',
//     panNumber: '',
//     documentStatus: '', // New field for document status
//     candidateProfileImage: '',
//   });

//   useEffect(() => {
//     const fetchCandidate = async () => {
//       try {
//         const data = await getCandidateById(candidateId);
//         setProfileData(data);
//       } catch (error) {
//         console.error('Error fetching candidate data', error);
//       }
//     };

//     fetchCandidate();
//   }, [candidateId]);

//   const handleInputChange = (e, field) => {
//     setProfileData({ ...profileData, [field]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
//       toast.error('Only JPEG/PNG files are allowed.');
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfileData({ ...profileData, candidateProfileImage: reader.result.split(',')[1] }); // Extract the Base64 string
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSaveClick = async () => {
//     try {
//       await updateCandidateProfile(candidateId, profileData);
//       setIsEditing(false);
//       toast.success('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating candidate profile', error);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-lg bg-white w-full" style={{ fontSize: '14px' }}>
//       <div className="flex flex-col items-center mb-4">
//         <label htmlFor="image-upload" className={`cursor-pointer relative ${isEditing ? '' : 'pointer-events-none'}`}>
//           {profileData.candidateProfileImage ? (
//             <img
//               src={`data:image/png;base64,${profileData.candidateProfileImage}`}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mb-4"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center bg-gray-200">
//               <FaEdit className="text-gray-500" />
//             </div>
//           )}
//           {isEditing && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
//               <FaEdit className="text-white" />
//             </div>
//           )}
//           <input
//             type="file"
//             id="image-upload"
//             onChange={handleImageChange}
//             className="hidden"
//           />
//         </label>
//         <h2 className="text-lg font-bold text-center">{`${profileData.firstName} ${profileData.lastName}`}</h2>
//       </div>
//       <div className="text-center mb-4">
//         {profileData.location} | {profileData.mobileNumber}
//         <div>{profileData.email}</div>
//         <div className="mt-2">
//           {profileData.source === 'LinkedIn' || profileData.source === 'Scraping' ? (
//             <span className="text-blue-700">Sourced from LinkedIn</span>
//           ) : (
//             <span>Sourced from {profileData.source}</span>
//           )}
//         </div>
//       </div>
//       <div className="bg-gray-100 p-4 rounded-lg mb-4">
//         {["experience", "skill", "panNumber"].map((field, index) => (
//           <div key={field} className="mb-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-semibold capitalize">{field}</h3>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   value={profileData[field]}
//                   onChange={(e) => handleInputChange(e, field)}
//                   className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
//                 />
//               ) : (
//                 <p className="border-b-2 border-transparent w-2/3">
//                   {profileData[field]}
//                 </p>
//               )}
//             </div>
//             {index < 2 && (
//               <hr className="border-t-2 border-gray-300 my-2" />
//             )}
//           </div>
//         ))}
//       </div>
//       <div className="bg-gray-100 p-4 rounded-lg">
//         <div className="mb-4">
//           <h3 className="font-semibold capitalize">Document Status:</h3>
//           {profileData.documentStatus ? (
//             <p>{profileData.documentStatus}</p>
//           ) : (
//             <p>
//               No documents uploaded. <a href="/upload-documents" className="text-blue-500">Upload Documents</a>
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="flex justify-between mt-4">
//         {isEditing ? (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded transition duration-300 hover:bg-[#1e1b4b]"
//             onClick={handleSaveClick}
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             className="bg-[#27235c] text-white px-4 py-2 rounded transition duration-300 hover:bg-[#1e1b4b]"
//             onClick={() => setIsEditing(true)}
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateProfile;

//meenakshi code

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getCandidateById, updateCandidateProfile } from '../../services/Candidate/CandidateDashboardService';
import { FaEdit } from 'react-icons/fa';
 
const CandidateProfile = ({ candidateId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    experience: '',
    resume: '',
    source: '',
    skill: '',
    location: '',
    panNumber: '',
    documentStatus: '',
    candidateProfileImage: '',
    candidateResume:''
  });
 
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const data = await getCandidateById(candidateId);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching candidate data', error);
      }
    };
 
    fetchCandidate();
  }, [candidateId]);
 
  const handleInputChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast.error('Only JPEG/PNG files are allowed.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, candidateProfileImage: reader.result.split(',')[1] });
    };
    reader.readAsDataURL(file);
  };
 
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.match('application/pdf')) {
      toast.error('Only PDF files are allowed for the Resume.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, resume: reader.result.split(',')[1] }); // Extract the Base64 string for the resume
    };
    reader.readAsDataURL(file);
  };
 
  const handleSaveClick = async () => {
    try {
      await updateCandidateProfile(candidateId, profileData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating candidate profile', error);
    }
  };
 
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white w-full">
      <div className="flex mb-4">
        <label htmlFor="image-upload" className="cursor-pointer relative">
          {profileData.candidateProfileImage ? (
            <img
              src={`data:image/png;base64,${profileData.candidateProfileImage}`}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <FaEdit className="text-gray-500" />
            </div>
          )}
          <input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <div className="flex flex-col justify-center pl-4">
          <h2 className="text-lg font-bold text-left">{`${profileData.firstName} ${profileData.lastName}`}</h2>
          <div className="flex justify-between items-center">
            <span className="text-sm">{profileData.location}</span>
            <FaEdit className="cursor-pointer" onClick={() => setIsEditing(!isEditing)} />
          </div>
          <p className="text-sm">{profileData.mobileNumber}</p>
          <p className="text-sm text-gray-500">
            {profileData.source === 'LinkedIn' || profileData.source === 'Scraping'
              ? "Sourced from LinkedIn"
              : `Sourced from ${profileData.source}`
            }
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
 
        {["experience", "skill", "panNumber"].map((field) => (
          <div key={field} className="mb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold capitalize">{field}</h4>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData[field]}
                  onChange={(e) => handleInputChange(e, field)}
                  className="border-b-2 border-[#27235C] outline-none w-2/3 bg-transparent"
                />
              ) : (
                <p className="w-2/3">{profileData[field]}</p>
              )}
            </div>
            <hr className="border-t-2 border-gray-300 my-2" />
          </div>
        ))}
        <div className="mb-4">
          <h4 className="font-semibold">Resume:</h4>
          {profileData.resume ? (
            <a
              href={`data:application/pdf;base64,${profileData.candidateResume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 btn-primary"
            >
              View Current Resume
            </a>
          ) : (
            <p>No resume uploaded.</p>
          )}
          {isEditing && (
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="mt-2"
            />
          )}
        </div>
        {isEditing && (
          <button
            className="bg-[#27235c] text-white px-4 py-2 rounded mt-2"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold">Documents:</h3>
        <div>
          {profileData.documentStatus ? (
            <p>{profileData.documentStatus}</p>
          ) : (
            <p>
              No documents uploaded. <a href="/upload-documents" className="text-blue-500">Upload Documents</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default CandidateProfile;
 