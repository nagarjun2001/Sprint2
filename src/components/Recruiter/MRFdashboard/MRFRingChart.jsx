import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const mrfId=sessionStorage.getItem("mrfid");

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}>
                <p style={{ margin: '0' }}>{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

function MRFRingChart() {
    const [candidateData, setCandidateData] = useState({
        selected: 0,
        rejected: 0,
        onHold: 0,
        joined: 0,
    });
    const [offerData, setOfferData] = useState({
        accepted: 0,
        rejected: 0,
        pending: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tap/getCandidateByMrfId/${mrfId}`);
                const candidates = response.data;

                const counts = {
                    selected: candidates.filter(candidate => candidate.status === "Selected").length,
                    rejected: candidates.filter(candidate => candidate.status === "Rejected").length,
                    onHold: candidates.filter(candidate => candidate.status === "On Hold").length,
                    joined: candidates.filter(candidate => candidate.status === "Joined").length,
                };

                setCandidateData(counts);
            } catch (err) {
                setError('Error fetching candidates');
                console.error(err);
            }
        };

        const fetchOffers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tap/getOfferByMrfId/${mrfId}`);
                const offers = response.data;

                const counts = {
                    accepted: offers.filter(offer => offer.candidateStatus === "Accepted").length,
                    rejected: offers.filter(offer => offer.candidateStatus === "Rejected").length,
                    pending: offers.filter(offer => offer.candidateStatus === "Pending").length,
                };

                setOfferData(counts);
            } catch (err) {
                setError('Error fetching offers');
                console.error(err);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCandidates(), fetchOffers()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    const pieData1 = [
        { name: 'Selected', value: candidateData.selected },
        { name: 'Rejected', value: candidateData.rejected },
        { name: 'On Hold', value: candidateData.onHold },
    ];

    const pieData2 = [
        { name: 'Accepted', value: offerData.accepted },
        { name: 'Rejected', value: offerData.rejected },
        { name: 'Pending', value: offerData.pending },
    ];

    const pieData3 = [
        { name: 'Offer Accepted', value: offerData.accepted },
        { name: 'Joined', value: candidateData.joined },
        { name: 'Pending', value: candidateData.onHold }, 
    ];

    return (
        <div className="flex flex-wrap justify-between w-full">
            <div className="flex-1 max-w-[28.5rem] h-[22rem] bg-white p-4 m-2  rounded-lg shadow-lg border border-gray-200 flex flex-col">
                <strong className="text-gray-700 font-semibold  text-center">CANDIDATE INTERVIEW STATUS</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData1}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {pieData1.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex-1 max-w-[28.5rem] h-[22rem] bg-white p-4 m-2  rounded-lg shadow-lg border border-gray-200 flex flex-col">
                <strong className="text-gray-700 font-semibold text-center">CANDIDATE OFFER STATUS</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {pieData2.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex-1 max-w-[28.5rem] h-[22rem] bg-white p-4 m-2 rounded-lg shadow-lg border border-gray-200 flex flex-col">
                <strong className="text-gray-700 font-semibold text-center">CANDIDATE ONBOARDING STATUS</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData3}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={120}
                                innerRadius={60}
                                dataKey="value"
                            >
                                {pieData3.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default MRFRingChart;