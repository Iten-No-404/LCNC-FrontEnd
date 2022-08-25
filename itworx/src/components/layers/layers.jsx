import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Block from '../block/block';
import LayersHandler from './layers-controller.';

const Layers = ({ board, setBoard }) => {

  const { handelDelete, handelSelect } = LayersHandler(setBoard)

  return (
    <Container>
      {board.map((block) => {
        return ((block.children && block.children.length > 0) ? (
          <Row key={block.id}>
            <Col xs={10} className="m-0 p-0">
              <Accordion className="mt-2 p-0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header action onClick={() => handelSelect(block.id)} >{block.type}</Accordion.Header>
                  <Accordion.Body className="m-1 p-1">
                    {<Layers board={block.children} setBoard={setBoard} />}
                  </Accordion.Body>
                </Accordion.Item >
              </Accordion>
            </Col>
            <Col xs={2} className="m-0 p-0">
              <button onClick={() => handelDelete(block.id)} > <img src="https://img.icons8.com/sf-black-filled/200/000000/trash.png" /></button>
            </Col>
          </Row>
        ) : (<Block board={board} setBoard={setBoard} block={block} />))
      })}
    </Container>
  );
}

export default Layers;