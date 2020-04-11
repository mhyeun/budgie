import React, { useState } from "react";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div id="dashboard">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Dashboard;
