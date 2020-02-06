import React, { useState } from "react";
import "./home.scss";
import Form from "./../form/form";
import logo from "./../../icons/login.svg";

const Home = () => {
  return (
    <div id="home">
      <div id="login">
        <img id="logo" src={logo} />
        <h1>Budgeting App</h1>
        <h4>Please enter your credentials</h4>
        <Form />
      </div>
    </div>
  );
};

export default Home;
