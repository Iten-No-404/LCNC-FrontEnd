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

function Ctabs({ board, setBoard }) {
  return (
    <div>
      <Droppable droppableId="selectWidgetTab" isDropDisabled={true} type="board" >
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={21}>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="profile" title="Blocks" className='Blocks'>
              <Draggable draggableId='5' key={5} index={5}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
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
                <Draggable draggableId='4' key={4} index={4}>
                  {(provided, snapshot) => (
                    <>
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
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