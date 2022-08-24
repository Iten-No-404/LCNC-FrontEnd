import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { defaultCSS } from "../../helper/InitialCSS";
import Board from "../main/Board";

export default function Nav({ classN , logo=false ,isDragging=false, CSS, children=null}) {
    if(logo)
    {
      CSS = defaultCSS;
    }
  return (
    <Navbar bg="light" variant="light" className={classN} style={{ border: isDragging ? "5px solid pink" : "0px"}}>
        <Container>
          <Navbar.Brand className="d-flex flex-row">
            {children? <Board board={children} droppableId="children" /> : 
            <>
            <img
              alt="brand"
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <div className="m-1"> Bootstrap </div>
             </>}
          </Navbar.Brand>
        </Container>
    </Navbar>
  );
}
