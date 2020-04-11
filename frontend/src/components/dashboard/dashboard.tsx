import React, { useState } from "react";
import { LineChart, Line } from "recharts";
import "./dashboard.scss";
const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

const Dashboard = () => {
  return (
    <div id="dashboard">
      <div id="myChart">
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;
