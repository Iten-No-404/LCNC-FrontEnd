import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from './blocks/Header';
import Section from './blocks/Section';
import Layers from './Layers';
import StyledBlock from './StyleBlock';
import BlocksList from '../helper/BlocksList';
import { Droppable, Draggable } from "react-beautiful-dnd";

function Ctabs({ board, setBoard }) {
  return (
    <div>
      <Droppable droppableId="selectWidgetTab" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={21}>
            <Tabs
              defaultActiveKey="profile"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="profile" title="Blocks" className='Blocks'>
              {/* {BlocksList.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                innerRef={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.content}
                                            </div>
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                              <Header isDragging={snapshot.isDragging} classN="blockTab" text="Header" logo={true} />
                                            </div>
                                            {snapshot.isDragging && (
                                                <Header classN="blockTab" text="Header" id='{1}' logo={true} />
                                            )}
                                            </div>
                                    )}
                                </Draggable>
                            ))} */}
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
              </Tab>
              <Tab eventKey="home" title="Layers">
                <Layers board={board} setBoard={setBoard} />
              </Tab>
              <Tab eventKey="longer-tab" title="Style">
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