import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from "react";

function Navigationbar({handleOpenhtml, handleOpencss }) {
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

          <Button className="justify-content-end" variant="dark" onClick={handleOpenhtml}>
            <img width={40} alt="HTML generation button" src="data:image/png;base64,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"></img>
          </Button>

          <Button className="justify-content-end" variant="dark" onClick={handleOpencss}>
            <img width={40} alt="CSS generation button" src="data:image/png;base64,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"></img>
          </Button>

        </Container>
      </Navbar>
  );
}

export default Navigationbar;