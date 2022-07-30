import React from "react";
import { useDrop } from "react-dnd";
import "../App.css";
import Header from "./blocks/Header";
import blocksTybe from "../helper/blocksTybe"
import Section from "./blocks/Section";


const BlocksList = [
    {
      id: 1,
      type:blocksTybe.header,
      text: "Header",
      selected:false,
    },
    {
        id: 2,
        type:blocksTybe.section,
        text: "Section",
        selected:false,
    }
];

function Board({board,setBoard}) {
  

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item) => addBlockToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addBlockToBoard = (id) => {
    const blockList = BlocksList.filter((block) => id === block.id);
    setBoard((board) => [...board, blockList[0]]);
  };
  return (
    <>
      <div className="Board" ref={drop}>
        {board.map((block) => {
          if(block.type === blocksTybe.header){
            return (<div className={block.selected? "Selsectedblock":"" }> 
            <Header classN="Block" text={block.text} id={block.id} /> 
            </div>);
          }
          if(block.type === blocksTybe.section){
            return (<div className={block.selected? "Selsectedblock":"" }>  
            <Section classN="Block" text={block.text} id={block.id} />
            </div>);
          }
        })}
      </div>
    </>  
  );
}

export default Board;