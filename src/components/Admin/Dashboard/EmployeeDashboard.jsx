import React, { useState, useRef, useEffect } from 'react';
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, CircleUser, Languages, SunMoon, Briefcase, Award, ArrowLeft, UserRoundPlus, SquarePlus, ArrowRight, MapPin, Menu, LayoutDashboard, Building2, X, Home, ChartBar, BriefcaseBusiness, Landmark, Settings, Bell, MapPinCheckInside, Search, Handshake, CalendarCheck, Globe } from 'lucide-react';
import Logo from '../../../assets/relevantzwhite.PNG';
import { useNavigate } from 'react-router-dom';
import ViewEmployee from '../Employee/ViewEmployee';
import ViewDepartmentView from '../../../views/Admin/Department/ViewDepartmentView';
import AdminViewRole from '../Role/AdminViewRole';
import AdminViewLocation from '../Location/AdminViewLocation';
import AdminViewBussinessUnit from '../BussinessUnit/AdminViewBussinessUnit';
import CreateBulkEmployee from '../Employee/CreateBulkEmployee';
import User3D from '../../../assets/pngtre.png';
import ToDoList from '../TODO/ToDoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faUser } from '@fortawesome/free-solid-svg-icons';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const EmployeeDashboard = () => {

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentBirthdayIndex, setCurrentBirthdayIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);


    const navigate = useNavigate();

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const toggleLanguageDropdown = () => {
        setLanguageDropdownOpen(!languageDropdownOpen);
    };

    const changeLanguage = (language) => {
        setSelectedLanguage(language);
        setLanguageDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const profileDropdown = document.getElementById("profile-dropdown");
            const languageDropdown = document.getElementById("language-dropdown");

            if (profileDropdown && !profileDropdown.contains(event.target)) {
                setProfileDropdownOpen(false);
            }

            if (languageDropdown && !languageDropdown.contains(event.target)) {
                setLanguageDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'viewjobs', label: 'View Jobs', icon: BriefcaseBusiness },
        { id: 'referfriends', label: 'Refer Friends', icon: Handshake },
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const id = sessionStorage.getItem('UserId');
    console.log(id);

    useEffect(() => {
        if (id === null) {
            navigate('/');
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };


    // useEffect(() => {

    //     const handleClickOutside = (event) => {
    //         if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
    //             setIsProfileDropdownOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    const StatCard = ({ icon: Icon, title, value, color }) => {
        return (
            <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-gray-600 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold"> {value}
                    </h3>
                </div>
            </div>
        );
    };

    const getDaysInMonth = (month, year) => {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const daysInMonth = [];

        for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            daysInMonth.push(new Date(year, month, i));
        }

        return daysInMonth;
    };

    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    const goToPreviousMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        } else {
            setSelectedMonth(selectedMonth - 1);
        }
    };

    const goToNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        } else {
            setSelectedMonth(selectedMonth + 1);
        }
    };

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();


    const Sidebar = () => (
        <div className={`fixed left-0 top-0 h-full text-white transition-all duration-300 ease-in-out z-20
      ${isSidebarOpen ? 'w-64' : 'w-16'} ${isMobile ? 'shadow-2xl' : ''}`} style={{ backgroundColor: '#27235C' }}>

            <div className="p-3">
                <div className="flex items-center justify-between mb-10 mr-10 mt-2">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Menu className="w-7 h-7" ml-1 />
                    </button>
                    {isSidebarOpen && <img src={Logo} alt="Organization Logo" className="mr-1 h-7" />}
                </div>
                <nav>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (isMobile) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors
                ${activeTab === item.id ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            {isSidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );

    const MainContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <StatCard
                                icon={Users}
                                title="Current Openings"
                                value={100}
                                color="bg-blue-500"
                            />
                            <StatCard
                                icon={Briefcase}
                                title="Referrals"
                                value={3}
                                color="bg-green-500"
                            />
                            <StatCard
                                icon={Award}
                                title="Experience"
                                value={3}
                                color="bg-purple-500"
                            />

                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">

                            <div className="bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-md p-4 flex items-center">
                                <div className="ml-6">
                                    <h2 className="text-xl font-semibold">Welcome Back!</h2>
                                    <p className="mt-1">Employee Number: 12222</p>
                                    <p className="mt-1">Department: Delivery</p>
                                    <p className="mt-1">Work Location: Virudhunagar</p>
                                    <button className="mt-2 bg-white text-[#E01950] rounded-lg px-4 py-1">View Profile</button>
                                </div>
                                <img src={User3D} alt="Profile" className="rounded-md ml-4 bounce" style={{ width: '100%', maxWidth: '172.9px', height: 'auto' }} />
                            </div>

                            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 flex flex-col">
                                <h2 className="text-xl font-bold mb-4 text-left text-gray-800">Calendar</h2>

                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="px-3 py-2 bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-full hover:bg-[#E01950] transition text-sm w-24"
                                    >
                                        &lt; Prev
                                    </button>

                                    <div className="flex items-center space-x-4">
                                        <select
                                            className="px-3 py-2 border border-[#27235C] rounded-full text-sm w-24"
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        >
                                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                                <option key={index} value={index}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="number"
                                            className="px-3 py-2 border border-[#27235C] rounded-full text-sm w-24"
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                            maxLength={4}
                                        />
                                    </div>

                                    <button
                                        onClick={goToNextMonth}
                                        className="px-3 py-2 bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-full hover:bg-[#E01950] transition text-sm w-24"
                                    >
                                        Next &gt;
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 gap-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="font-semibold text-gray-700 text-sm">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2 flex-grow">
                                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                                        <div key={index} className="h-8 w-8"></div>
                                    ))}
                                    {daysInMonth.map((day) => (
                                        <div
                                            key={day}
                                            className={`h-8 w-8 flex items-center justify-center cursor-pointer text-sm rounded-full ${day.getDate() === todayDate && day.getMonth() === todayMonth && day.getFullYear() === todayYear
                                                ? 'bg-green-500 text-white'
                                                : 'text-[#27235C] hover:bg-[#27235C] hover:text-white'
                                                }`}
                                        >
                                            {day.getDate()}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-4 flex-grow flex flex-col">
                                <h2 className="text-xl font-bold mb-4">To Do List</h2>
                                <ToDoList />
                            </div>

                        </div>




                    </>
                );
            case 'viewjobs':
                return <ViewDepartmentView />
            case 'referfriends':
                return <AdminViewLocation />
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <Sidebar />

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
                <div className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">

                            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <SunMoon className="w-6 h-6" />
                            </button>

                            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <Languages className="w-6 h-6" />
                            </button>

                            <div id="profile-dropdown" style={{ position: "relative", zIndex: 50 }}>
                                <button onClick={toggleProfileDropdown} style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Profile"
                                        style={{ width: "32px ", height: "32px", borderRadius: "50%" }}
                                    />
                                    <div style={{ textAlign: "left", marginLeft: "8px" }}>
                                        <span style={{ display: "block", fontSize: "14px" }}>{sessionStorage.getItem("email")}</span>
                                        <span style={{ display: "block", fontSize: "12px", color: "#ccc" }}>{sessionStorage.getItem("role")}</span>
                                    </div>
                                </button>

                                {profileDropdownOpen && (
                                    <div style={{ position: "absolute", right: 0, marginTop: "8px", width: "192px", background: "white", borderRadius: "4px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", padding: "8px" }}>
                                        <a href="#" style={{ display: "flex", alignItems: "center", padding: "8px", color: "#333", textDecoration: "none" }}>
                                            <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} /> Profile
                                        </a>
                                        <a href="#" style={{ display: "flex", alignItems: "center", padding: "8px", color: "#333", textDecoration: "none" }}>
                                            <FontAwesomeIcon icon={faInbox} style={{ marginRight: "8px" }} /> Inbox
                                        </a>
                                        <a href="/" onClick={handleLogout} style={{ display: "flex", alignItems: "center", padding: "8px", color: "#333", textDecoration: "none" }}>
                                            <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} /> Logout
                                        </a>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>


                {/* <div className="flex justify-center items-center">
                    <div className="bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-md m-8 flex items-center w-1/3 h-64">
                        <div className="ml-6">
                            <h2 className="text-xl font-semibold">Welcome Back!</h2>
                            <p className="mt-1">Employee Number: 12222</p>
                            <p className="mt-1">Department: Delivery</p>
                            <p className="mt-1">Work Location: Virudhunagar</p>
                            <button className="mt-2 bg-white text-[#E01950] rounded-lg px-4 py-1">View Profile</button>
                        </div>
                        <img src={User3D} alt="Profile" className="rounded-md ml-4 bounce" style={{ width: '100%', maxWidth: '172.9px', height: 'auto' }} />
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6 mt-2">
                        <div className="col-span-8 lg:col-span-2 row-span-2">
                            <StatCard
                                icon={Award}
                                title="Current Openings"
                                value={100}
                                color="bg-blue-500"
                            />
                        </div>
                        <div className="col-span-6 lg:col-span-2 row-span-2">
                            <StatCard
                                icon={Briefcase}
                                title="Experience"
                                value={3}
                                color="bg-purple-500"
                            />
                        </div>
                        <div className="col-span-6 lg:col-span-2 row-span-2">
                            <StatCard
                                icon={Users}
                                title="Referrals"
                                value={3}
                                color="bg-green-500"
                            />
                        </div>
                        <div className="col-span-6 lg:col-span-2 row-span-2">
                            <StatCard
                                icon={CalendarCheck}
                                title="Schedules"
                                value={5}
                                color="bg-purple-500"
                            />
                        </div>
                    </div>


                </div> */}

<div className="flex justify-center items-center">

<div className="bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-md m-8 flex items-center w-full lg:w-1/3 h-64">
    <div className="ml-6 w-30">
        <h2 className="text-xl font-semibold">Welcome Back!</h2>
        <p className="mt-1">Employee Number: 12222</p>
        <p className="mt-1">Department: Delivery</p>
        <p className="mt-1">Work Location: Virudhunagar</p>
        <button className="mt-2 bg-white text-[#E01950] rounded-lg px-4 py-1">View Profile</button>
    </div>
    <img src={User3D} alt="Profile" className="rounded-md ml-4 bounce" style={{ width: '100%', maxWidth: '210px', marginLeft:'16px', height: 'auto' }} />
</div>

<div className="p-6 grid grid-cols-2 lg:grid-cols-2 gap-6 w-full lg:w-2/3">
    <div className="col-span-2 lg:col-span-1">
        <StatCard
            icon={Award}
            title="Current Openings"
            value={100}
            color="bg-blue-500"
        />
    </div>
    <div className="col-span-2 lg:col-span-1">
        <StatCard
            icon={Briefcase}
            title="Experience"
            value={3}
            color="bg-purple-500"
        />
    </div>
    <div className="col-span-2 lg:col-span-1">
        <StatCard
            icon={Users}
            title="Referrals"
            value={3}
            color="bg-green-500"
        />
    </div>
    <div className="col-span-2 lg:col-span-1">
        <StatCard
            icon={CalendarCheck}
            title="Schedules"
            value={5}
            color="bg-purple-500"
        />
    </div>
</div>

</div>



                {/* <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-lg shadow-md flex items-center">
                    <div className="ml-28 w-56">
                        <h2 className="text-xl font-semibold">Welcome Back!</h2>
                        <p className="mt-1">Employee Number : 12222</p>
                        <p className="mt-1">Department : Delivery</p>
                        <p className="mt-1">Work Location : Virudhunagar</p>
                        <button className="mt-2 bg-white text-[#E01950] rounded-lg px-4 py-1">View Profile</button>
                    </div>
                    <img src={User3D} alt="Profile" className="rounded-md ml-68 bounce" style={{ width: '100%', maxWidth: '180px', height: 'auto' }} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <StatCard
                    icon={Award}
                    title="Current Openings"
                    value={100}
                    color="bg-blue-500"
                    />
                    <StatCard
                    icon={Briefcase}
                    title="Experience"
                    value={3}
                    color="bg-purple-500"
                    />
                    <StatCard
                    icon={Users}
                    title="Refferals"
                    value={3}
                    color="bg-green-500"
                    />
                    <StatCard
                    icon={CalendarCheck}
                    title="Schedules"
                    value={5}
                    color="bg-orange-500"
                    />
                </div>
            </div> */}


                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Calendar */}
                    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-left text-gray-800">Calendar</h2>

                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={goToPreviousMonth}
                                className="px-3 py-2 bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-full hover:bg-[#E01950] transition text-sm w-24"
                            >
                                &lt; Prev
                            </button>

                            <div className="flex items-center space-x-4">
                                <select
                                    className="px-3 py-2 border border-[#27235C] rounded-full text-sm w-24"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                >
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="number"
                                    className="px-3 py-2 border border-[#27235C] rounded-full text-sm w-24"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    maxLength={4}
                                />
                            </div>

                            <button
                                onClick={goToNextMonth}
                                className="px-3 py-2 bg-gradient-to-r from-[#97247E] to-[#E01950] text-white rounded-full hover:bg-[#E01950] transition text-sm w-24"
                            >
                                Next &gt;
                            </button>
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="font-semibold text-gray-700 text-sm">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2 flex-grow">
                            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                                <div key={index} className="h-8 w-8"></div>
                            ))}
                            {daysInMonth.map((day) => (
                                <div
                                    key={day}
                                    className={`h-8 w-8 flex items-center justify-center cursor-pointer text-sm rounded-full ${day.getDate() === todayDate && day.getMonth() === todayMonth && day.getFullYear() === todayYear
                                        ? 'bg-green-500 text-white'
                                        : 'text-[#27235C] hover:bg-[#27235C] hover:text-white'
                                        }`}
                                >
                                    {day.getDate()}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TODO */}
                    <div className="bg-white rounded-lg shadow-md p-4 flex-grow flex flex-col">
                        <h2 className="text-xl font-bold mb-4">To Do List</h2>
                        <ToDoList />
                    </div>

                </div>

            </div>

            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}



        </div>
    );
};

export default EmployeeDashboard;


