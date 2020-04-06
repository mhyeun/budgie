import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import applogo from "../../icons/budgie.svg";
import "./navbar.scss";
import store from "../../redux-store/store";
const logged = store.getState().logged;
const loggedrender = (
  <Nav className="ml-auto">
    <Nav.Link href="/dashboard">My Budgeting</Nav.Link>
    <NavDropdown title="Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Profile Settings</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
    </NavDropdown>
  </Nav>
);
const NavBar = () => {
  return (
    <Navbar sticky="top">
      <Navbar.Brand href="/">
        <img id="logo" src={applogo} width={40} height={40} />
      </Navbar.Brand>
      {logged ? loggedrender : <></>}
    </Navbar>
  );
};

export default NavBar;
