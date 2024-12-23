import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import { Box } from '@mui/material';
import { db } from './firebase'; // import your Firestore instance
import { doc, getDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';

function TopNavBar() {

  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef(null);

  const handleOpen = () => {    
    clearTimeout(timerRef.current);
    setIsOpen(true);}

    
  const handleClose=()=>{ 
    timerRef.current = setTimeout(() => {
    setIsOpen(false);
  }, 100);}

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };


  }, []);

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  
useEffect(() => {
  if (isAuthenticated && user) {
    const userRef = doc(collection(db, 'users'), user.sub);

    getDoc(userRef).then((docSnap) => {
      if (!docSnap.exists()) {
        // User doesn't exist, create a new document
        setDoc(userRef, {
          name: user.name,
          email: user.email,
          picture: user.picture,
        });
      }
    });
  }
}, [isAuthenticated, user]);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>

        <Box justifyContent="center" display="flex" alignItems="center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="user">{isAuthenticated?(user.given_name?user.given_name:user.email):"Guest"}</Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown"
              onMouseEnter={handleOpen} onMouseLeave={handleClose}
              show={isOpen}>
                <NavDropdown.Item href="admin">
                  Admin Page
                  </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  Something
                  </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.4" onClick={() => isAuthenticated? logout(): loginWithRedirect()}>
                  { isAuthenticated? 'Logout' : 'Login'  }
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Box>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;