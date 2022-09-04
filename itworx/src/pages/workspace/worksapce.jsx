import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
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
import {setGeneratedCode} from '../../states/generated-code-slice/generated-code-slice';
import updateProject from './save-board-service'
import  { useNavigate } from 'react-router-dom'
import { selectUser, selectUserAuthToken } from '../../states/user-slice/user-slice';

/**
 * workspace page where the user can edit the project by add new widget (Drag and Drop from the blocks List)
 * or edit the in widgets proparties
 */
function WorkSpace() {
  const { id } = useParams();
  const authToken = useSelector(selectUserAuthToken);
  const user = useSelector(selectUser);
  const [board, setBoard] = useState([]);
  const [project, setProject] = useState({});
  const [modalShowhtml, setModalShowhtml] = React.useState(false);
  const [modalShowcss, setModalShowcss] = React.useState(false);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);
  const [isLoadingBoardCSS, setIsLoadingBoardCSS] = useState(true);
  const [isLoadingBlocksList, setIsLoadingBlocksList] = useState(true);
  const [isLoadingDefaultCSS, setIsLoadingDefaultCSS] = useState(true);

  const { handleOnDragEnd, recursiveAddCSS, generateCodeZip, generateOneCode, recursiveDisSelect } = workSpaceHandler(board, setBoard);

  const HTMLcode = generateCode(board,project?.title);
  const CSScode = generateCSS(board);

  const handleClosehtml = () => setModalShowhtml(false)
  const handleOpenhtml = () => setModalShowhtml(true)

  const handleClosecss = () => setModalShowcss(false)
  const handleOpencss = () => setModalShowcss(true)

  const generateZip = () => generateCodeZip(HTMLcode,CSScode,project.title);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenpreview = () =>{
    const generatedCode=generateOneCode(HTMLcode,CSScode);
    dispatch(setGeneratedCode(generatedCode));
    if(project.widgets === JSON.stringify(board))
      navigate("/project/"+id+"/preview");
    else if (window.confirm("Make sure you have saved the work or cancel to save")) {
      navigate("/project/"+id+"/preview");
    } else {
      return;
    }
  }

  const saveBoard = () => {
    setProject({
      ...project,
      widgets: JSON.stringify(board)
    });
  }

  
  // save the board data
  useEffect(() => {
    if(!isLoadingBoard)
    updateProject({data: project, token: authToken});
  }, [project.widgets]);

  // fetch the board data
  useEffect(() => {
    async function fetchData() {
      const response = await getBoard({id:id, token: authToken});
      setBoard(JSON.parse(response.widgets));
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
      const response = await getDefaultCSS(authToken);
      dispatch(setDefaultCSS(response));
      setIsLoadingDefaultCSS(false);
    }
    fetchData();
  }, []);

  // fetch the blocks list
  useEffect(() => {
    async function fetchData() {
      const response = await getBlocksList(authToken);
      dispatch(setBlocksList(response));
      setIsLoadingBlocksList(false);
    }
    fetchData();
  }, []);
  

  return !isLoadingBoard && !isLoadingDefaultCSS && !isLoadingBlocksList && (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Navigationbar saved={project.widgets === JSON.stringify(board)} userEmail={user.email} projectTitle={project.title} handleOpenhtml={handleOpenhtml} handleOpencss={handleOpencss} saveBoard={saveBoard} generateZip={generateZip} handleOpenpreview={handleOpenpreview} />
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              <Tree data={board} ClassN="Board" />
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard} projectId={id} />
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
