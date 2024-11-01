import React, { useState } from "react";
import "./NavMenu.scss";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavMenu() {
  //navbar extended or not
  const [expanded, setExpanded] = useState(false);

  // Closing navbar
  const closeNavbar = () => {
    setExpanded(false);
  };
  return (
    <Navbar expanded={expanded} onToggle={setExpanded} expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" onClick={closeNavbar}>
          Min Logotyp
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((expanded) => !expanded)}
        />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Hem
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Om
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/videolist"
              onClick={closeNavbar}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Videotips
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;