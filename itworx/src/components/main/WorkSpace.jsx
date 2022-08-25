import Col from 'react-bootstrap/Col';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Board from './Board';
import Ctabs from '../sideMenu/Tabs';
import Navigationbar from './Navbar';
import ModalCard from '../code/Modal';
import BlocksList from "../../helper/BlocksList";
import GenerateId from "../../helper/GenerateId";
import { defaultCSS } from "../../helper/InitialCSS";
import { setWidget } from "../../states/WidgetListSlice/WidgetListSlice";
import { useDispatch } from 'react-redux';
import { generateCode } from "../../helper/helpers";
import { generateCSS } from "../../helper/GenerateCSS";
import { DragDropContext } from 'react-beautiful-dnd'
import Tree from '../nesting/Tree';

function WorkSpace() {

  const [board, setBoard] = useState([]);
  const [modalShowhtml, setModalShowhtml] = React.useState(false);
  const [modalShowcss, setModalShowcss] = React.useState(false);
  const dispatch = useDispatch();

  const HTMLcode = generateCode(board);
  const CSScode =  generateCSS(board);

  const handleClosehtml = () => setModalShowhtml(false)
  const handleOpenhtml = () => setModalShowhtml(true)

  const handleClosecss = () => setModalShowcss(false)
  const handleOpencss = () => setModalShowcss(true)

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
          return {...child, id: newId, CSS: defaultCSS, children: [] }
      })
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS, children: newchildren });
    }else{
      destClone.splice(droppableDestination.index, 0, { ...item, id: newId, CSS: defaultCSS, children: [] });
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

  // this is used only when we are adding a new nested block to the board
  const copyThenNest = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index - 1];
    const newId = GenerateId();
    dispatch(setWidget({
      id: newId,
      font: defaultCSS.font,
      CSS: defaultCSS
    }));
    // find the element with destination id and add the new element to it's children
    const destIndex = destClone.findIndex(e => e.id === droppableDestination.draggableId);
    destClone[destIndex].children.push({ ...item, id: newId, children: [], CSS: defaultCSS });
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

  // Add CSS in this ?
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