import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiPerson, GiCheckMark, GiHourglass, GiHumanPyramid } from "react-icons/gi";  // Updated icon import

function MRFDashboardStatsGrid() {
    const [stats, setStats] = useState({
        required: 0,
        hired: 0,
        pending: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [overallAppliedCount, setOverallAppliedCount] = useState(null);

    const mrfId = sessionStorage.getItem("mrfid");

    useEffect(() => {
        const fetchMRFData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tap/mrf/getMrf/${mrfId}`);
                const mrfData = response.data;

                const required = mrfData.requiredResourceCount || 0;
                const hired = mrfData.mrfStatus.requirementFilled || 0;
                const pending = required - hired;

                setStats({ required, hired, pending });
            } catch (err) {
                setError('Error fetching MRF data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tap/getCandidateByMrfId/${mrfId}`);
                const candidates = response.data;
                setOverallAppliedCount(candidates.length); 
            } catch (err) {
                setError('Error fetching candidates');
                console.error(err);
            }
        };

        fetchMRFData();
        fetchCandidates();

    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className='w-full mt-4'>
            <div className='flex gap-4 mb-4'>
                <BoxWrapper>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
                        <GiPerson className="text-2xl text-white" /> {/* Required Employee Icon */}
                    </div>
                    <div className='pl-4'>
                        <span className='text-gray-500 text-lg font-normal'>Required Employee</span>
                        <div className='flex items-center'>
                            <strong className='text-xl text-gray-700 font-semibold'>{stats.required}</strong>
                        </div>
                    </div>
                </BoxWrapper>

                <BoxWrapper>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
                        <GiCheckMark className="text-2xl text-white" /> {/* Hired Employee Icon */}
                    </div>
                    <div className='pl-4'>
                        <span className='text-gray-500 text-lg font-normal'>Hired Employee</span>
                        <div className='flex items-center'>
                            <strong className='text-xl text-gray-700 font-semibold'>{stats.hired}</strong>
                        </div>
                    </div>
                </BoxWrapper>
            </div>

            <div className='flex gap-4'>
                <BoxWrapper>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
                        <GiHourglass className="text-2xl text-white" /> {/* Pending Employee Icon */}
                    </div>
                    <div className='pl-4'>
                        <span className='text-gray-500 text-lg font-normal'>Pending Employee</span>
                        <div className='flex items-center'>
                            <strong className='text-xl text-gray-700 font-semibold'>{stats.pending}</strong>
                        </div>
                    </div>
                </BoxWrapper>

                <BoxWrapper>
                    <div className='rounded-full h-12 w-12 flex items-center justify-center bg-pink-700'>
                    <GiHumanPyramid className="text-2xl text-white" />
                    </div>
                    <div className='pl-4'>
                        <span className='text-gray-500 text-lg font-normal'>Overall Applied Count</span>
                        <div className='flex items-center'>
                            <strong className='text-xl text-gray-700 font-semibold'>{overallAppliedCount}</strong>
                        </div>
                    </div>
                </BoxWrapper>
            </div>
        </div>
    );
}

function BoxWrapper({ children }) {
    return <div className="bg-white p-4 h-32 rounded-lg shadow-lg flex-1 border-gray-200 flex items-center">{children}</div>
}

export default MRFDashboardStatsGrid;