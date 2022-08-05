import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import Ctabs from './Tabs';
import Navigationbar from './Navbar';
import ModalCard from './code/Modal';



function WorkSpace() {
  const [board, setBoard] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  let codeText = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Bootstrap demo</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    </head>
    <body>`;

  for (let i = 0; i < board.length; i++) {
    codeText = codeText.concat(board[i].code1 + board[i].text + board[i].code2);
  }
  codeText = codeText.concat(`
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
   </body>
  </html>
  `)
  // console.log(codeText);

  // console.log(codeText);
  const handleClose = () => setModalShow(false)
  const handleOpen = () => setModalShow(true)
  return (
      <>
       <Navigationbar handleOpen={handleOpen} />
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              <Board board={board} setBoard={setBoard}/>
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard}/>
            </Col>
          </Row>

        <ModalCard
        show={modalShow}
        handleClose={handleClose}
        language="html" 
        code={codeText} />
        </Container>
      </>  
  );
}


export default WorkSpace;
