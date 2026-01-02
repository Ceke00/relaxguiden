import React, { useState, useEffect, useRef } from "react";
import "./NavMenu.scss";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../images/logo.svg";
import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";


function NavMenu() {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();

 
  const closeNavbar = () => setExpanded(false);

  // ESC closes menu, focus to toggle button
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
        if (toggleRef.current) {
          toggleRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  //Closing menu when focus moves out of navbar
  useEffect(() => {
    const handleFocusOut = (e) => {
      if (
        expanded &&
        navRef.current &&
        !navRef.current.contains(e.relatedTarget)
      ) {
        setExpanded(false);
      }
    };

    const node = navRef.current;
    if (node) node.addEventListener("focusout", handleFocusOut);

    return () => {
      if (node) node.removeEventListener("focusout", handleFocusOut);
    };
  }, [expanded]);

  
  const ariaCurrent = (path) =>
    location.pathname === path ? "page" : undefined;

  return (
    <>
      <a
        href="#main-content"
        className="visually-hidden-focusable skip-button m-3"
      >
        Hoppa till innehåll
      </a>

      <Navbar
        ref={navRef}
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        aria-label="Huvudmeny"
        role="navigation"
      >
        <Container className="mb-5 mt-3">
          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={closeNavbar}
            aria-label="Till startsidan Relaxguiden"
          >
            <img id="logo" src={logo} alt="Relaxguidens logotyp" />
          </Navbar.Brand>

        
          <button
            ref={toggleRef}
            className="navbar-toggler custom-toggler"
            type="button"
            aria-controls="basic-navbar-nav"
            aria-expanded={expanded}
            aria-label={expanded ? "Stäng meny" : "Öppna meny"}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? (
              <CloseIcon className="icon" />
            ) : (
              <HamburgerIcon className="icon" />
            )}
          </button>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/"
                onClick={closeNavbar}
                aria-current={ariaCurrent("/")}
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
              >
                Hem
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/videotips"
                onClick={closeNavbar}
                aria-current={ariaCurrent("/videotips")}
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
              >
                Videotips
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/about"
                onClick={closeNavbar}
                aria-current={ariaCurrent("/about")}
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
              >
                Om
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;
