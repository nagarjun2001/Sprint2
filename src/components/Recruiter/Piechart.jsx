

 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector } from 'recharts';
 
const RADIAN = Math.PI / 180;
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];
 
const renderActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
 
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
 
function Piechart() {
  const [totalCount, setTotalCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const id = sessionStorage.getItem('employeeId'); // Assuming employee ID is stored in session storage
 
  useEffect(() => {
    const id= sessionStorage.getItem('employeeId');
 
    const fetchData = async () => {
      try {
        const totalResponse = await axios.get(`http://localhost:8080/tap/api/totalmrfassigned/${id}`);
        setTotalCount(totalResponse.data);
 
        const resolvedResponse = await axios.get(`http://localhost:8080/tap/api/resolvedmrf/${id}`);
        setResolvedCount(resolvedResponse.data);
 
        const pendingResponse = await axios.get(`http://localhost:8080/tap/api/pendingmrf/${id}`);
        setPendingCount(pendingResponse.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };
 
    fetchData();
  }, [id]);
 
  // Prepare data for the PieChart
  const data = [
    { name: 'Total MRF', value: totalCount },
    { name: 'Resolved', value: resolvedCount },
    { name: 'Pending', value: pendingCount }
  ];
 
  // Handling mouse enter to change the active index
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
 
  return (
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border shadow-lg border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">MRF Status</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
 
export default Piechart;
 