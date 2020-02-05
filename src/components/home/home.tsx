import React, { useState } from "react";
import "./home.scss";

import Form from "./../form/form";

const Home = () => {
  return (
    <div id="login">
      <h1>Budgeting App</h1>
      <h3>Please enter your credentials</h3>
      <Form />
    </div>
  );
};

export default Home;
