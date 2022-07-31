import React from "react";
import { useDrop } from "react-dnd";
import "../App.css";
import Header from "./blocks/Header";
import blocksTybe from "../helper/blocksTybe"
import Section from "./blocks/Section";
import BlocksList from "../helper/BlocksList";
import GenerateId from "../helper/GenerateId";
// generate random id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function Board({ board, setBoard }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item) => addBlockToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addBlockToBoard = (id) => {   
    if (!board.find((block) => block.id === id)) {
      const newId = GenerateId ();
      const block = BlocksList.find((block) => id === block.id);
      setBoard((board) => [...board, { ...block, id :newId, onBoard: true }]);
    }
  };
  return (
    <>
      <div className="Board" ref={drop}>
        {board.map((block) => {
          if (block.type === blocksTybe.header) {
            return (<div key={block.id} className={block.selected ? "Selsectedblock" : ""}>
              <Header classN="Block" text={block.text} id={block.id} />
            </div>);
          }
          if (block.type === blocksTybe.section) {
            return (<div key={block.id} className={block.selected ? "Selsectedblock" : ""}>
              <Section classN="Block" text={block.text} id={block.id} />
            </div>);
          }
        })}
      </div>
    </>
  );
}

export default Board;