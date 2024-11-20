import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewLevels, getInterviewDetails } from "../../services/Candidate/CandidateDashboardService";
import ProgressBar from "./ProgressBar";
import { FaCalendarAlt, FaClock, FaLink } from "react-icons/fa";

const AppliedJobDetails = () => {
  const { mrfJdId } = useParams();
  const [interviewLevels, setInterviewLevels] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [detailsData, setDetailsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const candidateId = sessionStorage.getItem("candidateId");

  useEffect(() => {
    const fetchInterviewLevels = async () => {
      try {
        const data = await getInterviewLevels(mrfJdId);
        setInterviewLevels(data);
        const completedStages = data.filter(
          (level) => level.completedStatus !== "Pending"
        ).length;
        const initialStage = completedStages + 2;
        setCurrentStage(initialStage);
        handleStageClick(initialStage - 1); // Show details of the highest stage on page load
      } catch (error) {
        console.error("Error fetching interview levels", error);
      }
    };

    fetchInterviewLevels();
  }, [mrfJdId]);

  const stages = [
    "Application Submitted",
    "Shortlisted",
    ...interviewLevels.map((level) => level.recruitmentProcessType),
    "Offer Release",
  ];
  const handleStageClick = async (index) => {
    if (index >= 2 && (index < currentStage || index === currentStage)) {
      setIsLoading(true);
      try {
        const recruitmentProcessId = interviewLevels[index - 2]?.recruitmentProcessId;
        if (recruitmentProcessId) {
          const data = await getInterviewDetails(recruitmentProcessId, candidateId);
          setDetailsData({ ...data, currentStage: stages[index] });
        }
      } catch (error) {
        console.error("Error fetching details", error);
        setDetailsData(null);
      } finally {
        setIsLoading(false);
      }
    } else if (index < 2) {
      const greeting = index === 0 
        ? "Congratulations on moving forward in the application process!"
        : "You have been shortlisted! Keep going!";
  
      setDetailsData({ greeting, currentStage: stages[index] });
    }
  };
  
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };
  
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}, ${formatTime(time)}`;
  };
  
  const isFutureOrPresent = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime >= new Date();
  };
  const renderDetails = (data) => {
    if (!data) return null;
    if (data.greeting) return <p className="text-xl font-semibold">{data.greeting}</p>;
  
    const isInterviewFutureOrPresent = data.interviewDate && isFutureOrPresent(data.interviewDate, data.interviewFromTime);
    const isAssessmentFutureOrPresent = data.assessmentStartDate && isFutureOrPresent(data.assessmentStartDate, data.assessmentStartTime);
  
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          {data.interviewTitle && (
            <>
              <h2 className="text-lg font-semibold mb-2">{data.interviewTitle}</h2>
              <p className="text-gray-600">{data.candidateStatus}</p>
              <p className="text-gray-600">{data.others}</p>
              {data.meetingUrl && isInterviewFutureOrPresent ? (
                <button disabled className="mt-4 inline-block bg-gray-300 text-gray-500 py-1 px-2 rounded flex items-center space-x-1">
                  <FaLink />
                  <span>Join Meeting (Unlocks on {formatDateTime(data.interviewDate, data.interviewFromTime)})</span>
                </button>
              ) : (
                isInterviewFutureOrPresent ? (
                  <a href={data.meetingUrl} className="mt-4 inline-block bg-[#27235c] text-white py-1 px-2 rounded hover:bg-[#1f1a48] flex items-center space-x-1" target="_blank" rel="noopener noreferrer">
                    <FaLink />
                    <span>Join Meeting</span>
                  </a>
                ) : (
                  <p className="text-red-600 mt-4">Meeting link expired</p>
                )
              )}
            </>
          )}
          {data.assessmentName && (
            <>
              <h2 className="text-lg font-semibold mb-2">{data.assessmentName}</h2>
              <p className="text-gray-600">{data.assessmentType}</p>
              <p className="text-gray-600">{data.status}</p>
              {data.assessmentLink && isAssessmentFutureOrPresent ? (
                <button disabled className="mt-4 inline-block bg-gray-300 text-gray-500 py-1 px-2 rounded flex items-center space-x-1">
                  <FaLink />
                  <span>Start Assessment (Unlocks on {formatDateTime(data.assessmentStartDate, data.assessmentStartTime)})</span>
                </button>
              ) : (
                isAssessmentFutureOrPresent ? (
                  <a href={data.assessmentLink} className="mt-4 inline-block bg-[#27235c] text-white py-1 px-2 rounded hover:bg-[#1f1a48] flex items-center space-x-1" target="_blank" rel="noopener noreferrer">
                    <FaLink />
                    <span>Start Assessment</span>
                  </a>
                ) : (
                  <p className="text-red-600 mt-4">Assessment link expired</p>
                )
              )}
            </>
          )}
        </div>
        <div className="flex flex-col items-end">
          {data.interviewDate && (
            <>
              <div className="flex items-center mt-2">
                <FaCalendarAlt className="mr-2 text-[#27235c]" />
                <p>{`${data.interviewDate}, ${formatTime(data.interviewFromTime)} - ${formatTime(data.interviewToTime)}`}</p>
              </div>
            </>
          )}
          {data.assessmentStartDate && data.assessmentEndDate && (
            <>
              <div className="flex items-center mt-2">
                <FaCalendarAlt className="mr-2 text-[#27235c]" />
                <p>{`${data.assessmentStartDate}, ${formatTime(data.assessmentStartTime)} - ${data.assessmentEndDate}, ${formatTime(data.assessmentEndTime)}`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className="p-6" style={{ scrollBehavior: "smooth" }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#27235c] mb-4">
          Application Status
        </h2>
        <ProgressBar
          stages={stages}
          currentStage={currentStage}
          isLoading={isLoading}
          onStageClick={handleStageClick}
        />
      </div>
  
      <div className="w-full border-2 border-[#27235c] rounded-lg mt-8 p-4 bg-white">
        {detailsData ? (
          <>
            <h1 className="py-4 font-medium text-black/80">
              Current Stage: {detailsData.currentStage}
            </h1>
            <hr className="border-1 border-[#27235c] mb-4" />
            <div className="p-3">
              {renderDetails(detailsData)}
            </div>
          </>
        ) : (
          <div className="p-3">
            <h1 className="text-xl font-semibold">No Details Found</h1>
            <p>Click on a stage to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
  };
  
  export default AppliedJobDetails;
      