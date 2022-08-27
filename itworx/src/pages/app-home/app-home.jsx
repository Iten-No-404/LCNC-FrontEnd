import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigationbar from '../../components/navbar/navbar';
import ModalCard from '../../components/modal/modal';
import { useDispatch } from 'react-redux';

function AppHome() {

    const dispatch = useDispatch();
    const [projectList, setProjectList] = useState([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // fetch the user's project list
  useEffect(() => {
    async function fetchData() {
    //   const response = await getBlocksList();
    //   dispatch(setBlocksList(response));
    setIsLoadingProjects(false);
    }
    fetchData();
  }, []);

  return !isLoadingProjects && (
    <>
    <div>
        Your projects are here. You're logged in.
    </div>
    {/* <Button >
      Create new project
    </Button> */}
        {/* <Navigationbar handleOpenhtml={handleOpenhtml} handleOpencss={handleOpencss} />
        <Container className="mt-4">
          <Row>
            <Col xs={9} >
              <Tree data={board} ClassN="Board" />
            </Col>
            <Col xs={3} >
              <Ctabs board={board} setBoard={setBoard} />
            </Col>
          </Row>
        </Container> */}
    </>
  );
}


export default AppHome;
