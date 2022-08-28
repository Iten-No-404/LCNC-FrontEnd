import React, { useState, useEffect } from "react";
import getProjects from "./get-user-projects-service";
import addProject from "./add-project-service";
import Card from 'react-bootstrap/Card';
import {Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import  { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigationbar from "../../components/navbar/navbar";

function Projects() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [desctiption, setDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddProject = async () => { 
      const res = await addProject({
      title: title,
      description: desctiption,
      generatedAppPath: "\\",
      appTypeId: 1,
      targetFramework_Id: 1,
      user_Id: id,
      widgets: "[]"
    })
    // window.replace('/project/'+res.id);
    navigate('/project/'+res.id);
    }
    useEffect(() => {
        async function fetchData() {
          const response = await getProjects(id);
          setProjects(response);
        }
        fetchData();
      }, []);

    return (
        <>
        <Navigationbar handleNewproject={handleShow} project/>
        <Container>
        <Row>
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
                <Form.Label> Project Title </Form.Label>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="ex: itworx project" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Project Description </Form.Label>
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
