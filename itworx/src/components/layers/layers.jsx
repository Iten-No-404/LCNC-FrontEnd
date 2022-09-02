import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Block from '../block/block';
import LayersHandler from './layers-controller.';
import { PropTypes } from "prop-types";

/**
 * Layers component render all the widgets that is in the board with their order, children nested
 * 
 *  and mange the user to select any widget to controle its style
 */
const Layers = ({ board, setBoard }) => {

  const { handelDelete, handelSelect } = LayersHandler(setBoard)

  return (
    <Container>
      {board.map((block) => {
        return ((block.children && block.children.length > 0) ? (
          <Row key={block.id}>
            <Col xs={10} className="m-0 p-0">
              <Accordion className="m-1 p-0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header action onClick={() => handelSelect(block.id)} >{block.type}</Accordion.Header>
                  <Accordion.Body className="m-1 p-0">
                    {<Layers board={block.children} setBoard={setBoard} />}
                  </Accordion.Body>
                </Accordion.Item >
              </Accordion>
            </Col>
            <Col xs={2} className="m-0 p-0">
              <button onClick={() => handelDelete(block.id)} > <img alt="delete" src="https://img.icons8.com/sf-black-filled/200/000000/trash.png" /></button>
            </Col>
          </Row>
        ) : (<Block board={board} setBoard={setBoard} block={block} />))
      })}
    </Container>
  );
}

export default Layers;

Layers.propTypes = {
  /** board is have the all widget that is in the project */
 board: PropTypes.arrayOf(
   PropTypes.shape({
     id: PropTypes.number,
     type:  PropTypes.string,
     text: PropTypes.string,
     selected: PropTypes.bool,
     widgetCodeSnippet: PropTypes.shape({
      code1: PropTypes.string,
      code2:  PropTypes.string,
     }),
     CSS: PropTypes.object,
     children: PropTypes.array
   })
 ),
 /** setBoard function use to update the board */
 setBoard: PropTypes.func
}