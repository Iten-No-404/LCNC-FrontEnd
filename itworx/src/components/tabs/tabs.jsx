import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from '../blocks/header';
import Section from '../blocks/section';
import Nav from '../blocks/nav';
import Layers from '../layers/layers';
import DisplayImage from '../blocks/image'
import StyledBlock from '../style-block/style-block';
import { Droppable, Draggable } from "react-beautiful-dnd";
import Div from '../blocks/div';
import { PropTypes } from "prop-types";

/**
 * That the side menue that show three Tabs 
 * 
 *1- first one show the available widgets that can be drag and drop
 * 
 *2- second one show the layers component
 * 
 *3- third one show the styled block comonent
 */
function Ctabs({ board, setBoard }) {
  return (
    <div>
      <Droppable droppableId="selectWidgetTab" isDropDisabled={true} type="board" >
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={21}>
            <Tabs
              defaultActiveKey="widgets"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="widgets" title="Blocks" className='Blocks'>
              <Draggable draggableId='5' key={5} index={5} >
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="mt-3">
                        <Div isDragging={snapshot.isDragging} classN="blockTab" id={5} text="Div" logo={true}/>
                      </div>
                      {snapshot.isDragging && (
                        <Div classN="blockTab" id={5} text="Div" logo={true} />
                      )}
                    </>
                  )}
                </Draggable>
                <Draggable draggableId='1' key={1} index={1}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="mt-3">
                        <Header isDragging={snapshot.isDragging} classN="blockTab" text="Header" logo={true} />
                      </div>
                      {snapshot.isDragging && (
                        <Header classN="blockTab" text="Header" id='headerlogo' logo={true} />
                      )}
                    </>
                  )}
                </Draggable>
                <Draggable draggableId='2' key={2} index={2}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="mt-3">
                        <Section isDragging={snapshot.isDragging} classN="blockTab" text="Section" id={2} logo={true} />
                      </div>
                      {snapshot.isDragging && (
                        <Section classN="blockTab" text="Section" id={2} logo={true} />
                      )}
                    </>
                  )}
                </Draggable>
                <Draggable draggableId='3' key={3} index={3}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="mt-3">
                        <DisplayImage isDragging={snapshot.isDragging} classN="blockTab" id={3} logo={true}/>
                      </div>
                      {snapshot.isDragging && (
                        <DisplayImage classN="blockTab" id={3}  logo={true}/>
                      )}
                    </>
                  )}
                </Draggable>
                <Draggable draggableId='4' key={4} index={4}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="mt-3">
                        <Nav isDragging={snapshot.isDragging} classN="blockTab" id={4} text="Bootstrap" logo={true}/>
                      </div>
                      {snapshot.isDragging && (
                        <Nav classN="blockTab" id={4} text="Bootstrap" logo={true} />
                      )}
                    </>
                  )}
                </Draggable>
              </Tab>
              <Tab eventKey="layers" title="Layers">
                <Layers board={board} setBoard={setBoard} />
              </Tab>
              <Tab eventKey="style" title="Style">
                <StyledBlock board={board} setBoard={setBoard} />
              </Tab>
            </Tabs>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Ctabs;

Ctabs.propTypes = {
   /** board is have the all widget that is in the project */
  board: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type:  PropTypes.string,
      text: PropTypes.string,
      selected: PropTypes.bool,
      code1: PropTypes.string,
      code2:  PropTypes.string,
      CSS: PropTypes.object,
      children: PropTypes.array
    })
  ),
  /** setBoard function use to update the board */
  setBoard: PropTypes.func
}