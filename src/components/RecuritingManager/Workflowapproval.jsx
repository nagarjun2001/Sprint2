import {
  faClipboardCheck,
  faClipboardList,
  faTimesCircle,
  faUsers,
  faSearch,
  faChevronDown,
  faBuilding,
  faWarning,
  faReceipt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import RecruitingManagerNavbar from "./RecruitingManagerNavbar";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllWorkFlowByEmployeeId, getRecruitmentProcessLevelByMrf, updateWorkFlow } from "../../services/RecruitingManager/WorkFlowApprovalService";

const Workflowapproval = () => {
  const [mrfData, setMrfData] = useState([]);
  const [filteredMrfData, setFilteredMrfData] = useState([]);
  const [selectedMrf, setSelectedMrf] = useState(null);
  const [recruitmentLevels, setRecruitmentLevels] = useState([]);
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [reason, setReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const employeeId =  sessionStorage.getItem("employeeId") || 1;
  const [buttonText, setButtonText] = useState("Approval Status");
  const [statusSelected, setStatusSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedFilter, setSelectedFilter] = useState("All");

  const levelColors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All MRFs");

  const options = ["All MRFs", "Approved", "Rejected", "Hold"];

  const handleFilterChange = (status) => {
    console.log(status); // Replace with your filter change logic
    setActiveFilter(status);
    setFilteredStatus(status);

    if (status === "") {
      setFilteredMrfData(mrfData); // If filter is cleared, show all data
    } else {
      setFilteredMrfData(mrfData.filter((item) => item.status === status)); // Filter based on status
    }
  };

  useEffect(() => {
    const fetchMrfData = async (employeeId) => {
      try {
        const response = await getAllWorkFlowByEmployeeId(employeeId)
        setMrfData(response.data);
        setFilteredMrfData(response.data); // Initially, display all MRFs
      } catch (error) {
        console.error("Error fetching MRF data:", error);
      }
    };
    fetchMrfData(employeeId);
  }, [employeeId, mrfData.status], [mrfData]);

  const [filteredStatus, setFilteredStatus] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state

    if (term === "") {
      setFilteredMrfData(mrfData); // If search term is empty, show all MRF data
    } else {
      const filteredData = mrfData.filter(
        (item) =>
          item.mrf.mrfDepartmentName
            .toLowerCase()
            .includes(term.toLowerCase()) ||
          item.workFlowType.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMrfData(filteredData); // Update the filtered data based on the search term
    }
  };

  const fetchRecruitmentLevels = async (mrfId) => {
    setLoadingLevels(true);
    setErrorMessage("");
    try {
      const response = await getRecruitmentProcessLevelByMrf(mrfId);
      setRecruitmentLevels(response.data);
      setLoadingLevels(false);
    } catch (error) {
      setLoadingLevels(false);
      setErrorMessage(
        "Failed to fetch recruitment levels. Please try again later."
      );
    }
  };

  const handleCardClick = (item) => {
    setSelectedMrf(item);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLevel(null);
  };

  const handleViewLevelsClick = (mrfId) => {
    fetchRecruitmentLevels(mrfId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMrf(null);
    setSelectedLevel(null); // Reset selected level
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setDropdownOpen(false); // Close dropdown after selection
    setButtonText(status); // Change the button text to the selected status
  };

  const handleSaveStatus = async () => {
    if (!selectedStatus) {
      toast.error("Please select an approval status");
    }
    else if (reason.trim() === '') {
      toast.error("Please enter a reason for the status change");
    }
    else if (reason.length < 10) {
      toast.error("Reason is too short");
    }
    try {
      const workflowId = selectedMrf.workflowId; 
      const data = {
        status: selectedStatus,
        reason: reason || null,
      };
      await updateWorkFlow(workflowId, data);
      if (reason.length > 10) {
        toast.success("Status updated successfully");
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  // const handleFilterChange = (status) => {
  // setFilteredStatus(status);
  // setSelectedFilter(status);
  // setStatusFilter(status);
  // if (status === "") {
  //   setFilteredMrfData(mrfData); // If filter is cleared, show all data
  // } else {
  //   setFilteredMrfData(mrfData.filter((item) => item.status === status)); // Filter based on status
  // }
  // };

  const handleLevelClick = (levelIndex) => {
    setSelectedLevel(levelIndex); // Set the selected level
  };

  const handleClose = () => {
    setButtonText("Approval Status"); // Reset to default button text
    setStatusSelected(false); // Reset status selected
  };

  // const [activeFilter, setActiveFilter] = useState('All MRFs');

  return (
    <>      
      <RecruitingManagerNavbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className={`min-h-screen bg-[#F5F5F5] p-4 flex flex-col ml-${sidebarOpen ? "64" : "16"} transition-all duration-300`}>
        <div className="mt-20 mb-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Recruitment Approval Dashboard</h2>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {[
            {
              icon: faClipboardList,
              title: "All MRF",
              value: mrfData.length,
              status: "",
            },
            {
              icon: faUsers,
              title: "Approved",
              value: mrfData.filter((mrf) => mrf.status === "Approved").length,
              status: "Approved",
            },
            {
              icon: faUsers,
              title: "Rejected",
              value: mrfData.filter((mrf) => mrf.status === "Rejected").length,
              status: "Rejected",
            },
            {
              icon: faUsers,
              title: " OnHold",
              value: mrfData.filter((mrf) => mrf.status === "Hold").length,
              status: "Hold",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-[linear-gradient(to_right,_rgb(151,_36,_126),_rgb(224,_25,_80))] text-white hover:opacity-80 transition duration-300 ease-in-out rounded-lg shadow-md p-6 flex flex-col items-center justify-center transform hover:scale-105 cursor-pointer"
              onClick={() => {
                handleFilterChange(card.status);
                if (card.status === "All") {
                  setFilteredStatus(null); // Clear filters when showing all
                }
              }}
            >
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={card.icon} className="text-5xl mb-2" />
                <p className="text-4xl font-bold">{card.value}</p>
                <h3 className="text-lg font-semibold text-center">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-4">
          {" "}
          {/* Removed margin top to align properly */}
          <div className="flex flex-col sm:flex-row justify-center items-center p-4 w-full max-w-xl mx-auto mt-2">
            <input
              type="text"
              placeholder="Search MRF"
              className="outline-none border-2 border-[#23275c] p-2 rounded-lg mb-4 sm:mb-0 sm:mr-4 flex-grow"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)} // Call handleSearch on input change
            />

            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="inline-flex justify-between items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                  {activeFilter}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleFilterChange(
                            option === "All MRFs" ? "" : option
                          )
                        }
                        className={`block px-4 py-2 text-sm w-full text-left ${activeFilter === option
                          ? "bg-[#23275c] text-white"
                          : "text-gray-700 hover:bg-[#23275c] hover:text-white"
                          } transition-colors duration-300`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
            {filteredMrfData.length === 0 ? (
              <div className="text-center text-gray-200">
                No MRF data available
              </div>
            ) : (
              filteredMrfData.map((item) => (
                <div
                  key={item.mrf.clientPartnerName}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full max-w-sm" // Increased width by changing max-w-xs to max-w-sm
                  onClick={() => handleCardClick(item)}
                >
                  <div className="p-4 flex justify-between">
                    <div className="flex-grow">
                      <p className="text-md text-gray-800 mb-2">
                        <span className="font-medium">
                          <strong><FontAwesomeIcon icon={faUsers} /> MRF Name:</strong>
                        </span>{" "}
                        {item.mrf.mrfDepartmentName}
                      </p>
                      <p className="text-md text-gray-800 mb-1">
                        <span className="font-medium">
                          <strong><FontAwesomeIcon icon={faBuilding} /> WorkFlow Type:</strong>
                        </span>{" "}
                        {item.workFlowType}
                      </p>
                      <p className="text-md mb-2">
                        <span className="font-medium">
                          <strong><FontAwesomeIcon icon={faClock} /> WorkFlow Status:</strong>
                        </span>{" "}
                        <strong>
                          <span
                            className={`font-medium ${item.status === "Approved"
                              ? "text-green-600"
                              : item.status === "Rejected"
                                ? "text-red-600"
                                : "text-yellow-800"
                              }`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </strong>
                      </p>
                      <p className="text-md text-gray-800 mb-2">
                        <span className="font-medium">
                          <strong><FontAwesomeIcon icon={faReceipt} /> WorkFlow Status Reason:</strong>
                        </span>{" "}
                        {item.reason}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        className="bg-[linear-gradient(to_right,_rgb(151,_36,_126),_rgb(224,_25,_80))] text-white p-4 text-lg font-semibold shadow-lg flex flex-col items-center justify-center rounded-md"
                        style={{ width: "70px", height: "55px" }}
                      >
                        {item.count}
                        <div className="text-sm">Levels</div>
                      </div>
                    </div>
                  </div>

                  {/* Button Section */}
                  <div className="text-center mt-4 px-4">
                    <button
                      onClick={() => handleViewLevelsClick(item.mrf.mrfId)}
                      className="bg-gray-200 text-[#23275c] border border-[#23275c] py-2 px-4 rounded-lg shadow hover:bg-[#23275c] hover:text-gray-200 hover:border-gray-200 transition duration-300"
                    >
                      View Levels
                    </button>
                  </div>
                  <br />
                </div>
              ))
            )}
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50 transition-all ease-in-out duration-300 backdrop-filter backdrop-blur-sm">
              {" "}
              {/* Added backdrop-filter for blur effect */}
              <div className="bg-gray-200 rounded-lg w-full sm:w-2/3 lg:w-1/2 p-6 transform scale-95 transition-transform duration-500 ease-out relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h3 className="text-2xl font-semibold text-gray-800">
                  Recruitment Process Levels
                </h3>

                <div className="space-y-4 mt-4">
                  {recruitmentLevels.map((level, index) => (
                    <div key={index}>
                      <div
                        className="cursor-pointer text-black-600 hover:underline"
                        onClick={() => handleLevelClick(index)}
                      >
                        <p>
                          <strong>Level {index + 1}:</strong>{" "}
                          {level.recruitmentProcessName}
                        </p>
                      </div>

                      {selectedLevel === index && (
                        <div
                          className={`${levelColors[selectedLevel % levelColors.length]
                            } p-4 rounded-lg shadow-md mt-2`}
                        >
                          <p className="font-medium text-lg text-blue-800">
                            <strong>LEVEL:</strong>{" "}
                            {recruitmentLevels[selectedLevel].level}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Recruitment Process Type:</strong>{" "}
                            {
                              recruitmentLevels[selectedLevel]
                                .recruitmentProcessType
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Recruitment Process Name:</strong>{" "}
                            {
                              recruitmentLevels[selectedLevel]
                                .recruitmentProcessName
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Interviewer Detail:</strong>{" "}
                            {recruitmentLevels[selectedLevel].interviewer
                              .length > 0 ? (
                              recruitmentLevels[selectedLevel].interviewer.map(
                                (interviewer, index) => (
                                  <span
                                    key={interviewer.employee.employeeEmail}
                                  >
                                    {interviewer.employee.employeeEmail}
                                    {index <
                                      recruitmentLevels[selectedLevel].interviewer
                                        .length -
                                      1
                                      ? ", "
                                      : ""}
                                  </span>
                                )
                              )
                            ) : (
                              <span>No interviewers assigned</span> // Message when there are no interviewers
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {(selectedMrf.status !== 'Approved' && selectedMrf.status !== 'Rejected') ? (
                  <div className="mt-6 text-center">
                    {console.log(selectedMrf)}
                    <button
                      onClick={() => {
                        if (!statusSelected) {
                          setDropdownOpen(!dropdownOpen);
                        } else {
                          handleClose(); // Close the status when "x" is clicked
                        }
                      }}
                      className="bg-[#23275c] text-[#ffffff] border border-[#ffffff] py-2 px-4 rounded-lg hover:bg-[#ffffff] hover:text-[#23275c] relative"
                    >
                      {dropdownOpen ? "Select Status" : buttonText}
                      {statusSelected && (
                        <span
                          onClick={handleClose}
                          className="absolute top-1 right-1 cursor-pointer text-[#23275c] hover:text-red-500"
                        >
                          x
                        </span>
                      )}
                    </button>
                    <div>

                      {dropdownOpen && !statusSelected && (
                        <div>
                          {console.log(statusSelected)}
                          <div className="flex flex-col space-y-0">
                            <button
                              className="text-center text-[#23275c] py-2 px-4 rounded-lg hover:bg-[#23275c] hover:text-white mx-auto w-32" // Change w-full to a fixed width like w-32
                              onClick={() => handleStatusChange("Approved")}
                            >
                              Approve
                            </button>

                            <button
                              className="text-center text-[#23275c] py-2 px-4 rounded-lg hover:bg-[#23275c] hover:text-white mx-auto w-32" // Same change here
                              onClick={() => handleStatusChange("Hold")}
                            >
                              Hold
                            </button>

                            <button
                              className="text-center text-[#23275c] py-2 px-4 rounded-lg hover:bg-[#23275c] hover:text-white mx-auto w-32" // And here too
                              onClick={() => handleStatusChange("Rejected")}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedStatus && (
                      <>
                        <div className="mt-4">
                          <textarea
                            className="w-full p-3 border-2 border-gray-300 rounded-md"
                            rows="4"
                            placeholder="Enter your reason..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="mt-6 flex justify-center space-x-4">
                          <button
                            className="bg-[#27235c] text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
                            onClick={handleSaveStatus}
                          >
                            Save Status
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (null)}
              </div>
            </div>
          )}
          {loadingLevels && (
            <div className="text-center mt-4">
              <p className="text-blue-600">Loading recruitment levels...</p>
            </div>
          )}
          {errorMessage && (
            <div className="text-center mt-4">
              <p className="text-red-600">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Workflowapproval;