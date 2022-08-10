import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType"
import Section from "./blocks/Section";
import { Droppable, Draggable } from "react-beautiful-dnd";

function Board({ board, setBoard, fontChange = false }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Droppable droppableId="board" isCombineEnabled >
        {(provided, snapshot) => (
          <div className="Board"  {...provided.droppableProps} ref={provided.innerRef}>
            {board.map((block, index) => {
              if (block.type === blocksType.header) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Droppable droppableId={'id_' + block.id} isCombineEnabled type="x" >
                          {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                              <Draggable draggableId={block.id + 'a'} key={block.id} index={index}>
                                {(provided, snapshot) => (
                                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                                    <Header isDragging={snapshot.isDragging} classN="Block" text={block.id + 'a'} id={'s'} font={block.font} />
                                  </div>
                                )}
                              </Draggable>
                              <Draggable draggableId={block.id + 'b'} key={block.id} index={index}>
                                {(provided, snapshot) => (
                                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                                    <Header isDragging={snapshot.isDragging} classN="Block" text={block.id + 'b'} id={'b'} font={block.font} />
                                  </div>
                                )}
                              </Draggable>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                );
              }
              if (block.type === blocksType.section) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Section isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} />
                      </div>
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Board;