import {
    faClipboardCheck,
    faClipboardList,
    faTimesCircle,
    faUsers,
    faSearch,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Cell,
    XAxis,
    YAxis,
    BarChart,
    Bar
} from 'recharts';
import React, { useState, useEffect } from "react";
import RecruitingManagerNavbar from "./RecruitingManagerNavbar";
import role from "../../../src/assets/pngtre.png";
import mrfimage from "../../../src/assets/mrfimage.png";
import recruiterimage from "../../../src/assets/recruiterimage.png";
import vendorimage from "../../../src/assets/vendorimage.png";
import candidateimage from "../../../src/assets/candidateimage.png";

const RecruitingManagerdashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Clientwise'); // State to manage the selected tab
    const [openedData, setOpenedData] = useState([]); // Store opened clients data for pie chart
    const [closedData, setClosedData] = useState([]); // Store closed clients data for closed pie chart
    const [searchActive, setSearchActive] = useState(false); // Manage the search box state
    const [selectedOption, setSelectedOption] = useState(""); // Store selected option from the search
    const [scheduledDate, setScheduledDate] = useState(''); // Store entered date for Schedulewise

    // Static data for each section.
    const dashboardData = {
        clientwise: {
            tableData: [
                { client: 'Client A', clientPartner: 'Rajini', recruiter: 'Aneesh', mrfId: 'Id1c', status: 'Opened' },
                { client: 'Client B', clientPartner: 'Rajini', recruiter: 'Senathipathy', mrfId: 'Id2c', status: 'Closed' },
                { client: 'Client C', clientPartner: 'Rajini', recruiter: 'Gowtham', mrfId: 'Id3c', status: 'Opened' },
                { client: 'Client D', clientPartner: 'Rajini', recruiter: 'Sri Ram', mrfId: 'Id4c', status: 'Closed' },
            ],
            donutChartData: [
                { name: 'Client A', value: 5 }, // Changed from 'Opened Clients' to 'Client A'
                { name: 'Client B', value: 3 }  // Changed from 'Closed Clients' to 'Client B'
            ],
        },
        skillwise: {
            tableData: [
                { mrfId: 'Id1c', skills: 3 },
                { mrfId: 'Id2c', skills: 2 },
                { mrfId: 'Id3c', skills: 4 },
                { mrfId: 'Id4c', skills: 1 },
            ],
            donutChartData: [
                { name: 'Registered MRFs', value: 4 }, // Total MRFs
                { name: 'Registered Skills', value: 10 } // Total Skills
            ],
            pieChartData: {
                Id1c: [
                    { name: 'Skill A', value: 1 },
                    { name: 'Skill B', value: 2 },
                    { name: 'Skill C', value: 1 }
                ],
                Id2c: [
                    { name: 'Skill D', value: 1 },
                    { name: 'Skill E', value: 1 }
                ],
                Id3c: [
                    { name: 'Skill F', value: 2 },
                    { name: 'Skill G', value: 1 },
                    { name: 'Skill H', value: 1 }
                ],
                Id4c: [
                    { name: 'Skill I', value: 1 }
                ]
            }
        },
        schedulewise: {
            tableData: [
                { schedule: 'Interview 1', date: '01/01/2024', status: 'Pending' },
                { schedule: 'Interview 2', date: '02/01/2024', status: 'Confirmed' }
            ],
            donutChartData: [
                { name: 'Confirmed Schedules', value: 4 },
                { name: 'Pending Schedules', value: 1 }
            ],
        },
        vendorwise: { // Changed this to Datewise
            tableData: [
                { vendor: 'Vendor A', projects: 2, status: 'Active' },
                { vendor: 'Vendor B', projects: 3, status: 'Inactive' }
            ],
            donutChartData: [
                { name: 'Active Vendors', value: 3 },
                { name: 'Inactive Vendors', value: 1 }
            ],
        }
    };

    const columnDefs = {
        Clientwise: [
            { headerName: "Clients", field: "client" },
            { headerName: "Client Partner", field: "clientPartner" },
            { headerName: "Recruiter", field: "recruiter" },
            { headerName: "MRF ID", field: "mrfId" },
            { headerName: "Status (Opened / Closed)", field: "status" },
        ],
        Skillwise: [
            { headerName: "MRF ID", field: "mrfId" },
            { headerName: "Skills", field: "skills" },
        ],
        Schedulewise: [
            { headerName: "Schedule", field: "schedule" },
            { headerName: "Date", field: "date" },
            { headerName: "Status", field: "status" },
        ],
        Vendorwise: [ // Changed this to Datewise
            { headerName: "Vendor", field: "vendor" },
            { headerName: "Projects", field: "projects" },
            { headerName: "Status", field: "status" },
        ]
    }[selectedTab];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Update openedData based on selected tab changes
        if (selectedTab === 'Clientwise') {
            const openedClients = dashboardData.clientwise.tableData.filter(client => client.status === 'Opened');
            const openedCountByMRF = openedClients.reduce((acc, client) => {
                acc[client.mrfId] = (acc[client.mrfId] || 0) + 1;
                return acc;
            }, {});

            // Convert to the format expected by PieChart
            const pieChartData = Object.entries(openedCountByMRF).map(([mrfId, count]) => ({ name: mrfId, value: count }));
            setOpenedData(pieChartData);

            // Update closedData for closed clients
            const closedClients = dashboardData.clientwise.tableData.filter(client => client.status === 'Closed');
            const closedCountByMRF = closedClients.reduce((acc, client) => {
                acc[client.mrfId] = (acc[client.mrfId] || 0) + 1;
                return acc;
            }, {});

            // Convert to the format expected by PieChart for closed clients
            const closedPieChartData = Object.entries(closedCountByMRF).map(([mrfId, count]) => ({ name: mrfId, value: count }));
            setClosedData(closedPieChartData);
        }
    }, [selectedTab, dashboardData.clientwise.tableData]);

    // Add labels for the MRFs
    const mrfLabels = {
        Id1c: "Java Developer",
        Id2c: "Python Developer",
        Id3c: ".NET Developer"
    };

    // Prepare openedData with the additional Id2c
    const formattedOpenedData = [
        { name: 'Id1c', value: openedData.find(d => d.name === 'Id1c')?.value || 0 },
        { name: 'Id2c', value: 1 }, // Add Id2c with a value of 1
        { name: 'Id3c', value: openedData.find(d => d.name === 'Id3c')?.value || 0 }
    ];

    // Prepare closedData for pie chart
    const formattedClosedData = [
        { name: 'Id1c', value: closedData.find(d => d.name === 'Id1c')?.value || 0 },
        { name: 'Id2c', value: 1 }, // Add Id2c with a value of 1
        { name: 'Id3c', value: closedData.find(d => d.name === 'Id3c')?.value || 0 }
    ];

    // Static data for the skillwise tab
    const skillData = {
        "Java Developer": { mrfId: "Id1c", skills: 3 },
        "Python Developer": { mrfId: "Id2c", skills: 2 },
        ".NET Developer": { mrfId: "Id3c", skills: 4 }
    };

    const handleSchedulewiseClick = () => {
        setScheduledDate('');
    };

    return (
        <>
            <RecruitingManagerNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`min-h-screen bg-[#F5F5F5] p-4 flex flex-col ml-${sidebarOpen ? "64" : "16"} transition-all duration-300`}>
                <div className="flex flex-col md:flex-row w-full mt-20 ">
                    <div className="flex justify-between items-center bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-md p-4 w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 ml-20 mt-5">
                        <div>
                            <h2 className="text-xl font-semibold">Welcome</h2>
                            <p className="mt-1">We're glad to see you here.</p>
                            <button className="mt-2 bg-white text-[#E01950] rounded-lg px-4 py-1">
                                View Profile
                            </button>
                            <p className="mt-2 text-lg">{currentTime.toLocaleTimeString()}</p>
                        </div>
                        <img
                            src={role}
                            alt="Profile"
                            className="rounded-md ml-4 bounce"
                            style={{ width: "100%", maxWidth: "172.9px", height: "auto" }}
                        />
                    </div>

                    <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 ml-7 mr-3">
                        <center>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
                                <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-50">
                                    <div className="relative w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden transition-transform duration-300 transform hover:scale-105">
                                        <img
                                            src={mrfimage}
                                            alt="MRF's"
                                            className="absolute w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center ml-4">
                                        <h2 className="text-3xl">10</h2>
                                        <p>MRF's</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-50">
                                    <div className="relative w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden transition-transform duration-300 transform hover:scale-105">
                                        <img
                                            src={recruiterimage}
                                            alt="Recruiter's"
                                            className="absolute w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center ml-4">
                                        <h2 className="text-3xl">20</h2>
                                        <p>Recruiter's</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-50">
                                    <div className="relative w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden transition-transform duration-300 transform hover:scale-105">
                                        <img
                                            src={vendorimage}
                                            alt="Vendor's"
                                            className="absolute w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center ml-4">
                                        <h2 className="text-3xl">15</h2>
                                        <p>Vendor's</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-4 flex items-center w-50">
                                    <div className="relative w-16 h-16 rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden transition-transform duration-300 transform hover:scale-105">
                                        <img
                                            src={candidateimage}
                                            alt="Candidates"
                                            className="absolute w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center ml-4">
                                        <h2 className="text-3xl">30</h2>
                                        <p>Candidates</p>
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>

                    <div className="flex items-center justify-end w-1/3 ml-1 mr-3 mt-5">
                        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-3/4 h-64 overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4">Notification's</h2>

                            <div className="flex items-center w-full mb-2">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-black rounded-full animate-ping mr-2" />
                                    <span className="border-t border-gray-300 flex-1" />
                                </div>
                                <div className="bg-gray-200 p-2 rounded flex-1 text-center">
                                    <span>12/11/2024</span>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded w-full mb-4">
                                <span>Send a Recruitment process approval request from recruiter</span>
                            </div>

                            <div className="flex items-center w-full mb-2">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-black rounded-full animate-ping mr-2" />
                                    <span className="border-t border-gray-300 flex-1" />
                                </div>
                                <div className="bg-gray-200 p-2 rounded flex-1 text-center">
                                    <span>10/11/2024</span>
                                </div>
                                <br></br>
                                <br></br>
                            </div>
                            <div className="bg-white p-2 rounded w-full">
                                <span>Send an offer approval request from recruiter</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-5">
                    {['Clientwise', 'Skillwise', 'Schedulewise', 'Vendorwise'].map((tab, index) => (
                        <div
                            key={index}
                            className={`border border-[#23275c] text-[#23275c] px-4 py-2 cursor-pointer transition-all duration-300 ease-in-out rounded-lg ${selectedTab === tab ? 'bg-[#23275c] text-[#ffffff]' : 'hover:bg-white hover:text-[#23275c]'}`}
                            onClick={() => {
                                setSelectedTab(tab);
                                if (tab === 'Schedulewise') {
                                    handleSchedulewiseClick();
                                }
                            }} 
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {selectedTab === 'Clientwise' && (
                    <div className="flex justify-between mt-10">
                        <div className="flex w-full justify-between"> 
                            <div className="w-1/3">
                                <h2 className="text-xl font-semibold ml-52">{selectedTab} </h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Tooltip />
                                        <Pie
                                            data={dashboardData.clientwise.donutChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40} // Adjust inner radius for donut effect
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {dashboardData.clientwise.donutChartData.map((entry, index) => {
                                                // Color array for the donut slices
                                                const colors = ["#FF6F61", "#5AABDA"]; // pink and blue
                                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                            })}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Legend for Clientwise Donut Chart */}
                                <div className="flex mt-2">
                                    <div className="flex items-center mr-4">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#FF6F61' }} className="mr-1"></div>
                                        <span>Client A</span> {/* Changed from Opened Clients to Client A */}
                                    </div>
                                    <div className="flex items-center">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#5AABDA' }} className="mr-1"></div>
                                        <span>Client B</span> {/* Changed from Closed Clients to Client B */}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/3 mt-5 ml-5">
                                <h2 className="text-xl font-semibold text-center">Closed MRF</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Tooltip
                                            formatter={(value, name) => [value, mrfLabels[name]]} // Show the job title on hover
                                        />
                                        <Pie
                                            data={formattedOpenedData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#82ca9d"
                                            label
                                        >
                                            {formattedOpenedData.map((entry, index) => {
                                                const colors = ["#8A2BE2", "#1E90FF", "#FF69B4"]; // Violet, Blue, Pink
                                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />; // Fixed color for MRFs
                                            })}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Legend for Opened Clients per MRF */}
                                <div className="flex mt-2">
                                    <div className="flex items-center mr-4">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#8A2BE2' }} className="mr-1"></div>
                                        <span>MRF id1</span>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#1E90FF' }} className="mr-1"></div>
                                        <span>MRF id2</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#FF69B4' }} className="mr-1"></div>
                                        <span>MRF id3</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/3 mt-5 ml-5">
                                <h2 className="text-xl font-semibold text-center">Pending MRF</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Tooltip
                                            formatter={(value, name) => [value, mrfLabels[name]]} // Show the job title on hover
                                        />
                                        <Pie
                                            data={formattedOpenedData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#82ca9d"
                                            label
                                        >
                                            {formattedOpenedData.map((entry, index) => {
                                                const colors = ["#8A2BE2", "#1E90FF", "#FF69B4"]; // Violet, Blue, Pink
                                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />; // Fixed color for MRFs
                                            })}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex mt-2">
                                    <div className="flex items-center mr-4">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#8A2BE2' }} className="mr-1"></div>
                                        <span>MRF id4</span>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#1E90FF' }} className="mr-1"></div>
                                        <span>MRF id5</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div style={{ width: '15px', height: '15px', backgroundColor: '#FF69B4' }} className="mr-1"></div>
                                        <span>MRF id6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'Skillwise' && (
                    <div className="flex flex-col items-center mt-10">
                        {/* Search Tile */}
                        <div className="bg-white p-5 rounded-lg shadow-md text-center">
                            <h2 className="text-xl font-semibold mb-4">Select Skill</h2>
                            <button
                                className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
                                onClick={() => setSearchActive(!searchActive)}
                            >
                                {selectedOption || "Search for Skills"}
                            </button>
                            {searchActive && (
                                <div className="flex flex-col mt-2">
                                    <button
                                        className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
                                        onClick={() => { setSelectedOption("Java Developer"); setSearchActive(false); }}
                                    >
                                        Java Developer
                                    </button>
                                    <button
                                        className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
                                        onClick={() => { setSelectedOption("Python Developer"); setSearchActive(false); }}
                                    >
                                        Python Developer
                                    </button>
                                    <button
                                        className="border border-gray-300 rounded-lg px-4 py-2 mb-2 w-full"
                                        onClick={() => { setSelectedOption(".NET Developer"); setSearchActive(false); }}
                                    >
                                        .NET Developer
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Donut Chart for Skillwise */}
                        <div className="w-1/3 mt-5"> {/* Adjusted width */}
                            <h2 className="text-xl font-semibold text-center">Skill Overview</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Tooltip />
                                    <Pie
                                        data={dashboardData.skillwise.donutChartData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40} // Adjust inner radius for donut effect
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    >
                                        {dashboardData.skillwise.donutChartData.map((entry, index) => {
                                            // Color array for the donut slices
                                            const colors = ["#FF6F61", "#5AABDA"]; // pink and blue
                                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                        })}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Legend for Skill Overview */}
                            <div className="flex mt-2">
                                <div className="flex items-center mr-4">
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#FF6F61' }} className="mr-1"></div>
                                    <span>Registered MRFs</span>
                                </div>
                                <div className="flex items-center">
                                    <div style={{ width: '15px', height: '15px', backgroundColor: '#5AABDA' }} className="mr-1"></div>
                                    <span>Registered Skills</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === 'Schedulewise' && (
                    <div className="flex flex-col items-center mt-10">
                        {/* Schedule Input */}
                        <div className="bg-white p-5 rounded-lg shadow-md w-1/3 mb-4">
                            <h2 className="text-xl font-semibold text-center">Select a Schedule Date</h2>
                            <input
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                            />
                        </div>

                        {/* Graph Card */}
                        <div className="bg-white p-5 rounded-lg shadow-md w-1/3">
                            <h2 className="text-xl font-semibold text-center">Schedule Graph</h2>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={[{ name: 'MRFs', mrfCount: 5 }]}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="mrfCount" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Separate Tables for Each Tab */}
                {selectedTab === 'Clientwise' && (
                    <div className="w-full mt-5 flex justify-center"> {/* Centering the table */}
                        <div className="ag-theme-alpine" style={{ height: 400, width: '70%' }}>
                            <AgGridReact
                                rowData={dashboardData.clientwise.tableData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={10}
                                domLayout='autoHeight'
                            />
                        </div>
                    </div>
                )}

                {selectedTab === 'Skillwise' && (
                    <div className="w-full mt-5 flex justify-center"> {/* Centering the table with reduced width */}
                        <div className="ag-theme-alpine" style={{ height: 400, width: '50%' }}>
                            <AgGridReact
                                rowData={dashboardData.skillwise.tableData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={10}
                                domLayout='autoHeight'
                            />
                        </div>
                    </div>
                )}

                {selectedTab === 'Schedulewise' && (
                    <div className="w-full mt-5 flex justify-center"> {/* Centering the table with reduced width */}
                        <div className="ag-theme-alpine" style={{ height: 400, width: '50%' }}>
                            <AgGridReact
                                rowData={dashboardData.schedulewise.tableData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={10}
                                domLayout='autoHeight'
                            />
                        </div>
                    </div>
                )}

                {selectedTab === 'Vendorwise' && (
                    <div className="w-full mt-5 flex justify-center"> {/* Centering the table with reduced width */}
                        <div className="ag-theme-alpine" style={{ height: 400, width: '50%' }}>
                            <AgGridReact
                                rowData={dashboardData.vendorwise.tableData}
                                columnDefs={columnDefs}
                                pagination={true}
                                paginationPageSize={10}
                                domLayout='autoHeight'
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default RecruitingManagerdashboard;