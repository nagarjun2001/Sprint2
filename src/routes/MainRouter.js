import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Team - A Imports

import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard"
import AdminAddRole from "../components/Admin/Role/AdminAddRole";
import AdminViewRole from "../components/Admin/Role/AdminViewRole";
import LoginView from "../views/Login/LoginView";
import DisplayEmployeeView from "../views/Admin/Employee/DisplayEmployeeView";
import Otp from "../components/Login/Otp";
import CreateBulkEmployee from "../components/Admin/Employee/CreateBulkEmployee";
import ViewDepartmentView from "../views/Admin/Department/ViewDepartmentView";
import ViewBussinessUnitView from "../views/Admin/BussinessUnit/ViewBussinessUnitView";
import AddLocationView from "../views/Admin/Location/AddLocationView";


import ViewLocation from "../components/Admin/Location/AdminViewLocation";


// --------------------------------------------------

// Team - B Imports

import Navbar from "../components/NavbarComponent/AdminNavbar";
import login from "../views/Login/LoginView"


import ClientPartnerDashboard from '../components/ClientPartner/Dashboard/ClientPartnerDashboard';



import ClientRequirementView from "../views/ClientPartner/ClientRequirementView";
import ClientRequirementDetails from "../components/ClientPartner/ClientPartnerMRF/ClientRequirementDetails";
import ViewMrf from "../components/ClientPartner/ClientPartnerMRF/ViewMrf";
import UpdateMRFForm from "../components/ClientPartner/ClientPartnerMRF/UpdateMRFForm";
import ClientPartnerNavbar from "../components/NavbarComponent/ClientPartnerNavbar";
import ApprovalLevelTableView from "../views/Recruiter/ApprovalLevelTableView";
import LevelcardsView from "../views/Recruiter/RecruitmentProcessLevelsView";
import Dashboard from "../components/Recruiter/RecruiterDashboard";
// import Layout from "../shared/Layout";
import Layout from '../views/Recruiter/Layout';
import Maindashoard from "../components/Recruiter/RecruiterLandingPage";
import MRFone from "../views/Recruiter/MRFLayout";
import MRFonedashboard from "../components/Recruiter/MRFdashboard/MRFDashboard";
import AssessmentSchedulingPage from "../views/Recruiter/AssessmentSchedulingPageView";

import VendorForm from "../components/RecuritingManager/VendorForm";
import VendorView from "../views/vendor/VendorView";
import ForgotPasswordView from "../components/client/forgetpassword/ForgetPassword";
import ClientOtp from '../components/client/forgetpassword/ClientOtp';
import ConfirmPassword from "../components/client/forgetpassword/ConfirmPassword";


import ResetPassword from "../components/client/ResetPassword/ResetPassword";
import CandidateTable from "../components/client/HiredCandidate/CandidateTable";
// import Requirement from "../components/client/requirements/Requirement";
import JobRequirementsTable from "../components/client/requirements/JobRequirementsTable";
import JobRequirementPage from "../components/client/requirements/JobRequirementPage";

import ClientDashboardView from "../views/Client/ClientDashboardView";
// import Login from "../components/Login/Login";
import ShortCandidate from "../components/client/ShortlistedCandidate/ShortListCandidate";
import ClientCreation from "../components/ClientPartner/ClientPartnerClientCreation/ClientCreation";
import ClientView from "../components/ClientPartner/ClientPartnerClientCreation/ClientView";
import MRFformCreation from "../components/ClientPartner/ClientPartnerMRF/MRFformCreation";
import ClientLoginPage from "../components/client/ClientLogin/ClientLoginPage";
import VendorDashboardView from "../views/vendor/VendorDashboardView";
import Static from "../components/Vendor/Dashboard/Static";
import VendorDashboard from "../components/Vendor/Dashboard/VendorDashboard";
import Dummy from "../components/Vendor/Dashboard/Dummy";

import ClientProfileView from "../components/client/ClientProfile/ClientProfileView";
import ClientProfileUpdate from "../components/client/ClientProfile/ClientProfileUpdate";
import ViewMRFByVendor from "../components/Vendor/ViewMRF/ViewMRFByVendor";
import ViewCandidateByMRF from "../components/Vendor/ViewCandidate/ViewCandidateByMRF";
import AddCandidateByVendor from "../components/Vendor/AddCandidate/AddCandidateByVendor";
import VendorProfileView from "../components/Vendor/VendorProfile/VendorProfileView";
import VendorProfileUpdate from "../components/Vendor/VendorProfile/VendorProfileUpdate";
import ViewAllCandidateEveryMRF from "../components/Vendor/ViewCandidate/ViewAllCandidateEveryMRF";
import VendorResetPassword from "../components/Vendor/VendorResetPassword/VendorResetPassword";

import RecruiterMainDashboard from "../components/Recruiter/RecruiterMainDashboard";
import MRFDashboardViewMRF from "../components/Recruiter/MRFdashboard/MRFDashboardViewMRF";
import OfferCreation from "../components/Recruiter/OfferLetter/OfferCreation";
import RecruitementProcessLevelsView from "../views/Recruiter/RecruitmentProcessLevelsView";
import CandidateInfoView from "../views/Recruiter/Candidate/CandidateInfoView";
import OfferCreationView from "../views/Recruiter/OfferLetter/OfferCreationView";
import MRFDashboardView from "../views/Recruiter/MRFDashboardView";
import RecruiterDashboardView from "../views/Recruiter/RecruiterDashboardView";

import EmployeeDashboard from "../components/Admin/Dashboard/EmployeeDashboard";

import ListMrfForRecruitingManager from "../components/RecuritingManager/ListMrfForRecruitingManager";
import Workflowapproval from "../components/RecuritingManager/Workflowapproval";
import RecruitingManagerdashboard from "../components/RecuritingManager/RecruitingManagerdashboard";
import UpdatePassword from "../components/Login/UpdatePassword";
import CandidateDashboard from "../components/Candidate/CandidateDashboard";
import AppliedJobDetails from "../components/Candidate/AppliedJobDetails";
import LayoutProfile from "../components/Candidate/LayoutProfile";

const MainRouter = () => {
  return (
    <Router>


      <Routes>



        {/* Team A */}
        <Route path="/" element={<LoginView />} />
        <Route path="/bulky" element={<CreateBulkEmployee />} />

        {/* Team A */}
        <Route path="/" element={<LoginView />} />
        <Route path="/bulky" element={<CreateBulkEmployee />} />
        <Route path="/createBulkEmployee" element={<CreateBulkEmployee />} />
        <Route path="/admindash" element={<AdminDashboard />} />
        <Route path="/AdminAddRole" element={< AdminAddRole />} />
        <Route path="/AdminViewRole" element={<AdminViewRole />} />
        <Route path="/ViewEmployee" element={<DisplayEmployeeView />} />
        <Route path="/AdminAddRole" element={< AdminAddRole />} />
        <Route path="/AdminViewRole" element={<AdminViewRole />} />
        <Route path="/ViewEmployee" element={<DisplayEmployeeView />} />
        <Route path="/adminViewDepartment" element={<ViewDepartmentView />} />
        <Route path="/adminViewBussinessUnit" element={<ViewBussinessUnitView />} />
        <Route path="/adminAddLocation" element={<AddLocationView />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />

        {/* Team B */}


        <Route path="/clientPartner" element={<ClientPartnerNavbar />} />
        <Route path="/adminViewDepartment" element={<ViewDepartmentView />} />
        <Route path="/adminViewBussinessUnit" element={<ViewBussinessUnitView />} />
        <Route path="/adminAddLocation" element={<AddLocationView />} />


        <Route path="/adminViewLocation" element={<ViewLocation />} />

        <Route path='/employeeDashboard' element={<EmployeeDashboard />} />


        <Route path="/clientPartnerDashboard" element={<ClientPartnerDashboard />} />
        <Route path="/clientPartner" element={<ClientPartnerNavbar />} />
        <Route path="/clientcreation" element={<ClientCreation />} />
        <Route path="/clientDash" element={<ClientView />} />
        <Route path="/clientRequirementView" element={<ClientRequirementView />} />
        <Route path="/requirements/:id" element={<ClientRequirementDetails />} />
        <Route path="/createMrf" element={<MRFformCreation />} />
        <Route path="/viewMrf" element={<ViewMrf />} />
        <Route path="/updateMrf" element={<UpdateMRFForm />} />


        <Route path="/clientOtp" element={<ClientOtp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />





        <Route path="/clientOtp" element={<ClientOtp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />



        <Route path="/recruiterdashboard" element={<Maindashoard />} />
        <Route path="/lay" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>


        <Route path="/mrfone/:mrfid" element={<MRFone />} >
          <Route index element={<MRFonedashboard />} />
          <Route path="approver" element={<ApprovalLevelTableView />} />
        </Route>

        <Route path="/mrfone/level" element={<LevelcardsView />} />
        <Route path="/clientOtp" element={<ClientOtp />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />







        {/* Team - E */}
        <Route path="/recruiterMainLayout" element={<RecruiterDashboardView />} />
        <Route path="/mrfDashboard/:mrfid" element={<MRFDashboardView />} />
        <Route path="/approver" element={<ApprovalLevelTableView />} />
        <Route path="/recruitementProcessLevel" element={<RecruitementProcessLevelsView />} />
        <Route path="/mrf/offerCreation" element={<OfferCreationView />} />
        <Route path="/mrfone/assessmentschedulingpage/:rpId" element={<AssessmentSchedulingPage />} />

        <Route path="/recruiterViewMrf" element={<MRFDashboardViewMRF />} />
        <Route path="/candidateInfo/:candidateId" element={<CandidateInfoView />} />









        {/* Team - C */}
        <Route path="/VendorForm" element={<VendorForm />} />
        <Route path="/ListVendors" element={<VendorView />} />


        <Route path="/listMrfsForRecruitingManager" element={<ListMrfForRecruitingManager />} />
        <Route path="/recruitingManagerDashboard" element={<RecruitingManagerdashboard />} />
        <Route path="/workFlowApproval" element={<Workflowapproval />} />


        {/* Team - D */}
        <Route path="/clientloginpage" element={<ClientLoginPage />} />
        <Route path="/forgetpassword" element={<ForgotPasswordView />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/confirmpassword" element={<ConfirmPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/candidatetable/:requirementId" element={<CandidateTable />} />
        <Route path="/shortlistedcandidatetable/:requirementId" element={<ShortCandidate />} />
        <Route path="/requirement" element={<JobRequirementPage />} />
        <Route path="/JobRequirementsTable" element={<JobRequirementsTable />} />
        <Route path="/clientdashboard" element={<ClientDashboardView />} />
        <Route path="/vendorDashboard" element={<Static />}>
          <Route index element={<VendorDashboard />} />
          <Route path="viewmrfbyvendor" element={<ViewMRFByVendor />} />
          <Route path="products" element={<Dummy />} />
          <Route path="viewcandidatebymrf" element={<ViewCandidateByMRF />} />
          <Route path="addcandidatebyvendor" element={<AddCandidateByVendor />} />
          <Route path="vendorprofileview" element={<VendorProfileView />} />
          <Route path="vendorprofileupdate" element={<VendorProfileUpdate />} />
          <Route path="viewallcandidateeverymRF" element={<ViewAllCandidateEveryMRF />} />
          <Route path="vendorResetPassword" element={<VendorResetPassword />} />

        </Route>

        <Route path="/clientprofileview" element={<ClientProfileView />} />
        <Route path="/clientprofileUpdate" element={<ClientProfileUpdate />} />
        {/* <Route path="/viewcandidatebymrf" element={<ViewCandidateByMRF />} />
        <Route path="/addcandidatebyvendor" element={<AddCandidateByVendor />} />
        <Route path="/vendorprofileview" element={<VendorProfileView />} />
        <Route path="/vendorprofileupdate" element={<VendorProfileUpdate />} /> */}

        {/* <Route path="/candidatedashboard" element={<CandidateDashboard />}></Route> */}
        <Route path="/" element={<LayoutProfile />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="/candidatedashboard" element={<CandidateDashboard />} />
          <Route path="/job-detail/:mrfJdId" element={<AppliedJobDetails />} />

        </Route>


        {/* Team - E */}









      </Routes>


    </Router>
  );
};

export default MainRouter;
