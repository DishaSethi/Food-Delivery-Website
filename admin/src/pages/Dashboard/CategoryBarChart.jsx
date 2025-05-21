import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './CategoryBarChart.css'; // import the CSS file

const CategoryBarChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="itemsSold" fill="#10B981" name="Items Sold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
