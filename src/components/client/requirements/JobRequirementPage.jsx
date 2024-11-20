


// import React, { useState, useEffect, useRef } from 'react';
// import { getRoles, saveJobRequirements } from '../../../services/Client/JobRequirementsService';

// const JobRequirementPage = () => {
//   const [roles, setRoles] = useState([]);
//   const [jobRequirements, setJobRequirements] = useState([{ role: '', resourceCount: 1 }]);
//   const [budget, setBudget] = useState('');
//   const [totalCount, setTotalCount] = useState(1);
//   const [timeline, setTimeline] = useState('');
//   const [submittedData, setSubmittedData] = useState(null);
//   const [disableInputs, setDisableInputs] = useState(false);
//   const formRef = useRef(null);

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         const rolesData = await getRoles();
//         setRoles(rolesData);
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };

//     fetchRoles();
//   }, []);

//   useEffect(() => {
//     const count = jobRequirements.reduce((acc, req) => acc + parseInt(req.resourceCount, 10), 0);
//     setTotalCount(count);
//   }, [jobRequirements]);

//   const handleRoleChange = (index, value) => {
//     const newJobRequirements = [...jobRequirements];
//     newJobRequirements[index].role = value;
//     setJobRequirements(newJobRequirements);
//   };

//   const handleRequiredCountChange = (index, value) => {
//     const newJobRequirements = [...jobRequirements];
//     newJobRequirements[index].resourceCount = value;
//     setJobRequirements(newJobRequirements);
//   };

//   const addJobRequirement = () => {
//     setJobRequirements([...jobRequirements, { role: '', resourceCount: 1 }]);
//   };

//   const removeJobRequirement = (index) => {
//     const newJobRequirements = jobRequirements.filter((_, i) => i !== index);
//     setJobRequirements(newJobRequirements);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = {
//       totalRequiredResourceCount: totalCount,
//       timeline,
//       budget: parseFloat(budget),
//       client: { clientId: 2 }, // Assuming this remains static as per your provided JSON
//       subrequirement: jobRequirements // Mapping to the 'subrequirement' key
//     };

//     try {
//       const updatedData = await saveJobRequirements(formData);
//       console.log('Form Submitted Successfully', updatedData);
//       setSubmittedData(formData);
//       // Optionally reset form or provide feedback
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const isValidJobRequirement = (jobRequirement) => {
//     return /^[a-zA-Z\s]+$/.test(jobRequirement.role) && jobRequirement.resourceCount > 0;
//   };

//   const isValidBudget = (budgetValue) => {
//     return /^[+]?\d+(\.\d+)?$/.test(budgetValue) && parseFloat(budgetValue) > 0;
//   };

//   const isValidRequiredCount = (count) => {
//     return count > 0;
//   };

//   const isFormValid = () => {
//     return jobRequirements.every((req) => isValidJobRequirement(req) && isValidRequiredCount(req.resourceCount)) &&
//       isValidBudget(budget) && timeline;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Job Requirement Page</h2>

//       <form onSubmit={handleSubmit} ref={formRef}>
//         <div>
//           <h3 className="text-xl font-semibold mb-4">Job Requirements</h3>
//           {jobRequirements.map((jobRequirement, index) => (
//             <div key={index} className="mb-4 flex items-center space-x-4">
//               <div className="w-1/2">
//                 <label className="block text-gray-700 mb-2">Role</label>
//                 <input
//                   type="text"
//                   value={jobRequirement.role}
//                   onChange={(e) => handleRoleChange(index, e.target.value)}
//                   list={`role-suggestions-${index}`}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter role"
//                   disabled={disableInputs}
//                 />
//                 <datalist id={`role-suggestions-${index}`}>
//                   {roles.length === 0 ? (
//                     <option value="">Loading roles...</option>
//                   ) : (
//                     roles
//                       .filter(
//                         (roleObj) =>
//                           roleObj.role &&
//                           jobRequirement.role &&
//                           jobRequirement.role.toLowerCase() &&
//                           roleObj.role.toLowerCase().includes(jobRequirement.role.toLowerCase())
//                       )
//                       .map((roleObj, roleIndex) => (
//                         <option key={roleIndex} value={roleObj.role} />
//                       ))
//                   )}
//                 </datalist>
//               </div>

//               <div className="w-1/4">
//                 <label className="block text-gray-700 mb-2">Required Count</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={jobRequirement.resourceCount}
//                   onChange={(e) => handleRequiredCountChange(index, e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter count"
//                   disabled={disableInputs}
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={() => removeJobRequirement(index)}
//                 className="ml-5 px-4 pt-5 text-3xl text-red-600 font-bold"
//                 disabled={disableInputs}
//               >
//                 &times; 
//               </button>
//             </div>
//           ))}

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={addJobRequirement}
//               className="px-6 py-2 bg-[#27235c] text-white font-semibold rounded-md"
//               disabled={disableInputs}
//             >
//               Add+
//             </button>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-xl font-semibold mb-4">Budget and Timeline</h3>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Total Count</label>
//             <input
//               type="text"
//               value={totalCount}
//               readOnly
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               disabled={disableInputs}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Budget</label>
//             <input
//               type="text"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter budget"
//               disabled={disableInputs}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Timeline</label>
//             <select
//               value={timeline}
//               onChange={(e) => setTimeline(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//               disabled={disableInputs}
//             >
//               <option value="">Select timeline</option>
//               <option value="Immediate">Immediate</option>
//               <option value="30Days">30 Days</option>
//             </select>
//           </div>

//           <div className="mt-6 text-center">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-[#27235c] text-white font-semibold rounded-md"
//               disabled={disableInputs || !isFormValid()}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Display Submitted Data */}
//       {submittedData && (
//         <div className="mt-6 p-6 bg-gray-100 rounded-lg">
//           <h3 className="text-2xl font-semibold mb-4">Submitted Job Requirements</h3>
//           <pre>{JSON.stringify(submittedData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobRequirementPage;


import React, { useState, useEffect, useRef } from 'react';
import { getRoles, saveJobRequirements } from '../../../services/Client/JobRequirementsService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import ClientNavbar from '../Dashboard/ClientNavbar';

const JobRequirementPage = () => {
  const [roles, setRoles] = useState([]);
  const [jobRequirements, setJobRequirements] = useState([{ role: '', resourceCount: 1 }]);
  const [budget, setBudget] = useState('');
  const [totalCount, setTotalCount] = useState(1);
  const [timeline, setTimeline] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [disableInputs, setDisableInputs] = useState(false);

  const formRef = useRef(null);
  const navigate = useNavigate();

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Update total count based on job requirements
  useEffect(() => {
    const count = jobRequirements.reduce((acc, req) => acc + parseInt(req.resourceCount, 10), 0);
    setTotalCount(count);
  }, [jobRequirements]);

  // Handle role change
  const handleRoleChange = (index, value) => {
    const newJobRequirements = [...jobRequirements];
    newJobRequirements[index].role = value;
    setJobRequirements(newJobRequirements);
  };

  // Handle resource count change
  const handleRequiredCountChange = (index, value) => {
    const newJobRequirements = [...jobRequirements];
    newJobRequirements[index].resourceCount = value;
    setJobRequirements(newJobRequirements);
  };

  // Add new job requirement
  const addJobRequirement = () => {
    setJobRequirements([...jobRequirements, { role: '', resourceCount: 1 }]);
  };

  // Remove job requirement
  const removeJobRequirement = (index) => {
    const newJobRequirements = jobRequirements.filter((_, i) => i !== index);
    setJobRequirements(newJobRequirements);
  };

  // Handle submit
  const clientId = sessionStorage.getItem("clientId")
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      totalRequiredResourceCount: totalCount,
      timeline,
      budget: parseFloat(budget),
      client:  { clientId: clientId } ,
      subrequirement: jobRequirements,
    };

    try {
      const updatedData = await saveJobRequirements(formData);
      console.log('Form Submitted Successfully', updatedData);
      setSubmittedData(formData);
      toast.success('Requirement added successfully!');
      setTimeout(() => {
        navigate('/JobRequirementsTable');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add requirement. Please try again.');
    }
  };

  // Validation functions
  const isValidRole = (role) => /^[a-zA-Z\s]+$/.test(role);
  const isValidRequiredCount = (count) => count > 0;
  const isValidBudget = (budgetValue) => /^[+]?\d+(\.\d+)?$/.test(budgetValue) && parseFloat(budgetValue) > 0;

  const isFormValid = () => {
    return (
      jobRequirements.every((req) => isValidRole(req.role) && isValidRequiredCount(req.resourceCount)) &&
      isValidBudget(budget) && timeline
    );
  };

  // Auto-focus on the next field
  const handleFocusNext = (e, nextField) => {
    if (nextField) {
      nextField.focus();
    }
  };

  return (
    <>
      <ClientNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-20 py-8">
        <div className="max-w-4xl w-full px-6 py-10 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-700">Job Requirement Page</h2>

          <form onSubmit={handleSubmit} ref={formRef}>
            {/* Job Requirements Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Job Requirements</h3>
              {jobRequirements.map((jobRequirement, index) => (
                <div key={index} className="mb-6 flex items-center space-x-6">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={jobRequirement.role}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      list={`role-suggestions-${index}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter role"
                      disabled={disableInputs}
                      onKeyUp={(e) => handleFocusNext(e, jobRequirement.resourceCount ? e.target.nextElementSibling : null)}
                    />
                    <datalist id={`role-suggestions-${index}`}>
                      {roles.length === 0 ? (
                        <option value="">Loading roles...</option>
                      ) : (
                        roles
                          .filter(
                            (roleObj) =>
                              roleObj.role &&
                              jobRequirement.role &&
                              jobRequirement.role.toLowerCase() &&
                              roleObj.role.toLowerCase().includes(jobRequirement.role.toLowerCase())
                          )
                          .map((roleObj, roleIndex) => (
                            <option key={roleIndex} value={roleObj.role} />
                          ))
                      )}
                    </datalist>
                    {/* Validation for Role */}
                    {!isValidRole(jobRequirement.role) && jobRequirement.role && (
                      <p className="text-red-500 text-sm">Role must contain only letters and spaces.</p>
                    )}
                  </div>

                  <div className="w-full sm:w-1/4">
                    <label className="block text-gray-700 mb-2">Required Count</label>
                    <input
                      type="number"
                      min="1"
                      value={jobRequirement.resourceCount}
                      onChange={(e) => handleRequiredCountChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter count"
                      disabled={disableInputs}
                      onKeyUp={(e) => handleFocusNext(e, jobRequirements[index + 1] ? e.target.nextElementSibling : null)}
                    />
                    {/* Validation for Required Count */}
                    {jobRequirement.resourceCount <= 0 && (
                      <p className="text-red-500 text-sm">Required count must be a positive number.</p>
                    )}
                  </div>

                  {/* Remove button only visible if there's more than one job requirement */}
                  {jobRequirements.length > 1 && index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeJobRequirement(index)}
                      className="ml-5 px-4 pt-5 text-3xl text-red-600 font-bold"
                      disabled={disableInputs}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={addJobRequirement}
                  className="px-6 py-2 bg-[#27235c] text-white font-semibold rounded-md"
                  disabled={disableInputs || !jobRequirements.every(req => req.role && req.resourceCount > 0)}
                >
                  Add+
                </button>
              </div>
            </div>

            {/* Budget and Timeline Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Budget and Timeline</h3>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Total Count</label>
                <input
                  type="text"
                  value={totalCount}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={disableInputs}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Budget (In Crs)</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter budget"
                  disabled={disableInputs}
                />
                {/* Validation for Budget */}
                {!isValidBudget(budget) && (
                  <p className="text-red-500 text-sm">Budget must be a valid number greater than 0.</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Timeline</label>
                <div className="flex items-center">
                  <label className="flex items-center mr-4">
                    <input
                      type="radio"
                      name="timeline"
                      value="Immediate"
                      checked={timeline === 'Immediate'}
                      onChange={(e) => setTimeline(e.target.value)}
                      disabled={disableInputs}
                    />
                    <span className="ml-2">Immediate</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="timeline"
                      value="30Days"
                      checked={timeline === '30Days'}
                      onChange={(e) => setTimeline(e.target.value)}
                      disabled={disableInputs}
                    />
                    <span className="ml-2">30 Days</span>
                  </label>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#27235c] text-white font-semibold rounded-md hover:bg-[#1d1b44] transition"
                  disabled={disableInputs || !isFormValid()}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>

          {/* Display Submitted Data */}
          {submittedData && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Submitted Job Requirements</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JobRequirementPage;