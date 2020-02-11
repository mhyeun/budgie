import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import "./navbar.scss";

const NavBar = () => {
    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Budgeting App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#home">My Budgeting</Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Profile Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;