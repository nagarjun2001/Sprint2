import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faBriefcase,
  faUserFriends,
  faClipboardList,
  faBuilding,
  faChartLine,
  faBars, 
} from '@fortawesome/free-solid-svg-icons';

import Datewise from './Datewise'; 
import RecruitingManagerwise from './RecruitingManagerwise';
import Projectwise from './Projectwise';
import ClientWise from '../../../components/ClientPartner/Dashboard/Clientwise'; 
import SkillWise from '../../../components/ClientPartner/Dashboard/Skillwise'; 
import ScheduleWise from '../../../components/ClientPartner/Dashboard/Schedulewise';
import ClientPartnerNavbar from '../../NavbarComponent/ClientPartnerNavbar';

const ClientPartnerTabs = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ fromDate: '', toDate: '' });

  useEffect(() => {
    setActiveTab('analysis'); 
  }, []); 

  const tabs = [
    { id: 'analysis', label: 'Market Analysis', icon: faChartLine },
    { id: 'clientwise', label: 'Client Wise', icon: faBuilding },
    { id: 'skillwise', label: 'Skill Wise', icon: faUser },
    { id: 'schedulewise', label: 'Schedule Wise', icon: faClipboardList },
    { id: 'datewise', label: 'Date Wise', icon: faCalendarAlt },
    { id: 'recruitingmanagerwise', label: 'Recruiting Manager Wise', icon: faUserFriends },
    { id: 'projectwise', label: 'Project Wise', icon: faBriefcase },

  ];

  const handleDateChange = (fromDate, toDate) => {
    setSelectedDates({ fromDate, toDate });
  };

  return (
    <div>
      <ClientPartnerNavbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} /> 

      <div className={`fixed top-0 left-0 right-0 flex space-x-4 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} rounded-b-2xl shadow-lg`} style={{ marginTop: '4.5rem', background: 'white' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 py-2 px-4 focus:outline-none transform rounded-lg transition-transform duration-300 ${activeTab === tab.id ? 'bg-[linear-gradient(to_right,rgb(151,36,126),rgb(224,25,80))] text-white' : 'text-[#27235C] hover:bg-gradient-to-r hover:from-[#e0e0e0] hover:to-[#c0c0c0] hover:scale-105 bg-white'}`}
          >
            <FontAwesomeIcon icon={tab.icon} className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={`p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {activeTab === 'datewise' && (
          <Datewise onDateChange={handleDateChange} selectedDates={selectedDates} sidebarOpen={sidebarOpen} />
        )}
        {activeTab === 'recruitingmanagerwise' && (
          <RecruitingManagerwise sidebarOpen={sidebarOpen} />
        )}
        {activeTab === 'projectwise' && (
          <Projectwise sidebarOpen={sidebarOpen} />
        )}
        {activeTab === 'clientwise' && (
          <ClientWise />
        )}
        {activeTab === 'skillwise' && (
          <SkillWise /> 
        )}
        {activeTab === 'schedulewise' && ( 
          <ScheduleWise />
        )}
      </div>
    </div>
  );
};

export default ClientPartnerTabs;