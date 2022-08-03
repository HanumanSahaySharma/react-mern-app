import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
/* Import Bootstrap Components */
import { Container, Navbar, Nav, Button } from "react-bootstrap";

/* Import Logo Image */
import Logo from "../assets/images/logo-inverse.png";

export default function Header() {
   const navigate = useNavigate();
   const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/login");
   };
   return (
      <Navbar bg="dark" expand="lg" sticky="top">
         <Container fluid>
            <Navbar.Brand as={NavLink} to="/" className="m-0">
               <img src={Logo} alt="Logo" width={140} />
            </Navbar.Brand>
            <Navbar.Toggle size="md" aria-controls="MarvelStudioNav" />
            <Navbar.Collapse id="MarvelStudioNav">
               {localStorage.getItem("authToken") ? (
                  <>
                     <Nav as="ul" className="ms-auto">
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/notes">
                              Notes
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/videos">
                              Videos
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/movies">
                              Movies
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/tv-shows">
                              TV Shows
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/news">
                              News
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/games">
                              Games
                           </Nav.Link>
                        </Nav.Item>
                     </Nav>
                  </>
               ) : (
                  ""
               )}
               <Nav as="ul" className="ms-auto">
                  {!localStorage.getItem("authToken") ? (
                     <>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/login">
                              Login
                           </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="mx-md-3">
                           <Nav.Link as={NavLink} to="/signup">
                              Signup
                           </Nav.Link>
                        </Nav.Item>
                     </>
                  ) : (
                     <Nav.Item as="li" className="mx-md-3">
                        <Nav.Link
                           as={Button}
                           variant="default"
                           className="border-0"
                           onClick={handleLogout}
                        >
                           Logout
                        </Nav.Link>
                     </Nav.Item>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
