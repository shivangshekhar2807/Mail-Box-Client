import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  
import { useDispatch, useSelector } from "react-redux";
import { AuthSliceAction } from "../Store/AuthSlice";


function NavigationBar() {

  const AuthValue = useSelector((state) => state.Auth.isLoggin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(AuthSliceAction.logoutHandler());
    navigate('/Auth')
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        {/* ✅ "Email Box Client" as normal text */}
        <Navbar.Brand>
          <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
            Email Box Client
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ✅ Centering the navigation links */}
          <Nav className="mx-auto">
            {!AuthValue && <Nav.Link as={NavLink} to="/Auth" >Login & Sign Up</Nav.Link>}
            {AuthValue && <Nav.Link as={NavLink} to="/">Home</Nav.Link> }
            {AuthValue && <Nav.Link as={NavLink} to="/email">Email</Nav.Link>}
            {AuthValue && <Nav.Link as={NavLink} to="/Sendemail">Send Email</Nav.Link>}
            {AuthValue && <Nav.Link as={NavLink} to="/Inbox">Inbox</Nav.Link>}
            {AuthValue && <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>}
          </Nav>
          {/* ✅ Logout Button on the right side */}
          {AuthValue && <Button variant="danger" onClick={logoutHandler}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;