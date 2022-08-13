import React from "react";
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType";
import Section from "./blocks/Section";
import { Droppable, Draggable } from "react-beautiful-dnd";

function Board({ board, setBoard }) {
  // console.log(board);
  return (
    <div>
      <Droppable droppableId="board">
        {(provided, snapshot) => (
          <div className="Board"  {...provided.droppableProps} ref={provided.innerRef}>
            {board.map((block, index) => {
              if (block.type === blocksType.header) {
                return (
                  <Draggable draggableId={block.id} key={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={block.id} className={block.selected ? "SelectedBlock" : ""}>
                        <Header isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/>
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
                        <Section isDragging={snapshot.isDragging} classN="Block" text={block.text} id={block.id} font={block.font} CSS={block.CSS}/>
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