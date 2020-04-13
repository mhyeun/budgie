import React from "react";
import "./home.scss";
import Form from "./../form/form";
import logo from "./../../icons/budgie.svg";

const Home = () => {
  return (
    <div id="home">
      <div id="login">
        <img id="logo" src={logo} />
        <h1>Sign in to Budgie</h1>
        <Form />
      </div>
    </div>
  );
};

export default Home;
