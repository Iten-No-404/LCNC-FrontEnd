import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import Ctabs from './Tabs';



function WorkSpace() {
  const [board, setBoard] = useState([]);
  return (
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              <Board board={board} setBoard={setBoard}/>
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard}/>
            </Col>
          </Row>

        </Container>
  );
}


export default WorkSpace;
