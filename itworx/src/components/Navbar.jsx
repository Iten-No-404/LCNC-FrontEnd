import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";

function Navigationbar({handleOpen}) {
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
          <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>

          <Button className="justify-content-end" variant="dark" onClick={handleOpen}>
            <img width={40} alt="Code generation button" src="data:image/png;base64,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"></img>
          </Button>

        </Container>
      </Navbar>
  );
}

export default Navigationbar;