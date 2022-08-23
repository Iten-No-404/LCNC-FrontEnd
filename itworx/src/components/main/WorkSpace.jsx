import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import Ctabs from '../sideMenu/Tabs';
import Navigationbar from './Navbar';
import ModalCard from '../code/Modal';
import BlocksList from "../../helper/BlocksList";
import GenerateId from "../../helper/GenerateId";
import { defaultCSS } from "../../helper/InitialCSS";
import { setWidget } from "../../states/WidgetListSlice/WidgetListSlice";
import { useDispatch } from 'react-redux';
import { generateCode } from "../../helper/helpers";
import { DragDropContext } from 'react-beautiful-dnd'

function WorkSpace() {

  const [board, setBoard] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  //const codeText = generateCode(board);

  const handleClose = () => setModalShow(false)
  const handleOpen = () => setModalShow(true)

  const reorder = (result) => {
    const items = Array.from(board);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoard(items);
    return result;
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index - 1];

    const newId = GenerateId();
    dispatch(setWidget({
      id: newId,
      font: defaultCSS.font,
      CSS: defaultCSS
    }));
    if(item.children){
      const newchildren=item.children.map((child)=>{
        const newId = GenerateId();
         dispatch(setWidget({
         id: newId,
        font: defaultCSS.font,
        CSS: defaultCSS
        }));
          return {...child, id: newId, CSS: defaultCSS }
      })
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS, children: newchildren });
    }else{
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS });
    }
    return destClone;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const handleOnDragEnd = (result) => {
    const { destination, source , draggableId } = result;
    // console.log(result);
    if (result.combine){
      // console.log('source: ' + draggableId)
      // console.log('destination : ' + result.combine.draggableId)
    }
    // dropped outside the list
    if (!destination) {
      return;
    }
    switch (source.droppableId) {
        case destination.droppableId:
          reorder(result);
            break;
        case 'selectWidgetTab':
          console.log('Add Widget!!!');
          setBoard( 
                copy(
                    BlocksList,
                    board,
                    source,
                    destination
                )
            );
            break;
        default:
          // setBoard(
          //       move(
          //           board[source.droppableId],
          //           board[destination.droppableId],
          //           source,
          //           destination
          //       )
          //   );
            break;
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Navigationbar handleOpen={handleOpen} />
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              <Board board={board} droppableId="board" ClassN="Board" />
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard} />
            </Col>
          </Row>
          {/* <ModalCard
            show={modalShow}
            handleClose={handleClose}
            language="html"
            code={codeText} /> */}
        </Container>
      </DragDropContext>
    </>
  );
}


export default WorkSpace;
