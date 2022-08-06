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
import { defaultFont } from "../helper/InitialFont";
import { setWidget } from "../states/WidgetCSSSlice/WidgetCSSSlice";
import { useDispatch } from 'react-redux';
import { generateCode } from "../helper/helpers";
import blocksType from "../helper/BlocksType"
import { DragDropContext } from 'react-beautiful-dnd'

function WorkSpace() {

  const [board, setBoard] = useState([
    {
      id: "one",
      type: blocksType.header,
      text: "Header",
      selected: false,
      code1: `
      <header>
       <div class='p-5 text-center bg-light'>
         <h1 class='mb-3'>`,
      code2: `
         </h1>
       </div>
      </header>`
    },
    {
      id: "two",
      type: blocksType.section,
      text: "Section",
      selected: false,
      code1: `
      <section>
        <div className='p-5 text-center bg-light'>`,
      code2: `
        </div>
      </section>`
    },
    {
      id: "three",
      type: blocksType.header,
      text: "Header",
      selected: false,
      code1: `
    <header>
     <div class='p-5 text-center bg-light'>
       <h1 class='mb-3'>`,
      code2: `
       </h1>
     </div>
    </header>`
    }
  ]);

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
    } else {
      addBlockToBoard()
    }
  }, [insertedBlockId]);

  const addId = (id) => {
    setInsertedBlockId(id);
  };

  const addBlockToBoard = () => {
    if (!board.find((block) => block.id === insertedBlockId)) {
      const newId = GenerateId();
      const block = BlocksList.find((block) => insertedBlockId === block.id);
      const newBoard = [...board, { ...block, id: newId, onBoard: true, font: defaultFont }];
      setBoard(newBoard);
      dispatch(setWidget({
        id: newId,
        font: defaultFont
      }));
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination || destination.draggableId === 'tabs') return;
    if (destination.droppableId === source.droppableId) {
      console.log('first')
      const items = Array.from(board);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setBoard(items);
    } else {
      console.log('second')
      const newId = GenerateId();
      const block = BlocksList.find((block) => insertedBlockId === block.id);
      const newBoard = [...board, { ...block, id: newId, onBoard: true, font: defaultFont }];
      setBoard(newBoard);
      dispatch(setWidget({
        id: newId,
        font: defaultFont
      }));
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
