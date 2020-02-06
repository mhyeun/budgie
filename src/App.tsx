import React from "react";
import "./App.scss";

import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Home />
      <Dashboard />
    </div>
  );
};

export default App;
