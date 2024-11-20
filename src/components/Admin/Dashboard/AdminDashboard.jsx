import React, { useState,useRef, useEffect } from 'react';
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, CircleUser, Briefcase, Award, ArrowLeft, UserRoundPlus, SquarePlus, ArrowRight, MapPin, Menu, LayoutDashboard, Building2, X, Home, ChartBar, Landmark, UserCircle, Settings, Bell, MapPinCheckInside, Search, Globe, Languages, SunMoon } from 'lucide-react';
import Logo from '../../../assets/RelevantzBlue.PNG';
import { useNavigate } from 'react-router-dom';
import ViewEmployee from '../Employee/ViewEmployee';
import ViewDepartmentView from '../../../views/Admin/Department/ViewDepartmentView';
import AdminViewRole from '../Role/AdminViewRole';
import AdminViewLocation from '../Location/AdminViewLocation';
import AdminViewBussinessUnit from '../BussinessUnit/AdminViewBussinessUnit';
import CreateBulkEmployee from '../Employee/CreateBulkEmployee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faUser } from '@fortawesome/free-solid-svg-icons';
import User3D from '../../../assets/pngtre.png';
import BirthdayCard from '../CommonCards/BirthdayCard';
// import { Tooltip } from 'react-tooltip';


 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
 
const AdminDashboard = () => {
 
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentBirthdayIndex, setCurrentBirthdayIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
 
 
 
  const dashboardData = {
    totalEmployees: 1200,
    totalDepartments: 4,
    totalBusinessUnits: 12,
    totalRoles: 30,
    departmentWise: [
      { department: 'Development', EmployeeCount: 750 },
      { department: 'Sales', EmployeeCount: 250 },
      { department: 'Marketing', EmployeeCount: 150 },
      { department: 'HR', EmployeeCount: 50 }
    ],
 
    birthdayEmployees: [
      { name: 'John Doe', role: 'Software Engineer', avatar: '/api/placeholder/80/80' },
      { name: 'Jane Smith', role: 'Product Manager', avatar: '/api/placeholder/80/80' },
      { name: 'Emily Clark', role: 'UI/UX Designer', avatar: '/api/placeholder/80/80' }
    ]
  };
 
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'department', label: 'Department', icon: Landmark },
    { id: 'location', label: 'Location', icon: MapPinCheckInside },
    { id: 'business unit', label: 'Business Unit', icon: Building2 },
    { id: 'role', label: 'Role', icon: SquarePlus },
    { id: 'employee', label: 'Employee', icon: UserRoundPlus },
    { id: 'bulk employee', label: 'Bulk Employee', icon: Users },
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
 
 
  useEffect(() => {
 
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
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
 
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full text-white transition-all duration-300 ease-in-out z-20
      ${isSidebarOpen ? 'w-64' : 'w-16'} ${isMobile ? 'shadow-2xl' : ''}`} style={{ backgroundColor: '#27235C' }}>
   
      <div className="p-3">
        <div className="flex items-center justify-between mb-10 mr-10 mt-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu className="w-7 h-7" ml-1/>
          </button>
          {isSidebarOpen && <img src={Logo} alt="Organization Logo" className="ml-3 mr-2 h-12 mt-3" />}
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

            {/* Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                icon={Users}
                title="Total Employees"
                value={dashboardData.totalEmployees}
                color="bg-blue-500"
              />
              <StatCard
                icon={Briefcase}
                title="Business Units"
                value={dashboardData.totalBusinessUnits}
                color="bg-green-500"
              />
              <StatCard
                icon={Award}
                title="Departments"
                value={dashboardData.totalDepartments}
                color="bg-purple-500"
              />
              <StatCard
                icon={MapPin}
                title="Total Roles"
                value={dashboardData.totalRoles}
                color="bg-orange-500"
              />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Profile Card */}
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

              

              {/* BDCard */}
              {/* <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg text-white">
                  <h2 className="text-xl font-bold mb-6">Today's Birthdays 🎉</h2>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentBirthdayIndex((prev) =>
                        (prev - 1 + dashboardData.birthdayEmployees.length) % dashboardData.birthdayEmployees.length
                      )}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  
                    <div className="flex flex-col items-center space-y-4">
                      <img
                        src={dashboardData.birthdayEmployees[currentBirthdayIndex].avatar}
                        alt="Employee"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-bold">
                          {dashboardData.birthdayEmployees[currentBirthdayIndex].name}
                        </h3>
                        <p className="text-white/80">
                          {dashboardData.birthdayEmployees[currentBirthdayIndex].role}
                        </p>
                      </div>
                      <button className="px-6 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        Send Wishes
                      </button>
                    </div>
  
                    <button
                      onClick={() => setCurrentBirthdayIndex((prev) =>
                        (prev + 1) % dashboardData.birthdayEmployees.length
                      )}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
              </div> */}
 
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">Department Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.departmentWise}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="EmployeeCount" fill="#8884d8" radius={[4, 4, 0, 0]}>
                        {dashboardData.departmentWise.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <BirthdayCard/>
            </div>
 
          </>
        );
      case 'department':
        return <ViewDepartmentView/>
      case 'location':
        return <AdminViewLocation/>
      case 'business unit':
      return <AdminViewBussinessUnit/>  
      case 'role':
        return <AdminViewRole/>
      case 'employee':
        return <ViewEmployee/>
      case 'bulk employee':
        return <CreateBulkEmployee/>
      default:
        return null;
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
 
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
                                        <span style={{ display: "block", fontSize: "12px", color: "black" }}>{sessionStorage.getItem("role")}</span>
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
 
        <div className="p-6">
          <MainContent />
        </div>
      </div>
 
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
 
      {isProfileDropdownOpen && (
        <div
          ref={profileDropdownRef}
          className="fixed top-16 right-6 bg-white rounded-lg shadow-lg z-10 w-48"
        >
          <ul className="py-2">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="/" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
 
export default AdminDashboard;
 
 
