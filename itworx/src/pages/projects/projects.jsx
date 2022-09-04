import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'; 
import getProjects from "./get-user-projects-service";
import addProject from "./add-project-service";
import Card from 'react-bootstrap/Card';
import {Link, useParams } from "react-router-dom";
import  { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigationbar from "../../components/navbar/navbar";
import { selectUser, selectUserAuthToken } from "../../states/user-slice/user-slice";

/**
 * page show all the projects for the user and mange the user to creat new project
 */
function Projects() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const authToken = useSelector(selectUserAuthToken);
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [desctiption, setDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddProject = async () => { 
      const res = await addProject({
      query:{
      title: title,
      description: desctiption,
      generatedAppPath: "\\",
      appTypeId: 1,
      targetFramework_Id: 1,
      user_Id: user.id,
      widgets: "[]"
    }, token: authToken
  })
    // window.replace('/project/'+res.id);
    navigate('/project/'+res.id);
    }
    useEffect(() => {
        async function fetchData() {
          const response = await getProjects({id: user.id, token: authToken });
          setProjects(response);
          setLoading(false);
        }
        if(user.isActive)
          fetchData();
      }, [user.isActive]);
    return (
        <>
        <Navigationbar handleNewproject={handleShow} userEmail={user.email} userName={user.fullName.split(' ')[0]} project={projects !== []}/>
        <Container>
        <Row>
        {!loading && projects.length === 0 && <div className="p-4 m-4" style={{ textAlign: 'center' }}>You have no projects yet! Click the button on the right to create a new one!</div>}
        {/* loop over all user project and show each one in card */}
        {projects.map((project)=>{
        return (
        <Card style={{ width: '18rem' }} className="m-2" key={project.id}>
            <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Created at {project.creationDate.toLocaleString()}</Card.Subtitle>
            <Card.Text>
                {project.description}
            </Card.Text>
            <Card.Link> <Link to={'/project/'+project.id} > Show Project </Link>  </Card.Link>
            </Card.Body>
        </Card>
        )
         })}
        </Row>
        </Container>
        {/* creat new project modal   */}
        <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Project Title* </Form.Label>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="ex: itworx project" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Project Description* </Form.Label>
                <Form.Control value={desctiption} onChange={(e) => setDescription(e.target.value)} as="textarea" rows="3" />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" disabled={title===''|| desctiption===''} onClick={ () => handleAddProject() }>Create</Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}


export default Projects;
