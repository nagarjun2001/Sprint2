// import React from "react";
// import { FaCheckCircle, FaDotCircle } from "react-icons/fa";

// const ProgressBar = ({ stages, currentStage, onStageClick }) => {
//   return (
//     <div className="relative flex items-center justify-between mb-4">
//       {stages.map((stage, index) => (
//         <div
//           key={index}
//           className="flex flex-col items-center w-1/4 relative cursor-pointer"
//           onClick={() => onStageClick(index)}
//         >
//           {index < currentStage ? (
//             <FaCheckCircle className="text-2xl text-[#27235c] z-10" />
//           ) : index === currentStage ? (
//             <FaDotCircle className="text-2xl text-[#27235c] z-10" />
//           ) : (
//             <div className="w-6 h-6 border-2 border-[#27235c] rounded-full z-10" />
//           )}
//           <p
//             className={`text-sm mt-2 ${
//               index <= currentStage ? "text-[#27235c]" : "text-gray-500"
//             }`}
//           >
//             {stage}
//           </p>
//         </div>
//       ))}
//       <div className="absolute top-1/2 w-full h-2 bg-gray-300 rounded-full"></div>
//       <div
//         className="absolute top-1/2 h-2 bg-[#27235c] rounded-full"
//         style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;

//try with buttons

// import React from "react";

// const ProgressBar = ({ stages, currentStage, onStageClick }) => {
//   return (
//     <div className="border-2 border-[#27235c] rounded-lg p-2 flex justify-between mb-4">
//       {stages.map((stage, index) => (
//         <button
//           key={index}
//           className={`flex flex-col items-center w-full py-2 px-4 cursor-pointer transition-colors rounded-full ${
//             index === currentStage ? "bg-lightblue text-[#27235c]" : "bg-transparent text-[#27235c]"
//           } hover:bg-lightblue`}
//           onClick={() => onStageClick(index)}
//         >
//           <span className="text-sm">{stage}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default ProgressBar;

import React, { useState } from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa'; // Import the checkmark and clock icons

const ProgressBar = ({ stages, currentStage, onStageClick }) => {
  const [disabledStages, setDisabledStages] = useState([]);

  const handleStageClick = (index) => {
    // Disable stages after the clicked stage
    setDisabledStages([...stages.slice(0, index + 1)]);
    onStageClick(index);
  };

  return (
    <div className="flex justify-between border-2 border-[#27235c] rounded-lg p-2 mb-4">
      {stages.map((stage, index) => {
        const isCurrentStage = index === currentStage;
        const isDisabled = disabledStages.includes(index);
        const isPastStage = index < currentStage;
        const isFutureStage = index > currentStage;

        return (
          <button
            key={index}
            className={`flex items-center justify-center w-full py-2 px-4 cursor-pointer rounded-lg ${
              isCurrentStage ? 'text-[#27235c] font-bold' : isDisabled ? 'bg-gray-300 text-gray-500' : isFutureStage ? 'text-[#27235c]' : 'text-[#27235c] hover:bg-[#27235c] hover:text-white'
            }`}
            onClick={() => !isDisabled && handleStageClick(index)}
            disabled={isDisabled}
          >
            {isCurrentStage && <FaCheckCircle className="mr-2" />}
            {isPastStage && <FaCheckCircle className="mr-2 text-green-500" />}
            {isFutureStage && <FaClock className="mr-2 text-gray-500 animate-spin" />}
            <span className="text-sm">{stage}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProgressBar;