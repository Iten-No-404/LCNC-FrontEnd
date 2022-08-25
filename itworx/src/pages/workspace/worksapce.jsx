import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Ctabs from '../../components/tabs/tabs';
import Navigationbar from '../../components/navbar/navbar';
import ModalCard from '../../components/modal/modal';
import { generateCode } from "../../helper/GenerateHTML";
import { generateCSS } from "../../helper/GenerateCSS";
import { DragDropContext } from 'react-beautiful-dnd'
import Tree from '../../components/tree/tree';
import workSpaceHandler from './workspace-controller'
function WorkSpace() {

  const [board, setBoard] = useState([]);
  const [modalShowhtml, setModalShowhtml] = React.useState(false);
  const [modalShowcss, setModalShowcss] = React.useState(false);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);

  const { handleOnDragEnd } = workSpaceHandler(board, setBoard);  
  const HTMLcode = generateCode(board);
  const CSScode =  generateCSS(board);

  const handleClosehtml = () => setModalShowhtml(false)
  const handleOpenhtml = () => setModalShowhtml(true)

  const handleClosecss = () => setModalShowcss(false)
  const handleOpencss = () => setModalShowcss(true)

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
      <Navigationbar handleOpenhtml={handleOpenhtml} handleOpencss={handleOpencss}  />
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              {/* <Board board={board} setBoard={setBoard} ClassN="Board" /> */}
              <Tree data={board} ClassN="Board" />
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard} />
            </Col>
          </Row>
          <ModalCard
            show={modalShowhtml}
            handleClose={handleClosehtml}
            language="html"
            code={HTMLcode} />

          <ModalCard
            show={modalShowcss}
            handleClose={handleClosecss}
            language="css"
            code={CSScode} />
        </Container>
      </DragDropContext>
    </>
  );
}


export default WorkSpace;
