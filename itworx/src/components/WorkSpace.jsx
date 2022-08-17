import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Board from './Board';
import Ctabs from './Tabs';
import Navigationbar from './Navbar';
import ModalCard from './code/Modal';
import BlocksList from "../helper/BlocksList";
import GenerateId from "../helper/GenerateId";
import { defaultFont } from "../helper/InitialFont";
import { setWidget } from "../states/WidgetCSSSlice/WidgetCSSSlice";
import { useDispatch } from 'react-redux';
import { generateCode } from "../helper/helpers";
import { DragDropContext } from 'react-beautiful-dnd'
import Tree from './Tree';

function WorkSpace() {

  const [board, setBoard] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  const codeText = generateCode(board);

  const handleClose = () => setModalShow(false)
  const handleOpen = () => setModalShow(true)

  const reorder = (result) => {
    const items = Array.from(board);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBoard(items);
    return result;
  };

  const recursiveReorder = (myBoard, id, index1, index2) => {
    if (myBoard && myBoard.length > 0) {
      let newBoard = [];
      myBoard.forEach(block => {
        if (block.id === id) {         
          const children = block.children;
          const [reorderedItem] = children.splice(index1, 1);
          children.splice(index2, 0, reorderedItem);
          const newBlock = { ...block, children: children };
          newBoard.push(newBlock);
        } else {
          const val = recursiveReorder(block.children, id, index1, index2);
          if (val.length > 0) {
            const newBlock = { ...block, children: val };
            newBoard.push(newBlock);
          } else {
            newBoard.push(block);
          }
        }
      }
      );
      return newBoard;
    } else {
      return [];
    }
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index - 1];
    const newId = GenerateId();
    dispatch(setWidget({
      id: newId,
      font: defaultFont
    }));
    destClone.splice(droppableDestination.index, 0, { ...item, id: newId, children: [] });
    return destClone;
  };

  // this is used only when we are adding a new nested block to the board
  const copyThenNest = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index - 1];
    const newId = GenerateId();
    dispatch(setWidget({
      id: newId,
      font: defaultFont
    }));
    // find the element with destination id and add the new element to it's children
    const destIndex = destClone.findIndex(e => e.id === droppableDestination.draggableId);
    destClone[destIndex].children.push({ ...item, id: newId, children: [] });
    console.log(destClone);
    return destClone;
  };

  let removedItem, boardAfterRemove;
  const recursiveRemoveChild = (myBoard, id) => {
    if (myBoard && myBoard.length > 0) {
      myBoard.forEach(e => {
        if (e.id === id) {
          const item = myBoard.find(e => e.id === id);
          myBoard.splice(myBoard.indexOf(e), 1);
          removedItem = item;
          boardAfterRemove = myBoard;
          return;
        } else {
          recursiveRemoveChild(e.children, id);
        }
      }
      );
    }
  }

  const recursiveAddChild = (myBoard, id, item) => {
    if (myBoard && myBoard.length > 0) {
      let newBoard = [];
      myBoard.forEach(block => {
        if (block.id === id) {
          const newBlock = { ...block, children: [...block.children, item] };
          newBoard.push(newBlock);
        } else {
          const val = recursiveAddChild(block.children, id, item);
          if (val.length > 0) {
            const newBlock = { ...block, children: val };
            newBoard.push(newBlock);
          } else {
            newBoard.push(block);
          }
        }
      }
      );
      return newBoard;
    } else {
      return [];
    }
  }

  // this is used only when we are nesting a block
  const nest = (board, draggableId, droppableDestination) => {
    if (draggableId.toString().includes('l')) {
      draggableId = draggableId.toString().split('_')[2];
    }
    if (droppableDestination.draggableId.toString().includes('l')) {
      droppableDestination.draggableId = droppableDestination.draggableId.toString().split('_')[2];
    }
    recursiveRemoveChild(board, Number(draggableId));
    const boardAfterNesting = recursiveAddChild(board, Number(droppableDestination.draggableId), removedItem);
    console.log(boardAfterNesting);
    return boardAfterNesting;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    console.log("source")
    console.log(droppableSource)
    console.log("dest")
    console.log(droppableDestination)

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
    const { destination, source, draggableId } = result;
    console.log(result);

    // this is the case of nesting a block inside another block
    if (result.combine) {
      console.log('source: ' + draggableId);
      console.log('destination : ' + result.combine.draggableId);
      // when we are adding a new nested block to the board
      if (source.droppableId === "selectWidgetTab") {
        setBoard(
          copyThenNest(
            BlocksList,
            board,
            source,
            result.combine
          )
        )
      } else {
        console.log('else')
        setBoard((prevBoard) => {
          console.log(prevBoard)
          console.log(draggableId)
          console.log(result.combine)
          return nest(
            prevBoard,
            draggableId,
            result.combine
          )
        }
        );
      }
      return;
    }
    // dropped outside the list
    console.log('Not combine')
    if (!destination) {
      return;
    }
    switch (source.droppableId) {
      case destination.droppableId:
        if (source.droppableId === "board") {
          reorder(result);
        } else {
          setBoard((prevBoard) => {
            return recursiveReorder(
              prevBoard,
              Number(source.droppableId.split('_')[2]),
              source.index,
              destination.index
            )
          }
          );
        }
        break;
      case 'selectWidgetTab':
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
        setBoard(
          move(
            board[source.droppableId],
            board[destination.droppableId],
            source,
            destination
          )
        );
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
              {/* <Board board={board} setBoard={setBoard} /> */}
              <Tree data={board} />
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