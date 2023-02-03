import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
// import {Navlink} from 'react-router-dom';

const menu = () => {
  return (
    <div className='container'>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">User Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav_bar_wrapper">
              <Nav.Link href="#home">Home</Nav.Link>
              <div className='container'>
                <NavLink to="/login">login</NavLink>
              </div>
              <NavLink to="/">Registartion</NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">LogOut</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default menu
