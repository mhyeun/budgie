import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import applogo from "../../icons/budgie.svg";
import "./navbar.scss";
import store, { logMeOut } from "../../redux-store/store";
import { connect } from "react-redux";

export interface NavBarProps {
  logged?: boolean;
  username?: string;
}

class NavBar extends React.Component<NavBarProps> {
  render() {
    const username = this.props.username;
    return (
      <Navbar sticky="top">
        <Navbar.Brand href="/">
          <img id="logo" src={applogo} width={40} height={40} />
        </Navbar.Brand>
        {this.props.logged && (
          <Nav className="ml-auto">
            <Nav.Link href="#myChart">
              {username![0].toUpperCase() + username?.slice(1).toLowerCase()}'s
              Budgeting
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/"
                onClick={() => store.dispatch(logMeOut())}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    logged: state.logged,
    username: state.username,
  };
};
export default connect(mapStateToProps)(NavBar);
