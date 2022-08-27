import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Ctabs from '../../components/tabs/tabs';
import Navigationbar from '../../components/navbar/navbar';
import ModalCard from '../../components/modal/modal';
import { generateCode } from "../../helper/generate-html";
import { generateCSS } from "../../helper/generate-css";
import { DragDropContext } from 'react-beautiful-dnd';
import Tree from '../../components/tree/tree';
import workSpaceHandler from './workspace-controller';
import getBoard from './board-service';
import getBlocksList from './blocks-list-service';
import getDefaultCSS from './default-css-service';
import { setBlocksList } from '../../states/blocks-list-slice/blocks-list-slice';
import { setDefaultCSS } from '../../states/default-css-slice/default-css-slice';
import { useDispatch } from 'react-redux';
import updateProject from './save-board-service'

function WorkSpace() {

  //Change this later:
  const { id } = useParams();

  const [board, setBoard] = useState([]);
  const [project, setProject] = useState({});
  const [modalShowhtml, setModalShowhtml] = React.useState(false);
  const [modalShowcss, setModalShowcss] = React.useState(false);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);
  const [isLoadingBoardCSS, setIsLoadingBoardCSS] = useState(true);
  const [isLoadingBlocksList, setIsLoadingBlocksList] = useState(true);
  const [isLoadingDefaultCSS, setIsLoadingDefaultCSS] = useState(true);

  const { handleOnDragEnd, recursiveAddCSS, recursiveDisSelect } = workSpaceHandler(board, setBoard);
  const HTMLcode = generateCode(board);
  const CSScode = generateCSS(board);

  const handleClosehtml = () => setModalShowhtml(false)
  const handleOpenhtml = () => setModalShowhtml(true)

  const handleClosecss = () => setModalShowcss(false)
  const handleOpencss = () => setModalShowcss(true)

  const dispatch = useDispatch();

  const saveBoard = () => {
    setProject({
      ...project,
      widgets: JSON.stringify(board)
    });
  }

  // save the board data
  useEffect(() => {
    if(!isLoadingBoard)
      updateProject(project);
  }, [project.widgets]);

  // fetch the board data
  useEffect(() => {
    async function fetchData() {
      const response = await getBoard(id);
      setBoard(JSON.parse(response.widgets));
      console.log('Received BoardList',JSON.parse(response.widgets));
      setProject(response);
      setIsLoadingBoard(false);
    }
    fetchData();
  }, []);

  // fill the Widget List with their CSS properties.
  useEffect(() => {
    if(!isLoadingBoard && isLoadingBoardCSS)
    {
      setBoard(recursiveDisSelect(board));
      recursiveAddCSS(board);
      setIsLoadingBoardCSS(false);
    }
  }, [isLoadingBoard]);

  // fetch the default css
  useEffect(() => {
    async function fetchData() {
      const response = await getDefaultCSS();
      dispatch(setDefaultCSS(response));
      setIsLoadingDefaultCSS(false);
    }
    fetchData();
  }, []);

  // fetch the blocks list
  useEffect(() => {
    async function fetchData() {
      const response = await getBlocksList();
      dispatch(setBlocksList(response));
      setIsLoadingBlocksList(false);
    }
    fetchData();
  }, []);

  return !isLoadingBoard && !isLoadingDefaultCSS && (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Navigationbar handleOpenhtml={handleOpenhtml} handleOpencss={handleOpencss} saveBoard={saveBoard}/>
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
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
