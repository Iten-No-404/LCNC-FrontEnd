import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import "../App.css";
import Header from "./blocks/Header";
import blocksType from "../helper/blocksType"
import Section from "./blocks/Section";


function Board({ board, setBoard, fontChange=false , addId }) {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item) => addId(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div className="Board" ref={drop}>
        {board.map((block) => {
          if (block.type === blocksType.header) {
            return (<div key={block.id} className={block.selected ? "SelectedBlock" : ""}>
              <Header classN="Block" text={block.text} id={block.id} font={block.font} />
            </div>);
          }
          if (block.type === blocksType.section) {
            return (<div key={block.id} className={block.selected ? "SelectedBlock" : ""}>
              <Section classN="Block" text={block.text} id={block.id} font={block.font} />
            </div>);
          }
        })}
      </div>
    </>
  );
}

export default Board;