

// import React, { useState } from "react";
// import logo from "../../assets/RelevantzLogo.png" // Ensure the logo is correctly imported
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRightFromBracket,
//   faUser,
//   faInbox,
//   faLanguage,
//   faChartSimple,
//   faUsers,
//   faTimes,
//   faIdCard,
//   faFileLines,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
 
// const ClientPartnerNavbar = () => {
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [sidebarOpen, setSidebarOpen] = useState(true); // Initially expanded
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
 
//   const toggleProfileDropdown = () => {
//     setProfileDropdownOpen(!profileDropdownOpen);
//   };
 
//   const toggleLanguageDropdown = () => {
//     setLanguageDropdownOpen(!languageDropdownOpen);
//   };
 
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`bg-[#27235c] h-screen fixed top-0 left-0 transition-transform duration-300 z-50 ${
//           sidebarOpen ? "w-64" : "w-16"
//         }`}
//       >
//         <div className="flex items-center justify-between h-16 px-4">
//           <div
//             onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle Sidebar on Click
//             className="cursor-pointer flex items-center"
//             aria-label="Toggle Sidebar"
//           >
//             <img
//               src={logo}
//               alt="Logo"
//               className={`h-12 transition duration-300 ${sidebarOpen ? "block" : "hidden"}`}
//             />
//           </div>
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle on button click
//             className="text-white"
//           >
//             <FontAwesomeIcon
//               icon={sidebarOpen ? faTimes : null} // Show the 'X' icon when expanded
//               className="w-8 h-8"
//             />
//           </button>
//         </div>
//         <ul className="mt-8 ml-4">
//           <li className="flex items-center p-2 text-white hover:bg-[#3a386f] transition">
//             <a href="#" className="flex items-center">
//               <FontAwesomeIcon icon={faChartSimple} className="w-6 h-6 text-white" />
//               {sidebarOpen && <span className="ml-4">Reports</span>}
//             </a>
//           </li>
//           <li
//             className="flex items-center p-2 text-white hover:bg-[#3a386f] transition"
//             onClick={() => navigate("/clientDash")} // Directly navigate on click
//           >
//             <a href="#" className="flex items-center">
//               <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white" />
//               {sidebarOpen && <span className="ml-4">Clients</span>}
//             </a>
//           </li>
//           <li
//             className="flex items-center p-2 text-white hover:bg-[#3a386f] transition"
//             onClick={() => navigate("/clientRequirementView")} // Directly navigate on click
//           >
//             <a href="#" className="flex items-center">
//               <FontAwesomeIcon icon={faFileLines} className="w-6 h-6 text-white" />
//               {sidebarOpen && <span className="ml-4">Requirement Details</span>}
//             </a>
//           </li>
//           <li
//             className="flex items-center p-2 text-white hover:bg-[#3a386f] transition"
//             onClick={() => navigate("/viewMrf")} // Directly navigate on click
//           >
//             <a href="#" className="flex items-center">
//               <FontAwesomeIcon icon={faIdCard} className="w-6 h-6 text-white" />
//               {sidebarOpen && <span className="ml-4">MRF Summary</span>}
//             </a>
//           </li>
          
//           {/* Add more items as needed */}
//         </ul>
//       </div>
 
//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
//       >
//         {/* Top Navbar */}
//         <nav className="bg-[#27235c] text-white p-3 flex justify-between items-center w-full fixed top-0 left-0 z-40">
//           <div className="flex items-center">
//             <img
//               src={logo}
//               alt="Logo"
//               className="h-12 ml-10 cursor-pointer" // Make the top navbar logo clickable too
//               onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle Sidebar on Click
//             />
//           </div>
//           {/* Profile and Language Dropdowns */}
//           <div className="flex items-center space-x-3">
//             {/* Language Dropdown */}
//             <div className="relative">
//               <button onClick={toggleLanguageDropdown} className="flex items-center">
//                 <FontAwesomeIcon icon={faLanguage} className="w-7 h-7" />
//               </button>
//               {languageDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     English
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     Español
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     Français
//                   </a>
//                 </div>
//               )}
//             </div>
 
//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button onClick={toggleProfileDropdown} className="flex items-center space-x-1">
//                 <img
//                   src="https://via.placeholder.com/40"
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <div className="text-left">
//                   <span className="block text-sm">Aneesh</span>
//                   <span className="block text-xs text-gray-400">Client Partner</span>
//                 </div>
//               </button>
 
//               {profileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
//                   </a>
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox
//                   </a>
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" /> Logout
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };
 
// export default ClientPartnerNavbar;


// import React, { useState } from "react";
// import logo from "../../assets/RelevantzLogo.png"; 
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRightFromBracket,
//   faUser,
//   faInbox,
//   faLanguage,
//   faChartPie, 
//   faUsers,
//   faChevronLeft,
//   faChevronRight,
//   faIdCard,
//   faFileAlt
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const ClientPartnerNavbar = ({ setSidebarOpen, sidebarOpen }) => {
//   const navigate = useNavigate();
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

//   const toggleProfileDropdown = () => {
//     setProfileDropdownOpen(prev => !prev);
//   };

//   const toggleLanguageDropdown = () => {
//     setLanguageDropdownOpen(prev => !prev);
//   };

//   const toggleSidebar = () => {
//     if (typeof setSidebarOpen === "function") {
//       setSidebarOpen(prevState => !prevState); // Use previous state to toggle
//     } else {
//       console.error("setSidebarOpen is not a function");
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`bg-[#27235c] h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? "w-64" : "w-16"}`}
//       >
//         <div className="flex items-center justify-between h-16 px-4">
//           <div className="cursor-pointer flex items-center" aria-label="Toggle Sidebar" onClick={toggleSidebar}>
//             <img
//               src={logo}
//               alt="Logo"
//               className={`h-12 transition duration-300 ${sidebarOpen ? "block" : "hidden"}`}
//             />
//           </div>
//           <button onClick={toggleSidebar} className="text-white">
//             <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} className="w-6 h-6" />
//           </button>
//         </div>

//         <ul className="mt-8 ml-4">
//           <li 
//             className={`flex items-center p-2 text-white transition`} 
//             onClick={() => navigate("/clientPartnerDashboard")} // Change this based on your reports route
//           >
//             <FontAwesomeIcon icon={faChartPie} className="w-6 h-6 text-white" />
//             {sidebarOpen && <span className="ml-4">Reports</span>}
//           </li>
//           <li 
//             className={`flex items-center p-2 text-white transition`} 
//             onClick={() => { navigate("/clientDash"); }}
//           >
//             <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white" />
//             {sidebarOpen && <span className="ml-4">Clients</span>}
//           </li>
//           <li 
//             className={`flex items-center p-2 text-white transition`} 
//             onClick={() => { navigate("/clientRequirementView"); }}
//           >
//             <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6 text-white" />
//             {sidebarOpen && <span className="ml-4">Requirement Details</span>}
//           </li>
//           <li 
//             className={`flex items-center p-2 text-white transition`} 
//             onClick={() => { navigate("/viewMrf"); }}
//           >
//             <FontAwesomeIcon icon={faIdCard} className="w-6 h-6 text-white" />
//             {sidebarOpen && <span className="ml-4">MRF Summary</span>}
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className={`flex-1 transition-all duration-300`}>
//         {/* Top Navbar */}
//         <nav className="bg-[#27235c] text-white p-3 flex justify-between items-center w-full fixed top-0 left-0 z-40">
//           <div className="flex items-center">
//             <button className="mr-3" onClick={toggleSidebar} aria-label="Toggle Sidebar">
//               <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} className="w-5 h-5" />
//             </button>
//             <img src={logo} alt="Logo" className="h-12 cursor-pointer ml-4" onClick={toggleSidebar} />
//           </div>

//           {/* Profile and Language Dropdowns */}
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <button onClick={toggleLanguageDropdown} className="flex items-center">
//                 <FontAwesomeIcon icon={faLanguage} className="w-7 h-7" />
//               </button>
//               {languageDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">English</a>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Español</a>
//                   <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Français</a>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button onClick={toggleProfileDropdown} className="flex items-center space-x-1">
//                 <img src="https://via.placeholder.com/40" alt="Profile" className="w-8 h-8 rounded-full" />
//                 <div className="text-left">
//                   <span className="block text-sm">Aneesh</span>
//                   <span className="block text-xs text-gray-400">Client Partner</span>
//                 </div>
//               </button>

//               {profileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
//                   </a>
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox
//                   </a>
//                   <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
//                     <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" /> Logout
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default ClientPartnerNavbar;

import React, { useState, useEffect } from "react";
import logo from "../../assets/RelevantzLogo.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faInbox,
  faLanguage,
  faChartPie, 
  faUsers,
  faChevronLeft,
  faChevronRight,
  faIdCard,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getUserLoginCredentialsById, formatUserProfile } from '../../services/Profile/Profile'; // Import your user service functions

const ClientPartnerNavbar = ({ setSidebarOpen, sidebarOpen, userId }) => {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleProfileDropdown = () => setProfileDropdownOpen(prev => !prev);
  const toggleLanguageDropdown = () => setLanguageDropdownOpen(prev => !prev);
  const toggleSidebar = () => {
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen(prevState => !prevState);
    } else {
      console.error("setSidebarOpen is not a function");
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserLoginCredentialsById(userId);
        const formattedProfile = formatUserProfile(userData);
        setUserProfile(formattedProfile);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (error) {
    return <div>{error}</div>; // Optional error state
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#27235c] h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div 
            className="cursor-pointer flex items-center" 
            onClick={toggleSidebar} 
            aria-label="Toggle Sidebar"
          >
            <img
              src={logo}
              alt="Logo"
              className={`h-12 transition duration-300 ${sidebarOpen ? "block" : "hidden"}`}
            />
          </div>
          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} className="w-6 h-6" />
          </button>
        </div>

        <ul className="mt-8 ml-4">
          <li className={`flex items-center p-2 text-white transition`} onClick={() => navigate("/clientPartnerDashboard")}>
            <FontAwesomeIcon icon={faChartPie} className="w-6 h-6 text-white" />
            {sidebarOpen && <span className="ml-4">Reports</span>}
          </li>
          <li className={`flex items-center p-2 text-white transition`} onClick={() => { navigate("/clientDash"); }}>
            <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white" />
            {sidebarOpen && <span className="ml-4">Clients</span>}
          </li>
          <li 
            className={`flex items-center p-2 text-white transition`} 
            onClick={() => { navigate("/clientRequirementView"); }}
          >
            <FontAwesomeIcon icon={faFileAlt} className="w-6 h-6 text-white" />
            {sidebarOpen && <span className="ml-4">Requirement Details</span>}
          </li>
          <li 
            className={`flex items-center p-2 text-white transition`} 
            onClick={() => { navigate("/viewMrf"); }}
          >
            <FontAwesomeIcon icon={faIdCard} className="w-6 h-6 text-white" />
            {sidebarOpen && <span className="ml-4">MRF Summary</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300`}>
        {/* Top Navbar */}
        <nav className="bg-[#27235c] text-white p-3 flex justify-between items-center w-full fixed top-0 left-0 z-40">
          <div className="flex items-center">
            <button className="mr-3" onClick={toggleSidebar} aria-label="Toggle Sidebar">
              <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} className="w-5 h-5" />
            </button>
            <img src={logo} alt="Logo" className="h-12 cursor-pointer ml-4" onClick={toggleSidebar} />
          </div>

          {/* Profile and Language Dropdowns */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button onClick={toggleLanguageDropdown} className="flex items-center">
                <FontAwesomeIcon icon={faLanguage} className="w-7 h-7" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">English</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Español</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Français</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={toggleProfileDropdown} className="flex items-center space-x-1">
                {userProfile ? (
                  <>
                    <img src={userProfile.profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                    <div className="text-left">
                      <span className="block text-sm">{userProfile.name}</span>
                      <span className="block text-xs text-gray-400">{userProfile.roleName}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-left">
                    <span className="block text-sm">Anonymous</span>
                    <span className="block text-xs text-gray-400">Unknown Role</span>
                  </div>
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faInbox} className="mr-2" /> Inbox
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ClientPartnerNavbar;