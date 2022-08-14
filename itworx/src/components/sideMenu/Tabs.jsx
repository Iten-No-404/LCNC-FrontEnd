import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from '../blocks/Header';
import Section from '../blocks/Section';
import Layers from './Layers';
import DisplayImage from '../blocks/Image'
import StyledBlock from './StyleBlock';
import { Droppable, Draggable } from "react-beautiful-dnd";

function Ctabs({ board, setBoard }) {
  return (
    <div>
      <Droppable droppableId="selectWidgetTab" isDropDisabled={true} >
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={21}>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="profile" title="Blocks" className='Blocks'>
                <Draggable draggableId='1' key={1} index={1}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
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
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
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
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                        <DisplayImage isDragging={snapshot.isDragging} classN="blockTab" id={3} />
                      </div>
                      {snapshot.isDragging && (
                        <DisplayImage classN="blockTab" id={3}  />
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