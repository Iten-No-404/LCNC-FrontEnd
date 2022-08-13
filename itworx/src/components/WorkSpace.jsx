import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import Ctabs from './Tabs';
import Navigationbar from './Navbar';
import ModalCard from './code/Modal';
import BlocksList from "../helper/BlocksList";
import GenerateId from "../helper/GenerateId";
import { defaultCSS } from "../helper/InitialCSS";
import { setWidget } from "../states/WidgetListSlice/WidgetListSlice";
import { useDispatch } from 'react-redux';
import { generateCode } from "../helper/helpers";
import { DragDropContext } from 'react-beautiful-dnd'

function WorkSpace() {

  const [board, setBoard] = useState([]);

  // console.log(board);
  const [modalShow, setModalShow] = React.useState(false);
  const [initialMounting, setInitialMounting] = useState(true);
  const [insertedBlockId, setInsertedBlockId] = useState(null);
  const dispatch = useDispatch();

  const codeText = generateCode(board);

  const handleClose = () => setModalShow(false)
  const handleOpen = () => setModalShow(true)

  // make this use effect soc that when ading the
  // the block , we can check onthe updated board
  useEffect(() => {
    if (initialMounting) {
      setInitialMounting(false);
    }
  },[insertedBlockId]);

  const addId = (id) => {
    setInsertedBlockId(id);
  };

  // const addBlockToBoard = () => {
  //   // console.log(board);  
  //   if (!board.find((block) => block.id === insertedBlockId)) {
  //     const newId = GenerateId();
  //     const block = BlocksList.find((block) => insertedBlockId === block.id);
  //     const newBoard = [...board, { ...block, id: newId, onBoard: true, font: defaultCSS.font, CSS: defaultCSS }];
  //     setBoard(newBoard);
  //     dispatch(setWidget({
  //       id: newId,
  //       font: defaultCSS.font,
  //       CSS: defaultCSS
  //     }));
  //   }
  // };

  const reorder = (result) => {
      const items = Array.from(board);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setBoard(items);
    return result;
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log('==> dest', destination);
    // console.log('droppableSource=',droppableSource);
    // console.log('droppableDestination=',droppableDestination);
    const sourceClone = Array.from(source);
    // console.log('SourceClone=',sourceClone);
    const destClone = Array.from(destination);
    // console.log('DestinationClone=',destClone);
    const item = sourceClone[droppableSource.index-1];
    // console.log('item=',item);
    
    const newId = GenerateId();
    dispatch(setWidget({
      id: newId,
      font: defaultCSS.font,
      CSS: defaultCSS
    }));
    destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS });
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
    const { destination, source } = result;
    console.log('==> result', result);

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
              <Board board={board} setBoard={setBoard} addId={addId} />
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
