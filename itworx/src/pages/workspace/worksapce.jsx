import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Ctabs from '../../components/tabs/tabs';
import Navigationbar from '../../components/navbar/navbar';
import ModalCard from '../../components/modal/modal';
import { generateCode } from "../../helper/helpers";
import { DragDropContext } from 'react-beautiful-dnd'
import Tree from '../../components/tree/tree';
import workSpaceHandler from './workspace-controller'
function WorkSpace() {

  const [board, setBoard] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);

  const { handleOnDragEnd } = workSpaceHandler(board, setBoard, modalShow, setModalShow);  
  const codeText = generateCode(board); 
  const handleClose = () => setModalShow(false)
  const handleOpen = () => setModalShow(true)

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Navigationbar handleOpen={handleOpen} />
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
            show={modalShow}
            handleClose={handleClose}
            language="html"
            code={codeText} />
        </Container>
      </DragDropContext>
    </>
  );
}


export default WorkSpace;
